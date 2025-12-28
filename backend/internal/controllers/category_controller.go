package controllers

import (
	"money-tracker/internal/models"
	"money-tracker/internal/schemas"
	"money-tracker/internal/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetAllCategories(c *gin.Context) {
	// userID := c.MustGet("user_id").(uint)
	items, err := services.GetAllCategories()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, items)

}

func CreateCategory(c *gin.Context) {
	var input schemas.CreateCategory

	err := c.ShouldBindJSON(&input)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	_, err2 := services.CreateCategory(models.Category{
		Name:  input.Name,
		Type:  input.Type,
		Color: input.Color,
	})
	if err2 != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err2.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": "Category created"})
}

func GetCategoryById(c *gin.Context) {
	categoryId := c.Param("id")

	item, err := services.GetCategoryById(categoryId)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Category not found"})
		return
	}

	c.JSON(http.StatusOK, item)
}
