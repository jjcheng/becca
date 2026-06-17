package dto

import (
	"net/http"
	"time"
)

type Response[T any] struct {
	ResponseBase
	Data T `json:"data,omitempty"`
}

type ResponseBase struct {
	Success    bool      `json:"success"`
	StatusCode int       `json:"status_code"`
	Message    string    `json:"message,omitempty"`
	StartAt    time.Time `json:"-"`
	EndAt      time.Time `json:"-"`
	TimeTaken  int64     `json:"time_taken,omitempty"`
}

func NewSuccessResponse[T any](data T) Response[T] {
	return Response[T]{
		ResponseBase: ResponseBase{
			Success:    true,
			StatusCode: http.StatusOK,
		},
		Data: data,
	}
}

func NewFailedResponse[T any](statusCode int, message string) Response[T] {
	return Response[T]{
		ResponseBase: ResponseBase{
			Success:    false,
			StatusCode: statusCode,
			Message:    message,
		},
	}
}
