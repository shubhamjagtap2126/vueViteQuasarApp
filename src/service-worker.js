self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("my-app-cache").then((cache) => {
      return cache.addAll([
        "/",
        "/index.html",
        "/assets/*",
        "/images/*",
        "/app.js",
        "/style.css",
        // Add other assets you want to cache here
      ]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
    })
  );
});
