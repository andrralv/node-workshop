importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

// importScripts('/vendor/workbox/google/workbox-sw.js');

// workbox.setConfig({
//   modulePathPrefix: '/vendor/workbox/google/'
// });

"use strict";

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);} 
else {
  console.log(`Boo! Workbox didn't load 😬`);
} 

const {strategies} = workbox;
workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug);



workbox.routing.registerRoute('http://localhost:3001/',
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'static-resources'
  })
);

workbox.routing.registerRoute('/stylesheets/style.css',
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'static-resources'
  })
);

workbox.routing.registerRoute('/javascripts/test.js',
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'static-resources'
  })
);


const showNotification = () => {
    self.registration.showNotification('You are offline! ⚠', {
      body: 'You are offline! Your request will be put in a queue until you regain connection!',
      icon: 'assets/icon/256.png',
      badge: 'assets/icon/32png.png'
    });
  };

const bgSyncPlugin = new workbox.backgroundSync.Plugin('myQueue', {
    maxRetentionTime: 24 * 60, // Retry for max of 24 Hours
    callbacks: {
        requestWillEnqueue: showNotification,
        // queueDidReplay: showNotification
      }
  });

workbox.routing.registerRoute(
    'https://httpbin.org/post',
    workbox.strategies.staleWhileRevalidate({
      plugins: [bgSyncPlugin]
    }),
    'POST'
  )
