package main

import (
	"log"
	dbmodels "money-tracker/internal/db"
	"money-tracker/internal/routes"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func CorsMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		//TODO: change this later for frontend
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, Authorization")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PATCH, DELETE, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(http.StatusNoContent)
			return
		}

		c.Next()
	}
}

func main() {
	// Load .env file
	if err := godotenv.Load("../.env"); err != nil {
		log.Println("No .env file found, using environment variables or defaults")
	}

	//* DB
	// Initialize database connection
	db, err := dbmodels.InitDB()
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}
	// Run migrations
	if err := dbmodels.RunMigrations(db); err != nil {
		log.Fatal("Failed to run migrations:", err)
	}
	log.Println("Database setup completed successfully")

	//* Gin
	r := gin.Default()
	// Set up routes
	routes.RegisterRoutes(r)
	r.Use(CorsMiddleware())
	// Run the server
	r.Run(":8080")

}
