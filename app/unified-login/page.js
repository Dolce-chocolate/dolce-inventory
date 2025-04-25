"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
    <main className="min-h-screen bg-[#1b1c24] flex items-center justify-center p-4">
      <div className="bg-[#2a2b38] text-white p-8 rounded-xl w-full max-w-sm shadow-xl text-center">
        <h1 className="text-3xl font-bold text-yellow-300 mb-6">LOG IN!</h1>

        <div className="mb-4">
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-300">@</span>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-[#1b1c24] text-white border-none rounded px-10 py-2 focus:outline-none"
            />
          </div>
        </div>

        <div className="mb-6">
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-300">🔒</span>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#1b1c24] text-white border-none rounded px-10 py-2 focus:outline-none"
            />
          </div>
        </div>

        <button
          onClick={handleLogin}
          className="bg-yellow-300 text-black font-bold py-2 px-6 rounded hover:opacity-90 mb-4"
        >
          LOGIN
        </button>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
    </main>
  );
}
