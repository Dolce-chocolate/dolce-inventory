"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function WarehouseChocolateView() {
  const router = useRouter();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("chocolate");
    if (stored) setItems(JSON.parse(stored));
  }, []);

  const totalQty = items.reduce((acc, item) => acc + Number(item.quantity || 0), 0);
  const totalKg = items.reduce((acc, item) => acc + Number(item.weight || 0), 0);

  return (
    <main className="bg-amber-50 min-h-screen p-6 text-chocolate text-center">
      <h1 className="text-2xl font-bold mb-4">🍫 عرض مخزون الشكلاطه (لأمين المخزن)</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead>
            <tr className="bg-chocolate text-white">
              <th className="border px-2 py-1">الصورة</th>
              <th className="border px-2 py-1">الكود</th>
              <th className="border px-2 py-1">اسم المنتج</th>
              <th className="border px-2 py-1">العدد</th>
              <th className="border px-2 py-1">الوزن بالكيلو</th>
              <th className="border px-2 py-1">الصلاحية</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={i} className="hover:bg-amber-100">
                <td className="border px-2 py-1">
                  <Image
                    src={`/${item.image}`}
                    alt="صورة"
                    width={50}
                    height={50}
                    className="object-contain mx-auto rounded hover:scale-150 transition-transform duration-300"
                  />
                </td>
                <td className="border px-2 py-1">{item.code}</td>
                <td className="border px-2 py-1">{item.name}</td>
                <td className="border px-2 py-1">{item.quantity}</td>
                <td className="border px-2 py-1">{item.weight}</td>
                <td className="border px-2 py-1">{item.expiry || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-lg font-semibold">
        📦 إجمالي العدد: {totalQty} | ⚖️ إجمالي الوزن: {totalKg} كجم
      </div>

      <button
        onClick={() => router.push("/warehouse-dashboard")}
        className="mt-6 bg-gray-300 text-chocolate px-6 py-2 rounded hover:opacity-90"
      >
        ⬅️ العودة إلى لوحة التحكم
      </button>
    </main>
  );
}