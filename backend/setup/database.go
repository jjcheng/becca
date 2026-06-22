package setup

import (
	"fmt"
	"log"
	"os"
	"time"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"

	"becca/backend/internal/cfg"
	"becca/backend/internal/repository"
	"becca/backend/internal/repository/gorm_db"
	"becca/backend/internal/service"
	"becca/backend/internal/types"
)

func SetupDatabase(dsn string, loggerService *service.Logger) (repository.UnitOfWork, error) {
	timeOut := 200 * time.Millisecond
	if cfg.Default().Site.Environment == types.EnvironmentDevelop {
		timeOut = 5 * time.Second
	}

	dbLogger := logger.New(
		log.New(os.Stdout, "\r\n", log.LstdFlags),
		logger.Config{
			SlowThreshold:             timeOut,
			LogLevel:                  logger.Warn,
			IgnoreRecordNotFoundError: true,
			Colorful:                  true,
		},
	).LogMode(logger.Warn)

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{
		Logger:                 dbLogger,
		SkipDefaultTransaction: true,
	})
	if err != nil {
		return nil, fmt.Errorf("failed to connect to DB with connection %s: %w", dsn, err)
	}

	if err := db.Exec("SET timezone = 'UTC'").Error; err != nil {
		return nil, fmt.Errorf("failed to set database timezone: %w", err)
	}

	log.Println("successfully connected to DB")
	return gorm_db.NewUnitOfWork(db, loggerService), nil
}
