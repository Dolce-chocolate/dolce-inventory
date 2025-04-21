"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function WarehouseCafePage() {
  const router = useRouter();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("cafe");
    if (stored) {
      setItems(JSON.parse(stored));
    }
  }, []);

  return (
    <main className="bg-amber-50 min-h-screen p-6 text-chocolate text-center">
      <h1 className="text-2xl font-bold mb-6">☕ مخزن مستلزمات الكافي - أمين المخزن</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead>
            <tr className="bg-chocolate text-white">
              <th className="border px-2 py-1">الصورة</th>
              <th className="border px-2 py-1">كود المنتج</th>
              <th className="border px-2 py-1">اسم المنتج</th>
              <th className="border px-2 py-1">الكمية</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={i} className="hover:bg-amber-100">
                <td className="border px-2 py-1">
                  <Image
                    src={`/${item.image || "default.png"}`}
                    alt="صورة"
                    width={40}
                    height={40}
                    className="object-cover mx-auto rounded transition-transform duration-300 hover:scale-150"
                  />
                </td>
                <td className="border px-2 py-1">{item.code}</td>
                <td className="border px-2 py-1">{item.name}</td>
                <td className="border px-2 py-1">{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={() => router.push("/warehouse-dashboard")}
        className="mt-8 bg-gray-300 text-chocolate px-6 py-2 rounded hover:opacity-90"
      >
        ⬅️ العودة إلى لوحة تحكم أمين المخزن
      </button>
    </main>
  );
}
