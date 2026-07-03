/* ==========================================================================
   SERVICE WORKER — offline support for FF Paid Zone Push.

   Bump CACHE_VERSION whenever you change site files. Old caches are purged
   automatically on the next visit, so returning users get fresh content.
   ========================================================================== */

const CACHE_VERSION = "v1";
const CACHE_NAME = `ffpzp-${CACHE_VERSION}`;

const APP_SHELL = [
  "/",
  "/index.html",
  "/faq.html",
  "/about.html",
  "/privacy.html",
  "/terms.html",
  "/contact.html",
  "/offline.html",
  "/manifest.json",
  "/css/styles.css",
  "/css/components.css",
  "/js/i18n.js",
  "/js/faq-data.js",
  "/js/support-engine.js",
  "/js/particles.js",
  "/js/main.js",
  "/js/order.js",
  "/js/chat-widget.js",
  "/js/faq-page.js",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/favicon.ico",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  // Never intercept the Telegram logging calls — always go straight to network.
  if (request.url.includes("api.telegram.org")) return;

  const isNavigation = request.mode === "navigate";

  if (isNavigation) {
    // Network-first for pages, so content stays fresh when online.
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match("/offline.html")))
    );
    return;
  }

  // Cache-first for static assets, with opportunistic runtime caching.
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request)
        .then((response) => {
          if (response.ok && request.url.startsWith(self.location.origin)) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => cached);
    })
  );
});
