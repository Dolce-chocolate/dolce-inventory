"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function PacksStock() {
  const router = useRouter();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("packs");
    if (stored) {
      setItems(JSON.parse(stored));
    }
  }, []);

  const updateQuantity = (code, newQty) => {
    const updated = items.map(item =>
      item.code === code ? { ...item, quantity: newQty } : item
    );
    setItems(updated);
    localStorage.setItem("packs", JSON.stringify(updated));
  };

  const handleIncrement = (code) => {
    const item = items.find((i) => i.code === code);
    updateQuantity(code, Number(item.quantity) + 1);
  };

  const handleDecrement = (code) => {
    const item = items.find((i) => i.code === code);
    if (item.quantity > 0) {
      updateQuantity(code, Number(item.quantity) - 1);
    }
  };

  return (
    <main className="bg-amber-50 min-h-screen p-6 text-chocolate text-center">
      <h1 className="text-2xl font-bold mb-6">📦 مخزن الباكوات</h1>
      <table className="min-w-full border text-sm">
        <thead>
          <tr className="bg-chocolate text-white">
            <th className="border px-2 py-1">الصورة</th>
            <th className="border px-2 py-1">الكود</th>
            <th className="border px-2 py-1">اسم المنتج</th>
            <th className="border px-2 py-1">الكمية</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={i} className="hover:bg-amber-100">
              <td className="border px-2 py-1">
                <div className="w-6 h-6 overflow-hidden mx-auto">
                  <img
                    src={`/${item.image}`}
                    alt={item.name}
                    className="w-full h-full object-contain transition-transform duration-300 hover:scale-[2.5]"
                  />
                </div>
              </td>
              <td className="border px-2 py-1">{item.code}</td>
              <td className="border px-2 py-1">{item.name}</td>
              <td className="border px-2 py-1 flex justify-center items-center gap-1">
                <button onClick={() => handleDecrement(item.code)} className="px-2 bg-gray-200 rounded">−</button>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.code, Number(e.target.value))}
                  className="w-14 text-center border rounded"
                />
                <button onClick={() => handleIncrement(item.code)} className="px-2 bg-gray-200 rounded">+</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={() => router.push("/dashboard")}
        className="mt-6 bg-gray-300 text-chocolate px-6 py-2 rounded hover:opacity-90"
      >
        ⬅️ العودة للوحة التحكم
      </button>
    </main>
  );
}
