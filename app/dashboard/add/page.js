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
    type: "",
    store: "",
    image: null
  });

  const handleAdd = async () => {
    if (!newItem.code || !newItem.quantity) {
      alert("يرجى تعبئة كود المنتج والكمية.");
      return;
    }

    try {
      await addDoc(collection(db, "products"), {
        code: newItem.code,
        name: newItem.name || "",
        quantity: Number(newItem.quantity),
        weight: Number(newItem.weight) || 0,
        type: newItem.type || "",
        store: newItem.store || "",
        image: newItem.image ? newItem.image.name : "",
      });

      alert("✅ تمت إضافة المنتج بنجاح إلى المخزن!");
      setNewItem({
        code: "",
        name: "",
        quantity: "",
        weight: "",
        type: "",
        store: "",
        image: null
      });
    } catch (error) {
      console.error("خطأ أثناء الإضافة:", error);
      alert("❌ حدث خطأ أثناء إضافة المنتج.");
    }
  };

  return (
    <main className="min-h-screen bg-cream text-center py-10 px-4">
      <h1 className="text-3xl font-bold text-chocolate mb-8">إضافة منتج جديد</h1>

      <div className="w-full max-w-md mx-auto bg-white p-6 rounded-xl shadow">
        <input
          type="text"
          placeholder="كود المنتج"
          value={newItem.code}
          onChange={(e) => setNewItem({ ...newItem, code: e.target.value })}
          className="border px-4 py-2 rounded text-black mb-2 w-80 mx-auto block"
        />
        <input
          type="text"
          placeholder="اسم المنتج"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          className="border px-4 py-2 rounded text-black mb-2 w-80 mx-auto block"
        />
        <input
          type="number"
          placeholder="الكمية"
          value={newItem.quantity}
          onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
          className="border px-4 py-2 rounded text-black mb-2 w-80 mx-auto block"
        />
        <input
          type="number"
          placeholder="الوزن بالكيلو"
          value={newItem.weight}
          onChange={(e) => setNewItem({ ...newItem, weight: e.target.value })}
          className="border px-4 py-2 rounded text-black mb-2 w-80 mx-auto block"
        />
        <input
          type="text"
          placeholder="نوع المنتج"
          value={newItem.type}
          onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
          className="border px-4 py-2 rounded text-black mb-2 w-80 mx-auto block"
        />

        <select
          value={newItem.store}
          onChange={(e) => setNewItem({ ...newItem, store: e.target.value })}
          className="border px-4 py-2 rounded text-black mb-2 w-80 mx-auto block"
        >
          <option value="">اختر المخزن</option>
          <option value="chocolate">مخزن الشكلاطه</option>
          <option value="packs">مخزن الباكوات</option>
          <option value="cafe">مخزن الكافي</option>
        </select>

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setNewItem({ ...newItem, image: e.target.files[0] })
          }
          className="mb-4 w-80 mx-auto block"
        />

        <button
          onClick={handleAdd}
          className="bg-gold text-white px-6 py-2 rounded mt-4 w-80 mx-auto block"
        >
          إضافة
        </button>

        <button
          onClick={() => router.push("/dashboard")}
          className="mt-4 underline text-chocolate text-sm w-80 mx-auto block"
        >
          ⬅️ الرجوع إلى لوحة التحكم
        </button>
      </div>
    </main>
  );
}
