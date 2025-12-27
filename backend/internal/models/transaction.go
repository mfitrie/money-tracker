package models

import (
	"time"

	"github.com/google/uuid"
)

type Transaction struct {
	ID              uuid.UUID `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	AccountID       uuid.UUID `gorm:"type:uuid;not null;index:idx_transactions_account_id" json:"account_id"`
	CategoryID      uuid.UUID `gorm:"type:uuid;not null;index:idx_transactions_category_id" json:"category_id"` // Changed to uuid.UUID
	Amount          float64   `gorm:"type:decimal(10,2);not null" json:"amount"`
	Type            string    `gorm:"not null;size:50;check:type IN ('income', 'expense')" json:"type"` // "income" or "expense"
	Description     string    `gorm:"type:text" json:"description"`
	TransactionDate time.Time `gorm:"type:date;not null;index:idx_transactions_date" json:"transaction_date"`
	CreatedAt       time.Time `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt       time.Time `gorm:"autoUpdateTime" json:"updated_at"`

	// Relationships
	Account  Account  `gorm:"foreignKey:AccountID;constraint:OnDelete:CASCADE" json:"account,omitempty"`
	Category Category `gorm:"foreignKey:CategoryID;constraint:OnDelete:RESTRICT" json:"category,omitempty"`
}
