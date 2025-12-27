package models

import (
	"time"

	"github.com/google/uuid"
)

type Category struct {
	ID        uuid.UUID `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	Name      string    `gorm:"not null;size:255;unique;" json:"name"`
	Type      string    `gorm:"not null;size:50;check:type IN ('income', 'expense')" json:"type"` // "income" or "expense"
	Color     *string   `gorm:"size:7" json:"color,omitempty"`                                    // optional
	CreatedAt time.Time `gorm:"autoCreateTime" json:"created_at"`

	// Relationships
	Transactions []Transaction `gorm:"foreignKey:CategoryID;constraint:OnDelete:RESTRICT" json:"transactions,omitempty"`
}
