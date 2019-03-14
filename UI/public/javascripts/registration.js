
// SERVICE WORKER REGISTRATION
if (navigator.serviceWorker) {
    navigator.serviceWorker.register('./service-worker-workbox.js', {
            scope: './'
        })
        .then(function(reg) {
            console.log("ServiceWorker registered! cache", reg);
        })
        .catch(function(error) {
            console.log("Failed to register ServiceWorker ಠ_ಠ", error);
        });
        doesBrowserSupportNotifications();
        requestNotificationPermission();
    }
    
    if (!navigator.onLine) {
        document.querySelector('#online-display').id = 'offline-display';
    } 

function requestNotificationPermission() {
    if (Notification.requestPermission) {
        Notification.requestPermission(function(result) {
            console.log("Notification permission : ", result);
        });
    } else {
        console.log("Notifications not supported by this browser.");
    }
}

// CHECK IF NOTIFICATIONS ARE SUPPORTED
function doesBrowserSupportNotifications() {
    var supported = true;
    if (!('showNotification' in ServiceWorkerRegistration.prototype)) {
        console.warn('Notifications aren\'t supported in Service Workers.');
        supported = false;
    }

    if (!Notification.requestPermission) {
        console.warn("Notifications are not supported by the browser");
        supported = false;
    }

    if (Notification.permission !== 'granted') {
        console.warn('The user has blocked notifications.');
        supported = false;
    }
};