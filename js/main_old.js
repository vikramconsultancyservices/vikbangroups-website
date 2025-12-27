// ===============================
// Header/Footer Loading
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  // Load header
  fetch("../components/header.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("header").innerHTML = data;
      highlightActiveMenu();
    });

  // Load footer
  fetch("../components/footer.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("footer").innerHTML = data;
    });
});

// ===============================
// Highlight Active Menu
// ===============================
function highlightActiveMenu() {
  const currentPage = window.location.pathname.split("/").pop();
  const links = document.querySelectorAll("nav a");

  links.forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });
}

// ===============================
// Smooth Scroll for Anchor Links
// ===============================
document.addEventListener("click", (e) => {
  if (e.target.tagName === "A" && e.target.getAttribute("href").startsWith("#")) {
    e.preventDefault();
    const targetId = e.target.getAttribute("href").substring(1);
    const target = document.getElementById(targetId);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 70,
        behavior: "smooth",
      });
    }
  }
});

// ===============================
// Header Background on Scroll
// ===============================
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// ===============================
// Stats Animation
// ===============================
function animateValue(id, start, end, duration) {
  const obj = document.getElementById(id);
  const range = end - start;
  let startTime = null;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    obj.textContent = Math.floor(progress * range + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  }

  window.requestAnimationFrame(step);
}

document.addEventListener("DOMContentLoaded", () => {
  animateValue("students", 0, 500, 2000);
  animateValue("courses", 0, 120, 2000);
  animateValue("placements", 0, 300, 2000);
});

// ===============================
// Hover Effects
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".hover-card");
  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => card.classList.add("hover"));
    card.addEventListener("mouseleave", () => card.classList.remove("hover"));
  });
});

// ===============================
// Client Scroll (Manual Buttons)
// ===============================
function scrollClients(direction) {
  const container = document.getElementById("clientScroll");
  const scrollAmount = 310; // width of card + gap

  if (direction === "left") {
    container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  } else {
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  }
}

// ===============================
// Client Auto-Scroller (Ping-Pong)
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("clientScroll");
  if (!container) return;

  let scrollInterval = null;
  let direction = 1; // 1 = right, -1 = left
  const speed = 2; // px per frame
  const intervalMs = 20; // frame duration
  const pauseAtEdgeMs = 1500; // pause at ends

  function startAutoScroll() {
    if (scrollInterval) return;
    scrollInterval = setInterval(() => {
      const maxScroll = container.scrollWidth - container.clientWidth;

      if (direction === 1 && container.scrollLeft >= maxScroll) {
        clearInterval(scrollInterval);
        scrollInterval = null;
        setTimeout(() => {
          direction = -1;
          startAutoScroll();
        }, pauseAtEdgeMs);
      } else if (direction === -1 && container.scrollLeft <= 0) {
        clearInterval(scrollInterval);
        scrollInterval = null;
        setTimeout(() => {
          direction = 1;
          startAutoScroll();
        }, pauseAtEdgeMs);
      } else {
        container.scrollLeft += direction * speed;
      }
    }, intervalMs);
  }

  function stopAutoScroll() {
    clearInterval(scrollInterval);
    scrollInterval = null;
  }

  // Hover/touch pause
  container.addEventListener("mouseenter", stopAutoScroll);
  container.addEventListener("mouseleave", startAutoScroll);
  container.addEventListener("touchstart", stopAutoScroll);
  container.addEventListener("touchend", startAutoScroll);

  // Pause when page hidden
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopAutoScroll();
    else startAutoScroll();
  });

  // Restart on resize
  window.addEventListener("resize", () => {
    stopAutoScroll();
    startAutoScroll();
  });

  // Expose API
  window.__clientScroller = {
    start: startAutoScroll,
    stop: stopAutoScroll,
    isRunning: () => !!scrollInterval,
  };

  // Start initially
  startAutoScroll();
});



// Hamburger menu toggle - Mobile
// Hamburger menu toggle
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const nav = document.getElementById("navMenu");

  if (hamburger && nav) {
    hamburger.addEventListener("click", () => {
      nav.classList.toggle("active");
      hamburger.classList.toggle("active");
    });
  }
});



// document.addEventListener("click", (e) => {
//   if (!e.target.closest(".nav") && !e.target.closest(".hamburger")) {
//     nav.classList.remove("active");
//     hamburger.classList.remove("active");
//   }
// });



