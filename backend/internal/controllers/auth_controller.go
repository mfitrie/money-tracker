package controllers

import (
	"fmt"
	"money-tracker/internal/schemas"
	"money-tracker/internal/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

func LoginHandler(c *gin.Context) {
	var user schemas.User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	fmt.Printf("The user request value %v", user)

	if user.Username == "admin" && user.Password == "12345" {
		tokenString, err := services.CreateToken(user.Username)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			fmt.Errorf("No username found")
		}
		c.JSON(http.StatusOK, gin.H{"access_token": tokenString})
		return
	} else {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "You not allowed"})
	}
}

func ProtectedHandler(c *gin.Context) {
	tokenString := c.GetHeader("Authorization")
	if tokenString == "" {
		c.Status(http.StatusUnauthorized)
		fmt.Printf("Missing authorization header")
		return
	}
	tokenString = tokenString[len("Bearer "):]

	err := services.VerifyToken(tokenString)
	if err != nil {
		c.Status(http.StatusUnauthorized)
		fmt.Printf("Invalid token")
		return
	}

	fmt.Printf("Welcome to the the protected area")

}
