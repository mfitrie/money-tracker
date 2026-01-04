package services

import (
	"fmt"
	dbmodels "money-tracker/internal/db"
	"money-tracker/internal/models"
	"money-tracker/internal/schemas"
)

func GetAllCategories(payload schemas.GetAllCategoryDTO) ([]models.Category, int64, error) {
	var items []models.Category
	var total int64

	// Build base query
	query := dbmodels.DB.Model(&models.Category{})
	// Apply type filter only if provided
	if payload.Type != "" {
		query = query.Where("type = ?", payload.Type)
	}
	// Get paginated results with take and skip
	result := query.Limit(int(payload.Take)).Offset(int(payload.Offset)).Order("created_at DESC").Find(&items)
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

func DeleteCategory(id string) error {
	result := dbmodels.DB.Delete(&models.Category{}, "id = ?", id)
	if result.Error != nil {
		return result.Error
	}

	if result.RowsAffected == 0 {
		return fmt.Errorf("Category not found!")
	}

	return nil
}
