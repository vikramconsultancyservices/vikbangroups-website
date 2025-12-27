
function scrollClients(direction) {
  const el = document.getElementById('clientScroll');
  if (!el) return;

  // compute one "page": card width + flex gap
  const firstCard = el.querySelector('.client-card');
  const styles = getComputedStyle(el);
  const gap = parseFloat(styles.gap || '0');
  const cardWidth = firstCard ? firstCard.getBoundingClientRect().width : 280;
  const page = Math.round(cardWidth + gap);

  el.scrollBy({
    left: direction === 'left' ? -page : page,
    behavior: 'smooth'
  });
}

document.addEventListener("DOMContentLoaded", () => {
  (function clientScrollerPingPong({
    initialDirection = -1, // -1 => start right->left, 1 => start left->right
    speedPxPerMs = 0.12,   // px per millisecond (tweak speed)
    pauseAtEdgeMs = 700,   // ms pause at each end
    edgeEpsilon = 1        // px tolerance
  } = {}) {
    const container = document.getElementById("clientScroll");
    if (!container) {
      console.warn("clientScroller: #clientScroll not found");
      return;
    }

    // Prevent double initialization
    if (window.__clientScrollerActive) {
      console.warn("clientScroller: already active");
      return;
    }
    window.__clientScrollerActive = true;

    // Buttons (optional)
    const leftBtn = document.querySelector(".scroll-btn.left");
    const rightBtn = document.querySelector(".scroll-btn.right");

    function getGap() {
      const styles = getComputedStyle(container);
      return parseFloat(styles.gap || styles.columnGap || "16") || 16;
    }
    function getCardWidth() {
      const first = container.querySelector(".client-card");
      return first ? Math.round(first.getBoundingClientRect().width) : 280;
    }
    function pageSize() {
      return getCardWidth() + getGap();
    }
    function pageScroll(dir) {
      const page = pageSize();
      container.scrollBy({ left: dir === "left" ? -page : page, behavior: "smooth" });
    }

    if (leftBtn) leftBtn.addEventListener("click", () => pageScroll("left"));
    if (rightBtn) rightBtn.addEventListener("click", () => pageScroll("right"));
    window.scrollClients = (dir) => pageScroll(dir === "left" ? "left" : "right");

    // If content does not overflow horizontally, don't start auto-scroll
    function hasOverflow() {
      return container.scrollWidth > container.clientWidth + 0.5;
    }

    // rAF based ping-pong
    let running = true;
    let userPaused = false;
    let pauseUntilTs = 0;
    let dir = initialDirection >= 0 ? 1 : -1; // 1 -> move to right (increase scrollLeft), -1 -> move to left
    let lastTs = null;
    let rafId = null;

    // If initialDirection is -1 (right->left), start at rightmost edge
    function setInitialPositionIfNeeded() {
      if (!hasOverflow()) return;
      if (initialDirection < 0) {
        container.scrollLeft = Math.max(0, container.scrollWidth - container.clientWidth);
      } else {
        container.scrollLeft = 0;
      }
    }

    // Pause helpers
    function pauseFor(ms) { pauseUntilTs = performance.now() + ms; }
    function isPausedByEdge(now) { return now < pauseUntilTs; }

    // Interaction pause/resume
    container.addEventListener("mouseenter", () => { userPaused = true; }, { passive: true });
    container.addEventListener("mouseleave", () => { userPaused = false; }, { passive: true });
    container.addEventListener("touchstart", () => { userPaused = true; }, { passive: true });
    container.addEventListener("touchend", () => { userPaused = false; }, { passive: true });

    // Visibility API stops animation when tab hidden
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        running = false;
        if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
      } else {
        if (!running) { running = true; lastTs = null; rafId = requestAnimationFrame(step); }
      }
    });

    // Reset timing on resize (layout may change)
    window.addEventListener("resize", () => { lastTs = null; });

    function maxScroll() { return Math.max(0, container.scrollWidth - container.clientWidth); }

    function step(ts) {
      if (!running) return;
      if (!hasOverflow()) { rafId = requestAnimationFrame(step); return; }

      if (!lastTs) lastTs = ts;
      const dt = ts - lastTs;
      lastTs = ts;

      if (userPaused || isPausedByEdge(ts)) {
        rafId = requestAnimationFrame(step);
        return;
      }

      // compute movement (time-based)
      const move = speedPxPerMs * dt * dir;
      let next = container.scrollLeft + move;
      const max = maxScroll();
      const eps = edgeEpsilon;

      // reached right end while moving right -> reverse
      if (dir === 1 && next >= max - eps) {
        container.scrollLeft = max; // snap exactly
        dir = -1;
        pauseFor(pauseAtEdgeMs);
        lastTs = null;
      }
      // reached left end while moving left -> reverse
      else if (dir === -1 && next <= eps) {
        container.scrollLeft = 0; // snap
        dir = 1;
        pauseFor(pauseAtEdgeMs);
        lastTs = null;
      } else {
        container.scrollLeft = next;
      }

      rafId = requestAnimationFrame(step);
    }

    // initialize position then start
    // small timeout to ensure fonts/images/layout have settled
    setTimeout(() => {
      setInitialPositionIfNeeded();
      lastTs = null;
      rafId = requestAnimationFrame(step);
    }, 80);

    // Expose control if needed
    window.__clientScroller = {
      stop: () => { running = false; if (rafId) { cancelAnimationFrame(rafId); rafId = null; } },
      start: () => { if (!running) { running = true; lastTs = null; rafId = requestAnimationFrame(step); } },
      isRunning: () => running
    };
  })({ initialDirection: -1, speedPxPerMs: 0.12, pauseAtEdgeMs: 700, edgeEpsilon: 1 });
});


