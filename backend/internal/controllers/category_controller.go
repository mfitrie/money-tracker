package controllers

import (
	"math"
	"money-tracker/internal/models"
	"money-tracker/internal/schemas"
	"money-tracker/internal/services"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func GetAllCategories(c *gin.Context) {
	typeStr := c.Query("type")
	takeStr := c.DefaultQuery("take", "10")
	offsetStr := c.DefaultQuery("offset", "0")

	//------------------------------------------ Validation ------------------------------------------//
	take, err := strconv.ParseInt(takeStr, 10, 64)
	if err != nil || take <= 0 {
		take = 10
	}

	offset, err := strconv.ParseInt(offsetStr, 10, 64)
	if err != nil || offset < 0 {
		offset = 0
	}

	// Set max take
	if take > 100 {
		take = 100
	}

	// Validate type if provided
	if typeStr != "" && typeStr != "income" && typeStr != "expense" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "type must be either 'income' or 'expense'"})
		return
	}
	//------------------------------------------ Validation ------------------------------------------//

	payload := schemas.GetAllCategoryDTO{
		Type:   typeStr,
		Take:   take,
		Offset: offset,
	}

	items, total, err := services.GetAllCategories(payload)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Calculate pagination
	pageSize := int(take)
	page := int(offset/take) + 1
	totalPages := int(math.Ceil(float64(total) / float64(take)))

	c.JSON(http.StatusOK, gin.H{
		"data": items,
		"pagination": gin.H{
			"page":        page,
			"page_size":   pageSize,
			"total":       total,
			"total_pages": totalPages,
		},
	})
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

func DeleteCategory(c *gin.Context) {
	categoryId := c.Param("id")

	// Validate UUID manually
	parsedId, err := uuid.Parse(categoryId)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid UUID format"})
		return
	}

	err = services.DeleteCategory(parsedId.String())
	if err != nil {
		if err.Error() == "category not found" {
			c.JSON(http.StatusNotFound, gin.H{"error": "Category not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.Status(http.StatusNoContent)
}
