package schemas

type GetRangeDateSpendDTO struct {
	DateFrom string `json:"date_from" binding:"required" form:"date_from"`
	DateTo   string `json:"date_to" binding:"required" form:"date_to"`
}
