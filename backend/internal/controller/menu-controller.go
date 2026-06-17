package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"becca/backend/internal/dto"
	"becca/backend/internal/service"
)

func registerMenuController(routerGroup *gin.RouterGroup, dependencies *service.Dependencies) {
	routerGroup.GET("/api/menu", func(context *gin.Context) {
		catalog, err := dependencies.Menu.GetCatalog()
		if err != nil {
			dependencies.Logger.ErrorFunction(err)
			responseObject := dto.NewFailedResponse[any](http.StatusInternalServerError, "failed to load menu")
			context.AbortWithStatusJSON(responseObject.StatusCode, responseObject)
			return
		}

		responseObject := dto.NewSuccessResponse(catalog)
		context.JSON(responseObject.StatusCode, responseObject)
	})
}
