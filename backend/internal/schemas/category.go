package schemas

type CreateCategory struct {
	FirstName string `json:"first_name" binding:"required,min=1,max=100" example:"John"`
	LastName  string `json:"last_name" binding:"required,min=1,max=100" example:"Doe"`
	Email     string `json:"email" binding:"required,email"`
	Password  string `json:"password" binding:"required,min=8,max=100"`
}
