package services

import (
	"fmt"
	dbmodels "money-tracker/backend/internal/db"
	"money-tracker/backend/internal/models"
	"money-tracker/backend/internal/schemas"
)

// TODO: pagination
func GetAllTransaction() ([]models.Transaction, error) {
	var transactions []models.Transaction

	result := dbmodels.DB.Find(&transactions)
	if result.Error != nil {
		return nil, result.Error
	}

	return transactions, nil
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
