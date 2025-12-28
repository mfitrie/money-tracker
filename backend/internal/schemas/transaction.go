package schemas

import (
	"time"

	"github.com/google/uuid"
)

type InsertTransaction struct {
	AccountID       uuid.UUID  `json:"account_id" binding:"required,uuid"`
	CategoryID      uuid.UUID  `json:"category_id" binding:"required,uuid"`
	Amount          float64    `json:"amount" binding:"required,gt=0"`
	Type            string     `json:"type" binding:"required,oneof=income expense"`
	Description     *string    `json:"description" binding:"omitempty"`
	TransactionDate *time.Time `json:"transaction_date" binding:"omitempty"`
}
