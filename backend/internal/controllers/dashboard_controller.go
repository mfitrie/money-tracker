package controllers

import (
	"fmt"
	"money-tracker/internal/services"
	"net/http"

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
