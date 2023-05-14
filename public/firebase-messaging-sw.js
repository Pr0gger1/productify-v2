// Scripts for firebase and firebase messaging
// import firebase from "firebase";

// import firebase from "firebase/compat";

// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js");
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js");

// Initialize the Firebase app in the service worker by passing the generated config

const firebaseConfig = {
  apiKey: "AIzaSyByyesgyia35Gm_BXXiwwSURszBgSsw_wE",
  authDomain: "productify-test.firebaseapp.com",
  databaseURL: "https://productify-test-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "productify-test",
  storageBucket: "productify-test.appspot.com",
  messagingSenderId: "531058036878",
  appId: "1:531058036878:web:c45843086958c18da939df",
  measurementId: "G-MRNR8GK61S"
};

// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  // eslint-disable-next-line no-restricted-globals
  self.registration.showNotification(notificationTitle,
    notificationOptions
  );
});