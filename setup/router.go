package setup

import (
	"github.com/gin-contrib/pprof"
	"github.com/gin-gonic/gin"

	"becca/backend/internal/cfg"
	"becca/backend/internal/middleware"
	"becca/backend/internal/service"
	"becca/backend/internal/types"
)

func SetupRouter(logger *service.Logger) *gin.Engine {
	router := gin.New()
	router.Use(middleware.CORS())
	if err := router.SetTrustedProxies(nil); err != nil {
		panic(err.Error())
	}
	if cfg.Default().Site.Environment != types.EnvironmentDevelop {
		router.Use(middleware.Recovery(logger))
	}
	router.Use(middleware.Log(logger))
	pprof.Register(router)
	return router
}
