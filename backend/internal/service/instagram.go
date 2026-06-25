package service

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"net/url"
	"os"
	"strconv"
	"strings"
	"time"
)

const (
	defaultInstagramGraphAPIBaseURL = "https://graph.facebook.com/v21.0"
	defaultInstagramTimeout         = 8 * time.Second
)

type Instagram struct {
	httpClient  *http.Client
	apiBaseURL  string
	accountID   string
	accessToken string
}

type InstagramPhoto struct {
	ID           string `json:"id"`
	Caption      string `json:"caption,omitempty"`
	MediaType    string `json:"mediaType"`
	MediaURL     string `json:"mediaUrl,omitempty"`
	ThumbnailURL string `json:"thumbnailUrl,omitempty"`
	Permalink    string `json:"permalink,omitempty"`
	Timestamp    string `json:"timestamp,omitempty"`
}

func NewInstagram(httpClient *http.Client, apiBaseURL, accountID, accessToken string) *Instagram {
	client := httpClient
	if client == nil {
		client = &http.Client{Timeout: defaultInstagramTimeout}
	}

	baseURL := strings.TrimSpace(apiBaseURL)
	if baseURL == "" {
		baseURL = defaultInstagramGraphAPIBaseURL
	}

	return &Instagram{
		httpClient:  client,
		apiBaseURL:  strings.TrimRight(baseURL, "/"),
		accountID:   strings.TrimSpace(accountID),
		accessToken: strings.TrimSpace(accessToken),
	}
}

func NewInstagramFromEnv() *Instagram {
	return NewInstagram(
		nil,
		os.Getenv("INSTAGRAM_GRAPH_API_BASE_URL"),
		os.Getenv("INSTAGRAM_ACCOUNT_ID"),
		os.Getenv("INSTAGRAM_ACCESS_TOKEN"),
	)
}

// GetLatestPhotos fetches recent Instagram media from Meta Graph API and keeps image-like items.
func (instagram *Instagram) GetLatestPhotos(ctx context.Context, limit int) ([]InstagramPhoto, error) {
	if instagram == nil {
		return nil, errors.New("instagram service is nil")
	}

	if instagram.accountID == "" {
		return nil, errors.New("missing INSTAGRAM_ACCOUNT_ID")
	}

	if instagram.accessToken == "" {
		return nil, errors.New("missing INSTAGRAM_ACCESS_TOKEN")
	}

	if limit <= 0 {
		limit = 12
	}

	values := url.Values{}
	values.Set("fields", "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp")
	values.Set("limit", strconv.Itoa(limit))
	values.Set("access_token", instagram.accessToken)

	endpoint := fmt.Sprintf("%s/%s/media?%s", instagram.apiBaseURL, instagram.accountID, values.Encode())
	req, err := http.NewRequestWithContext(ctx, http.MethodGet, endpoint, nil)
	if err != nil {
		return nil, fmt.Errorf("create instagram request: %w", err)
	}

	response, err := instagram.httpClient.Do(req)
	if err != nil {
		return nil, fmt.Errorf("call instagram graph api: %w", err)
	}
	defer response.Body.Close()

	var payload instagramMediaResponse
	if err := json.NewDecoder(response.Body).Decode(&payload); err != nil {
		return nil, fmt.Errorf("decode instagram response: %w", err)
	}

	if response.StatusCode >= http.StatusBadRequest {
		if payload.Error.Message != "" {
			return nil, fmt.Errorf("instagram graph api: %s", payload.Error.Message)
		}
		return nil, fmt.Errorf("instagram graph api request failed with status %d", response.StatusCode)
	}

	photos := make([]InstagramPhoto, 0, len(payload.Data))
	for _, media := range payload.Data {
		if !isPhotoMediaType(media.MediaType) {
			continue
		}

		photos = append(photos, InstagramPhoto{
			ID:           media.ID,
			Caption:      media.Caption,
			MediaType:    media.MediaType,
			MediaURL:     media.MediaURL,
			ThumbnailURL: media.ThumbnailURL,
			Permalink:    media.Permalink,
			Timestamp:    media.Timestamp,
		})
	}

	return photos, nil
}

func isPhotoMediaType(mediaType string) bool {
	switch strings.ToUpper(strings.TrimSpace(mediaType)) {
	case "IMAGE", "CAROUSEL_ALBUM":
		return true
	default:
		return false
	}
}

type instagramMediaResponse struct {
	Data  []instagramMediaItem `json:"data"`
	Error instagramError       `json:"error"`
}

type instagramMediaItem struct {
	ID           string `json:"id"`
	Caption      string `json:"caption"`
	MediaType    string `json:"media_type"`
	MediaURL     string `json:"media_url"`
	ThumbnailURL string `json:"thumbnail_url"`
	Permalink    string `json:"permalink"`
	Timestamp    string `json:"timestamp"`
}

type instagramError struct {
	Message string `json:"message"`
}
