// Scripts for firebase and firebase messaging
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
self.addEventListener('message', event => {
	if (event.data && event.data.type === 'config') {
		const firebaseConfig = {...event.data.data};

		// eslint-disable-next-line no-undef
		firebase.initializeApp(firebaseConfig);

		// Retrieve firebase messaging
		// eslint-disable-next-line no-undef
		const messaging = firebase.messaging();

		messaging.onBackgroundMessage((payload) => {
			console.log('Received background message ', payload);

			const notificationTitle = payload.notification.title;
			const notificationOptions = {
				body: payload.notification.body,
				icon: payload.notification.icon || payload.notification.image,
			};

			// eslint-disable-next-line no-restricted-globals
			self.registration.showNotification(notificationTitle,
				notificationOptions
			);

		});
	}
});

