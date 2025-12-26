package models

import "time"

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
