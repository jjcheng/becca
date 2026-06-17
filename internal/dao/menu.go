package dao

type MenuGroup struct {
	ID         uint           `gorm:"primaryKey"`
	Key        string         `gorm:"uniqueIndex;not null"`
	Title      string         `gorm:"not null"`
	SortOrder  int            `gorm:"not null"`
	Categories []MenuCategory `gorm:"foreignKey:GroupID;constraint:OnDelete:CASCADE;"`
}

type MenuCategory struct {
	ID         uint   `gorm:"primaryKey"`
	GroupID    uint   `gorm:"index;not null"`
	Slug       string `gorm:"not null"`
	Title      string `gorm:"not null"`
	Summary    string `gorm:"not null"`
	Art        string `gorm:"not null"`
	ArtType    string
	FooterNote string
	SortOrder  int        `gorm:"not null"`
	Items      []MenuItem `gorm:"foreignKey:CategoryID;constraint:OnDelete:CASCADE;"`
}

type MenuItem struct {
	ID         uint   `gorm:"primaryKey"`
	CategoryID uint   `gorm:"index;not null"`
	Name       string `gorm:"not null"`
	Note       string
	Price      string `gorm:"not null"`
	Image      string
	ImageType  string
	SortOrder  int `gorm:"not null"`
}

func (MenuCategory) TableName() string {
	return "menu_categories"
}

func (MenuItem) TableName() string {
	return "menu_items"
}
