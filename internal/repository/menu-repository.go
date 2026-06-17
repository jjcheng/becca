package repository

import "becca/backend/internal/dao"

type MenuRepository interface {
	EnsureSeedData() error
	GetCatalog() ([]dao.MenuGroup, error)
}
