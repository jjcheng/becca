package helper

func DefaultIfEmpty(value string, fallback string) string {
	if value == "" {
		return fallback
	}

	return value
}
