/**
 * DoorMaster Installation Ops - Progressive Web App Service Worker
 * Designed for offline job-site resilience, intermittent connectivity handling,
 * asset precaching, and key API payload caching (/api/doors, /api/doors/categories).
 */

const CACHE_VERSION = 'v2.2.0';
const STATIC_CACHE = `dm-static-${CACHE_VERSION}`;
const ASSET_CACHE = `dm-assets-${CACHE_VERSION}`;
const API_CACHE = `dm-api-${CACHE_VERSION}`;
const MAP_CACHE = `dm-maps-${CACHE_VERSION}`;

// Core static assets to precache immediately on service worker install (100% local, no external CDN dependencies)
const PRECACHE_SHELL = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  '/icon.svg',
  '/pwa-192x192.png',
  '/pwa-512x512.png',
  '/pwa-maskable-512x512.png',
  '/apple-touch-icon.png',
  '/fonts/material-symbols-outlined.woff2',
  '/fonts/material-icons.woff2',
  '/fonts/poppins-300.woff2',
  '/fonts/poppins-400.woff2',
  '/fonts/poppins-500.woff2',
  '/fonts/poppins-600.woff2',
  '/fonts/poppins-700.woff2',
  '/fonts/poppins-800.woff2',
  '/fonts/jetbrains-mono.woff2'
];

// Key API endpoints that must remain accessible for field installers offline
const CRITICAL_API_ENDPOINTS = [
  '/api/doors',
  '/api/doors/categories'
];

// Max map tiles to retain in map cache (LRU management)
const MAX_MAP_TILES = 250;

// =============================================================================
// LIFECYCLE: INSTALL
// =============================================================================
self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const staticCache = await caches.open(STATIC_CACHE);
      // Precache critical shell assets safely
      for (const url of PRECACHE_SHELL) {
        try {
          await staticCache.add(new Request(url, { cache: 'reload' }));
        } catch (err) {
          console.warn(`[DoorMaster SW] Non-fatal precache skip for: ${url}`, err);
        }
      }

      // Pre-warm key APIs immediately on install
      const apiCache = await caches.open(API_CACHE);
      for (const apiUrl of CRITICAL_API_ENDPOINTS) {
        try {
          const res = await fetch(apiUrl, { cache: 'no-cache' });
          if (res.ok) {
            await apiCache.put(apiUrl, res.clone());
          }
        } catch {
          // Will be handled during runtime fetch or offline storage
        }
      }

      // Force activation of newly installed service worker
      await self.skipWaiting();
    })()
  );
});

// =============================================================================
// LIFECYCLE: ACTIVATE
// =============================================================================
self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      // Clean up previous cache versions
      const currentCaches = [STATIC_CACHE, ASSET_CACHE, API_CACHE, MAP_CACHE];
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames
          .filter((name) => !currentCaches.includes(name))
          .map((name) => {
            console.log(`[DoorMaster SW] Deleting obsolete cache: ${name}`);
            return caches.delete(name);
          })
      );

      // Claim clients immediately so active page is under SW control right away
      await self.clients.claim();
    })()
  );
});

// =============================================================================
// STRATEGIES & REQUEST ROUTING
// =============================================================================
self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // 1. Only handle GET requests for caching
  if (req.method !== 'GET') {
    // For non-GET mutations (POST/PATCH/DELETE), allow network pass-through
    // If offline, the client PwaService handles offline queuing
    return;
  }

  // 2. Navigation Requests (Page reloads, deep links, SPA transitions)
  // Strategy: Network-First with quick timeout (2.0s), fallback to cached App Shell
  if (req.mode === 'navigate') {
    event.respondWith(handleNavigationRequest(req));
    return;
  }

  // 3. Key DoorMaster APIs (/api/doors, /api/doors/categories)
  // Strategy: Network-First with fallback to API cache
  if (url.pathname.startsWith('/api/doors')) {
    event.respondWith(handleKeyApiRequest(req));
    return;
  }

  // 4. OpenStreetMap Map Tiles (*.tile.openstreetmap.org/*)
  // Let the browser fetch directly from OpenStreetMap servers with native HTTP caching
  if (url.hostname.includes('tile.openstreetmap.org') || url.hostname.includes('leaflet')) {
    return;
  }

  // 5. Google Fonts / External CDNs
  if (url.hostname.includes('fonts.googleapis.com') || url.hostname.includes('fonts.gstatic.com')) {
    event.respondWith(handleCdnRequest(req, ASSET_CACHE));
    return;
  }

  // 6. Static local assets (JS, CSS, images, icons, manifest, favicon)
  if (
    url.origin === self.location.origin &&
    (url.pathname.match(/\.(js|css|png|jpg|jpeg|svg|webp|woff|woff2|ico|json)$/) ||
     url.pathname.startsWith('/assets/'))
  ) {
    event.respondWith(handleStaticAssetRequest(req));
    return;
  }

  // 7. Default: Stale-While-Revalidate
  event.respondWith(
    caches.match(req).then((cached) => {
      const fetchPromise = fetch(req).then((networkRes) => {
        if (networkRes && networkRes.status === 200) {
          const resClone = networkRes.clone();
          caches.open(ASSET_CACHE).then((cache) => cache.put(req, resClone));
        }
        return networkRes;
      }).catch(() => cached);
      return cached || fetchPromise;
    })
  );
});

