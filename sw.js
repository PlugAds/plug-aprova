// Service worker do Plug Aprova: recebe as notificações push e abre a tela certa ao tocar.
// Não guarda nada em cache: o app sempre carrega a versão atual do site.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

self.addEventListener('push', (e) => {
  let aviso = { titulo: 'Plug Aprova', corpo: 'Você tem uma novidade.', url: './' };
  try { aviso = { ...aviso, ...e.data.json() }; } catch (_) { /* aviso sem conteúdo */ }
  e.waitUntil(self.registration.showNotification(aviso.titulo, {
    body: aviso.corpo,
    icon: 'icone-192.png',
    badge: 'icone-192.png',
    data: { url: aviso.url }
  }));
});

self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  const url = e.notification.data && e.notification.data.url || './';
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((abertas) => {
    for (const w of abertas) { if ('navigate' in w) return w.navigate(url).then((x) => x && x.focus()); }
    return self.clients.openWindow(url);
  }));
});
