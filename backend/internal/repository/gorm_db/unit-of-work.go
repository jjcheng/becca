package gorm_db

import (
	"becca/backend/internal/repository"
	"becca/backend/internal/service"

	"gorm.io/gorm"
)

type UnitOfWork struct {
	db             *gorm.DB
	logger         *service.Logger
	menuRepository repository.MenuRepository
}

func NewUnitOfWork(db *gorm.DB, logger *service.Logger) repository.UnitOfWork {
	unitOfWork := UnitOfWork{
		db:     db,
		logger: logger,
	}
	unitOfWork.menuRepository = NewMenuRepository(db, logger)
	return &unitOfWork
}

func (unitOfWork *UnitOfWork) DB() *gorm.DB {
	return unitOfWork.db
}

func (unitOfWork *UnitOfWork) MenuRepository() repository.MenuRepository {
	return unitOfWork.menuRepository
}
