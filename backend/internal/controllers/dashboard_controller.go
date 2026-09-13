package controllers

import (
	"fmt"
	"money-tracker/internal/schemas"
	"money-tracker/internal/services"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

func GetTodaysSpend(c *gin.Context) {
	total, categorySpend, err := services.GetTodaysSpend()

	if err != nil {
		fmt.Println(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Fail to get today's expense",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data":       total,
		"categories": categorySpend,
	})
}

func AverageDailySpend(c *gin.Context) {
	avg, err := services.AverageDailySpend()

	if err != nil {
		fmt.Println(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Fail to get average daily spend",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": avg,
	})
}

func GetCurrentWeekSpend(c *gin.Context) {
	dataObj, err := services.GetCurrentWeekSpend()

	if err != nil {
		fmt.Println(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Fail to get current week spend",
		})
	}

	c.JSON(http.StatusOK, dataObj)
}

func GetRangeDateSpend(c *gin.Context) {
	var payload schemas.GetRangeDateSpendDTO
	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	dateFrom, err := time.Parse(time.RFC3339, payload.DateFrom)
	if err != nil {
		c.JSON(400, gin.H{"error": "invalid dateFrom: " + err.Error()})
		return
	}

	dateTo, err := time.Parse(time.RFC3339, payload.DateTo)
	if err != nil {
		c.JSON(400, gin.H{"error": "invalid dateTo: " + err.Error()})
		return
	}

	if dateTo.Before(dateFrom) {
		c.JSON(400, gin.H{"error": "dateTo must not be before dateFrom"})
		return
	}

	results, err := services.GetRangeDateSpend(payload)
	if err != nil {
		fmt.Print(err.Error())
		c.JSON(500, gin.H{"error": "Internal error"})
		return
	}

	c.JSON(200, results)
}
