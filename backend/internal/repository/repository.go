package repository

import (
	"context"

	"becca/backend/internal/dao"
)

type Repository[T dao.DAO] interface {
	GetById(ctx context.Context, id int32) (*T, error, bool)
	ListAll(ctx context.Context) ([]T, error)
	Insert(ctx context.Context, entity *T) error
	InsertBulk(ctx context.Context, entities []T) error
	Update(ctx context.Context, entity *T) error
	UpdateFields(ctx context.Context, id int32, fields map[string]any) error
	DeleteById(ctx context.Context, id int32) error
	DeleteAll(ctx context.Context) error
}
