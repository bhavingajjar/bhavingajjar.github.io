(() => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const header = document.querySelector(".site-header");
  const nav = document.getElementById("site-nav");
  const toggle = document.querySelector(".nav-toggle");
  const backdrop = document.querySelector(".nav-backdrop");
  const desktopQuery = window.matchMedia("(min-width: 861px)");

  const setNavOpen = (open) => {
    if (!nav || !toggle) return;

    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    backdrop?.classList.toggle("is-visible", open);
    document.body.classList.toggle("nav-open", open);

    if (backdrop) {
      backdrop.hidden = !open;
      backdrop.setAttribute("aria-hidden", open ? "false" : "true");
    }
  };

  const closeNav = () => setNavOpen(false);

  toggle?.addEventListener("click", () => {
    setNavOpen(!nav.classList.contains("is-open"));
  });

  backdrop?.addEventListener("click", closeNav);

  nav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNav);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeNav();
  });

  const handleViewportChange = () => {
    if (desktopQuery.matches) closeNav();
  };

  if (typeof desktopQuery.addEventListener === "function") {
    desktopQuery.addEventListener("change", handleViewportChange);
  } else {
    desktopQuery.addListener(handleViewportChange);
  }

  const onScroll = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 12);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealEls = document.querySelectorAll("[data-reveal]");

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
  );

  revealEls.forEach((el) => {
    if (el.classList.contains("site-header")) {
      requestAnimationFrame(() => el.classList.add("is-visible"));
    } else {
      observer.observe(el);
    }
  });
})();
