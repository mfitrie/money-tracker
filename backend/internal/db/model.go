package dbmodels

import (
	"time"
)

type User struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	Email     string    `gorm:"uniqueIndex;not null;size:255" json:"email"`
	Name      string    `gorm:"not null;size:255" json:"name"`
	CreatedAt time.Time `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt time.Time `gorm:"autoUpdateTime" json:"updated_at"`

	// Relationships
	Accounts     []Account     `gorm:"foreignKey:UserID;constraint:OnDelete:CASCADE" json:"accounts,omitempty"`
	Categories   []Category    `gorm:"foreignKey:UserID;constraint:OnDelete:CASCADE" json:"categories,omitempty"`
	Transactions []Transaction `gorm:"foreignKey:UserID;constraint:OnDelete:CASCADE" json:"transactions,omitempty"`
}

type Account struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	UserID    uint      `gorm:"not null;index" json:"user_id"`
	Name      string    `gorm:"not null;size:255" json:"name"`
	Type      string    `gorm:"not null;size:50" json:"type"` // "cash", "bank", "credit_card"
	Balance   float64   `gorm:"type:decimal(10,2);default:0.00" json:"balance"`
	Currency  string    `gorm:"size:3;default:RM" json:"currency"` // "RM", "EUR", etc.
	CreatedAt time.Time `gorm:"autoCreateTime" json:"created_at"`

	// Relationships
	User         User          `gorm:"foreignKey:UserID;constraint:OnDelete:CASCADE" json:"user,omitempty"`
	Transactions []Transaction `gorm:"foreignKey:AccountID;constraint:OnDelete:CASCADE" json:"transactions,omitempty"`
}

type Category struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	UserID    uint      `gorm:"not null;index" json:"user_id"`
	Name      string    `gorm:"not null;size:255" json:"name"`
	Type      string    `gorm:"not null;size:50;check:type IN ('income', 'expense')" json:"type"` // "income" or "expense"
	Color     *string   `gorm:"size:7" json:"color,omitempty"`                                    // optional
	CreatedAt time.Time `gorm:"autoCreateTime" json:"created_at"`

	// Relationships
	User         User          `gorm:"foreignKey:UserID;constraint:OnDelete:CASCADE" json:"user,omitempty"`
	Transactions []Transaction `gorm:"foreignKey:CategoryID;constraint:OnDelete:RESTRICT" json:"transactions,omitempty"`
}

type Transaction struct {
	ID              uint      `gorm:"primaryKey" json:"id"`
	UserID          uint      `gorm:"not null;index:idx_transactions_user_id" json:"user_id"`
	AccountID       uint      `gorm:"not null;index:idx_transactions_account_id" json:"account_id"`
	CategoryID      uint      `gorm:"not null;index:idx_transactions_category_id" json:"category_id"`
	Amount          float64   `gorm:"type:decimal(10,2);not null" json:"amount"`
	Type            string    `gorm:"not null;size:50;check:type IN ('income', 'expense')" json:"type"` // "income" or "expense"
	Description     string    `gorm:"type:text" json:"description"`
	TransactionDate time.Time `gorm:"type:date;not null;index:idx_transactions_date" json:"transaction_date"`
	CreatedAt       time.Time `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt       time.Time `gorm:"autoUpdateTime" json:"updated_at"`

	// Relationships
	User     User     `gorm:"foreignKey:UserID;constraint:OnDelete:CASCADE" json:"user,omitempty"`
	Account  Account  `gorm:"foreignKey:AccountID;constraint:OnDelete:CASCADE" json:"account,omitempty"`
	Category Category `gorm:"foreignKey:CategoryID;constraint:OnDelete:RESTRICT" json:"category,omitempty"`
}
