'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AddPage() {
  const router = useRouter();
  const [newItem, setNewItem] = useState({
    code: "",
    name: "",
    quantity: "",
    weight: "",
    type: "",
    store: "",
    image: null,
  });

  const handleAdd = () => {
    if (!newItem.code || !newItem.quantity) {
      alert("يرجى تعبئة الكود والكمية على الأقل.");
      return;
    }

    console.log("✅ تمت إضافة الصنف:", newItem);
    alert("✅ تمت إضافة الصنف بنجاح!");
    setNewItem({
      code: "",
      name: "",
      quantity: "",
      weight: "",
      type: "",
      store: "",
      image: null,
    });
  };

  return (
    <main className="min-h-screen bg-[#f5f5f5] text-center py-10 px-4 flex flex-col items-center">
      {/* ✅ اللوجو فوق */}
      <Image src="/logo.png" alt="Dolce Logo" width={100} height={100} className="mb-4" />

      <h1 className="text-3xl font-bold text-[#3B2A1A] mb-8">إضافة صنف جديد</h1>

      <div className="w-full max-w-md mx-auto bg-white p-6 rounded-xl shadow">
        {/* الحقول */}
        <input
          type="text"
          placeholder="كود الصنف"
          value={newItem.code}
          onChange={(e) => setNewItem({ ...newItem, code: e.target.value })}
          className="border px-4 py-2 rounded text-black mb-2 w-80 block mx-auto"
        />
        <input
          type="text"
          placeholder="اسم الصنف"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          className="border px-4 py-2 rounded text-black mb-2 w-80 block mx-auto"
        />
        <input
          type="number"
          placeholder="الكمية"
          value={newItem.quantity}
          onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
          className="border px-4 py-2 rounded text-black mb-2 w-80 block mx-auto"
        />
        <input
          type="text"
          placeholder="الوزن بالكيلو"
          value={newItem.weight}
          onChange={(e) => setNewItem({ ...newItem, weight: e.target.value })}
          className="border px-4 py-2 rounded text-black mb-2 w-80 block mx-auto"
        />
        <input
          type="text"
          placeholder="نوع الصنف"
          value={newItem.type}
          onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
          className="border px-4 py-2 rounded text-black mb-2 w-80 block mx-auto"
        />
        
        {/* ✅ اختيار المخزن من قائمة جاهزة */}
        <select
          value={newItem.store}
          onChange={(e) => setNewItem({ ...newItem, store: e.target.value })}
          className="border px-4 py-2 rounded text-black mb-4 w-80 block mx-auto"
        >
          <option value="">اختيار المخزن</option>
          <option value="مخزن الشكلاطه">مخزن الشكلاطه</option>
          <option value="مخزن الباكوات">مخزن الباكوات</option>
          <option value="مخزن الكافي">مخزن الكافي</option>
        </select>

        {/* ✅ رفع صورة */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setNewItem({ ...newItem, image: e.target.files[0] })}
          className="mb-4 w-80 block mx-auto"
        />

        {/* زر الإضافة بلون هادي */}
        <button
          onClick={handleAdd}
          className="bg-[#d4af7f] text-white font-bold px-6 py-2 rounded mt-4 w-80 block mx-auto hover:opacity-90"
        >
          ➕ إضافة الصنف
        </button>

        {/* زر الرجوع */}
        <button
          onClick={() => router.push("/dashboard")}
          className="mt-4 text-[#3B2A1A] underline text-sm w-80 block mx-auto"
        >
          ⬅️ العودة للوحة التحكم
        </button>
      </div>
    </main>
  );
}
