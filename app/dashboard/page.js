"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";

export default function AdminDashboard() {
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      router.push("/unified-login");
    }
  }, [router]);

  return (
    <main
      className="min-h-screen bg-cover bg-fixed bg-center p-6 text-chocolate text-center"
      style={{ backgroundImage: "url('/dolcedo.jpeg')" }}
    >
      <div className="bg-white bg-opacity-80 rounded-xl shadow-lg max-w-3xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6 text-chocolate">لوحة تحكم الأدمن</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            onClick={() => router.push("/add-product")}
            className="bg-amber-400 hover:bg-amber-300 text-black font-semibold py-2 rounded shadow"
          >
            ➕ إضافة منتج
          </button>

          <button
            onClick={() => router.push("/search")}
            className="bg-amber-400 hover:bg-amber-300 text-black font-semibold py-2 rounded shadow"
          >
            🔍 بحث بالكود
          </button>

          <button
            onClick={() => router.push("/admin-dashboard/manage-users")}
            className="bg-amber-400 hover:bg-amber-300 text-black font-semibold py-2 rounded shadow"
          >
            👥 إدارة المستخدمين
          </button>

          <button
            onClick={() => router.push("/dispense")}
            className="bg-amber-400 hover:bg-amber-300 text-black font-semibold py-2 rounded shadow"
          >
            📤 صرف بضاعة
          </button>

          <button
            onClick={() => router.push("/client-order")}
            className="bg-amber-400 hover:bg-amber-300 text-black font-semibold py-2 rounded shadow"
          >
            📝 الطلبات
          </button>

          <button
            onClick={() => router.push("/reports")}
            className="bg-amber-400 hover:bg-amber-300 text-black font-semibold py-2 rounded shadow"
          >
            📊 التقارير
          </button>
        </div>
      </div>
    </main>
  );
}
