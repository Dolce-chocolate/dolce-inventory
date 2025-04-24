"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/app/firebase";
import { collection, getDocs } from "firebase/firestore";
import Image from "next/image";

export default function UnifiedLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    const snapshot = await getDocs(collection(db, "users"));
    const users = snapshot.docs.map((doc) => doc.data());

    const matchedUser = users.find(
      (user) => user.username === username && user.password === password
    );

    if (matchedUser) {
      localStorage.setItem("currentUser", matchedUser.username);
      localStorage.setItem("role", matchedUser.role);

      if (matchedUser.role === "admin") router.push("/dashboard");
      else if (matchedUser.role === "warehouse") router.push("/warehouse-dashboard");
      else router.push("/client-home");
    } else {
      setError("❌ اسم المستخدم أو كلمة المرور غير صحيحة");
    }
  };

  return (
    <main className="min-h-screen bg-amber-50 flex flex-col items-center justify-center p-4 text-chocolate">
      <Image src="/logo.png" alt="Dolce Logo" width={100} height={100} className="mb-6" />
      <h1 className="text-2xl font-bold mb-4">🔐 تسجيل الدخول</h1>

      <div className="w-[80%] max-w-[320px] flex flex-col gap-3">
        <input
          type="text"
          placeholder="اسم المستخدم"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 border rounded text-center"
        />
        <input
          type="password"
          placeholder="كلمة المرور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border rounded text-center"
        />
        <button
          onClick={handleLogin}
          className="bg-chocolate text-white py-2 rounded hover:opacity-90"
        >
          دخول
        </button>
        {error && <p className="text-red-600 text-sm text-center">{error}</p>}
        <p className="text-red-500 text-center text-xs mt-2">🔥 إصدار المزامنة الجديد</p>
      </div>
    </main>
  );
}