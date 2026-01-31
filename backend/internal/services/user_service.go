package services

import (
	dbmodels "money-tracker/internal/db"
	"money-tracker/internal/models"

	"golang.org/x/crypto/bcrypt"
)

func GetUserByUsername(username string) (models.User, error) {
	var user models.User
	err := dbmodels.DB.Where("username = ?", username).First(&user).Error
	if err != nil {
		return user, err
	}
	return user, nil
}

func VerifyPassword(hashedPassword, password string) error {
	return bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
}
