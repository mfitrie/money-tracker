package controllers

import (
	"money-tracker/backend/internal/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetAllAccount(c *gin.Context) {
	// userID := c.MustGet("user_id").(uint)
	accounts, err := services.GetAllAccount()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, accounts)

}

func GetAccountById(c *gin.Context) {
	accountId := c.Param("id")
	account, err := services.GetAccountById(accountId)

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Account not found"})
		return
	}

	c.JSON(http.StatusOK, account)
}

//TODO:
// func CreateAccount(c *gin.Context) {
// 	var input schemas.CreateCategory

// 	err := c.ShouldBindJSON(&input)
// 	if err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
// 		return
// 	}

// 	_, err2 := services.CreateCategory(models.Category{
// 		Name:  input.Name,
// 		Type:  input.Type,
// 		Color: input.Color,
// 	})
// 	if err2 != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": err2.Error()})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{"status": "Category created"})
// }
