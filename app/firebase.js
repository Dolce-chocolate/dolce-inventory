// app/firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// إعدادات Firebase الخاصة بك
const firebaseConfig = {
  apiKey: "AIzaSyCYXsbJNGlTfcIfbssoHcXgdtkczdttVc",
  authDomain: "dolce-inventory.firebaseapp.com",
  projectId: "dolce-inventory",
  storageBucket: "dolce-inventory.appspot.com",
  messagingSenderId: "122460376387",
  appId: "1:122460376387:web:60128956eda88356f573f6",
  measurementId: "G-WNSTL90ZDX",
};

// تهيئة Firebase
const app = initializeApp(firebaseConfig);

// تصدير قاعدة البيانات Firestore
export const db = getFirestore(app);
