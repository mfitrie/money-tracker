package services

import (
	dbmodels "money-tracker/internal/db"
	"money-tracker/internal/models"
	"money-tracker/internal/schemas"

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

func GetUserByUsernameForClient(username string) (schemas.UserPublic, error) {
	var user schemas.UserPublic

	err := dbmodels.DB.Model(&models.User{}).
		Select("name", "email").
		Where("username = ?", username).
		First(&user).Error

	if err != nil {
		return user, err
	}
	return user, nil
}
