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

type CurrentWeekSpend struct {
	DayDate     string   `json:"day_date"`
	DayName     string   `json:"day_name"`
	TotalAmount *float64 `json:"total_amount"` // pointer = nullable
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

func GetCurrentWeekSpend() ([]CurrentWeekSpend, error) {
	var results []CurrentWeekSpend

	query := `
        WITH week_days AS (
            SELECT
                gs::date AS day_date,
                TRIM(TO_CHAR(gs, 'Day')) AS day_name
            FROM generate_series(
                DATE_TRUNC('week', NOW() AT TIME ZONE 'Asia/Kuala_Lumpur'),
                DATE_TRUNC('week', NOW() AT TIME ZONE 'Asia/Kuala_Lumpur') + INTERVAL '6 days',
                INTERVAL '1 day'
            ) AS gs
        ),
        daily_spend AS (
            SELECT
                DATE_TRUNC('day', t.transaction_date AT TIME ZONE 'Asia/Kuala_Lumpur')::date AS day_date,
                SUM(t.amount) AS total_amount
            FROM transactions t
            WHERE
                DATE_TRUNC('week', t.transaction_date AT TIME ZONE 'Asia/Kuala_Lumpur') =
                DATE_TRUNC('week', NOW() AT TIME ZONE 'Asia/Kuala_Lumpur')
            GROUP BY DATE_TRUNC('day', t.transaction_date AT TIME ZONE 'Asia/Kuala_Lumpur')::date
        )
        SELECT
            wd.day_date,
            wd.day_name,
            ds.total_amount
        FROM week_days wd
        LEFT JOIN daily_spend ds ON wd.day_date = ds.day_date
        ORDER BY wd.day_date;
    `

	if err := dbmodels.DB.Raw(query).Scan(&results).Error; err != nil {
		return nil, err
	}

	return results, nil
}
