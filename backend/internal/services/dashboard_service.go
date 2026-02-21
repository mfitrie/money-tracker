package services

import (
	"math"
	dbmodels "money-tracker/internal/db"
	"money-tracker/internal/models"
)

type CategorySpend struct {
	Name  string  `json:"name"`
	Color string  `json:"color"`
	Total float64 `json:"total"`
}

func GetTodaysSpend() (float64, []CategorySpend, error) {
	var total float64
	var categorySpends []CategorySpend

	err := dbmodels.DB.Model(&models.Transaction{}).
		Select("COALESCE(SUM(amount), 0)").
		Where("transaction_date::date = CURRENT_DATE").
		Scan(&total).Error
	if err != nil {
		return 0, nil, err
	}

	err = dbmodels.DB.Model(&models.Transaction{}).
		Select("c.name, c.color, SUM(amount) as total").
		Joins("JOIN categories c ON transactions.category_id = c.id").
		Where("transactions.transaction_date::date = CURRENT_DATE").
		Group("c.name, c.color").
		Scan(&categorySpends).Error
	if err != nil {
		return 0, nil, err
	}

	return total, categorySpends, nil
}

func AverageDailySpend() (float64, error) {
	var avg float64

	query := `
		SELECT AVG(daily_total) AS average_daily_expenditure
		FROM (
			SELECT DATE(transaction_date) AS day,
			       SUM(amount) AS daily_total
			FROM transactions
			GROUP BY DATE(transaction_date)
		) daily_spending;
	`

	err := dbmodels.DB.Raw(query).Scan(&avg).Error
	if err != nil {
		return 0, err
	}

	rounded := math.Round(avg*100) / 100

	return rounded, nil
}
