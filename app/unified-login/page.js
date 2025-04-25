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
    <main className="min-h-screen flex flex-col items-center justify-center bg-neutral-100 p-4">
      <div className="text-4xl text-yellow-500 font-bold mb-6">DOLCE</div>
      <div className="bg-[#1E1E2F] p-8 rounded-2xl shadow-xl w-full max-w-xs">
        <h1 className="text-yellow-400 text-xl font-bold mb-4 text-center">LOG IN!</h1>

        <div className="flex flex-col gap-4">
          <div className="flex items-center bg-black rounded-md px-3 py-2">
            <span className="text-yellow-400 mr-2">@</span>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-black text-white outline-none w-full"
            />
          </div>
          <div className="flex items-center bg-black rounded-md px-3 py-2">
            <span className="text-yellow-400 mr-2">🔒</span>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-black text-white outline-none w-full"
            />
          </div>
          <button
            onClick={handleLogin}
            className="bg-yellow-400 text-black font-bold py-2 rounded-md hover:bg-yellow-300 transition duration-300"
          >
            LOGIN
          </button>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </div>
      </div>
    </main>
  );
}
