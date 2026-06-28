package controllers

import (
	"math"
	"money-tracker/internal/schemas"
	"money-tracker/internal/services"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

func SearchTransaction(c *gin.Context) {
	dateFromStr := c.Query("date_from")
	dateToStr := c.Query("date_to")
	takeStr := c.DefaultQuery("take", "10")
	offsetStr := c.DefaultQuery("offset", "0")

	take, err := strconv.Atoi(takeStr)
	if err != nil || take <= 0 {
		take = 10
	}

	skip, err := strconv.Atoi(offsetStr)
	if err != nil || skip < 0 {
		skip = 0
	}

	payload := schemas.SearchTransaction{
		Take:   take,
		Offset: skip,
	}

	if dateFromStr != "" {
		t, err := time.Parse(time.RFC3339, dateFromStr)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "date_from must be RFC3339 format e.g. 2024-01-15T00:00:00Z"})
			return
		}
		payload.DateFrom = t
	}

	if dateToStr != "" {
		t, err := time.Parse(time.RFC3339, dateToStr)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "date_to must be RFC3339 format e.g. 2024-01-15T00:00:00Z"})
			return
		}
		payload.DateTo = t
	}

	items, total, err := services.SearchTransaction(payload)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	pageSize := take
	page := (skip / take) + 1
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

func GetAllTransaction(c *gin.Context) {
	// Get take and skip from query
	takeStr := c.DefaultQuery("take", "10")
	offsetStr := c.DefaultQuery("offset", "0")

	take, err := strconv.Atoi(takeStr)
	if err != nil || take <= 0 {
		take = 10
	}

	skip, err := strconv.Atoi(offsetStr)
	if err != nil || skip < 0 {
		skip = 0
	}

	// Set max take
	if take > 100 {
		take = 100
	}

	items, total, err := services.GetAllTransaction(take, skip)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Calculate page and page_size from take and skip
	pageSize := take
	page := (skip / take) + 1
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

func GetTransactionById(c *gin.Context) {
	transactionId := c.Param("id")

	item, err := services.GetTransactionById(transactionId)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Transaction not found"})
		return
	}

	c.JSON(http.StatusOK, item)
}

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
