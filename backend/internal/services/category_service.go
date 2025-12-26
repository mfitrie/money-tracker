package services

import (
	dbmodels "money-tracker/backend/internal/db"
	"money-tracker/backend/internal/models"
)

func GetAllCategories() ([]models.Category, error) {
	var items []models.Category

	result := dbmodels.DB.Find(&items)
	if result.Error != nil {
		return nil, result.Error
	}

	return items, nil
}

// TODO:
func CreateCategory() {
	// var newCategory mode
}
