(function () {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  const fileName = path.split("/").pop() || "index.html";
  const pageName = document.body.getAttribute("data-page") || "";
  const navLinks = Array.from(document.querySelectorAll("[data-nav]"));
  const navMap = {
    "/": "home",
    "/index.html": "home",
    "/cafe-menu": "menu",
    "/menu.html": "menu",
    "/order": "order",
    "/order.html": "order",
    "/visit-us": "visit",
    "/visit.html": "visit",
    "index.html": "home",
    "menu.html": "menu",
    "order.html": "order",
    "visit.html": "visit"
  };

  function setActiveNav(navKey, currentType) {
    navLinks.forEach((link) => {
      const isActive = link.getAttribute("data-nav") === navKey;
      link.classList.toggle("is-active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", currentType);
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  const sectionNav = navLinks.map((link) => {
    const href = link.getAttribute("href") || "";
    if (!href.startsWith("#")) {
      return null;
    }

    const section = document.querySelector(href);
    if (!section) {
      return null;
    }

    return {
      key: link.getAttribute("data-nav") || "home",
      href,
      section
    };
  }).filter(Boolean);

  if (sectionNav.length) {
    const updateActiveFromHash = () => {
      const currentHash = window.location.hash;
      const match = sectionNav.find((item) => item.href === currentHash);
      if (match) {
        setActiveNav(match.key, "location");
        return true;
      }

      return false;
    };

    if (!updateActiveFromHash()) {
      setActiveNav(sectionNav[0].key, "location");
    }

    const updateActiveFromScroll = () => {
      const triggerLine = Math.min(window.innerHeight * 0.35, 260);
      let currentSection = sectionNav[0];

      sectionNav.forEach((item) => {
        const rect = item.section.getBoundingClientRect();
        if (rect.top <= triggerLine) {
          currentSection = item;
        }
      });

      if ((window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 4)) {
        currentSection = sectionNav[sectionNav.length - 1];
      }

      setActiveNav(currentSection.key, "location");
    };

    let scrollTicking = false;
    const scheduleActiveFromScroll = () => {
      if (scrollTicking) {
        return;
      }

      scrollTicking = true;
      window.requestAnimationFrame(() => {
        updateActiveFromScroll();
        scrollTicking = false;
      });
    };

    window.addEventListener("scroll", scheduleActiveFromScroll, { passive: true });
    window.addEventListener("resize", scheduleActiveFromScroll);
    scheduleActiveFromScroll();

    window.addEventListener("hashchange", updateActiveFromHash);
  } else {
    setActiveNav(pageName || navMap[path] || navMap[fileName] || "home", "page");
  }

  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");
  if (toggle && nav) {
    const closeNav = () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    };

    const openNav = () => {
      nav.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
    };

    toggle.addEventListener("click", (event) => {
      event.stopPropagation();
      const next = !nav.classList.contains("is-open");
      if (next) {
        openNav();
      } else {
        closeNav();
      }
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        closeNav();
      });
    });

    document.addEventListener("click", (event) => {
      if (!nav.classList.contains("is-open")) {
        return;
      }

      const target = event.target;
      if (target instanceof Node && !nav.contains(target) && !toggle.contains(target)) {
        closeNav();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeNav();
      }
    });
  }

  const revealObserver = "IntersectionObserver" in window
    ? new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 })
    : null;

  function watchReveals(scope) {
    scope.querySelectorAll(".reveal").forEach((element) => {
      if (revealObserver) {
        revealObserver.observe(element);
      } else {
        element.classList.add("is-visible");
      }
    });
  }

  watchReveals(document);

  const root = document.querySelector("[data-menu-root]");
  const chipRow = document.querySelector("[data-category-nav]");
  const groupTabs = document.querySelectorAll("[data-menu-group]");
  const hasMenuControls = Boolean(chipRow && groupTabs.length);
  const apiBaseUrl = (window.BECCA_API_BASE_URL || "").replace(/\/$/, "");

  if (!root) {
    return;
  }

  let menuData = null;
  let menuGroupOrder = [];
  let currentGroup = "food";

  async function loadMenuData() {
    const response = await fetch(`${apiBaseUrl}/api/menu`, {
      headers: {
        Accept: "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`Menu request failed with status ${response.status}`);
    }

    const payload = await response.json();
    if (payload && payload.success === false) {
      throw new Error(payload.message || "Menu request failed");
    }

    return payload && payload.data ? payload.data : payload;
  }

  function renderMenuStatus(title, message) {
    root.innerHTML = `
      <section class="menu-section is-visible">
        <div class="menu-section-head">
          <div>
            <p class="eyebrow">Menu</p>
            <h2>${escapeHtml(title)}</h2>
            <p class="menu-section-summary">${escapeHtml(message)}</p>
          </div>
        </div>
      </section>
    `;
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function setGroup(nextGroup) {
    currentGroup = nextGroup;

    if (!hasMenuControls) {
      renderMenu();
      return;
    }

    groupTabs.forEach((button) => {
      const isActive = button.getAttribute("data-menu-group") === nextGroup;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-selected", String(isActive));
    });

    renderCategoryChips();
    renderMenu();
  }

  function renderCategoryChips() {
    if (!chipRow) {
      return;
    }

    const categories = menuData[currentGroup].categories;
    chipRow.innerHTML = categories.map((category) => (
      `<button class="chip" type="button" data-target="${category.id}">${escapeHtml(category.title)}</button>`
    )).join("");

    chipRow.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", () => {
        const targetId = button.getAttribute("data-target");
        const target = document.getElementById(targetId);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
  }

  function renderItem(item, category) {
    const image = item.image || category.art;
    const imageType = item.imageType || category.artType || "photo";
    const typeClass = imageType === "icon" ? " is-icon" : imageType === "badge" ? " is-badge" : "";
    const note = item.note ? `<p class="menu-card-note">${escapeHtml(item.note)}</p>` : "";
    const imageAlt = `${item.name} from the Becca's Cafe menu`;

    return `
      <article class="menu-card${typeClass}">
        <div class="menu-card-media">
          <img src="${escapeHtml(image)}" alt="${escapeHtml(imageAlt)}">
        </div>
        <div class="menu-card-copy">
          <h3>${escapeHtml(item.name)}</h3>
          ${note}
          <p class="menu-card-price">${escapeHtml(item.price)}</p>
        </div>
      </article>
    `;
  }

  function renderCategory(category, group) {
      const typeClass = category.artType === "icon" ? " is-icon" : category.artType === "badge" ? " is-badge" : "";
      const footerNote = category.footerNote
        ? `<p class="menu-section-note">${escapeHtml(category.footerNote)}</p>`
        : "";
      return `
        <section class="menu-section reveal" id="${category.id}">
          <div class="menu-section-head">
            <div>
              <p class="eyebrow">${escapeHtml(group.title)}</p>
              <h2>${escapeHtml(category.title)}</h2>
              <p class="menu-section-summary">${escapeHtml(category.summary)}</p>
            </div>
          </div>
          <div class="menu-card-grid">
            ${category.items.map((item) => renderItem(item, category)).join("")}
          </div>
          ${footerNote}
        </section>
      `;
  }

  function renderMenu() {
    const groupsToRender = hasMenuControls ? [currentGroup] : menuGroupOrder;
    root.innerHTML = groupsToRender.map((groupKey) => {
      const group = menuData[groupKey];
      return group.categories.map((category) => renderCategory(category, group)).join("");
    }).join("");

    watchReveals(root);
  }

  async function initMenu() {
    renderMenuStatus("Loading menu", "Fetching the latest menu from the API.");

    try {
      menuData = await loadMenuData();
      menuGroupOrder = ["food", "drinks"].filter((key) => menuData && menuData[key]);

      if (!menuGroupOrder.length) {
        renderMenuStatus("Menu unavailable", "No menu groups were returned by the API.");
        return;
      }

      if (hasMenuControls) {
        groupTabs.forEach((button) => {
          button.addEventListener("click", () => {
            const nextGroup = button.getAttribute("data-menu-group");
            if (nextGroup && nextGroup !== currentGroup) {
              setGroup(nextGroup);
            }
          });
        });

        if (!menuData[currentGroup]) {
          currentGroup = menuGroupOrder[0];
        }

        setGroup(currentGroup);
        return;
      }

      renderMenu();
    } catch (error) {
      console.error("Failed to load menu data", error);
      renderMenuStatus("Menu unavailable", "Start the Go backend to load menu items.");
    }
  }

  initMenu();
})();
