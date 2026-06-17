package setup

import (
	"becca/backend/internal/repository"
	"becca/backend/internal/service"
)

func SetupServices(unitOfWork repository.UnitOfWork, logger *service.Logger) *service.Dependencies {
	menuService := service.NewMenu(unitOfWork)
	return service.NewDependencies(unitOfWork, menuService, logger)
}
