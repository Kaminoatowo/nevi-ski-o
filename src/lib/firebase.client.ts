import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import type { FirebaseApp } from 'firebase/app';
import type { Firestore } from 'firebase/firestore';
import type { Auth } from 'firebase/auth';
import { browser } from '$app/environment';

export let db: Firestore;
export let app: FirebaseApp;
export let auth: Auth;

const firebaseConfig = {
    apiKey: "AIzaSyDT7zVN4otd52HeNF7nB1Fh5jw5JDYsa44",
    authDomain: "neviskio-dev.firebaseapp.com",
    projectId: "neviskio-dev",
    useEmulator: import.meta.env.VITE_FIREBASE_USE_EMULATOR === 'true',
    storageBucket: "neviskio-dev.appspot.com",
    messagingSenderId: "122856572998",
    appId: "1:122856572998:web:1cb1bd6faf262fd9656247",
    measurementId: "G-03HQP6V97C"
    /*apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    useEmulator: import.meta.env.VITE_FIREBASE_USE_EMULATOR === 'true',
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN*/
};

export const initializeFirebase = () => {
    if (!browser) {
        throw new Error("Can't use the Firebase client on the server.");
    }
    if (!app) {
        const app = initializeApp(firebaseConfig);
        const analytics = getAnalytics(app);
        const auth = getAuth(app);

        if (firebaseConfig.useEmulator) {
          connectAuthEmulator(auth, 'http://127.0.0.1:9099');
        }
    }
};