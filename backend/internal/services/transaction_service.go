package services

import (
	"fmt"
	dbmodels "money-tracker/backend/internal/db"
	"money-tracker/backend/internal/models"
	"money-tracker/backend/internal/schemas"
)

func GetAllTransaction(take int, offset int) ([]models.Transaction, int64, error) {
	var transactions []models.Transaction
	var total int64

	// Get total count
	if err := dbmodels.DB.Model(&models.Transaction{}).Count(&total).Error; err != nil {
		return nil, 0, err
	}

	// Get paginated results with take and skip
	result := dbmodels.DB.Limit(take).Offset(offset).Order("created_at DESC").Find(&transactions)
	if result.Error != nil {
		return nil, 0, result.Error
	}

	return transactions, total, nil
}

func GetTransactionById(id string) (models.Transaction, error) {
	var transaction models.Transaction
	err := dbmodels.DB.Where("id = ?", id).First(&transaction).Error
	if err != nil {
		return transaction, err
	}

	return transaction, nil
}

func InsertTransaction(input schemas.InsertTransaction) (*models.Transaction, error) {
	newTransaction := models.Transaction{
		AccountID:   input.AccountID,
		CategoryID:  input.CategoryID,
		Amount:      input.Amount,
		Type:        input.Type,
		Description: input.Description,
	}
	err := dbmodels.DB.Create(&newTransaction).Error
	if err != nil {
		return nil, fmt.Errorf("Error inserting transaction: %v", err)
	}

	return &newTransaction, nil
}
