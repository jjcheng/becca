package service

import "becca/backend/internal/repository"

type Dependencies struct {
	UnitOfWork repository.UnitOfWork
	Menu       *Menu
	Logger     *Logger
}

func NewDependencies(unitOfWork repository.UnitOfWork, menu *Menu, logger *Logger) *Dependencies {
	return &Dependencies{
		UnitOfWork: unitOfWork,
		Menu:       menu,
		Logger:     logger,
	}
}
