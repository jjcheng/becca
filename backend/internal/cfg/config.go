package cfg

import (
	"fmt"
	"os"
	"strings"
	"sync"

	"github.com/joho/godotenv"

	"becca/backend/internal/helper"
	"becca/backend/internal/types"
)

type Config struct {
	Database DatabaseConfig
	Site     SiteConfig
}

type DatabaseConfig struct {
	User     string
	Password string
	Host     string
	Port     string
	Name     string
	SSLMode  string
}

func (database DatabaseConfig) DSN() string {
	return fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=%s TimeZone=UTC connect_timeout=10",
		database.Host,
		database.Port,
		database.User,
		database.Password,
		database.Name,
		database.SSLMode,
	)
}

type SiteConfig struct {
	Port        string
	Version     string
	Environment types.Environment
}

var configInstance *Config
var onceDefault sync.Once

func Default() *Config {
	onceDefault.Do(func() {
		_ = godotenv.Load()
		_ = godotenv.Load("../../.env")

		configInstance = &Config{
			Database: DatabaseConfig{
				User:     helper.DefaultIfEmpty(os.Getenv("DB_USER"), ""),
				Password: helper.DefaultIfEmpty(os.Getenv("DB_PASSWORD"), ""),
				Host:     helper.DefaultIfEmpty(os.Getenv("DB_HOST"), "127.0.0.1"),
				Port:     helper.DefaultIfEmpty(os.Getenv("DB_PORT"), "5432"),
				Name:     helper.DefaultIfEmpty(os.Getenv("DB_NAME"), ""),
				SSLMode:  helper.DefaultIfEmpty(os.Getenv("DB_SSLMODE"), "disable"),
			},
			Site: SiteConfig{
				Port:        helper.DefaultIfEmpty(os.Getenv("PORT"), "8080"),
				Version:     helper.DefaultIfEmpty(os.Getenv("VERSION"), "dev"),
				Environment: types.Environment(strings.ToUpper(helper.DefaultIfEmpty(os.Getenv("ENVIRONMENT"), string(types.EnvironmentDevelop)))),
			},
		}
	})

	return configInstance
}
