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
    <main className="min-h-screen flex items-center justify-center bg-[#1e1e2f] p-4">
      <div className="bg-[#2e2e3e] text-white rounded-xl shadow-lg p-8 w-full max-w-xs text-center">
        <h1 className="text-3xl font-bold mb-6" style={{ color: '#FFF4B9' }}>DOLCE</h1>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 bg-[#1e1e2f] border border-gray-600 rounded-md text-sm text-white placeholder-gray-400 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 bg-[#1e1e2f] border border-gray-600 rounded-md text-sm text-white placeholder-gray-400 focus:outline-none"
          />
          <button
            onClick={handleLogin}
            className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-2 rounded-md transition duration-200"
          >
            LOGIN
          </button>
        </div>

        {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}
      </div>
    </main>
  );
}
