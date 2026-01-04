package schemas

type GetAllCategoryDTO struct {
	Type   string `json:"type" binding:"omitempty,oneof=income expense"`
	Take   int64  `json:"take" binding:"required,min=1"`
	Offset int64  `json:"offset" binding:"min=0"`
}
type CreateCategory struct {
	Name  string  `json:"name" binding:"required,min=1,max=100"`
	Type  string  `json:"type" binding:"required,oneof=income expense"`
	Color *string `json:"color" binding:"omitempty,len=7"`
}
