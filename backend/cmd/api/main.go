package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"becca/backend/internal/cfg"
	"becca/backend/internal/controller"
	"becca/backend/internal/service"
	"becca/backend/setup"
)

func main() {
	time.Local = time.UTC
	log.SetOutput(os.Stdout)
	log.Println("starting server")
	log.Printf("environment: %s\n", cfg.Default().Site.Environment)

	loggerService := service.NewLogger()
	unitOfWork, err := setup.SetupDatabase(cfg.Default().Database.DSN(), loggerService)
	if err != nil {
		log.Printf("FATAL: failed to setup database: %v", err)
		panic(err.Error())
	}

	if err := unitOfWork.MenuRepository().EnsureSeedData(); err != nil {
		loggerService.ErrorFunction(err, "seed menu data")
		panic(err.Error())
	}

	dependencies := setup.SetupServices(unitOfWork, loggerService)
	router := setup.SetupRouter(dependencies.Logger)
	controller.RegisterControllers(router, dependencies)

	server := &http.Server{
		Addr:              ":" + cfg.Default().Site.Port,
		Handler:           router,
		ReadHeaderTimeout: 10 * time.Second,
		ReadTimeout:       15 * time.Second,
		WriteTimeout:      0,
		IdleTimeout:       120 * time.Second,
	}

	go func() {
		log.Printf("server is running on port %s", cfg.Default().Site.Port)
		if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			loggerService.ErrorFunction(err, "server failed to start")
			panic(err.Error())
		}
	}()

	shutdownGracefully(loggerService, server)
}

func shutdownGracefully(loggerService *service.Logger, server *http.Server) {
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt, syscall.SIGTERM)
	<-quit
	log.Println("shutting down server")

	serverCtx, serverCancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer serverCancel()
	if err := server.Shutdown(serverCtx); err != nil {
		loggerService.ErrorFunction(err, "HTTP server failed to shutdown gracefully")
		if closeErr := server.Close(); closeErr != nil {
			loggerService.ErrorFunction(closeErr, "HTTP server failed to force close")
		}
		os.Exit(1)
	}

	log.Println("server exiting")
}
