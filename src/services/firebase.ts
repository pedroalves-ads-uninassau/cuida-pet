import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBU7QABio7BC41r3GdyO8jUPDnU7BezLrk",
    authDomain: "cuida-pet-ac942.firebaseapp.com",
    projectId: "cuida-pet-ac942",
    storageBucket: "cuida-pet-ac942.firebasestorage.app",
    messagingSenderId: "594450082100",
    appId: "1:594450082100:web:c6d650d5d759a3c2135d61",
    measurementId: "G-07BY6H9D6C"
};

let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let db: Firestore | undefined;
let storage: FirebaseStorage | undefined;

try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    auth = getAuth(app);

    // Initialize Firestore with persistent cache (Modern way)
    db = initializeFirestore(app, {
        localCache: persistentLocalCache({
            tabManager: persistentMultipleTabManager()
        })
    });

    storage = getStorage(app);
} catch (error) {
    console.error("Firebase initialization error:", error);
}

export { auth, db, storage };
