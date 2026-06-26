import type { Metadata } from "next";
import { Fragment } from "react";

import Header from "../components/header";
import SheetHeading from "../components/sheet-heading";
import WhatsappNotePanel from "../components/whatsapp-note-panel";
import Divider from "../components/divider";

export const metadata: Metadata = {
  title: "Becca's Cafe | Order",
  description: "Order cakes and bakes from Becca's Cafe with 2 to 3 days advance notice.",
  openGraph: {
    title: "Becca's Cafe | Order",
    description: "Order cakes and bakes from Becca's Cafe with 2 to 3 days advance notice.",
    images: ["/assets/images/branding/logo.png"]
  }
};

const cakes = [
  {
    image: "/assets/images/order/whole-basque-cheesecake.webp",
    alt: "Basque Cheesecake",
    title: "Basque Cheesecake",
    text: "Creamy, rich and perfectly caramelised on top.",
    icon: "ri-group-line",
    price: "$78",
    subject: "Order - Basque Cheesecake"
  },
  {
    image: "/assets/images/order/matcha-basque-cheesecake.webp",
    alt: "Matcha Basque Cheesecake",
    title: "Matcha Basque Cheesecake",
    text: "Creamy basque cheesecake with premium matcha.",
    icon: "ri-group-line",
    price: "$88",
    subject: "Order - Matcha Basque Cheesecake"
  },
  {
    image: "/assets/images/order/blackout-brownies.webp",
    alt: "Blackout Brownies (normal – sea salt)",
    title: "Blackout Brownies (normal – sea salt)",
    text: "Fudgy, chocolatey and seriously addictive.",
    serving: "Box of 4 pieces",
    icon: "ri-box-1-line",
    price: "$24.8",
    subject: "Order - Blackout Brownies (normal – sea salt)"
  },
  {
    image: "/assets/images/order/blackout-brownies.webp",
    alt: "Blackout Brownies (Nutella filling)",
    title: "Blackout Brownies (Nutella filling)",
    text: "Fudgy, chocolatey and seriously addictive.",
    icon: "ri-box-1-line",
    serving: "Box of 4 pieces",
    price: "$28.8",
    subject: "Order - Blackout Brownies (Nutella filling)"
  },
  {
    image: "/assets/images/order/crookies.webp",
    alt: "Crookies",
    title: "Crookies",
    text: "Buttery croissant meets chewy cookie.",
    icon: "ri-box-1-line",
    serving: "Box of 4 pieces",
    price: "$19.2",
    subject: "Order - Crookies"
  },
  {
    image: "/assets/images/order/biscoff-cookies.webp",
    alt: "Biscoff Cookies",
    title: "Biscoff Cookies",
    text: "Buttery croissant meets chewy cookie.",
    icon: "ri-box-1-line",
    serving: "Box of 4 pieces",
    price: "$24",
    subject: "Order - Biscoff Cookies"
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
      <main id="main-content" className="page-shell page-shell-design order-page order-sheet-page order-reference-page">
        <section className="sheet-hero order-sheet-hero reveal" aria-labelledby="order-title">
          <div>
            <h1 id="order-title" className="page-top-title">Cakes &amp; Bakes</h1>
            <Divider />
            <p>Made to order. Made with love.</p>
            <p className="hero-note">Whole cakes, brownies and more.<br />Please order 2-3 days in advance.</p>
          </div>
          <img src="/assets/images/order/hero-order.webp" alt="Order from Becca's Cafe" />
        </section>

        <SheetHeading id="cakes-title" title="Our Cakes" />

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

        <WhatsappNotePanel
          primaryContent={<><strong>Please Note</strong><br />Orders require 2-3 days advance notice.<br />No cancellations on the day of collection.</>}
        />
      </main>
    </>
  );
}
