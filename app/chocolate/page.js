"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ChocolatePage() {
  const [items, setItems] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const stock = JSON.parse(localStorage.getItem("chocolate") || "[]");
    setItems(stock);
  }, []);

  const handleQuantityChange = (code, newQuantity) => {
    const updatedItems = items.map((item) => {
      if (item.code === code) {
        let weightPerUnit = 1;
        if (code === "0701050") weightPerUnit = 2;
        else if (code === "0711070") weightPerUnit = 1.5;
        else if (code === "0517") weightPerUnit = 1;

        return {
          ...item,
          quantity: Number(newQuantity),
          weight: Number(newQuantity) * weightPerUnit,
        };
      }
      return item;
    });
    setItems(updatedItems);
    localStorage.setItem("chocolate", JSON.stringify(updatedItems));
  };

  const totalQty = items.reduce((acc, item) => acc + Number(item.quantity || 0), 0);
  const totalKg = items.reduce((acc, item) => acc + Number(item.weight || 0), 0);

  return (
    <main className="bg-cream min-h-screen px-4 py-8 text-center text-chocolate">
      <h1 className="text-3xl font-bold mb-6">📦 مخزن الشكلاطة</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-chocolate text-sm">
          <thead>
            <tr className="bg-chocolate text-white">
              <th className="border px-4 py-2">الصورة</th>
              <th className="border px-4 py-2">كود الصنف</th>
              <th className="border px-4 py-2">اسم الصنف</th>
              <th className="border px-4 py-2">الكمية</th>
              <th className="border px-4 py-2">الوزن بالكيلو</th>
              <th className="border px-4 py-2">الصلاحية</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={i} className="bg-white hover:bg-amber-100">
                <td className="border px-2 py-1">
                  <div className="w-[30px] h-[30px] overflow-hidden mx-auto">
                    <img
                      src={`/${item.image}`}
                      alt="صورة"
                      className="w-full h-full object-contain rounded transition-transform duration-300 hover:scale-[3]"
                    />
                  </div>
                </td>
                <td className="border px-2 py-1">{item.code}</td>
                <td className="border px-2 py-1">{item.name}</td>
                <td className="border px-2 py-1">
                  <input
                    type="number"
                    min="0"
                    value={item.quantity || 0}
                    onChange={(e) => handleQuantityChange(item.code, e.target.value)}
                    className="w-20 text-center border rounded"
                  />
                </td>
                <td className="border px-2 py-1">{item.weight || 0}</td>
                <td className="border px-2 py-1">{item.expiry || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 text-lg font-semibold">
        ⚖️ إجمالي الكمية: {totalQty} | إجمالي الوزن: {totalKg} كجم
      </div>

      <button
        onClick={() => router.push("/dashboard")}
        className="mt-8 px-6 py-2 bg-chocolate text-white rounded hover:opacity-90"
      >
        ⬅️ العودة للوحة التحكم
      </button>
    </main>
  );
}
