package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"becca/backend/internal/cfg"
	"becca/backend/internal/dto"
	"becca/backend/internal/service"
)

func RegisterControllers(router *gin.Engine, dependencies *service.Dependencies) {
	registerCommonRoutes(router)
	apiRouterGroup := router.Group("")
	registerMenuController(apiRouterGroup, dependencies)
}

func registerCommonRoutes(router *gin.Engine) {
	registerWWWRoutes(router)

	router.GET("/health", func(context *gin.Context) {
		responseObject := dto.NewSuccessResponse(map[string]any{
			"version":     cfg.Default().Site.Version,
			"environment": cfg.Default().Site.Environment,
		})
		context.JSON(responseObject.StatusCode, responseObject)
	})

	router.NoRoute(func(context *gin.Context) {
		responseObject := dto.NewFailedResponse[any](http.StatusBadRequest, "route not found")
		context.AbortWithStatusJSON(responseObject.StatusCode, responseObject)
	})

	router.NoMethod(func(context *gin.Context) {
		responseObject := dto.NewFailedResponse[any](http.StatusMethodNotAllowed, "method not allowed")
		context.AbortWithStatusJSON(responseObject.StatusCode, responseObject)
	})
}

func registerWWWRoutes(router *gin.Engine) {
	router.Static("/assets", "./www/assets")
	router.Static("/licenses", "./www/licenses")
	router.GET("/", func(context *gin.Context) {
		context.File("./www/index.html")
	})
}
