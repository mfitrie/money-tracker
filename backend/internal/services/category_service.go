package services

import (
	"fmt"
	dbmodels "money-tracker/internal/db"
	"money-tracker/internal/models"
)

func GetAllCategories(take int, offset int) ([]models.Category, int64, error) {
	var items []models.Category
	var total int64

	// Get paginated results with take and skip
	result := dbmodels.DB.Limit(take).Offset(offset).Order("created_at DESC").Find(&items)
	if result.Error != nil {
		return nil, 0, result.Error
	}

	// Get total count
	err2 := dbmodels.DB.Model(&models.Category{}).Count(&total).Error
	if err2 != nil {
		return nil, 0, err2
	}

	return items, 0, nil
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
