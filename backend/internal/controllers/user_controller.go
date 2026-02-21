package controllers

import (
	"money-tracker/internal/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetUserByUsernameForClient(c *gin.Context) {
	username := c.Param("username")
	if username == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Username is required"})
		return
	}

	user, err := services.GetUserByUsernameForClient(username)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	c.JSON(http.StatusOK, user)
}
