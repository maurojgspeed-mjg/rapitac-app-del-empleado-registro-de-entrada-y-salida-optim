const CACHE_NAME = 'rapitac-v4'; // Cambiá el número cada vez que actualices el Index
const assets = [
  './',
  './index.html',
  './manifest.json',
  './img/icon-192.png',
  './img/icon-512.png',
  // Agregá aquí las rutas de tus logos o splash screens
];

// 1. INSTALACIÓN: Guarda los archivos en el teléfono
self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Guardando archivos en caché...');
      return cache.addAll(assets);
    })
  );
});

// 2. ACTIVACIÓN: Limpia cachés viejos de versiones anteriores
self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== CACHE_NAME)
        .map(key => caches.delete(key))
      );
    })
  );
});

// 3. ESTRATEGIA: Primero intenta buscar en internet, si falla, usa el Caché
self.addEventListener('fetch', evt => {
  evt.respondWith(
    fetch(evt.request).catch(() => caches.match(evt.request))
  );
});