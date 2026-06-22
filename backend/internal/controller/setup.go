package controller

import (
	"net/http"
	"os"
	"path/filepath"

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
	registerWebRoutes(router)

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

func registerWebRoutes(router *gin.Engine) {
	router.Static("/assets", webPath("public", "assets"))
	router.Static("/licenses", webPath("public", "licenses"))

	servePage := func(path string, file string) {
		router.GET(path, func(context *gin.Context) {
			context.File(file)
		})
	}

	servePage("/", webPath("index.html"))
	servePage("/index.html", webPath("index.html"))
	servePage("/cafe-menu", webPath("menu.html"))
	servePage("/menu.html", webPath("menu.html"))
	servePage("/cakes-bakes", webPath("menu.html"))
	servePage("/cakes-bakes.html", webPath("menu.html"))
	servePage("/order", webPath("order.html"))
	servePage("/order.html", webPath("order.html"))
	servePage("/visit-us", webPath("visit.html"))
	servePage("/visit.html", webPath("visit.html"))
}

func webPath(paths ...string) string {
	for _, root := range []string{"../web", "web"} {
		path := filepath.Join(append([]string{root}, paths...)...)
		if _, err := os.Stat(path); err == nil {
			return path
		}
	}

	return filepath.Join(append([]string{"../web"}, paths...)...)
}
