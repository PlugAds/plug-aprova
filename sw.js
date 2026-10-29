// Service worker do Plug Aprova: necessário para o navegador oferecer "Instalar app".
// Não guarda nada em cache: o app sempre carrega a versão atual do site.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', () => {});
