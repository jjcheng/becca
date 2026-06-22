import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <p className="footer-eyebrow">Plan Your Stop</p>
        <p className="footer-small">Vibes @ East Coast, 1 East Coast Road #01-XX, Singapore 428750 &middot; Daily 8:00 AM - 7:00 PM</p>
        <div className="footer-links">
          <Link href="/">Home</Link>
          <Link href="/cafe-menu">Cafe Menu</Link>
          <Link href="/order">Order</Link>
          <Link href="/visit-us">Visit Us</Link>
        </div>
        <p className="footer-small footer-instagram">
          <a className="footer-social-link" href="https://www.instagram.com/beccascafe.sg/" target="_blank" rel="noopener" aria-label="Visit Becca's Cafe on Instagram">
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.8A3.95 3.95 0 0 0 3.8 7.75v8.5a3.95 3.95 0 0 0 3.95 3.95h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5a3.95 3.95 0 0 0-3.95-3.95Zm8.95 1.35a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3ZM12 6.4A5.6 5.6 0 1 1 6.4 12 5.6 5.6 0 0 1 12 6.4Zm0 1.8A3.8 3.8 0 1 0 15.8 12 3.81 3.81 0 0 0 12 8.2Z" />
            </svg>
            <span>@beccascafe.sg</span>
          </a>
        </p>
      </div>
    </footer>
  );
}
