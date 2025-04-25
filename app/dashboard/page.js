"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminDashboard() {
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      router.push("/unified-login");
    }
  }, [router]);

  return (
    <main className="min-h-screen bg-[url('/dolcedo.jpeg')] bg-cover bg-center flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-white mb-10 drop-shadow-lg">لوحة تحكم Dolce</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        <button
          onClick={() => router.push("/chocolate")}
          className="w-full h-20 rounded-lg bg-white text-black font-semibold text-xl shadow-md transition-transform duration-300 transform hover:scale-105 relative overflow-hidden group"
        >
          <span className="absolute inset-0 bg-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          <span className="relative z-10">🥇 مخزن الشكلاطة</span>
        </button>

        <button
          onClick={() => router.push("/packs")}
          className="w-full h-20 rounded-lg bg-white text-black font-semibold text-xl shadow-md transition-transform duration-300 transform hover:scale-105 relative overflow-hidden group"
        >
          <span className="absolute inset-0 bg-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          <span className="relative z-10">📦 مخزن الباكوات</span>
        </button>

        <button
          onClick={() => router.push("/cafe")}
          className="w-full h-20 rounded-lg bg-white text-black font-semibold text-xl shadow-md transition-transform duration-300 transform hover:scale-105 relative overflow-hidden group"
        >
          <span className="absolute inset-0 bg-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          <span className="relative z-10">☕️ مخزن الكافي</span>
        </button>
      </div>
    </main>
  );
}
