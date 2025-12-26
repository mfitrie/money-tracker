package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// GetHelloWorld godoc
// @Summary Hello World example
// @Description Responds with a simple hello world message
// @Tags Dev routes
// @Accept json
// @Produce json
// @Success 200 {string} string "Hello, world!"
// @Router / [get]
// func GetHelloWorld(c *gin.Context) {
// 	c.JSON(http.StatusOK, "Hello, world!")
// }

// SendEmailHandler godoc
// @Summary Send an email
// @Description Sends a welcome email to the recipient
// @Tags Dev routes
// @Accept json
// @Produce json
// @Param to query string true "Recipient email"
// @Param subject query string true "Email subject"
// @Param body query string true "Email body"
// @Success 200 {object} map[string]string "Email sent successfully"
// @Failure 500 {object} map[string]string "Failed to send email"
// @Router /send-test-email [post]
func Transaction(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "route transaction"})
}
