package models

import "time"

type User struct {
	ID        string    `json:"id" db:"id"`
	Email     string    `json:"email" db:"email"`
	Name      string    `json:"name" db:"name"`
	CreatedAt time.Time `json:"created_at" db:"created_at"`
	UpdatedAt time.Time `json:"updated_at" db:"updated_at"`
}

type Account struct {
	ID        string    `json:"id" db:"id"`
	UserID    string    `json:"user_id" db:"user_id"`
	Name      string    `json:"name" db:"name"`
	Type      string    `json:"type" db:"type"` // "cash", "bank", "credit_card"
	Balance   float64   `json:"balance" db:"balance"`
	Currency  string    `json:"currency" db:"currency"` // "USD", "EUR", etc.
	CreatedAt time.Time `json:"created_at" db:"created_at"`
}

type Category struct {
	ID        string    `json:"id" db:"id"`
	UserID    string    `json:"user_id" db:"user_id"`
	Name      string    `json:"name" db:"name"`
	Type      string    `json:"type" db:"type"`             // "income" or "expense"
	Color     *string   `json:"color,omitempty" db:"color"` // optional
	CreatedAt time.Time `json:"created_at" db:"created_at"`
}

type Transaction struct {
	ID              string    `json:"id" db:"id"`
	UserID          string    `json:"user_id" db:"user_id"`
	AccountID       string    `json:"account_id" db:"account_id"`
	CategoryID      string    `json:"category_id" db:"category_id"`
	Amount          float64   `json:"amount" db:"amount"`
	Type            string    `json:"type" db:"type"` // "income" or "expense"
	Description     string    `json:"description" db:"description"`
	TransactionDate time.Time `json:"transaction_date" db:"transaction_date"`
	CreatedAt       time.Time `json:"created_at" db:"created_at"`
	UpdatedAt       time.Time `json:"updated_at" db:"updated_at"`
}
