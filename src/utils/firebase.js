import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging } from "firebase/messaging";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD28eqNfjjj-GWGAluSCytyZRTYF4z3ZP8",
  authDomain: "mentalhealthcompanion-16b97.firebaseapp.com",
  projectId: "mentalhealthcompanion-16b97",
  storageBucket: "mentalhealthcompanion-16b97.firebasestorage.app",
  messagingSenderId: "34219611497",
  appId: "1:34219611497:web:7bb5ac11916b4a559459f8",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const messaging = getMessaging(app);

// Initialize Analytics only in client-side
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

const firebaseApp = {
  auth,
  db,
  messaging,
  analytics
};

export { auth, db, messaging, analytics };
export default firebaseApp;  