package services

import (
	"fmt"
	dbmodels "money-tracker/internal/db"
	"money-tracker/internal/models"
	"money-tracker/internal/schemas"
)

func SearchTransaction(payload schemas.SearchTransaction) ([]models.Transaction, int64, error) {
	var transactions []models.Transaction
	var total int64

	query := dbmodels.DB.Model(&models.Transaction{})

	if !payload.DateFrom.IsZero() {
		query = query.Where("transaction_date >= ?", payload.DateFrom)
	}
	if !payload.DateTo.IsZero() {
		query = query.Where("transaction_date <= ?", payload.DateTo)
	}

	if err := query.Count(&total).Error; err != nil {
		return nil, 0, err
	}

	// Get paginated results with take and skip
	result := query.
		Preload("Account").
		Preload("Account.User"). // If you need nested user data
		Preload("Category").
		Limit(payload.Take).
		Offset(payload.Offset).
		Order("transaction_date DESC").
		Find(&transactions)
	if result.Error != nil {
		return nil, 0, result.Error
	}

	return transactions, total, nil
}

func GetAllTransaction(take int, offset int) ([]models.Transaction, int64, error) {
	var transactions []models.Transaction
	var total int64

	// Get total count
	if err := dbmodels.DB.Model(&models.Transaction{}).Count(&total).Error; err != nil {
		return nil, 0, err
	}

	// Get paginated results with take and skip
	result := dbmodels.DB.
		Preload("Account").
		Preload("Account.User"). // If you need nested user data
		Preload("Category").
		Limit(take).
		Offset(offset).
		Order("transaction_date DESC").
		Find(&transactions)
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
		AccountID:  input.AccountID,
		CategoryID: input.CategoryID,
		Amount:     input.Amount,
		Type:       input.Type,
	}

	// Only set TransactionDate if it was provided in the input
	if input.Description != nil {
		newTransaction.Description = input.Description
	}

	if input.TransactionDate != nil {
		newTransaction.TransactionDate = *input.TransactionDate
	}

	err := dbmodels.DB.Create(&newTransaction).Error
	if err != nil {
		return nil, fmt.Errorf("Error inserting transaction: %v", err)
	}

	return &newTransaction, nil
}
