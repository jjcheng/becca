import type { Metadata } from "next";

import Header from "../components/header";
import WhatsappNotePanel from "../components/whatsapp-note-panel";

export const metadata: Metadata = {
  title: "Becca's Cafe | Visit Us",
  description: "Visit Becca's Cafe at 308 Telok Kurau Rd, Singapore 423858. Open daily from 8:00 AM to 6:00 PM.",
  openGraph: {
    title: "Becca's Cafe | Visit Us",
    description: "Visit Becca's Cafe at 308 Telok Kurau Rd, Singapore 423858. Open daily from 8:00 AM to 6:00 PM.",
    images: ["/assets/images/branding/logo.png"]
  }
};

export default function VisitPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="page-shell page-shell-design visit-page visit-sheet-page visit-reference-page">
        <section className="sheet-hero visit-sheet-hero reveal" aria-labelledby="visit-title">
          <img src="/assets/images/visit/reference/hero-cafe.jpeg" alt="Becca's cafe entrance" />
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
            <p><strong>Becca's Cafe</strong><br />308 Telok Kurau Rd<br />Singapore 423858</p>
            <p>(Located in Vibes @ East Coast)</p>
          </article>
          <article>
            <h2><i className="detail-icon ri-time-line" aria-hidden="true" />Opening Hours</h2>
            <ul className="hours-list">
              <li><span>Daily</span><span>8:00AM - 6:00PM</span></li>
            </ul>
            <p className="script-mark">See you soon! ♡</p>
          </article>
        </section>

        <section className="map-sheet-panel reveal" aria-label="Map to Becca's Cafe">
          <iframe
            title="Map to Becca's Cafe"
            src="https://www.google.com/maps?q=1.3097286803212393,103.91190802596503&z=16&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </section>

        <section className="feature-row reveal" aria-label="Visit features">
          <article><i className="detail-icon ri-cup-line" aria-hidden="true" /><h3>Cozy Ambience</h3><p>Relax and unwind with us.</p></article>
          <article><i className="detail-icon ri-cake-3-line" aria-hidden="true" /><h3>Made Fresh</h3><p>Daily bakes and quality ingredients.</p></article>
          <article><i className="detail-icon ri-leaf-line" aria-hidden="true" /><h3>Pet Friendly</h3><p>Well-behaved pets are welcome!</p></article>
          <article><i className="detail-icon ri-wifi-line" aria-hidden="true" /><h3>Free Wi-Fi</h3><p>Stay awhile and enjoy the vibes.</p></article>
        </section>

        <section className="stay-touch-panel reveal" aria-labelledby="stay-touch-title">
          <img src="/assets/images/visit/reference/latte-flowers.jpeg" alt="Latte with flowers on a cafe table" />
          <div>
            <h2 id="stay-touch-title">Let's Stay In Touch</h2>
            <p>Follow us for daily bakes, cafe moments and updates!</p>
            <div className="social-pair">
              <a href="https://www.instagram.com/beccascafe.sg/" target="_blank" rel="noopener"><i className="detail-icon ri-instagram-line" aria-hidden="true" />@beccascafe.sg</a>
              <span><i className="detail-icon ri-facebook-fill" aria-hidden="true" />Becca's Cafe</span>
            </div>
          </div>
        </section>

        <WhatsappNotePanel
          primaryContent={<>We can't wait to meet you at Becca's! &hearts;</>}
        />
      </main>
    </>
  );
}
