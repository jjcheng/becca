package middleware

import (
	"time"

	"github.com/gin-gonic/gin"

	"becca/backend/internal/service"
)

func Log(logger *service.Logger) gin.HandlerFunc {
	return func(context *gin.Context) {
		startAt := time.Now()
		path := context.Request.URL.Path
		context.Next()
		logger.Infof("%s %s %d %s", context.Request.Method, path, context.Writer.Status(), time.Since(startAt))
	}
}
