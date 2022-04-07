import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDHRwgcO-FEdK6rtgwwvjedcndq2mLKJds",
    authDomain: "fyp2022-ade61.firebaseapp.com",
    projectId: "fyp2022-ade61",
    storageBucket: "fyp2022-ade61.appspot.com",
    messagingSenderId: "112239247812",
    appId: "1:112239247812:web:188189e41173fbde336491"
  };

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, db, storage };