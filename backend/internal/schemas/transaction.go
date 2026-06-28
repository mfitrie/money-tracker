package schemas

import (
	"time"

	"github.com/google/uuid"
)

type SearchTransaction struct {
	DateFrom time.Time `json:"date_from" form:"date_from"`
	DateTo   time.Time `json:"date_to" form:"date_to"`
	Take     int       `json:"take" binding:"required"`
	Offset   int       `json:"offset" binding:"required"`
}

type InsertTransaction struct {
	AccountID       uuid.UUID  `json:"account_id" binding:"required,uuid"`
	CategoryID      uuid.UUID  `json:"category_id" binding:"required,uuid"`
	Amount          float64    `json:"amount" binding:"required,gt=0"`
	Type            string     `json:"type" binding:"required,oneof=income expense"`
	Description     *string    `json:"description" binding:"omitempty"`
	TransactionDate *time.Time `json:"transaction_date" binding:"omitempty"`
}
