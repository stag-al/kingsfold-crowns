// Kingsfold Crowns service worker · version 965c1af29b
const V='kd-965c1af29b';const CORE=['./','index.html','manifest.json','icon-192.png','icon-512.png','icon-maskable-512.png','apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
// network first, so a new upload shows up the next time you open the app; the cache keeps it playable offline
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;const fresh=e.request.mode==='navigate'||/\/(index\.html)?$/.test(new URL(e.request.url).pathname)||e.request.url.endsWith('sw.js');e.respondWith(fetch(e.request,fresh?{cache:'no-cache'}:{}).then(r=>{const c=r.clone();caches.open(V).then(x=>x.put(e.request,c));return r}).catch(()=>caches.match(e.request).then(m=>m||caches.match('index.html'))))});
