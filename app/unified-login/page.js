"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase";

export default function UnifiedLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    const snapshot = await getDocs(collection(db, "users"));
    const users = snapshot.docs.map((doc) => doc.data());

    const matchedUser = users.find(
      (u) => u.username === username && u.password === password
    );

    if (matchedUser) {
      localStorage.setItem("currentUser", matchedUser.username);
      localStorage.setItem("role", matchedUser.role);

      if (matchedUser.role === "admin") router.push("/dashboard");
      else if (matchedUser.role === "warehouse") router.push("/warehouse-dashboard");
      else if (matchedUser.role === "client") router.push("/client-home");
    } else {
      setError("❌ اسم المستخدم أو كلمة المرور غير صحيحة");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#1e1e2f] p-4">
      <div className="bg-[#2e2e3e] text-white rounded-xl shadow-lg p-8 w-[270px] text-center">
        <h1 className="text-3xl font-bold mb-6" style={{ color: '#FFF4B9' }}>DOLCE</h1>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-[250px] p-2 bg-[#1e1e2f] border border-gray-600 rounded-md text-sm text-white placeholder-gray-400 focus:outline-none mx-auto"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-[250px] p-2 bg-[#1e1e2f] border border-gray-600 rounded-md text-sm text-white placeholder-gray-400 focus:outline-none mx-auto"
          />
          <button
            onClick={handleLogin}
            className="w-[250px] bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-2 rounded-md transition duration-200 mx-auto"
          >
            LOGIN
          </button>
        </div>

        {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}
      </div>
    </main>
  );
}
