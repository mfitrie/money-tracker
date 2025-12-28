package services

import (
	dbmodels "money-tracker/internal/db"
	"money-tracker/internal/models"
)

// TODO: pagination
func GetAllAccount() ([]models.Account, error) {
	var accounts []models.Account

	result := dbmodels.DB.Find(&accounts)
	if result.Error != nil {
		return nil, result.Error
	}

	return accounts, nil
}

func GetAccountById(id string) (models.Account, error) {
	var account models.Account
	err := dbmodels.DB.Where("id = ?", id).First(&account).Error
	if err != nil {
		return account, err
	}

	return account, nil
}

//TODO: create account
// func CreateCategory(input models.Category) (*models.Category, error) {
// 	newCategory := models.Category{
// 		Name:  input.Name,
// 		Type:  input.Type,
// 		Color: input.Color,
// 		// CreatedAt: time.Now().UTC(),
// 	}

// 	err := dbmodels.DB.Create(&newCategory).Error
// 	if err != nil {
// 		return nil, fmt.Errorf("Error creating category: %v", err)
// 	}

// 	return &newCategory, nil
// }
