package repository

import "gorm.io/gorm"

type UnitOfWork interface {
	DB() *gorm.DB
	MenuRepository() MenuRepository
}
