import type { Metadata } from "next";
import { Fragment } from "react";

import Footer from "../components/Footer";
import Header from "../components/Header";

export const metadata: Metadata = {
  title: "Order",
  description: "Order cakes and bakes from Becca's Cafe with 2 to 3 days advance notice.",
  openGraph: {
    title: "Becca's Cafe | Order",
    description: "Order cakes and bakes from Becca's Cafe with 2 to 3 days advance notice.",
    images: ["/assets/images/branding/logo.png"]
  }
};

const cakes = [
  {
    image: "/assets/images/menu/basque-cheesecake.png",
    alt: "Basque Cheesecake",
    title: "Basque Cheesecake",
    text: "Creamy, rich and perfectly caramelised on top.",
    icon: "ri-group-line",
    serving: "Serves 6-8 pax",
    price: "$58",
    subject: "Order - Basque Cheesecake"
  },
  {
    image: "/assets/images/menu/oreo-cheesecake.png",
    alt: "Matcha Basque Cheesecake",
    title: "Matcha Basque Cheesecake",
    text: "Creamy basque cheesecake with premium matcha.",
    icon: "ri-group-line",
    serving: "Serves 6-8 pax",
    price: "$62",
    subject: "Order - Matcha Basque Cheesecake"
  },
  {
    image: "/assets/images/menu/brownie.png",
    alt: "Blackout Brownies",
    title: "Blackout Brownies",
    text: "Fudgy, chocolatey and seriously addictive.",
    icon: "ri-box-1-line",
    serving: "Box of 6 pieces",
    price: "$28",
    subject: "Order - Blackout Brownies"
  },
  {
    image: "/assets/images/menu/cookies.png",
    alt: "Crookies",
    title: "Crookies",
    text: "Buttery croissant meets chewy cookie.",
    icon: "ri-box-1-line",
    serving: "Box of 4 pieces",
    price: "$24",
    subject: "Order - Crookies"
  }
];

const steps = [
  {
    icon: "ri-calendar-line",
    title: "1. Choose",
    text: "Select your item, date & time of collection."
  },
  {
    icon: "ri-file-list-3-line",
    title: "2. Place Order",
    text: "Fill in the order form with your details and preferences."
  },
  {
    icon: "ri-whatsapp-line",
    title: "3. Confirmation",
    text: "We'll contact you via WhatsApp to confirm your order."
  },
  {
    icon: "ri-heart-line",
    title: "4. Collection",
    text: "Collect and enjoy your treats from Becca's Cafe!"
  }
];

function mailto(subject: string) {
  return `mailto:beccascafe.sg@gmail.com?subject=${encodeURIComponent(subject)}`;
}

export default function OrderPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="page-shell page-shell-design order-page order-sheet-page">
        <section className="sheet-hero order-sheet-hero reveal" aria-labelledby="order-title">
          <div>
            <h1 id="order-title">Cakes &amp; Bakes</h1>
            <div className="ornament" aria-hidden="true">&#10045;</div>
            <p>Made to order. Made with love.</p>
            <p className="hero-note">Whole cakes, brownies and more.<br />Please order 2-3 days in advance.</p>
          </div>
          <img src="/assets/images/menu/basque-cheesecake.png" alt="Basque Cheesecake" />
        </section>

        <section className="sheet-heading reveal" aria-labelledby="cakes-title">
          <h2 id="cakes-title">Our Cakes</h2>
          <div className="ornament" aria-hidden="true">&#10045;</div>
        </section>

        <section className="cake-row-list reveal" aria-label="Cakes and bakes catalogue">
          {cakes.map((cake) => (
            <article className="cake-order-row" key={cake.title}>
              <img src={cake.image} alt={cake.alt} />
              <div>
                <h3>{cake.title}</h3>
                <p>{cake.text}</p>
                <p className="serving-line"><i className={`detail-icon ${cake.icon}`} aria-hidden="true" />{cake.serving}</p>
              </div>
              <aside><strong>{cake.price}</strong><a className="btn btn-primary" href={mailto(cake.subject)}>Order Now</a></aside>
            </article>
          ))}
        </section>

        <section className="how-order-panel reveal" aria-labelledby="how-order-title">
          <h2 id="how-order-title">How To Order</h2>
          <div className="how-order-steps">
            {steps.map((step, index) => (
              <Fragment key={step.title}>
                <article><i className={`detail-icon ${step.icon}`} aria-hidden="true" /><h3>{step.title}</h3><p>{step.text}</p></article>
                {index < steps.length - 1 ? <span className="step-arrow" aria-hidden="true">›</span> : null}
              </Fragment>
            ))}
          </div>
        </section>

        <section className="note-whatsapp-panel reveal">
          <div className="flower-line" aria-hidden="true">&#10045;</div>
          <p><strong>Please Note</strong><br />Orders require 2-3 days advance notice.<br />No cancellations on the day of collection.</p>
          <p><i className="detail-icon ri-whatsapp-line" aria-hidden="true" /><strong>Have questions?</strong><br />WhatsApp us at +65 9123 4567</p>
        </section>
      </main>
      <Footer />
    </>
  );
}
