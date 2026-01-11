package services

import (
	dbmodels "money-tracker/internal/db"
	"money-tracker/internal/models"
)

func GetTodaysSpend() (float64, error) {
	var result float64
	err := dbmodels.DB.Model(&models.Transaction{}).
		Select("COALESCE(SUM(amount), 0)").
		Where("created_at::date = CURRENT_DATE").
		Scan(&result).Error

	if err != nil {
		return 0, err
	}
	return result, nil
}
