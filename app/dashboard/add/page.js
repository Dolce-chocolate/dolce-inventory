"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
  const router = useRouter();
  const [newItem, setNewItem] = useState({
    code: "",
    name: "",
    quantity: "",
    weight: "",
    type: "",
    store: "",
  });

  const handleAdd = () => {
    if (!newItem.code || !newItem.quantity) {
      alert("❗ يجب تعبئة الكود والكمية فقط.");
      return;
    }

    console.log("✅ تمت إضافة الصنف:", newItem);
    alert("✅ تمت إضافة المنتج بنجاح!");

    setNewItem({
      code: "",
      name: "",
      quantity: "",
      weight: "",
      type: "",
      store: "",
    });
  };

  return (
    <main className="min-h-screen bg-[#f9f5f0] flex flex-col items-center justify-start p-8 space-y-6">
      <h1 className="text-3xl font-bold text-[#3B2A1A] mb-6">إضافة منتج جديد</h1>

      <div className="w-full max-w-xs flex flex-col items-center space-y-4">
        <input
          type="text"
          placeholder="كود المنتج"
          value={newItem.code}
          onChange={(e) => setNewItem({ ...newItem, code: e.target.value })}
          className="border px-3 py-2 w-[80px] rounded text-black"
        />
        <input
          type="text"
          placeholder="اسم المنتج"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          className="border px-3 py-2 w-[80px] rounded text-black"
        />
        <input
          type="number"
          placeholder="الكمية"
          value={newItem.quantity}
          onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
          className="border px-3 py-2 w-[80px] rounded text-black"
        />
        <input
          type="number"
          placeholder="الوزن (كغ)"
          value={newItem.weight}
          onChange={(e) => setNewItem({ ...newItem, weight: e.target.value })}
          className="border px-3 py-2 w-[80px] rounded text-black"
        />
        <input
          type="text"
          placeholder="النوع"
          value={newItem.type}
          onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
          className="border px-3 py-2 w-[80px] rounded text-black"
        />
        <select
          value={newItem.store}
          onChange={(e) => setNewItem({ ...newItem, store: e.target.value })}
          className="border px-3 py-2 w-[80px] rounded text-black"
        >
          <option value="">اختر المخزن</option>
          <option value="chocolate">مخزن الشكلاطه</option>
          <option value="packs">مخزن الباكوات</option>
          <option value="cafe">مخزن الكافي</option>
        </select>

        <button
          onClick={handleAdd}
          className="bg-[#8B4513] hover:bg-[#A0522D] text-white px-4 py-2 rounded w-[80px]"
        >
          إضافة
        </button>

        <button
          onClick={() => router.push("/dashboard")}
          className="mt-4 underline text-[#3B2A1A] text-sm"
        >
          🔙 الرجوع للوحة التحكم
        </button>
      </div>
    </main>
  );
}
