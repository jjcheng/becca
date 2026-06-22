package gorm_db

import "becca/backend/internal/dao"

func seedMenuGroups() []dao.MenuGroup {
	return []dao.MenuGroup{
		{
			Key:       "food",
			Title:     "Food",
			SortOrder: 1,
			Categories: []dao.MenuCategory{
				{
					Slug:      "bakes-bites",
					Title:     "Bakes & Bites",
					Summary:   "Flaky, buttery, and made to be the first thing on the table.",
					Art:       "assets/images/menu/croissant.png",
					ArtType:   "photo",
					SortOrder: 1,
					Items: []dao.MenuItem{
						{Name: "Croissant", Price: "$5.80", Image: "assets/images/menu/croissant.png", SortOrder: 1},
						{Name: "Pain Au Chocolat", Price: "$6.80", Image: "assets/images/menu/pain-au-chocolat.png", SortOrder: 2},
						{Name: "Matcha Almond Croissant", Price: "$7.80", Image: "assets/images/menu/matcha-almond-croissant.png", SortOrder: 3},
						{Name: "Crookie", Price: "$4.80", Image: "assets/images/menu/crookie.png", SortOrder: 4},
						{Name: "Kouign Amann", Price: "$6.80", Image: "assets/images/menu/kouign-amann.png", SortOrder: 5},
					},
				},
				{
					Slug:      "desserts",
					Title:     "Desserts",
					Summary:   "Classic cafe sweets, straight from the printed menu.",
					Art:       "assets/images/menu/lava-cake.png",
					ArtType:   "photo",
					SortOrder: 2,
					Items: []dao.MenuItem{
						{Name: "Lava Cake", Note: "w/ ice cream", Price: "$9.80 / $11.80", Image: "assets/images/menu/lava-cake.png", SortOrder: 1},
						{Name: "Brownie", Note: "w/ ice cream", Price: "$7.80 / $9.80", Image: "assets/images/menu/brownie.png", SortOrder: 2},
						{Name: "Basque Cheesecake", Price: "$8.00", Image: "assets/images/menu/basque-cheesecake.png", SortOrder: 3},
						{Name: "Oreo Cheesecake", Price: "$8.00", Image: "assets/images/menu/oreo-cheesecake.png", SortOrder: 4},
						{Name: "Double Choco Muffin", Price: "$5.80", Image: "assets/images/menu/double-choco-muffin.png", SortOrder: 5},
						{Name: "Banana Choco Muffin", Price: "$5.80", Image: "assets/images/menu/banana-choco-muffin.png", SortOrder: 6},
						{Name: "Cookies", Price: "$4.00 - $4.20", Image: "assets/images/menu/cookies.png", SortOrder: 7},
					},
				},
				{
					Slug:      "mains",
					Title:     "Mains",
					Summary:   "Easy savory picks that still look like a treat.",
					Art:       "assets/images/menu/ham-egg-sando.png",
					ArtType:   "photo",
					SortOrder: 3,
					Items: []dao.MenuItem{
						{Name: "Ham & Egg Sando", Price: "$10.80", Image: "assets/images/menu/ham-egg-sando.png", SortOrder: 1},
						{Name: "Egg Mayo Croissant", Price: "$8.80", Image: "assets/images/menu/egg-mayo-croissant.png", SortOrder: 2},
						{Name: "Ham & Egg Croissant", Price: "$10.80", Image: "assets/images/menu/ham-egg-croissant.png", SortOrder: 3},
						{Name: "Egg & Sausage Wrap", Price: "$6.80", Image: "assets/images/menu/egg-sausage-wrap.png", SortOrder: 4},
					},
				},
			},
		},
		{
			Key:       "drinks",
			Title:     "Drinks",
			SortOrder: 2,
			Categories: []dao.MenuCategory{
				{
					Slug:      "cloud-series",
					Title:     "Cloud Series",
					Summary:   "Signature drinks with the exact cutout artwork from the menu PDF.",
					Art:       "assets/images/menu/strawberry-cloud-matcha.png",
					ArtType:   "photo",
					SortOrder: 1,
					Items: []dao.MenuItem{
						{Name: "Strawberry Cloud Matcha", Price: "$8.80", Image: "assets/images/menu/strawberry-cloud-matcha.png", SortOrder: 1},
						{Name: "Cream Cloud Latte", Price: "$7.80", Image: "assets/images/menu/cream-cloud-latte.png", SortOrder: 2},
						{Name: "Chocolate Cloud Latte", Price: "$7.80", Image: "assets/images/menu/chocolate-cloud-latte.png", SortOrder: 3},
					},
				},
				{
					Slug:      "coffee",
					Title:     "Coffee",
					Summary:   "Hot / Cold",
					Art:       "assets/images/menu/coffee-icon.png",
					ArtType:   "icon",
					SortOrder: 2,
					Items: []dao.MenuItem{
						{Name: "Espresso", Price: "$4.00", SortOrder: 1},
						{Name: "Americano", Price: "$4.80 / $5.80", SortOrder: 2},
						{Name: "Cappuccino", Price: "$5.80 / $6.80", SortOrder: 3},
						{Name: "Mocha", Price: "$6.80 / $7.80", SortOrder: 4},
						{Name: "Latte", Price: "$5.80 / $6.80", SortOrder: 5},
						{Name: "Flat White", Price: "$5.80 / $6.80", SortOrder: 6},
					},
				},
				{
					Slug:      "non-coffee",
					Title:     "Non-Coffee",
					Summary:   "Hot / Cold",
					Art:       "assets/images/menu/non-coffee-icon.png",
					ArtType:   "icon",
					SortOrder: 3,
					Items: []dao.MenuItem{
						{Name: "Matcha Latte", Price: "$6.80 / $7.80", SortOrder: 1},
						{Name: "Hot Chocolate", Price: "$5.80 / $6.80", SortOrder: 2},
						{Name: "Babyccino", Price: "$3.00", SortOrder: 3},
						{Name: "Green Tea", Price: "$4.80 / $5.80", SortOrder: 4},
						{Name: "Jasmine Tea (pot)", Price: "$8.80", SortOrder: 5},
						{Name: "Peach Oolong Tea", Price: "$4.80", SortOrder: 6},
						{Name: "Soft Drinks", Price: "$3.80", SortOrder: 7},
					},
				},
				{
					Slug:       "add-ons",
					Title:      "Add-Ons",
					Summary:    "Small upgrades from the drinks menu.",
					Art:        "assets/images/branding/logo.png",
					ArtType:    "badge",
					FooterNote: "Mexico Women Power Zongolica - Stonefruits, Almond, Floral Honey, White Tea",
					SortOrder:  4,
					Items: []dao.MenuItem{
						{Name: "Upsize to Large", Price: "$1.00", SortOrder: 1},
						{Name: "Oat Milk", Price: "$1.00", SortOrder: 2},
						{Name: "Single Origin", Price: "$1.00", SortOrder: 3},
					},
				},
			},
		},
	}
}
