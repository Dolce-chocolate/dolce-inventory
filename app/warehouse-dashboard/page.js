"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function WarehouseDashboard() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("role");
    router.push("/unified-login");
  };

  return (
    <main className="min-h-screen bg-amber-50 p-6 text-center text-chocolate">
      <Image
        src="/logo.png"
        alt="Dolce Logo"
        width={100}
        height={100}
        className="mx-auto mb-6"
      />
      <h1 className="text-2xl font-bold mb-6">📦 لوحة تحكم أمين المخزن</h1>

      <div className="flex flex-col gap-3 items-center">
        <button
          onClick={() => router.push("/warehouse-view/chocolate")}
          className="bg-chocolate text-white py-2 px-4 rounded hover:opacity-90 font-bold w-80"
        >
          مخزن الشكلاطه
        </button>
        <button
          onClick={() => router.push("/warehouse-view/packs")}
          className="bg-chocolate text-white py-2 px-4 rounded hover:opacity-90 font-bold w-80"
        >
          مخزن الباكوات
        </button>
        <button
          onClick={() => router.push("/warehouse-view/cafe")}
          className="bg-chocolate text-white py-2 px-4 rounded hover:opacity-90 font-bold w-80"
        >
          مخزن الكافي
        </button>
        <button
          onClick={() => router.push("/warehouse-dispense")}
          className="bg-gray-800 text-white py-2 px-4 rounded hover:opacity-90 font-bold w-80"
        >
          عرض الطلبات المعلقة
        </button>

        <button
          onClick={handleLogout}
          className="mt-6 bg-red-600 text-white py-2 px-4 rounded hover:opacity-90 font-bold w-80"
        >
          🚪 تسجيل الخروج
        </button>
      </div>
    </main>
  );
}
