package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strconv"
	"sync"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/oklog/ulid/v2"
)

const (
	storageDir   = "./storage"
	metadataFile = "./cdn.json"
)

func getBaseURL() string {
	if url := os.Getenv("BASE_URL"); url != "" {
		return url
	}
	return "http://localhost:8080/cdn"
}

type Size struct {
	Raw       int64  `json:"raw"`
	Formatted string `json:"formatted"`
}

type Metadata struct {
	URL  string `json:"url"`
	View string `json:"view"`
	Size Size   `json:"size"`
}

type FileMetadata struct {
	ID        string   `json:"id"`
	FileName  string   `json:"fileName"`
	CreatedAt string   `json:"createdAt"`
	Metadata  Metadata `json:"metadata"`
}

type CDN struct {
	Files []FileMetadata `json:"files"`
}

var (
	cdnMetadata = CDN{Files: []FileMetadata{}}
	mu          sync.RWMutex
)

func formatSize(sizeInBytes int64) string {
	const (
		kb = 1024
		mb = kb * 1024
	)
	if sizeInBytes < kb {
		return fmt.Sprintf("%db", sizeInBytes)
	} else if sizeInBytes < mb {
		return fmt.Sprintf("%.2fkb", float64(sizeInBytes)/float64(kb))
	}
	return fmt.Sprintf("%.2fmb", float64(sizeInBytes)/float64(mb))
}

func loadMetadata() error {
	mu.Lock()
	defer mu.Unlock()

	if _, err := os.Stat(metadataFile); os.IsNotExist(err) {
		log.Println("cdn.json not found, creating a new one.")
		file, err := os.Create(metadataFile)
		if err != nil {
			return fmt.Errorf("failed to create cdn.json: %w", err)
		}
		defer file.Close()
		encoder := json.NewEncoder(file)
		encoder.SetIndent("", "  ")
		if err := encoder.Encode(cdnMetadata); err != nil {
			return fmt.Errorf("failed to write empty metadata to cdn.json: %w", err)
		}
		return nil
	}

	data, err := os.ReadFile(metadataFile)
	if err != nil {
		return fmt.Errorf("failed to read cdn.json: %w", err)
	}

	if len(data) == 0 {
		return nil
	}

	if err := json.Unmarshal(data, &cdnMetadata); err != nil {
		return fmt.Errorf("failed to unmarshal cdn.json: %w", err)
	}

	log.Printf("Successfully loaded %d files from cdn.json", len(cdnMetadata.Files))
	return nil
}

func saveMetadata() error {
	mu.Lock()
	defer mu.Unlock()

	file, err := os.Create(metadataFile)
	if err != nil {
		return fmt.Errorf("failed to open cdn.json for writing: %w", err)
	}
	defer file.Close()

	encoder := json.NewEncoder(file)
	encoder.SetIndent("", "  ")
	if err := encoder.Encode(cdnMetadata); err != nil {
		return fmt.Errorf("failed to encode metadata to cdn.json: %w", err)
	}

	log.Printf("Successfully saved %d files to cdn.json", len(cdnMetadata.Files))
	return nil
}

func uploadFile(c *gin.Context) {
	file, err := c.FormFile("file")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "File not provided in the request"})
		return
	}

	fileName := c.PostForm("fileName")
	if fileName == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "File name not provided"})
		return
	}

	id := ulid.Make().String()
	log.Printf("Generated ID for '%s': %s", fileName, id)

	fileDir := filepath.Join(storageDir, id)
	if err := os.MkdirAll(fileDir, os.ModePerm); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create file directory"})
		return
	}

	filePath := filepath.Join(fileDir, fileName)
	if err := c.SaveUploadedFile(file, filePath); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save file"})
		return
	}

	fileInfo, err := os.Stat(filePath)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get file info"})
		return
	}
	fileSize := fileInfo.Size()

	newFileMetadata := FileMetadata{
		ID:        id,
		FileName:  fileName,
		CreatedAt: time.Now().UTC().Format(time.RFC3339Nano),
		Metadata: Metadata{
			URL:  fmt.Sprintf("%s/%s/%s", getBaseURL(), id, fileName),
			View: fmt.Sprintf("%s/%s/%s?content=inline", getBaseURL(), id, fileName),
			Size: Size{
				Raw:       fileSize,
				Formatted: formatSize(fileSize),
			},
		},
	}

	mu.Lock()
	cdnMetadata.Files = append(cdnMetadata.Files, newFileMetadata)
	mu.Unlock()

	if err := saveMetadata(); err != nil {
		log.Printf("Error saving metadata: %v", err)
	}

	c.JSON(http.StatusOK, newFileMetadata)
}

func serveFile(c *gin.Context) {
	id := c.Param("id")
	fileName := c.Param("filename")
	filePath := filepath.Join(storageDir, id, fileName)

	if _, err := os.Stat(filePath); os.IsNotExist(err) {
		c.JSON(http.StatusNotFound, gin.H{"error": "File not found"})
		return
	}

	if c.Query("content") == "inline" {
		c.Header("Content-Disposition", "inline")
	} else {
		c.Header("Content-Disposition", "attachment; filename="+strconv.Quote(fileName))
	}

	c.File(filePath)
}

func listMetadata(c *gin.Context) {
	mu.RLock()
	defer mu.RUnlock()
	c.JSON(http.StatusOK, cdnMetadata)
}

func main() {
	router := gin.Default()

	if _, err := os.Stat(storageDir); os.IsNotExist(err) {
		log.Printf("Creating storage directory: %s", storageDir)
		os.MkdirAll(storageDir, os.ModePerm)
	}

	if err := loadMetadata(); err != nil {
		log.Fatalf("Fatal error loading metadata: %v", err)
	}

	router.POST("/upload", uploadFile)
	router.GET("/cdn/:id/:filename", serveFile)
	router.GET("/", listMetadata)

	port := "8080"
	log.Printf("Starting Go CDN server on port %s...", port)
	if err := router.Run(":" + port); err != nil {
		log.Fatalf("Failed to run server: %v", err)
	}
}
