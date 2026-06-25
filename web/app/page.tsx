import type { Metadata } from "next";
import Link from "next/link";

import Divider from "./components/divider";
import Header from "./components/header";

export const metadata: Metadata = {
  title: "Becca's Cafe | Home",
  description: "Curated coffee, matcha, and thoughtful bites at Becca's Cafe by the East Coast.",
  openGraph: {
    title: "Becca's Cafe | Home",
    description: "Curated coffee, matcha, and thoughtful bites at Becca's Cafe by the East Coast.",
    images: ["/assets/images/branding/logo.png"]
  }
};

const signatures = [
  {
    image: "/assets/images/home/matcha-latte.webp",
    alt: "Matcha Latte from Becca's Cafe",
    title: "Matcha Latte",
  },
  {
    image: "/assets/images/home/strawberry-cloud-matcha.webp",
    alt: "Strawberry Cloud Matcha from Becca's Cafe",
    title: "Strawberry Cloud Matcha",
  },
  {
    image: "/assets/images/home/basque-cheesecake-slice.webp",
    alt: "Basque Cheesecake from Becca's Cafe",
    title: "Basque Cheesecake",
  },
  {
    image: "/assets/images/home/matcha-almond-croissant.webp",
    alt: "Matcha almond croissant from Becca's Cafe",
    title: "Matcha Almond Croissant",
  },
];

const reviews = [
  "Best matcha I've had in Singapore.",
  "The Basque cheesecake is incredible.",
  "Cute cafe with such a cozy vibe."
];

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main-content" className="page-shell page-shell-design home-page">
        <section className="home-reference-hero reveal" aria-labelledby="home-title">
          <div className="home-reference-copy">
            <p className="home-reference-eyebrow">WELCOME TO BECCA'S</p>
            <h1 id="home-title">A LITTLE <span>PINK</span> ESCAPE BY THE EAST COAST</h1>
            <Divider />
            <p className="home-reference-blurb">Curated coffee, Matcha & Indulgent Bites</p>
            <div className="button-row">
              <Link className="btn btn-primary" href="/visit-us" prefetch={false}>Visit Our Cafe</Link>
              <Link className="btn btn-light" href="/order" prefetch={false}>Order Cakes &amp; Bakes</Link>
            </div>
          </div>
          <figure className="home-reference-visual" aria-hidden="true">
            <div className="home-reference-scene">
              <img className="home-reference-hero-photo" src="/assets/images/home/hero-photo.webp" alt="" />
            </div>
          </figure>
        </section>

        <section className="home-signature-section reveal" aria-labelledby="signature-title">
          <div className="home-title-stack">
            <h2 id="signature-title">Our Signatures</h2>
            <Divider />
          </div>
          <div className="home-signature-grid">
            {signatures.map((signature) => (
              <article className="home-signature-card" key={signature.title}>
                <img src={signature.image} alt={signature.alt} />
                <h3>{signature.title}</h3>
                <span className="home-signature-heart" aria-hidden="true">♡</span>
              </article>
            ))}
          </div>
        </section>

        <section className="home-order-sheet reveal" aria-labelledby="home-order-title">
          <div className="home-order-copy">
            <p className="eyebrow">Order Cakes &amp; Bakes</p>
            <Divider />
            <h2 id="home-order-title">Freshly baked and Made to Order. 2-3 days in advance notice required.</h2>
            <p>Whole cakes, brownies and more - order 2-3 days in advance.</p>
            <Link className="btn btn-primary" href="/order" prefetch={false}>Order Now</Link>
          </div>
          <img className="home-order-cake-image" src="/assets/images/home/whole-basque-cheesecake.webp" alt="Whole Basque Cheesecake from Becca's Cafe" />
        </section>

        <section className="home-review-section reveal" aria-labelledby="favourites-title">
          <div className="home-title-stack">
            <h2 id="favourites-title">Follow Our Journey</h2>
            <div className="home-stars" aria-hidden="true">
              <a href="https://www.instagram.com/beccas.cafe/" target="_blank">
                @beccascafe.sg
              </a>
            </div>
          </div>
          <div className="home-review-grid">
            {reviews.map((review) => (
              <article className="home-review-card" key={review}>
                <span className="home-review-quote" aria-hidden="true">&rdquo;</span>
                <blockquote>{review}</blockquote>
                <p>- Google Review</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
