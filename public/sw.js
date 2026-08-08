// Service Worker بسيط جدًا — غرضه الأساسي تفعيل إمكانية "تثبيت الموقع كتطبيق" (PWA Installability).
// لا نقوم بتخزين مؤقت عدواني للبيانات لأن هذا موقع أسعار حية، ولا نريد عرض بيانات قديمة بالخطأ.

const CACHE_NAME = "saad-ai-trading-shell-v1";
const SHELL_FILES = ["/", "/index.html", "/manifest.json"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL_FILES)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// شبكة أولاً دائمًا (Network First) — نلجأ للنسخة المخزّنة فقط لو انقطع الاتصال بالكامل
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