// =============================================================================
// HANDLERS
// =============================================================================

/**
 * Handles navigation requests. Attempts fast network fetch; if offline or times out,
 * returns the cached application shell so the Installer portal never displays a browser offline error.
 */
async function handleNavigationRequest(req) {
  try {
    // 2-second network timeout for snappy response during intermittent reception
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Network timeout')), 2000)
    );
    const networkRes = await Promise.race([fetch(req), timeoutPromise]);
    if (networkRes && networkRes.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(req, networkRes.clone());
      return networkRes;
    }
  } catch {
    // Fallback to cached shell on timeout or offline
  }

  // Return cached page or root app shell
  const cachedRes = (await caches.match(req)) || (await caches.match('/')) || (await caches.match('/index.html'));
  if (cachedRes) {
    return cachedRes;
  }

  // Emergency offline HTML fallback if shell missing from cache
  return new Response(
    `<!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>DoorMaster - Offline Mode</title>
        <style>
          body { font-family: system-ui, sans-serif; background: #0f172a; color: #f8fafc; padding: 2rem; text-align: center; }
          .card { max-width: 420px; margin: 4rem auto; background: #1e293b; padding: 2rem; border-radius: 1rem; border: 1px solid #334155; }
          h1 { color: #38bdf8; font-size: 1.25rem; }
          p { color: #94a3b8; font-size: 0.875rem; line-height: 1.5; }
          button { background: #0284c7; color: white; border: 0; padding: 0.6rem 1.2rem; border-radius: 0.5rem; font-weight: bold; cursor: pointer; margin-top: 1rem; }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>DoorMaster Job Site Offline Mode</h1>
          <p>You are currently operating in an area with intermittent cellular coverage. Please reload once connectivity returns or use the installed PWA.</p>
          <button onclick="window.location.reload()">Retry Connection</button>
        </div>
      </body>
    </html>`,
    { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
  );
}

/**
 * Handles Key DoorMaster API payloads (/api/doors, /api/doors/categories).
 * Uses Network-First with fallback to API cache and background refresh.
 * Appends diagnostic headers for offline visibility.
 */
async function handleKeyApiRequest(req) {
  const apiCache = await caches.open(API_CACHE);

  try {
    // Quick 1.8s timeout for API requests on job sites
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('API network timeout')), 1800)
    );
    const networkRes = await Promise.race([fetch(req), timeoutPromise]);

    if (networkRes && networkRes.ok) {
      // Store fresh copy in API cache
      await apiCache.put(req, networkRes.clone());
      return networkRes;
    }
  } catch (err) {
    console.log(`[DoorMaster SW] Network unavailable for ${req.url}. Serving from offline API cache.`);
  }

  // Fallback to cached API payload
  const cachedRes = await apiCache.match(req);
  if (cachedRes) {
    // Clone and inject custom offline status header
    const headers = new Headers(cachedRes.headers);
    headers.set('X-DoorMaster-Offline-Cache', 'true');
    headers.set('X-DoorMaster-Cache-Date', new Date().toISOString());

    return new Response(await cachedRes.blob(), {
      status: cachedRes.status,
      statusText: cachedRes.statusText,
      headers
    });
  }

  // If no cache entry exists, return a graceful offline JSON response
  return new Response(
    JSON.stringify({
      success: true,
      offline: true,
      message: 'Operating offline with local hardware specs cache.',
      doors: [],
      categories: ['Security Doors', 'Interior Doors', 'Hardware & Locks', 'Acoustic Slabs']
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'X-DoorMaster-Offline-Cache': 'synthetic-fallback'
      }
    }
  );
}

