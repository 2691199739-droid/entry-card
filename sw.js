/* MDAC 入境卡助手 Service Worker
   策略：同源 GET 走「网络优先」，联网时永远拿最新（保证「一处更新、人人最新」）；
   断网时回退缓存。跨域资源（tesseract 引擎 / 语言包等 CDN）直接放行，不缓存不拦截。 */
const CACHE = 'mdac-pwa-v1';
self.addEventListener('install', (e) => { self.skipWaiting(); });
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  let url;
  try { url = new URL(req.url); } catch (err) { return; }
  if (url.origin !== self.location.origin) return; // 跨域（CDN）放行
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then((res) => {
        const cp = res.clone();
        caches.open(CACHE).then((c) => c.put(req, cp));
        return res;
      }).catch(() => caches.match(req))
    );
  }
});
