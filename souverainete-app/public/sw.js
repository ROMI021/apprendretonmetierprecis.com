// ============================================================
//  Service Worker — Souveraineté Académie des Systèmes Critiques
//  Stratégie hybride :
//    - Cache-First   : assets statiques JS/CSS/images + MathJax CDN
//    - Network-First : pages HTML (avec fallback cache hors ligne)
// ============================================================

const CACHE_VERSION = 'v3';
const STATIC_CACHE  = `souverainete-static-${CACHE_VERSION}`;
const PAGES_CACHE   = `souverainete-pages-${CACHE_VERSION}`;
const MATH_CACHE    = `souverainete-math-${CACHE_VERSION}`;

// Pages à mettre en cache dès l'installation
const PRECACHE_PAGES = [
  '/',
  '/parcours',
  '/journal',
  '/offline.html',
  '/manifest.json',
];

// ── INSTALLATION ──────────────────────────────────────────────
self.addEventListener('install', (event) => {
  console.log('[SW] Installation, version:', CACHE_VERSION);
  event.waitUntil(
    caches.open(PAGES_CACHE)
      .then((cache) => {
        return Promise.allSettled(
          PRECACHE_PAGES.map((url) =>
            fetch(url, { credentials: 'same-origin' })
              .then((res) => {
                if (res.ok) return cache.put(url, res);
              })
              .catch((err) => console.warn('[SW] Pré-cache échoué:', url, err))
          )
        );
      })
      .then(() => {
        console.log('[SW] Pré-cache terminé');
        return self.skipWaiting();
      })
  );
});

// ── ACTIVATION : nettoyage des anciens caches ─────────────────
self.addEventListener('activate', (event) => {
  console.log('[SW] Activation, version:', CACHE_VERSION);
  const allowed = [STATIC_CACHE, PAGES_CACHE, MATH_CACHE];
  event.waitUntil(
    caches.keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((k) => !allowed.includes(k))
            .map((k) => {
              console.log('[SW] Suppression ancien cache:', k);
              return caches.delete(k);
            })
        )
      )
      .then(() => self.clients.claim())
  );
});

// ── FETCH : interception des requêtes ─────────────────────────
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignorer tout ce qui n'est pas GET
  if (request.method !== 'GET') return;

  // Ignorer les extensions navigateur
  if (!url.protocol.startsWith('http')) return;

  // Ignorer les websockets Next.js en dev
  if (url.pathname.startsWith('/_next/webpack-hmr')) return;

  // ① MathJax et ressources CDN jsDelivr → Cache-First
  if (
    url.hostname.includes('jsdelivr.net') ||
    url.hostname.includes('mathjax.org') ||
    url.hostname.includes('cdnjs.cloudflare.com')
  ) {
    event.respondWith(cacheFirst(request, MATH_CACHE));
    return;
  }

  // ② Assets statiques Next.js → Cache-First (hachés, immuables)
  if (url.pathname.startsWith('/_next/static/')) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
    return;
  }

  // ③ Fichiers publics (images, fonts, icônes) → Cache-First
  if (url.origin === self.location.origin &&
      url.pathname.match(/\.(png|jpg|jpeg|svg|gif|webp|ico|woff2?|ttf|otf|css)$/)) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
    return;
  }

  // ④ Pages de l'app → Network-First avec fallback cache
  if (url.origin === self.location.origin) {
    event.respondWith(networkFirstWithFallback(request));
    return;
  }
});

// ── MESSAGE : forcer la mise à jour depuis le client ──────────
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  // Pré-cacher une URL spécifique (ex: session visitée)
  if (event.data && event.data.type === 'CACHE_URL') {
    const urlToCache = event.data.url;
    caches.open(PAGES_CACHE).then((cache) => {
      fetch(urlToCache, { credentials: 'same-origin' })
        .then((res) => { if (res.ok) cache.put(urlToCache, res); })
        .catch(() => {});
    });
  }
});

// ── STRATÉGIES ────────────────────────────────────────────────

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) {
    // Rafraîchit en arrière-plan (stale-while-revalidate)
    fetch(request).then((fresh) => {
      if (fresh && fresh.status === 200) cache.put(request, fresh);
    }).catch(() => {});
    return cached;
  }
  try {
    const response = await fetch(request);
    if (response && response.status === 200) {
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return new Response('Ressource non disponible hors ligne.', {
      status: 503,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }
}

async function networkFirstWithFallback(request) {
  const cache = await caches.open(PAGES_CACHE);
  try {
    const response = await fetch(request, { signal: AbortSignal.timeout(5000) });
    if (response && response.status === 200) {
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await cache.match(request);
    if (cached) {
      console.log('[SW] Hors ligne — servi depuis le cache:', request.url);
      return cached;
    }
    // Fallback ultime
    const offline = await caches.match('/offline.html');
    return offline || new Response(
      `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8">
       <title>Hors ligne</title></head><body style="font-family:sans-serif;text-align:center;padding:4rem;background:#0f172a;color:#f1f5f9">
       <h1>📡 Hors ligne</h1>
       <p>Visitez cette page une fois connecté pour la mettre en cache.</p>
       <a href="/" style="color:#93c5fd">← Retour à l'accueil</a></body></html>`,
      { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
    );
  }
}