/**
 * Handles OpenStreetMap map tiles if needed.
 * Always passes live tiles without injecting synthetic text placeholders.
 */
async function handleMapTileRequest(req) {
  try {
    const networkRes = await fetch(req);
    if (networkRes && networkRes.ok) {
      return networkRes;
    }
  } catch {
    // Network unavailable
  }

  // Return a completely transparent 256x256 tile without any text overlay
  const transparentSvgTile = `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256"></svg>`;

  return new Response(transparentSvgTile, {
    status: 200,
    headers: { 'Content-Type': 'image/svg+xml' }
  });
}

/**
 * Handles static assets (JS bundles, CSS, images, icons).
 * Strategy: Cache-First with background revalidation (Stale-While-Revalidate).
 */
async function handleStaticAssetRequest(req) {
  const cachedRes = await caches.match(req);
  if (cachedRes) {
    // Fetch in background to update cache for next load
    fetch(req).then(async (networkRes) => {
      if (networkRes && networkRes.ok) {
        const cache = await caches.open(ASSET_CACHE);
        await cache.put(req, networkRes);
      }
    }).catch(() => {/* ignore background fetch failure */});

    return cachedRes;
  }

  try {
    const networkRes = await fetch(req);
    if (networkRes && networkRes.ok) {
      const cache = await caches.open(ASSET_CACHE);
      await cache.put(req, networkRes.clone());
      return networkRes;
    }
  } catch {
    // Fail silently
  }

  return new Response(null, { status: 404 });
}

/**
 * Handles external CDN assets (Google Fonts, etc.).
 */
async function handleCdnRequest(req, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req);
  if (cached) return cached;

  try {
    const networkRes = await fetch(req);
    if (networkRes && networkRes.ok) {
      await cache.put(req, networkRes.clone());
      return networkRes;
    }
  } catch {
    // Network offline or CDN timeout
  }

  // Gracefully fallback instead of throwing 504 Gateway Timeout
  if (cached) return cached;
  if (req.url.includes('fonts.googleapis.com')) {
    return new Response('/* Google Fonts offline fallback - using local fonts */', {
      status: 200,
      headers: { 'Content-Type': 'text/css' }
    });
  }
  return new Response(null, { status: 204 });
}

/**
 * Trims a cache to maximum entries using FIFO/LRU deletion.
 */
async function trimCache(cacheName, maxItems) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  if (keys.length > maxItems) {
    const toDelete = keys.slice(0, keys.length - maxItems);
    await Promise.all(toDelete.map((k) => cache.delete(k)));
  }
}

// =============================================================================
// CLIENT MESSAGING & JOB SITE SYNC
// =============================================================================
self.addEventListener('message', async (event) => {
  const { data, source } = event;
  if (!data || !data.type) return;

  switch (data.type) {
    case 'SKIP_WAITING':
      self.skipWaiting();
      break;

    case 'PRECACHE_JOB_SITE': {
      // Technician explicitly clicked "Pre-cache for Job Site" before leaving workshop
      console.log('[DoorMaster SW] Pre-caching job site resources and door catalog...');
      const apiCache = await caches.open(API_CACHE);
      const results = [];

      for (const endpoint of CRITICAL_API_ENDPOINTS) {
        try {
          const res = await fetch(endpoint, { cache: 'reload' });
          if (res.ok) {
            await apiCache.put(endpoint, res.clone());
            results.push({ endpoint, status: 'cached' });
          }
        } catch (e) {
          results.push({ endpoint, status: 'failed', error: String(e) });
        }
      }

      if (source && source.postMessage) {
        source.postMessage({
          type: 'PRECACHE_COMPLETE',
          timestamp: Date.now(),
          results
        });
      }
      break;
    }

    case 'GET_CACHE_STATUS': {
      // Calculate cache sizes for technician diagnostics
      const staticKeys = await (await caches.open(STATIC_CACHE)).keys();
      const assetKeys = await (await caches.open(ASSET_CACHE)).keys();
      const apiKeys = await (await caches.open(API_CACHE)).keys();
      const mapKeys = await (await caches.open(MAP_CACHE)).keys();

      if (source && source.postMessage) {
        source.postMessage({
          type: 'CACHE_STATUS_RESPONSE',
          version: CACHE_VERSION,
          staticCount: staticKeys.length,
          assetCount: assetKeys.length,
          apiCount: apiKeys.length,
          mapTilesCount: mapKeys.length,
          totalCached: staticKeys.length + assetKeys.length + apiKeys.length + mapKeys.length
        });
      }
      break;
    }
  }
});
