"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function UnifiedLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [users, setUsers] = useState({});

  useEffect(() => {
    const url = window.location.href;
    const fromLogout = url.includes("loggedout=true");

    const storedUsers = JSON.parse(localStorage.getItem("users") || "{}");
    setUsers(storedUsers);

    const savedUser = localStorage.getItem("currentUser");
    const savedRole = localStorage.getItem("role");

    if (savedUser && savedRole && !fromLogout) {
      if (savedRole === "admin") router.push("/dashboard");
      else if (savedRole === "warehouse") router.push("/warehouse-dashboard");
      else if (savedRole === "client") router.push("/client-home");
    }
  }, []);

  const handleLogin = () => {
    const user = users[username];

    if (user && user.password === password) {
      localStorage.setItem("currentUser", username);
      localStorage.setItem("role", user.role);

      if (user.role === "admin") router.push("/dashboard");
      else if (user.role === "warehouse") router.push("/warehouse-dashboard");
      else if (user.role === "client") router.push("/client-home");
    } else {
      setError("❌ اسم المستخدم أو كلمة المرور غير صحيحة");
    }
  };

  return (
    <main className="min-h-screen bg-amber-50 flex flex-col items-center justify-center p-4 text-chocolate">
      <Image src="/logo.png" alt="Dolce Logo" width={100} height={100} className="mb-6" />
      <h1 className="text-2xl font-bold mb-4">🔐 تسجيل الدخول الموحد</h1>

      <div className="w-full max-w-xs flex flex-col gap-3">
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
      </div>
    </main>
  );
}
