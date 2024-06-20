
// import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore'

// const firebaseConfig = {
//   apiKey: "AIzaSyB_EMG1lerAsMl4sKQyQfN8wzRd_dD4Luk",
//   authDomain: "maya-61caa.firebaseapp.com",
//   projectId: "maya-61caa",
//   storageBucket: "maya-61caa.appspot.com",
//   messagingSenderId: "429511763847",
//   appId: "1:429511763847:web:8ad79a0a7d7e2a77625522"
// };

// export const firebaseApp = initializeApp(firebaseConfig);
// export const firestore = getFirestore()

import { ServiceAccount, cert, initializeApp } from "firebase-admin/app";
import { getFirestore } from 'firebase-admin/firestore'
import serviceAccount from '../../docs/service-account.json'

initializeApp({
  credential: cert(serviceAccount as ServiceAccount)
})

export const firestore = getFirestore()