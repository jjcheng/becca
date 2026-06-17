package gorm_db

import (
	"context"
	"errors"
	"reflect"
	"time"

	"becca/backend/internal/dao"
	"becca/backend/internal/repository"
	"becca/backend/internal/service"

	"gorm.io/gorm"
)

type Repository[T dao.DAO] struct {
	db         *gorm.DB
	entityName string
	logger     *service.Logger
}

func NewRepository[T dao.DAO](db *gorm.DB, logger *service.Logger) repository.Repository[T] {
	repositoryHelper := Repository[T]{
		db:     db,
		logger: logger,
	}
	var object T
	if objectType := reflect.TypeOf(object); objectType != nil {
		repositoryHelper.entityName = objectType.Name()
	}
	return &repositoryHelper
}

func (repositoryHelper *Repository[T]) GetById(ctx context.Context, id int32) (*T, error, bool) {
	var entity T
	result := repositoryHelper.db.WithContext(ctx).First(&entity, "id = ?", id)
	if err := result.Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil, true
		}
		return nil, err, false
	}
	return &entity, nil, false
}

func (repositoryHelper *Repository[T]) ListAll(ctx context.Context) ([]T, error) {
	var entities []T
	if err := repositoryHelper.db.WithContext(ctx).Order("id").Find(&entities).Error; err != nil {
		return nil, err
	}
	return entities, nil
}

func (repositoryHelper *Repository[T]) Insert(ctx context.Context, entity *T) error {
	now := time.Now()
	repositoryHelper.setField(entity, "EntryDate", now)
	repositoryHelper.setField(entity, "LastUpdate", now)
	repositoryHelper.setField(entity, "Id", int32(0))
	result := repositoryHelper.db.WithContext(ctx).Omit("id").Create(entity)
	if result.Error != nil {
		return result.Error
	}
	if result.RowsAffected == 0 {
		return errors.New("no row inserted")
	}
	return nil
}

func (repositoryHelper *Repository[T]) InsertBulk(ctx context.Context, entities []T) error {
	if len(entities) == 0 {
		return nil
	}
	now := time.Now()
	for i := range entities {
		repositoryHelper.setField(&entities[i], "EntryDate", now)
		repositoryHelper.setField(&entities[i], "LastUpdate", now)
		repositoryHelper.setField(&entities[i], "Id", int32(0))
	}
	result := repositoryHelper.db.WithContext(ctx).Omit("id").CreateInBatches(entities, len(entities))
	if err := result.Error; err != nil {
		return err
	}
	if result.RowsAffected == 0 {
		return errors.New("no row inserted")
	}
	return nil
}

func (repositoryHelper *Repository[T]) Update(ctx context.Context, entity *T) error {
	now := time.Now()
	repositoryHelper.setField(entity, "LastUpdate", now)
	result := repositoryHelper.db.WithContext(ctx).Select("*").Where("id = ?", (*entity).Base().Id).Updates(entity)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func (repositoryHelper *Repository[T]) UpdateFields(ctx context.Context, id int32, fields map[string]any) error {
	var entity T
	fields["last_update"] = time.Now()
	result := repositoryHelper.db.WithContext(ctx).Model(&entity).Where("id = ?", id).Updates(fields)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func (repositoryHelper *Repository[T]) DeleteById(ctx context.Context, id int32) error {
	var entity T
	if err := repositoryHelper.db.WithContext(ctx).Where("id = ?", id).Delete(&entity).Error; err != nil {
		return err
	}
	return nil
}

func (repositoryHelper *Repository[T]) DeleteAll(ctx context.Context) error {
	var entity T
	if err := repositoryHelper.db.WithContext(ctx).Session(&gorm.Session{AllowGlobalUpdate: true}).Delete(&entity).Error; err != nil {
		return err
	}
	return nil
}

func (repositoryHelper *Repository[T]) setField(entity *T, fieldName string, fieldValue any) bool {
	elements := reflect.ValueOf(entity).Elem()
	if field := elements.FieldByName(fieldName); field.IsValid() && field.CanSet() {
		field.Set(reflect.ValueOf(fieldValue))
		return true
	}
	return false
}
