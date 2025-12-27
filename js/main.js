/**
 * main.js — FINAL PRODUCTION VERSION
 * Single owner of:
 * - Header & Footer loading
 * - Active navigation
 * - Hamburger menu
 * - Header scroll state
 * - Stats counter
 * - Portfolio & Home client scroller (manual + auto)
 */

(() => {
  "use strict";

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  /* ===========================
     Load Header / Footer
     =========================== */
  async function loadPartial(id, url) {
    const el = document.getElementById(id);
    if (!el) return;
    try {
      const res = await fetch(url);
      el.innerHTML = await res.text();
    } catch (e) {
      console.error(`Failed to load ${url}`, e);
    }
  }

  /* ===========================
     Header logic
     =========================== */
  function initHeader() {
  const header = document.getElementById("header");
  if (!header) return;

  const currentPage =
    location.pathname.split("/").pop() || "index.html";

  header.querySelectorAll("nav a").forEach(link => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === currentPage
    );
  });

  const hamburger = header.querySelector(".hamburger");
  const nav = header.querySelector(".nav");

  if (hamburger && nav) {
    hamburger.addEventListener("click", () => {
      nav.classList.toggle("active");
      hamburger.classList.toggle("active");
    });
  }
}


  /* ===========================
     Header scroll effect
     =========================== */
  function initHeaderScroll() {
    const header = document.querySelector(".site-header");
    const topBar = document.querySelector(".top-bar");
    const themeToggle = document.getElementById("theme-toggle");
    if (!header) return;

    let lastScrollY = 0;
    let ticking = false;

    function updateHeaderVisibility() {
      const currentScrollY = window.scrollY;
      const scrollDirection = currentScrollY > lastScrollY ? "down" : "up";

      if (currentScrollY > 100) {
        // Show/hide based on scroll direction
        if (scrollDirection === "down") {
          header.classList.add("hide-header");
          if (topBar) topBar.classList.add("hide-header");
          if (themeToggle) themeToggle.classList.add("hide-header");
        } else {
          header.classList.remove("hide-header");
          if (topBar) topBar.classList.remove("hide-header");
          if (themeToggle) themeToggle.classList.remove("hide-header");
        }
      } else {
        // Always show header at the top
        header.classList.remove("hide-header");
        if (topBar) topBar.classList.remove("hide-header");
        if (themeToggle) themeToggle.classList.remove("hide-header");
      }

      // Add scrolled class for styling
      header.classList.toggle("scrolled", currentScrollY > 30);

      lastScrollY = currentScrollY;
      ticking = false;
    }

    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(updateHeaderVisibility);
        ticking = true;
      }
    }, { passive: true });
  }

  /* ===========================
     Stats counter
     =========================== */
  function initStats() {
    const stats = $$(".stat-item h3");
    if (!stats.length) return;

    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const el = entry.target;
        const raw = el.textContent;
        const target = parseInt(raw.replace(/\D/g, ""), 10);
        let current = 0;

        const timer = setInterval(() => {
          current += Math.max(1, Math.round(target / 40));
          if (current >= target) {
            el.textContent = raw;
            clearInterval(timer);
          } else {
            el.textContent =
              current + (raw.includes("+") ? "+" : "");
          }
        }, 30);

        io.unobserve(el);
      });
    }, { threshold: 0.4 });

    stats.forEach(s => io.observe(s));
  }

  // Load header and footer from separate HTML files
  async function loadHeaderFooter() {
  const headerEl = document.getElementById("header");
  const footerEl = document.getElementById("footer");

  try {
    // if (headerEl) {
    //   const headerRes = await fetch("components/header.html");
    //   headerEl.innerHTML = await headerRes.text();
    // }

    if (footerEl) {
      const footerRes = await fetch("components/footer.html");
      footerEl.innerHTML = await footerRes.text();
    }
  } catch (err) {
    console.error("Header/Footer load failed", err);
  }
}


  /* ===========================
     CLIENT SCROLLER (FINAL)
     =========================== */
 function initClientScroller() {
  const wrapper = document.querySelector(".scroll-wrapper");
  if (!wrapper) return; // not portfolio page

  const container = wrapper.querySelector("#clientScroll");
  if (!container) return;

  const cards = container.querySelectorAll(".client-card");
  if (!cards.length) return;

  const leftBtn = wrapper.querySelector(".scroll-btn.left");
  const rightBtn = wrapper.querySelector(".scroll-btn.right");

  const gap = parseFloat(getComputedStyle(container).gap || 16);
  const cardWidth = cards[0].offsetWidth;
  const scrollByAmount = cardWidth + gap;

  /* ---------- Manual Scroll ---------- */
  leftBtn.addEventListener("click", () => {
    container.scrollBy({ left: -scrollByAmount, behavior: "smooth" });
  });

  rightBtn.addEventListener("click", () => {
    container.scrollBy({ left: scrollByAmount, behavior: "smooth" });
  });

  /* ---------- Auto Scroll ---------- */
  let direction = 1;
  let paused = false;

  function maxScroll() {
    return container.scrollWidth - container.clientWidth;
  }

  function autoScroll() {
    if (!paused) {
      container.scrollLeft += direction * 0.6;

      if (container.scrollLeft >= maxScroll()) {
        direction = -1;
      } else if (container.scrollLeft <= 0) {
        direction = 1;
      }
    }
    requestAnimationFrame(autoScroll);
  }

  container.addEventListener("mouseenter", () => paused = true);
  container.addEventListener("mouseleave", () => paused = false);
  container.addEventListener("touchstart", () => paused = true, { passive: true });
  container.addEventListener("touchend", () => paused = false, { passive: true });

  requestAnimationFrame(autoScroll);
}

  /* ===========================
     Bootstrap
     =========================== */


 async function bootstrap() {
  // 1. Load shared layout first
  await loadHeaderFooter();

  // 2. Initialize header behavior (REQUIRED)
  initHeader();
  initHeaderScroll();

  // 3. Page-specific features
  initClientScroller();   // Portfolio only (safe check inside)
  //initStats();            // Home / About only (safe check inside)
}
document.addEventListener("DOMContentLoaded", bootstrap);

  // Register Service Worker for PWA & offline support
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('js/service-worker.js')
      .then(registration => {
        console.log('Service Worker registered successfully:', registration);
      })
      .catch(error => {
        console.warn('Service Worker registration failed:', error);
      });
  }

})();
