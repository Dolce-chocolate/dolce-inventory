"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function WarehousePage() {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    const role = localStorage.getItem("role");

    if (!user || role !== "warehouse") {
      router.push("/unified-login");
    }
  }, []);

  return (
    <main className="min-h-screen bg-amber-50 p-6 text-center">
      <h1 className="text-2xl font-bold text-chocolate">🚚 صرف البضاعة</h1>
      {/* باقي محتوى أمين المخزن */}
    </main>
  );
}
