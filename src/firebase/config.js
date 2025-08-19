import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKoO9gxOByaeDdl4NXVUEWARi0zyng72s",
  authDomain: "phone-case-affiliate.firebaseapp.com",
  projectId: "phone-case-affiliate",
  storageBucket: "phone-case-affiliate.firebasestorage.app",
  messagingSenderId: "693131541642",
  appId: "1:693131541642:web:236383b4ae89bd67ad0173",
  measurementId: "G-JDT7GP8Y53"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Auth
export const auth = getAuth(app);

export default app;
