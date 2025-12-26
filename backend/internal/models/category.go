package models

import "time"

type Category struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	UserID    uint      `gorm:"not null;index" json:"user_id"`
	Name      string    `gorm:"not null;size:255" json:"name"`
	Type      string    `gorm:"not null;size:50;check:type IN ('income', 'expense')" json:"type"` // "income" or "expense"
	Color     *string   `gorm:"size:7" json:"color,omitempty"`                                    // optional
	CreatedAt time.Time `gorm:"autoCreateTime" json:"created_at"`

	// Relationships
	Transactions []Transaction `gorm:"foreignKey:CategoryID;constraint:OnDelete:RESTRICT" json:"transactions,omitempty"`
}
