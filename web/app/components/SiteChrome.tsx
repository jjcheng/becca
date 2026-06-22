"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const navMap: Record<string, string> = {
  "/": "home",
  "/index.html": "home",
  "/cafe-menu": "menu",
  "/menu.html": "menu",
  "/cakes-bakes": "menu",
  "/cakes-bakes.html": "menu",
  "/order": "order",
  "/order.html": "order",
  "/visit-us": "visit",
  "/visit.html": "visit"
};

function pageForPath(pathname: string) {
  const path = pathname.replace(/\/+$/, "") || "/";
  return navMap[path] || "home";
}

export default function SiteChrome() {
  const pathname = usePathname();

  useEffect(() => {
    const page = pageForPath(pathname);
    document.body.dataset.page = page;

    document.querySelectorAll<HTMLAnchorElement>("[data-nav]").forEach((link) => {
      const isActive = link.dataset.nav === page;
      link.classList.toggle("is-active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });

    const abortController = new AbortController();
    const toggle = document.querySelector<HTMLButtonElement>(".menu-toggle");
    const nav = document.querySelector<HTMLElement>(".site-nav");

    if (toggle && nav) {
      const closeNav = () => {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      };

      toggle.addEventListener("click", (event) => {
        event.stopPropagation();
        const shouldOpen = !nav.classList.contains("is-open");
        nav.classList.toggle("is-open", shouldOpen);
        toggle.setAttribute("aria-expanded", String(shouldOpen));
      }, { signal: abortController.signal });

      nav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeNav, { signal: abortController.signal });
      });

      document.addEventListener("click", (event) => {
        const target = event.target;
        if (target instanceof Node && !nav.contains(target) && !toggle.contains(target)) {
          closeNav();
        }
      }, { signal: abortController.signal });

      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          closeNav();
        }
      }, { signal: abortController.signal });
    }

    const revealObserver = "IntersectionObserver" in window
      ? new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 })
      : null;

    document.querySelectorAll<HTMLElement>(".reveal").forEach((element) => {
      if (revealObserver) {
        revealObserver.observe(element);
      } else {
        element.classList.add("is-visible");
      }
    });

    return () => {
      abortController.abort();
      revealObserver?.disconnect();
    };
  }, [pathname]);

  return null;
}
