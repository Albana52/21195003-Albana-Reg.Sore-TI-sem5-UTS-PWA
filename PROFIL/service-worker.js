// service-worker.js

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('my-cache').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/profil.jpg',
        '/service-worker.js',
        '/style.css',
        '/icon.png',
        '/icon-192x192.png',
        '/icon-384x384.png',
        '/icon-512x512.png',
        '/icon-happy.png',
        '/icon-kecewa.png',
        // Tambahkan file lain yang perlu dicache
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('push', function(event) {
  if (self.Notification.permission === 'granted') {
    // Izin notifikasi telah diberikan, Anda dapat menampilkan pemberitahuan
    const options = {
      body: 'Assalaikum pak, kasih Nilai A yak?',
      icon: 'icon-notif.png',
      badge:'badge.png',
      actions: [
        { action: 'yes', title: 'Ya' },
        { action: 'no', title: 'Tidak' }
      ],
      data: {
        senderId: '12345',
        messageId: '67890'
      },
      silent: true,
      timestamp: Date.now()
    };
    

    event.waitUntil(
      self.registration.showNotification('Notifikasi', options)
    );
  } else {
    // Izin notifikasi tidak diberikan
  }
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();

  if (event.action === 'yes') {
    // Tindakan "Ya" diambil
    // Menampilkan notifikasi dengan ucapan "Anda memilih Ya"
    self.registration.showNotification('ALHAMDULILLAH ', {
      body: 'Matursuwun sanget',
      icon: 'icon-happy.png'
    });
  } else if (event.action === 'no') {
    // Tindakan "Tidak" diambil
    // Menampilkan notifikasi dengan ucapan "Anda memilih Tidak"
    self.registration.showNotification('DIIIHH HEMMM NGAMBEK LAH', {
      body: 'kecewa',
      icon: 'icon-kecewa.png'
    });
  } else {
    // Notifikasi di-klik tanpa memilih tindakan apa pun
    // Lakukan sesuatu ketika notifikasi di-klik tanpa memilih "Ya" atau "Tidak"
    console.log('Anda mengklik notifikasi');
  }
});