import type { Metadata } from "next";

import Footer from "../components/Footer";
import Header from "../components/Header";

export const metadata: Metadata = {
  title: "Visit Us",
  description: "Visit Becca's Cafe at Vibes @ East Coast, 1 East Coast Road #01-07, Singapore 428750. Open daily from 8:00 AM to 6:00 PM.",
  openGraph: {
    title: "Becca's Cafe | Visit Us",
    description: "Visit Becca's Cafe at Vibes @ East Coast, 1 East Coast Road #01-07, Singapore 428750. Open daily from 8:00 AM to 6:00 PM.",
    images: ["/assets/images/branding/logo.png"]
  }
};

const hours = [
  ["Monday", "Closed"],
  ["Tuesday - Friday", "8:00AM - 7:00PM"],
  ["Saturday - Sunday", "8:00AM - 8:00PM"]
];

const features = [
  {
    icon: "ri-cup-line",
    title: "Cozy Ambience",
    text: "Relax and unwind with us."
  },
  {
    icon: "ri-cake-3-line",
    title: "Made Fresh",
    text: "Daily bakes and quality ingredients."
  },
  {
    icon: "ri-heart-line",
    title: "Pet Friendly",
    text: "Well-behaved pets are welcome!"
  },
  {
    icon: "ri-wifi-line",
    title: "Free Wi-Fi",
    text: "Stay awhile and enjoy the vibes."
  }
];

export default function VisitPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="page-shell page-shell-design visit-page visit-sheet-page">
        <section className="sheet-hero visit-sheet-hero reveal" aria-labelledby="visit-title">
          <img src="/assets/images/hero/cover.jpeg" alt="Becca's cafe entrance" />
          <div className="visit-sheet-copy">
            <p className="eyebrow">Visit Us</p>
            <h1 id="visit-title">A cozy cafe made for slow mornings and sweet moments.</h1>
            <div className="ornament" aria-hidden="true">&#10045;</div>
            <p>We can't wait to welcome you to Becca's.</p>
          </div>
        </section>

        <section className="find-hours-panel reveal" aria-label="Find us and opening hours">
          <article>
            <h2><i className="detail-icon ri-map-pin-line" aria-hidden="true" />Find Us</h2>
            <p><strong>Becca's Cafe</strong><br />1 East Coast Road, #01-XX<br />Singapore 428750</p>
            <p>(Located in the heart of the East Coast neighbourhood)</p>
          </article>
          <article>
            <h2><i className="detail-icon ri-time-line" aria-hidden="true" />Opening Hours</h2>
            <ul className="hours-list">
              {hours.map(([day, time]) => (
                <li key={day}><span>{day}</span><span>{time}</span></li>
              ))}
            </ul>
            <p className="script-mark">See you soon! ♡</p>
          </article>
        </section>

        <section className="map-sheet-panel reveal" aria-label="Map to Becca's Cafe">
          <iframe title="Becca's Cafe map" src="https://www.google.com/maps?q=1+East+Coast+Road,+Singapore+428750&output=embed" loading="lazy" />
        </section>

        <section className="feature-row reveal" aria-label="Visit features">
          {features.map((feature) => (
            <article key={feature.title}><i className={`detail-icon ${feature.icon}`} aria-hidden="true" /><h3>{feature.title}</h3><p>{feature.text}</p></article>
          ))}
        </section>

        <section className="stay-touch-panel reveal" aria-labelledby="stay-touch-title">
          <img src="/assets/images/menu/cream-cloud-latte.png" alt="Coffee on cafe table" />
          <div>
            <h2 id="stay-touch-title">Let's Stay In Touch</h2>
            <p>Follow us for daily bakes, cafe moments and updates!</p>
            <div className="social-pair">
              <a href="https://www.instagram.com/beccascafe.sg/" target="_blank" rel="noopener"><i className="detail-icon ri-instagram-line" aria-hidden="true" />@beccascafe.sg</a>
              <span><i className="detail-icon ri-store-line" aria-hidden="true" />Becca's Cafe</span>
            </div>
          </div>
        </section>

        <section className="note-whatsapp-panel reveal">
          <div className="flower-line" aria-hidden="true">&#10045;</div>
          <p>We can't wait to meet you at Becca's! &hearts;</p>
          <p><i className="detail-icon ri-whatsapp-line" aria-hidden="true" /><strong>Have questions?</strong><br />WhatsApp us at +65 9123 4567</p>
        </section>
      </main>
      <Footer />
    </>
  );
}
