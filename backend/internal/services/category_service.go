package services

import (
	"fmt"
	dbmodels "money-tracker/internal/db"
	"money-tracker/internal/models"
)

// TODO: pagination
func GetAllCategories() ([]models.Category, error) {
	var items []models.Category

	result := dbmodels.DB.Find(&items)
	if result.Error != nil {
		return nil, result.Error
	}

	return items, nil
}

func GetCategoryById(id string) (models.Category, error) {
	var category models.Category
	err := dbmodels.DB.Where("id = ?", id).First(&category).Error
	if err != nil {
		return category, err
	}

	return category, nil
}

func CreateCategory(input models.Category) (*models.Category, error) {
	newCategory := models.Category{
		Name:  input.Name,
		Type:  input.Type,
		Color: input.Color,
		// CreatedAt: time.Now().UTC(),
	}

	err := dbmodels.DB.Create(&newCategory).Error
	if err != nil {
		return nil, fmt.Errorf("Error creating category: %v", err)
	}

	return &newCategory, nil
}
