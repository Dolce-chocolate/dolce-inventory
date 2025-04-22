// app/firebase.js

// استيراد الوظائف من مكتبة Firebase
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// إعدادات الاتصال من Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyCYXsbJNGJTfclfbssoHcXgqdtxczdttVc",
  authDomain: "dolce-inventory.firebaseapp.com",
  projectId: "dolce-inventory",
  storageBucket: "dolce-inventory.appspot.com", // ✅ تصحيح مهم
  messagingSenderId: "122460376387",
  appId: "1:122460376387:web:60128956eda88355f673f6",
  measurementId: "G-WNSTL902XD"
};

// تهيئة التطبيق
const app = initializeApp(firebaseConfig);

// تهيئة الخدمات المطلوبة
const analytics = getAnalytics(app);
export const db = getFirestore(app);
