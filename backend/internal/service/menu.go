package service

import (
	"becca/backend/internal/dao"
	"becca/backend/internal/dto"
	"becca/backend/internal/repository"
)

type Menu struct {
	unitOfWork repository.UnitOfWork
}

func NewMenu(unitOfWork repository.UnitOfWork) *Menu {
	return &Menu{unitOfWork: unitOfWork}
}

func (menu *Menu) GetCatalog() (dto.MenuCatalog, error) {
	groups, err := menu.unitOfWork.MenuRepository().GetCatalog()
	if err != nil {
		return nil, err
	}

	return toMenuCatalogDTO(groups), nil
}

func toMenuCatalogDTO(groups []dao.MenuGroup) dto.MenuCatalog {
	catalog := make(dto.MenuCatalog, len(groups))
	for _, group := range groups {
		categories := make([]dto.MenuCategory, 0, len(group.Categories))
		for _, category := range group.Categories {
			items := make([]dto.MenuItem, 0, len(category.Items))
			for _, item := range category.Items {
				items = append(items, dto.MenuItem{
					Name:      item.Name,
					Note:      item.Note,
					Price:     item.Price,
					Image:     item.Image,
					ImageType: item.ImageType,
				})
			}

			categories = append(categories, dto.MenuCategory{
				ID:         category.Slug,
				Title:      category.Title,
				Summary:    category.Summary,
				Art:        category.Art,
				ArtType:    category.ArtType,
				FooterNote: category.FooterNote,
				Items:      items,
			})
		}

		catalog[group.Key] = dto.MenuGroup{
			Title:      group.Title,
			Categories: categories,
		}
	}

	return catalog
}
