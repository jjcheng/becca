package middleware

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"

	"becca/backend/internal/dto"
	"becca/backend/internal/service"
)

func Recovery(logger *service.Logger) gin.HandlerFunc {
	return gin.CustomRecovery(func(context *gin.Context, recovered any) {
		err := fmt.Errorf("panic recovered: %v", recovered)
		logger.ErrorFunction(err)
		responseObject := dto.NewFailedResponse[any](http.StatusInternalServerError, "internal server error")
		context.AbortWithStatusJSON(responseObject.StatusCode, responseObject)
	})
}
