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
  }, [router]);

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
    <main className="min-h-screen bg-gradient-to-br from-yellow-100 to-yellow-300 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-extrabold text-yellow-800 mb-8">DOLCE</h1>
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-sm p-6 flex flex-col gap-4">
        <h2 className="text-center text-2xl font-bold text-gray-800">Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 transition-all"
        >
          Login
        </button>
        {error && <p className="text-center text-sm text-red-600">{error}</p>}
      </div>
    </main>
  );
}
