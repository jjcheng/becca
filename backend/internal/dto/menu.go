package dto

type MenuCatalog map[string]MenuGroup

type MenuGroup struct {
	Title      string         `json:"title"`
	Categories []MenuCategory `json:"categories"`
}

type MenuCategory struct {
	ID         string     `json:"id"`
	Title      string     `json:"title"`
	Summary    string     `json:"summary"`
	Art        string     `json:"art"`
	ArtType    string     `json:"artType,omitempty"`
	FooterNote string     `json:"footerNote,omitempty"`
	Items      []MenuItem `json:"items"`
}

type MenuItem struct {
	Name      string `json:"name"`
	Note      string `json:"note,omitempty"`
	Price     string `json:"price"`
	Image     string `json:"image,omitempty"`
	ImageType string `json:"imageType,omitempty"`
}
