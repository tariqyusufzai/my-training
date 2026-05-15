const CACHE = "my-training-v1";
const ASSETS = [
  "/my-training/",
  "/my-training/index.html",
  "/my-training/manifest.json",
  "/my-training/icons/icon-192.png",
  "/my-training/icons/icon-512.png",
  "/my-training/icons/apple-touch-icon.png"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(cached => {
      return cached || fetch(e.request).catch(() => caches.match("/my-training/index.html"));
    })
  );
});
