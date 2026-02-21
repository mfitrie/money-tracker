package routes

import (
	"money-tracker/internal/controllers"
	"money-tracker/internal/middleware"

	"github.com/gin-gonic/gin"
)

func RegisterRoutes(router *gin.Engine) {
	//* Public routes (No authentication required)

	// Auth
	router.POST("/backend-api/auth/login", controllers.LoginHandler)

	// Health
	router.GET("/backend-api/health", controllers.GetHealth)

	//* Protected routes (Require authentication)
	protected := router.Group("/backend-api")
	protected.Use(middleware.JWTAuthMiddleware())
	{
		// Dashboard
		protected.GET("/dashboard/todaysspend", controllers.GetTodaysSpend)
		protected.GET("/dashboard/averagedailyspend", controllers.AverageDailySpend)

		// User
		protected.GET("/user/:username", controllers.GetUserByUsernameForClient)

		// Account
		protected.GET("/account", controllers.GetAllAccount)
		protected.GET("/account/:id", controllers.GetAccountById)

		// Transaction
		protected.GET("/transaction", controllers.GetAllTransaction)
		protected.GET("/transaction/:id", controllers.GetTransactionById)
		protected.POST("/transaction", controllers.InsertTransaction)

		// Category
		protected.GET("/category", controllers.GetAllCategories)
		protected.GET("/category/:id", controllers.GetCategoryById)
		protected.POST("/category", controllers.CreateCategory)
		protected.DELETE("/category/:id", controllers.DeleteCategory)
	}
}
