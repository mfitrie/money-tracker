package controllers

import (
	"money-tracker/backend/internal/schemas"
	"money-tracker/backend/internal/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

func InsertTransaction(c *gin.Context) {
	var input schemas.InsertTransaction

	err := c.ShouldBindJSON(&input)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	_, err2 := services.InsertTransaction(input)

	if err2 != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err2.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": "Transaction inserted"})

}

func GetAllTransaction(c *gin.Context) {
	items, err := services.GetAllTransaction()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, items)
}
