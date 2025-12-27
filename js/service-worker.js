/**
 * Service Worker for Vikban Groups Website
 * Enables offline functionality and app-like experience on mobile
 * 
 * Cache Strategy: Network-first with fallback to cache
 * Supported: All modern browsers (Chrome, Firefox, Safari, Edge)
 */

const CACHE_VERSION = 'vikban-v1';
const CACHE_URLS = [
  '/',
  '/index.html',
  '/about.html',
  '/services.html',
  '/portfolio.html',
  '/contact.html',
  '/ai-solutions.html',
  '/css/styles.css',
  '/js/main.js',
  '/js/theme.js',
  '/js/utils.js',
  '/js/animations_.js',
  '/js/chatbot.js'
];

// Install event: Cache critical resources
self.addEventListener('install', event => {
  console.log('Service Worker: Installing...');
  event.waitUntil(
    caches.open(CACHE_VERSION).then(cache => {
      console.log('Service Worker: Caching app shell');
      return cache.addAll(CACHE_URLS);
    })
  );
  self.skipWaiting();
});

// Activate event: Clean up old caches
self.addEventListener('activate', event => {
  console.log('Service Worker: Activating...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(cacheName => cacheName !== CACHE_VERSION)
          .map(cacheName => {
            console.log('Service Worker: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          })
      );
    })
  );
  self.clients.claim();
});

// Fetch event: Network-first strategy with cache fallback
self.addEventListener('fetch', event => {
  const { request } = event;

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip external APIs (CDN requests)
  if (!request.url.includes(self.location.origin)) {
    return;
  }

  event.respondWith(
    fetch(request)
      .then(response => {
        // Cache successful responses
        if (response && response.status === 200) {
          const cache = caches.open(CACHE_VERSION);
          cache.then(c => c.put(request, response.clone()));
        }
        return response;
      })
      .catch(() => {
        // Fallback to cache if network fails
        return caches.match(request)
          .then(response => {
            if (response) {
              return response;
            }
            // Return offline page if available
            return caches.match('/index.html');
          });
      })
  );
});

// Background sync for chat messages (future enhancement)
self.addEventListener('sync', event => {
  if (event.tag === 'sync-chat') {
    event.waitUntil(syncChat());
  }
});

async function syncChat() {
  try {
    // Implement chat sync logic here
    console.log('Service Worker: Syncing chat messages');
  } catch (error) {
    console.error('Service Worker: Sync failed', error);
  }
}

// Push notifications (future enhancement)
self.addEventListener('push', event => {
  const options = {
    body: event.data ? event.data.text() : 'New notification',
    icon: '/assets/images/Vikban_Groups_icon.ico',
    badge: '/assets/images/Vikban_Groups_png.png'
  };

  event.waitUntil(
    self.registration.showNotification('Vikban Groups', options)
  );
});

console.log('Service Worker: Loaded');
