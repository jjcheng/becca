"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const navItems = [
  { href: "/", key: "home", label: "Home" },
  { href: "/cafe-menu", key: "menu", label: "Cafe Menu" },
  { href: "/order", key: "order", label: "Order" },
  { href: "/visit-us", key: "visit", label: "Visit Us" }
];

function activeKeyForPath(pathname: string) {
  const path = pathname.replace(/\/+$/, "") || "/";

  if (path === "/" || path === "/index.html") {
    return "home";
  }

  if (path === "/cafe-menu" || path === "/menu.html" || path === "/cakes-bakes" || path === "/cakes-bakes.html") {
    return "menu";
  }

  if (path === "/order" || path === "/order.html") {
    return "order";
  }

  if (path === "/visit-us" || path === "/visit-us.html" || path === "/visit.html") {
    return "visit";
  }

  return "home";
}

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
  const pathname = usePathname();
  const activeKey = activeKeyForPath(pathname);
  const [isOpen, setIsOpen] = useState(false);
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const lastScrollYRef = useRef(0);
  const tickingRef = useRef(false);

  const setHeaderHidden = (hidden: boolean) => {
    setIsHeaderHidden((current) => (current === hidden ? current : hidden));
  };

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const closeFromOutside = (event: MouseEvent) => {
      const target = event.target;
      if (
        target instanceof Node &&
        !navRef.current?.contains(target) &&
        !toggleRef.current?.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    const closeFromEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", closeFromOutside);
    document.addEventListener("keydown", closeFromEscape);

    return () => {
      document.removeEventListener("click", closeFromOutside);
      document.removeEventListener("keydown", closeFromEscape);
    };
  }, [isOpen]);

  useEffect(() => {
    const isMobile = () => window.innerWidth <= 760;

    lastScrollYRef.current = window.scrollY;

    const updateHeader = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollYRef.current;

      if (!isMobile()) {
        setHeaderHidden(false);
        lastScrollYRef.current = currentY;
        tickingRef.current = false;
        return;
      }

      if (currentY <= 8 || isOpen) {
        setHeaderHidden(false);
        lastScrollYRef.current = currentY;
        tickingRef.current = false;
        return;
      }

      if (Math.abs(delta) >= 4) {
        if (delta > 0 && currentY > 80) {
          setHeaderHidden(true);
        } else if (delta < 0) {
          setHeaderHidden(false);
        }

        lastScrollYRef.current = currentY;
      }

      tickingRef.current = false;
    };

    const onScroll = () => {
      if (tickingRef.current) {
        return;
      }

      tickingRef.current = true;
      window.requestAnimationFrame(updateHeader);
    };

    const onResize = () => {
      if (!isMobile()) {
        setHeaderHidden(false);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [isOpen]);

  return (
    <header className={`site-header${isHeaderHidden ? " is-hidden" : ""}`}>
      <div className="header-inner">
        <button
          ref={toggleRef}
          className="menu-toggle header-icon-button"
          aria-expanded={isOpen}
          aria-controls="site-nav"
          aria-label="Open navigation"
          onClick={(event) => {
            event.stopPropagation();
            setIsOpen((open) => !open);
          }}
        >
          <MenuIcon />
        </button>
        <Link className="brand-mark" href="/" prefetch={false} aria-label="Becca's Cafe home page">
          <img src="/assets/images/branding/logo.png" alt="Becca's Cafe" />
        </Link>
        <Link className="header-order-link header-icon-button" href="/order" prefetch={false} aria-label="Order cakes and bakes">
          <OrderIcon />
        </Link>
        <nav ref={navRef} id="site-nav" className={`site-nav${isOpen ? " is-open" : ""}`} aria-label="Main navigation">
          {navItems.map((item) => {
            const isActive = item.key === activeKey;

            return (
              <Link
                key={item.key}
                href={item.href}
                prefetch={false}
                data-nav={item.key}
                className={isActive ? "is-active" : undefined}
                aria-current={isActive ? "page" : undefined}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
