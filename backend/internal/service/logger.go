package service

import (
	"log"
	"os"
	"runtime"
)

type Logger struct {
	infoLogger  *log.Logger
	errorLogger *log.Logger
	warnLogger  *log.Logger
}

func NewLogger() *Logger {
	return &Logger{
		infoLogger:  log.New(os.Stdout, "[INFO] ", log.LstdFlags),
		errorLogger: log.New(os.Stderr, "[ERROR] ", log.LstdFlags),
		warnLogger:  log.New(os.Stderr, "[WARNING] ", log.LstdFlags),
	}
}

func (logger *Logger) Infoln(message string) {
	logger.infoLogger.Println(message)
}

func (logger *Logger) Infof(message string, values ...any) {
	logger.infoLogger.Printf(message, values...)
}

func (logger *Logger) Warnln(message string) {
	logger.warnLogger.Println(message)
}

func (logger *Logger) Error(err error) {
	if err == nil {
		return
	}
	logger.errorLogger.Println(err.Error())
}

func (logger *Logger) ErrorFunction(err error, values ...any) {
	if err == nil {
		return
	}
	funcName := getFunctionName(2)
	if len(values) > 0 {
		logger.errorLogger.Printf("ERROR: %s FUNC: %s(%v)", err.Error(), funcName, values)
		return
	}
	logger.errorLogger.Printf("ERROR: %s FUNC: %s", err.Error(), funcName)
}

func getFunctionName(skip int) string {
	pc, _, _, ok := runtime.Caller(skip)
	if !ok {
		return "unknown"
	}
	fn := runtime.FuncForPC(pc)
	if fn == nil {
		return "unknown"
	}
	return fn.Name()
}
