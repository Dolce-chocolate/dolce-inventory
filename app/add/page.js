"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/app/firebase"; 
import { collection, addDoc } from "firebase/firestore";

export default function AddProductPage() {
  const router = useRouter();
  const [newItem, setNewItem] = useState({
    code: "",
    name: "",
    quantity: "",
    weight: "",
    type: "",
    store: "",
    image: ""
  });

  const handleAdd = async () => {
    if (!newItem.code || !newItem.name) {
      alert("يرجى تعبئة الحقول الأساسية.");
      return;
    }

    try {
      await addDoc(collection(db, "products"), {
        code: newItem.code,
        name: newItem.name,
        quantity: Number(newItem.quantity),
        weight: Number(newItem.weight),
        type: newItem.type,
        store: newItem.store,
        image: newItem.image,
        category: "chocolate", // أو يمكنك تخليها dynamic لو تبي
      });

      alert("✅ تمت إضافة الصنف إلى قاعدة البيانات بنجاح!");

      setNewItem({
        code: "",
        name: "",
        quantity: "",
        weight: "",
        type: "",
        store: "",
        image: ""
      });
    } catch (error) {
      console.error("❌ خطأ أثناء إضافة الصنف:", error);
      alert("حدث خطأ أثناء الإضافة. حاول مجددًا.");
    }
  };

  return (
    <main className="min-h-screen bg-[#f5e8dc] text-[#3e2723] flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6">➕ إضافة صنف جديد</h1>

      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-4">
        <input
          type="text"
          placeholder="كود المنتج"
          value={newItem.code}
          onChange={(e) => setNewItem({ ...newItem, code: e.target.value })}
          className="border p-2 w-full rounded text-black"
        />
        <input
          type="text"
          placeholder="اسم المنتج"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          className="border p-2 w-full rounded text-black"
        />
        <input
          type="number"
          placeholder="الكمية"
          value={newItem.quantity}
          onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
          className="border p-2 w-full rounded text-black"
        />
        <input
          type="number"
          placeholder="الوزن بالكيلو"
          value={newItem.weight}
          onChange={(e) => setNewItem({ ...newItem, weight: e.target.value })}
          className="border p-2 w-full rounded text-black"
        />
        <input
          type="text"
          placeholder="نوع المنتج"
          value={newItem.type}
          onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
          className="border p-2 w-full rounded text-black"
        />
        <input
          type="text"
          placeholder="اسم المخزن"
          value={newItem.store}
          onChange={(e) => setNewItem({ ...newItem, store: e.target.value })}
          className="border p-2 w-full rounded text-black"
        />
        <input
          type="text"
          placeholder="اسم الصورة (مثلاً choco1.jpeg)"
          value={newItem.image}
          onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
          className="border p-2 w-full rounded text-black"
        />

        <button
          onClick={handleAdd}
          className="bg-[#3e2723] text-white font-bold py-2 px-4 rounded w-full hover:bg-[#5d4037]"
        >
          ➕ إضافة المنتج
        </button>

        <button
          onClick={() => router.push("/dashboard")}
          className="text-[#3e2723] underline text-sm mt-2 w-full"
        >
          ⬅️ الرجوع للوحة التحكم
        </button>
      </div>
    </main>
  );
}
