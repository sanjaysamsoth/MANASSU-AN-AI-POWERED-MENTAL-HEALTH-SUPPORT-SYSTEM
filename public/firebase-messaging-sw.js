importScripts("https://www.gstatic.com/firebasejs/9.6.8/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.6.8/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyD28eqNfjjj-GWGAluSCytyZRTYF4z3ZP8",
  authDomain: "mentalhealthcompanion-16b97.firebaseapp.com",
  projectId: "mentalhealthcompanion-16b97",
  storageBucket: "mentalhealthcompanion-16b97.firebasestorage.app",
  messagingSenderId: "34219611497",
  appId: "1:34219611497:web:7bb5ac11916b4a559459f8",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("[firebase-messaging-sw.js] Received background message ", payload);

  const notificationTitle = payload.notification?.title || "New Message";
  const notificationOptions = {
    body: payload.notification?.body || "You have a new message",
    icon: payload.notification?.icon || "/logo192.png",
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});