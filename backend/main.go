package main

import (
	"log"
	dbmodels "money-tracker/backend/internal/db"
	"money-tracker/backend/internal/routes"

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
	r := gin.Default()
	// Set up routes
	routes.RegisterRoutes(r)
	// Run the server
	r.Run(":8080")

}
