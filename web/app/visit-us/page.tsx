import type { Metadata } from "next";

import Header from "../components/header";
import Divider from "../components/divider";
import WhatsappNotePanel from "../components/whatsapp-note-panel";
import VisitMapFrame from "../components/visit-map-frame";

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
        <section className="visit-reference-top reveal" aria-labelledby="visit-title">
          <article className="visit-contact-card">
            <h1 id="visit-title" className="page-top-title">Visit Us</h1>
            <Divider />
            <ul className="visit-contact-list">
              <li>
                <i className="detail-icon ri-map-pin-line" aria-hidden="true" />
                <p><strong>Vibes @ East Coast</strong><br />1 East Coast Road, #01-07,<br />Singapore 428750</p>
              </li>
              <li>
                <i className="detail-icon ri-time-line" aria-hidden="true" />
                <p><strong>Daily</strong><br />8:00 AM - 6:00 PM</p>
              </li>
              <li>
                <i className="detail-icon ri-restaurant-line" aria-hidden="true" />
                <p><strong>Dine In &amp; Takeaway</strong><br />Walk-ins welcome!</p>
              </li>
              <li>
                <i className="detail-icon ri-mail-line" aria-hidden="true" />
                <p><strong>Email</strong><br /><a href="mailto:beccascafe.sg@gmail.com">beccascafe.sg@gmail.com</a></p>
              </li>
              <li>
                <i className="detail-icon ri-instagram-line" aria-hidden="true" />
                <p><strong>Instagram</strong><br /><a href="https://www.instagram.com/beccascafe.sg/" target="_blank" rel="noopener">@beccascafe.sg</a></p>
              </li>
            </ul>
            <a
              className="btn btn-pink visit-directions-btn"
              href="https://maps.google.com/?q=1.3097286803212393,103.91190802596503"
              target="_blank"
              rel="noopener"
            >
              Get Directions
            </a>
          </article>

          <VisitMapFrame />
        </section>

        <section className="feature-row reveal" aria-label="Visit features">
          <article><i className="detail-icon ri-cup-line" aria-hidden="true" /><h3>Cozy Ambience</h3><p>Relax and unwind with us.</p></article>
          <article><i className="detail-icon ri-cake-3-line" aria-hidden="true" /><h3>Made Fresh</h3><p>Daily bakes and quality ingredients.</p></article>
          <article><i className="detail-icon ri-leaf-line" aria-hidden="true" /><h3>Free Wi-Fi</h3><p>Stay awhile and enjoy the vibes.</p></article>
        </section>

        <section className="stay-touch-panel reveal" aria-labelledby="stay-touch-title">
          <img src="/assets/images/home/hero-photo.webp" alt="Come and visit Becca's Cafe" />
          <div>
            <h2 id="stay-touch-title">Let's Stay In Touch</h2>
            <p>Follow us for daily bakes, cafe moments and updates!</p>
            <div className="social-pair">
              <a href="https://www.instagram.com/beccascafe.sg/" target="_blank" rel="noopener"><i className="detail-icon ri-instagram-line" aria-hidden="true" />@beccascafe.sg</a>
              <span><i className="detail-icon ri-mail-line" aria-hidden="true" />
              <a href="mailto:beccascafe.sg@gmail.com">beccascafe.sg@gmail.com</a>
              </span>
            </div>
          </div>
        </section>

        <WhatsappNotePanel
          primaryContent={<>Can&rsquo;t wait to meet you at Becca&rsquo;s! &#9829;</>}
        />

        <section className="visit-reference-bottom reveal" aria-label="Send us a message and view the cafe">
          <form className="contact-form visit-message-form" method="post" action="#">
            <p className="visit-message-title">Send Us A Message</p>
            <div className="visit-message-grid">
              <div className="field">
                <label htmlFor="visit-name">Name</label>
                <input id="visit-name" name="name" type="text" autoComplete="name" placeholder="Enter your name" required />
              </div>
              <div className="field">
                <label htmlFor="visit-email">Email</label>
                <input id="visit-email" name="email" type="email" autoComplete="email" placeholder="Enter your email address" required />
              </div>
            </div>
            <div className="field">
              <label htmlFor="visit-subject">Subject</label>
              <input id="visit-subject" name="subject" type="text" placeholder="Enter subject" required />
            </div>
            <div className="field">
              <label htmlFor="visit-message">Message</label>
              <textarea id="visit-message" name="message" placeholder="Enter message" required />
            </div>
            <button className="btn btn-pink" type="submit">Send Message</button>
          </form>

          <figure className="visit-reference-photo">
            <img src="/assets/images/visit/cafe-exterior.webp" alt="Becca's Cafe exterior" />
          </figure>
        </section>
      </main>
    </>
  );
}
