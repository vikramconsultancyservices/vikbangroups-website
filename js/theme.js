/**
 * theme.js — Theme Toggle Manager
 * Handles dark/light mode switching with localStorage persistence
 * 
 * Features:
 * - Respects system preference on first visit
 * - Persists user choice in localStorage
 * - Smooth transitions between themes
 * - Works with all pages
 */

(() => {
  "use strict";

  const THEME_KEY = "vikban-theme";
  const DARK_THEME_CLASS = "dark-theme";

  /**
   * Initialize theme on page load
   */
  function initTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    // Determine theme: saved > system preference > light (default)
    const isDark = savedTheme ? savedTheme === "dark" : prefersDark;

    if (isDark) {
      applyDarkTheme();
    } else {
      applyLightTheme();
    }

    setupToggleButton();
  }

  /**
   * Apply dark theme
   */
  function applyDarkTheme() {
    document.documentElement.classList.add(DARK_THEME_CLASS);
    localStorage.setItem(THEME_KEY, "dark");
    updateToggleButtonIcon(true);
  }

  /**
   * Apply light theme
   */
  function applyLightTheme() {
    document.documentElement.classList.remove(DARK_THEME_CLASS);
    localStorage.setItem(THEME_KEY, "light");
    updateToggleButtonIcon(false);
  }

  /**
   * Setup theme toggle button
   */
  function setupToggleButton() {
    let toggleBtn = document.getElementById("theme-toggle");

    // Create button if it doesn't exist
    if (!toggleBtn) {
      toggleBtn = document.createElement("button");
      toggleBtn.id = "theme-toggle";
      toggleBtn.setAttribute("aria-label", "Toggle dark/light theme");
      toggleBtn.setAttribute("title", "Toggle Theme");
      document.body.appendChild(toggleBtn);
    }

    const isDark = document.documentElement.classList.contains(DARK_THEME_CLASS);
    updateToggleButtonIcon(isDark);

    // Add click event listener
    toggleBtn.addEventListener("click", toggleTheme);
  }

  /**
   * Update toggle button icon based on current theme
   * @param {boolean} isDark - Whether dark theme is active
   */
  function updateToggleButtonIcon(isDark) {
    const toggleBtn = document.getElementById("theme-toggle");
    if (toggleBtn) {
      toggleBtn.innerHTML = isDark 
        ? '<i class="fas fa-sun"></i>' 
        : '<i class="fas fa-moon"></i>';
    }
  }

  /**
   * Toggle between light and dark themes
   */
  function toggleTheme() {
    const isDark = document.documentElement.classList.contains(DARK_THEME_CLASS);
    
    if (isDark) {
      applyLightTheme();
    } else {
      applyDarkTheme();
    }
  }

  /**
   * Listen for system theme changes
   */
  function listenForSystemThemeChange() {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    
    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", (e) => {
        // Only apply if user hasn't manually set a preference
        if (!localStorage.getItem(THEME_KEY)) {
          if (e.matches) {
            applyDarkTheme();
          } else {
            applyLightTheme();
          }
        }
      });
    }
  }

  /**
   * Bootstrap theme system
   */
  function bootstrap() {
    initTheme();
    listenForSystemThemeChange();
  }

  // Initialize on DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootstrap);
  } else {
    bootstrap();
  }
})();
