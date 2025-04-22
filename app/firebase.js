// app/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// إعدادات Firebase الخاصة بك
const firebaseConfig = {
  apiKey: "AIzaSyCYXsbJNGJTfclfbssoHcXgqdtxczdttVc",
  authDomain: "dolce-inventory.firebaseapp.com",
  projectId: "dolce-inventory",
  storageBucket: "dolce-inventory.appspot.com",
  messagingSenderId: "122460376387",
  appId: "1:122460376387:web:60128956eda88355f673f6",
  measurementId: "G-WNSTL902XD",
};

// تهيئة Firebase
const app = initializeApp(firebaseConfig);

// تصدير قاعدة البيانات Firestore
export const db = getFirestore(app);
