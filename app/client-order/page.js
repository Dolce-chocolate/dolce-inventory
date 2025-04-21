"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ClientHome() {
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "client") {
      router.push("/unified-login");
    }
  }, []);

  return (
    <main className="min-h-screen bg-amber-50 p-6 text-chocolate text-center">
      <h1 className="text-2xl font-bold mb-6">📦 مخازن دولتشي - العميل</h1>

      <div className="grid grid-cols-1 gap-4 max-w-md mx-auto">
        <button
          onClick={() => router.push("/client-order/chocolate")}
          className="bg-chocolate text-white py-2 rounded hover:opacity-90"
        >
          🍫 مخزن الشكلاطة
        </button>
        <button
          onClick={() => router.push("/client-order/packs")}
          className="bg-chocolate text-white py-2 rounded hover:opacity-90"
        >
          📦 مخزن الباكوات
        </button>
        <button
          onClick={() => router.push("/client-order/cafe")}
          className="bg-chocolate text-white py-2 rounded hover:opacity-90"
        >
          ☕ مخزن الكافي
        </button>
      </div>
    </main>
  );
}
