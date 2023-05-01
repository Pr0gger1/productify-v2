const staticCash = 'productify'

const assets = [
    '/static/index.html',
    '/static/css/main.b81b0f2a.css',
    '/static/css/main.b81b0f2a.css.map',
    '/static/js/main.6328a02e.js',
    '/static/js/main.6328a02e.js.map',
    '/static/media/login_page_stock_img.6df59e683f53fb66bd9c.jpg',
    '/static/login_page_stock_mobile.a7f0025dd5f4f9013f08.jpg',
    '/static/testAvatar.dc49c5b796afc4f502ed.jpg'
]

self.addEventListener('install', async e => {
    const cache = await caches.open(staticCash);
    await cache.addAll(assets)
});
self.addEventListener('activate', async e => {
    const allCache = await caches.keys();
    await Promise.all(
        allCache
            .filter(name => name !== staticCash)
            .map(name => caches.delete(name))
    ) 
});
self.addEventListener('fetch', e => {
    e.respondWith(loadCache(e.request))
});

async function loadCache (request) {
    return await caches.match(request) ?? await fetch(request)
}