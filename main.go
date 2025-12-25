package main

import (
	"log"
	dbmodels "money-tracker/db"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	// Load .env file
	if err := godotenv.Load(); err != nil {
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
	router := gin.Default()
	router.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})
	router.Run() // listens on 0.0.0.0:8080 by default
}
