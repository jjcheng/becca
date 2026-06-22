import Link from "next/link";

function MenuIcon() {
  return (
    <svg className="header-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M4 12h16" />
      <path d="M4 18h16" />
      <path d="M4 6h16" />
    </svg>
  );
}

function OrderIcon() {
  return (
    <svg className="header-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

export default function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <button className="menu-toggle header-icon-button" aria-expanded="false" aria-controls="site-nav" aria-label="Open navigation">
          <MenuIcon />
        </button>
        <Link className="brand-mark" href="/" aria-label="Becca's Cafe home page">
          <img src="/assets/images/branding/logo.png" alt="Becca's Cafe" />
        </Link>
        <Link className="header-order-link header-icon-button" href="/order" aria-label="Order cakes and bakes">
          <OrderIcon />
        </Link>
        <nav id="site-nav" className="site-nav" aria-label="Main navigation">
          <Link href="/" data-nav="home">Home</Link>
          <Link href="/cafe-menu" data-nav="menu">Cafe Menu</Link>
          <Link href="/order" data-nav="order">Order</Link>
          <Link href="/visit-us" data-nav="visit">Visit Us</Link>
        </nav>
      </div>
    </header>
  );
}
