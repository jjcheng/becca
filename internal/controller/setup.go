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

	servePage := func(path string, file string) {
		router.GET(path, func(context *gin.Context) {
			context.File(file)
		})
	}

	servePage("/", "./www/index.html")
	servePage("/index.html", "./www/index.html")
	servePage("/cafe-menu", "./www/menu.html")
	servePage("/menu.html", "./www/menu.html")
	servePage("/order", "./www/order.html")
	servePage("/order.html", "./www/order.html")
	servePage("/visit-us", "./www/visit.html")
	servePage("/visit.html", "./www/visit.html")
}
