import type { Metadata } from "next";

import Divider from "../components/divider";
import Header from "../components/header";

export const metadata: Metadata = {
  title: "Becca's Cafe | Menu",
  description: "Handcrafted drinks, thoughtful bites, and cakes to order from Becca's Cafe.",
  openGraph: {
    title: "Becca's Cafe | Menu",
    description: "Handcrafted drinks, thoughtful bites, and cakes to order from Becca's Cafe.",
    images: ["/assets/images/branding/logo.png"]
  }
};

const cloudDrinks = [
  {
    image: "/assets/images/menu/reference/strawberry-cloud-matcha.jpeg",
    alt: "Strawberry Cloud Matcha",
    title: "Strawberry Cloud Matcha",
    text: "House strawberry cream cloud.",
    price: "$8.00"
  },
  {
    image: "/assets/images/menu/reference/cream-cloud-latte.jpeg",
    alt: "Cream Cloud Latte",
    title: "Cream Cloud Latte",
    text: "Smooth espresso with vanilla cream.",
    price: "$7.50"
  },
  {
    image: "/assets/images/menu/reference/chocolate-cloud-latte.jpeg",
    alt: "Chocolate Cloud Latte",
    title: "Chocolate Cloud Latte",
    text: "Rich chocolate with cream cloud.",
    price: "$7.50"
  }
];

const coffees = [
  ["Latte", "$6.00"],
  ["Flat White", "$5.50"],
  ["Americano", "$4.50"],
  ["Mocha", "$6.50"],
  ["Cappuccino", "$5.50"]
];

const savouries = [
  ["Egg Mayo Croissant", "$7.50"],
  ["Ham & Egg Croissant", "$8.50"],
  ["Ham & Egg Sando", "$9.00"]
];

const pastries = [
  ["Almond Croissant", "$6.50"],
  ["Pain au Chocolat", "$6.00"],
  ["Plain Croissant", "$5.00"]
];

function PriceList({ items, ruled = false }: { items: string[][]; ruled?: boolean }) {
  return (
    <ul className={`price-list${ruled ? " ruled-list" : ""}`}>
      {items.map(([name, price]) => (
        <li key={name}><span>{name}</span><span>{price}</span></li>
      ))}
    </ul>
  );
}

export default function CafeMenuPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="page-shell page-shell-design menu-page menu-sheet-page menu-reference-page">
        <section className="sheet-hero menu-sheet-hero reveal" aria-labelledby="menu-title">
          <h1 id="menu-title" className="page-top-title">CAF&Eacute; MENU</h1>
          <Divider />
          <p>Handcrafted drinks and freshly made bites, made with love.</p>
          <div className="group-tabs design-tabs" aria-label="Menu group">
            <a className="group-tab is-active" href="#cloud-collection">Drinks</a>
            <a className="group-tab" href="#savoury">Savoury</a>
            <a className="group-tab" href="#pastries">Pastries</a>
          </div>
        </section>

        <section id="cloud-collection" className="menu-panel reveal" aria-labelledby="cloud-title">
          <h2 id="cloud-title"><i className="detail-icon ri-cloud-line" aria-hidden="true" />Cloud Collection</h2>
          <div className="cloud-card-grid">
            {cloudDrinks.map((drink) => (
              <article className="sheet-product-card" key={drink.title}>
                <img src={drink.image} alt={drink.alt} />
                <h3>{drink.title}</h3>
                <p>{drink.text}</p>
                <strong>{drink.price}</strong>
              </article>
            ))}
          </div>
        </section>

        <section className="menu-panel split-menu-panel reveal" aria-labelledby="coffee-title">
          <div>
            <h2 id="coffee-title"><i className="detail-icon ri-cup-line" aria-hidden="true" />Coffee</h2>
            <PriceList items={coffees} />
          </div>
          <img src="/assets/images/menu/reference/coffee-latte.jpeg" alt="Latte art coffee" />
        </section>

        <section id="savoury" className="menu-panel split-menu-panel menu-list-photo-panel menu-list-photo-left reveal" aria-labelledby="savoury-title">
          <h2 id="savoury-title"><i className="detail-icon ri-leaf-line" aria-hidden="true" />Savoury</h2>
          <img src="/assets/images/menu/reference/ham-egg-croissant.jpeg" alt="Ham and egg croissant" />
          <div className="menu-list-copy">
            <PriceList items={savouries} ruled />
          </div>
          <span className="menu-panel-arrow" aria-hidden="true">›</span>
        </section>

        <section id="pastries" className="menu-panel split-menu-panel menu-list-photo-panel menu-list-photo-right reveal" aria-labelledby="pastries-title">
          <div className="menu-list-copy">
            <h2 id="pastries-title"><i className="detail-icon ri-cake-3-line" aria-hidden="true" />Pastries</h2>
            <PriceList items={pastries} ruled />
          </div>
          <img src="/assets/images/menu/reference/croissants.jpeg" alt="Croissants" />
        </section>
      </main>
    </>
  );
}
