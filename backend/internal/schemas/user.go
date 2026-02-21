package schemas

type User struct {
	Username string `json:"name"`
	Password string `json:"password"`
}

type UserPublic struct {
	Name  string `json:"name"`
	Email string `json:"email"`
}
