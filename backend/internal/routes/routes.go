package routes

import (
	"money-tracker/internal/controllers"

	"github.com/gin-gonic/gin"
	// docs "simple-gin-backend/docs"
	// swaggerfiles "github.com/swaggo/files"
	// ginSwagger "github.com/swaggo/gin-swagger"
)

// RegisterRoutes sets up the application routes
func RegisterRoutes(router *gin.Engine) {
	// // Swagger routes
	// docs.SwaggerInfo.BasePath = "/"
	// router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerfiles.Handler))

	//* Health
	router.GET("/api/health", controllers.GetHealth)

	//* Account
	router.GET("/api/account", controllers.GetAllAccount)
	router.GET("/api/account/:id", controllers.GetAccountById)

	//* Transaction
	router.GET("/api/transaction", controllers.GetAllTransaction)
	router.GET("/api/transaction/:id", controllers.GetTransactionById)
	router.POST("/api/transaction", controllers.InsertTransaction)

	//* Category
	router.GET("/api/category", controllers.GetAllCategories)
	router.GET("/api/category/:id", controllers.GetCategoryById)
	router.POST("/api/category", controllers.CreateCategory)
	router.DELETE("/api/category/:id", controllers.DeleteCategory)

	// Protected routes (Require authentication)
	// api := router.Group("")
	// api.Use(middleware.JWTAuthMiddleware())
	// {
	// 	// CRUD Routes for items
	// 	api.POST("/items", controllers.CreateItem)
	// 	api.GET("/items/:id", controllers.GetItem)
	// 	api.PUT("/items/:id", controllers.UpdateItem)
	// 	api.DELETE("/items/:id", controllers.DeleteItem)
	// 	api.GET("/items", controllers.GetItems)
	// }
}
