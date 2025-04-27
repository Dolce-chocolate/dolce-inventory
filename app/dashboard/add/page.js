"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/app/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function AddPage() {
  const router = useRouter();
  const [newItem, setNewItem] = useState({
    code: "",
    name: "",
    quantity: "",
    weight: "",
    category: "",
    image: "",
  });

  const handleAdd = async () => {
    if (!newItem.code || !newItem.quantity) {
      alert("❌ يرجى تعبئة الكود والكمية على الأقل.");
      return;
    }

    try {
      await addDoc(collection(db, "products"), {
        code: newItem.code,
        name: newItem.name || "صنف بدون اسم",
        quantity: Number(newItem.quantity),
        weight: newItem.weight ? Number(newItem.weight) : 0,
        category: newItem.category || "chocolate",
        image: newItem.image || "placeholder.jpeg",
      });
      alert("✅ تمت إضافة الصنف إلى المخزن!");
      router.push("/dashboard");
    } catch (error) {
      console.error("❌ فشل الإضافة:", error);
      alert("حدث خطأ أثناء إضافة المنتج.");
    }
  };

  return (
    <main className="min-h-screen bg-cream flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-chocolate mb-8">إضافة صنف جديد</h1>

      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow">
        <input
          type="text"
          placeholder="كود المنتج"
          value={newItem.code}
          onChange={(e) => setNewItem({ ...newItem, code: e.target.value })}
          className="border px-4 py-2 rounded text-black mb-3 w-80 block mx-auto"
        />
        <input
          type="text"
          placeholder="اسم المنتج"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          className="border px-4 py-2 rounded text-black mb-3 w-80 block mx-auto"
        />
        <input
          type="number"
          placeholder="الكمية"
          value={newItem.quantity}
          onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
          className="border px-4 py-2 rounded text-black mb-3 w-80 block mx-auto"
        />
        <input
          type="number"
          placeholder="الوزن بالكيلو"
          value={newItem.weight}
          onChange={(e) => setNewItem({ ...newItem, weight: e.target.value })}
          className="border px-4 py-2 rounded text-black mb-3 w-80 block mx-auto"
        />
        <select
          value={newItem.category}
          onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
          className="border px-4 py-2 rounded text-black mb-3 w-80 block mx-auto"
        >
          <option value="chocolate">مخزن الشكلاطه</option>
          <option value="packs">مخزن الباكوات</option>
          <option value="cafe">مخزن الكافي</option>
        </select>
        <input
          type="text"
          placeholder="اسم الصورة (مثلا: chocolate1.jpeg)"
          value={newItem.image}
          onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
          className="border px-4 py-2 rounded text-black mb-4 w-80 block mx-auto"
        />

        <button
          onClick={handleAdd}
          className="bg-gold text-white font-bold py-2 px-6 rounded w-80 mx-auto block hover:bg-yellow-400"
        >
          ➕ إضافة
        </button>

        <button
          onClick={() => router.push("/dashboard")}
          className="mt-4 underline text-chocolate text-sm w-80 mx-auto block"
        >
          ⬅️ العودة للوحة التحكم
        </button>
      </div>
    </main>
  );
}
