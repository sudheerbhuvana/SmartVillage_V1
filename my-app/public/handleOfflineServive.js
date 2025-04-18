// service-worker.js
const cacheName = "offlineCacheV1";
const offlinePages = ["/offline.html"]; 

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(offlinePages); 
    })
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    fetch(e.request).catch((error) => {
      return caches.match(e.request).then((response) => {
        if (response) {
          return response;
        } else if (e.request.headers.get("accept").includes("text/html")) {
          return caches.match("/offline.html");
        }
      });
    })
  );
});