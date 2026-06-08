window.menuData = {
  food: {
    title: "Food",
    categories: [
      {
        id: "bakes-bites",
        title: "Bakes & Bites",
        summary: "Flaky, buttery, and made to be the first thing on the table.",
        art: "assets/images/menu/croissant.png",
        artType: "photo",
        items: [
          { name: "Croissant", price: "$5.80", image: "assets/images/menu/croissant.png" },
          { name: "Pain Au Chocolat", price: "$6.80", image: "assets/images/menu/pain-au-chocolat.png" },
          { name: "Matcha Almond Croissant", price: "$7.80", image: "assets/images/menu/matcha-almond-croissant.png" },
          { name: "Crookie", price: "$4.80", image: "assets/images/menu/crookie.png" },
          { name: "Kouign Amann", price: "$6.80", image: "assets/images/menu/kouign-amann.png" }
        ]
      },
      {
        id: "desserts",
        title: "Desserts",
        summary: "Classic cafe sweets, straight from the printed menu.",
        art: "assets/images/menu/lava-cake.png",
        artType: "photo",
        items: [
          { name: "Lava Cake", note: "w/ ice cream", price: "$9.80 / $11.80", image: "assets/images/menu/lava-cake.png" },
          { name: "Brownie", note: "w/ ice cream", price: "$7.80 / $9.80", image: "assets/images/menu/brownie.png" },
          { name: "Basque Cheesecake", price: "$8.00", image: "assets/images/menu/basque-cheesecake.png" },
          { name: "Oreo Cheesecake", price: "$8.00", image: "assets/images/menu/oreo-cheesecake.png" },
          { name: "Double Choco Muffin", price: "$5.80", image: "assets/images/menu/double-choco-muffin.png" },
          { name: "Banana Choco Muffin", price: "$5.80", image: "assets/images/menu/banana-choco-muffin.png" },
          { name: "Cookies", price: "$4.00 - $4.20", image: "assets/images/menu/cookies.png" }
        ]
      },
      {
        id: "mains",
        title: "Mains",
        summary: "Easy savory picks that still look like a treat.",
        art: "assets/images/menu/ham-egg-sando.png",
        artType: "photo",
        items: [
          { name: "Ham & Egg Sando", price: "$10.80", image: "assets/images/menu/ham-egg-sando.png" },
          { name: "Egg Mayo Croissant", price: "$8.80", image: "assets/images/menu/egg-mayo-croissant.png" },
          { name: "Ham & Egg Croissant", price: "$10.80", image: "assets/images/menu/ham-egg-croissant.png" },
          { name: "Egg & Sausage Wrap", price: "$6.80", image: "assets/images/menu/egg-sausage-wrap.png" }
        ]
      }
    ]
  },
  drinks: {
    title: "Drinks",
    categories: [
      {
        id: "cloud-series",
        title: "Cloud Series",
        summary: "Signature drinks with the exact cutout artwork from the menu PDF.",
        art: "assets/images/menu/strawberry-cloud-matcha.png",
        artType: "photo",
        items: [
          { name: "Strawberry Cloud Matcha", price: "$8.80", image: "assets/images/menu/strawberry-cloud-matcha.png" },
          { name: "Cream Cloud Latte", price: "$7.80", image: "assets/images/menu/cream-cloud-latte.png" },
          { name: "Chocolate Cloud Latte", price: "$7.80", image: "assets/images/menu/chocolate-cloud-latte.png" }
        ]
      },
      {
        id: "coffee",
        title: "Coffee",
        summary: "Hot / Cold",
        art: "assets/images/menu/coffee-icon.png",
        artType: "icon",
        items: [
          { name: "Espresso", price: "$4.00" },
          { name: "Americano", price: "$4.80 / $5.80" },
          { name: "Cappuccino", price: "$5.80 / $6.80" },
          { name: "Mocha", price: "$6.80 / $7.80" },
          { name: "Latte", price: "$5.80 / $6.80" },
          { name: "Flat White", price: "$5.80 / $6.80" }
        ]
      },
      {
        id: "non-coffee",
        title: "Non-Coffee",
        summary: "Hot / Cold",
        art: "assets/images/menu/non-coffee-icon.png",
        artType: "icon",
        items: [
          { name: "Matcha Latte", price: "$6.80 / $7.80" },
          { name: "Hot Chocolate", price: "$5.80 / $6.80" },
          { name: "Babyccino", price: "$3.00" },
          { name: "Green Tea", price: "$4.80 / $5.80" },
          { name: "Jasmine Tea (pot)", price: "$8.80" },
          { name: "Peach Oolong Tea", price: "$4.80" },
          { name: "Soft Drinks", price: "$3.80" }
        ]
      },
      {
        id: "add-ons",
        title: "Add-Ons",
        summary: "Small upgrades from the drinks menu.",
        art: "assets/images/branding/logo.png",
        artType: "badge",
        footerNote: "Mexico Women Power Zongolica - Stonefruits, Almond, Floral Honey, White Tea",
        items: [
          { name: "Upsize to Large", price: "$1.00" },
          { name: "Oat Milk", price: "$1.00" },
          {
            name: "Single Origin",
            price: "$1.00"
          }
        ]
      }
    ]
  }
};
