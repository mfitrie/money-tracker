package routes

import (
	// "simple-gin-backend/internal/controllers"
	// "simple-gin-backend/internal/middleware"

	"money-tracker/backend/internal/controllers"

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

	//* Account
	router.GET("/account", controllers.GetAllAccount)
	router.GET("/account/:id", controllers.GetAccountById)

	//* Transaction
	router.GET("/transaction", controllers.Transaction)

	//* Category
	router.GET("/category", controllers.GetAllCategories)
	router.GET("/category/:id", controllers.GetCategoryById)
	router.POST("/category", controllers.CreateCategory)

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
