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
  }, [router]);

  return (
    <main className="min-h-screen bg-amber-50 text-chocolate text-center p-10">
      <h1 className="text-3xl font-bold mb-8">📦 مخازن العميل</h1>
      <div className="flex flex-col gap-4 items-center">
        <button
          onClick={() => router.push("/client-order/chocolate")}
          className="bg-chocolate text-white px-6 py-3 rounded hover:opacity-90"
        >
          🍫 مخزن الشكلاطة
        </button>
        <button
          onClick={() => router.push("/client-order/packs")}
          className="bg-chocolate text-white px-6 py-3 rounded hover:opacity-90"
        >
          📦 مخزن الباكوات
        </button>
        <button
          onClick={() => router.push("/client-order/cafe")}
          className="bg-chocolate text-white px-6 py-3 rounded hover:opacity-90"
        >
          ☕️ مخزن الكافي
        </button>
        <button
          onClick={() => {
            localStorage.removeItem("currentUser");
            localStorage.removeItem("role");
            router.push("/unified-login");
          }}
          className="mt-6 text-red-600 underline"
        >
          تسجيل الخروج
        </button>
      </div>
    </main>
  );
}
