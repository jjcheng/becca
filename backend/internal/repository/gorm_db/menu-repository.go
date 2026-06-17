package gorm_db

import (
	"becca/backend/internal/dao"
	"becca/backend/internal/repository"
	"becca/backend/internal/service"

	"gorm.io/gorm"
)

type MenuRepository struct {
	db     *gorm.DB
	logger *service.Logger
}

func NewMenuRepository(db *gorm.DB, logger *service.Logger) repository.MenuRepository {
	return &MenuRepository{db: db, logger: logger}
}

func (menuRepository *MenuRepository) EnsureSeedData() error {
	if err := menuRepository.db.AutoMigrate(&dao.MenuGroup{}, &dao.MenuCategory{}, &dao.MenuItem{}); err != nil {
		return err
	}

	var count int64
	if err := menuRepository.db.Model(&dao.MenuGroup{}).Count(&count).Error; err != nil {
		return err
	}

	if count > 0 {
		return nil
	}

	for _, group := range seedMenuGroups() {
		if err := menuRepository.db.Create(&group).Error; err != nil {
			return err
		}
	}

	menuRepository.logger.Infoln("seeded menu data")
	return nil
}

func (menuRepository *MenuRepository) GetCatalog() ([]dao.MenuGroup, error) {
	var groups []dao.MenuGroup
	err := menuRepository.db.
		Order("sort_order asc").
		Preload("Categories", func(tx *gorm.DB) *gorm.DB {
			return tx.Order("sort_order asc")
		}).
		Preload("Categories.Items", func(tx *gorm.DB) *gorm.DB {
			return tx.Order("sort_order asc")
		}).
		Find(&groups).Error
	if err != nil {
		return nil, err
	}

	return groups, nil
}
