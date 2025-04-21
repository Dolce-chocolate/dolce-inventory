"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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

  const handleAdd = () => {
    if (!newItem.code || !newItem.name) {
      alert("يرجى تعبئة الحقول الأساسية.");
      return;
    }

    console.log("تمت إضافة الصنف:", newItem);
    alert("✅ تمت إضافة الصنف بنجاح!");
    setNewItem({
      code: "",
      name: "",
      quantity: "",
      weight: "",
      type: "",
      store: "",
      image: null
    });
  };

  return (
    <main className="min-h-screen bg-cream text-center py-10 px-4">
      <h1 className="text-3xl font-bold text-chocolate mb-8">إضافة صنف جديد</h1>

      <div className="w-full max-w-md mx-auto bg-white p-6 rounded-xl shadow">
        <input
          type="text"
          placeholder="كود الصنف"
          value={newItem.code}
          onChange={(e) => setNewItem({ ...newItem, code: e.target.value })}
          className="border px-4 py-2 rounded text-black mb-2 w-80 mx-auto block"
        />
        <input
          type="text"
          placeholder="اسم الصنف"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          className="border px-4 py-2 rounded text-black mb-2 w-80 mx-auto block"
        />
        <input
          type="text"
          placeholder="الكمية"
          value={newItem.quantity}
          onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
          className="border px-4 py-2 rounded text-black mb-2 w-80 mx-auto block"
        />
        <input
          type="text"
          placeholder="الوزن بالكيلو"
          value={newItem.weight}
          onChange={(e) => setNewItem({ ...newItem, weight: e.target.value })}
          className="border px-4 py-2 rounded text-black mb-2 w-80 mx-auto block"
        />
        <input
          type="text"
          placeholder="نوع الصنف"
          value={newItem.type}
          onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
          className="border px-4 py-2 rounded text-black mb-2 w-80 mx-auto block"
        />
        <input
          type="text"
          placeholder="اسم المخزن"
          value={newItem.store}
          onChange={(e) => setNewItem({ ...newItem, store: e.target.value })}
          className="border px-4 py-2 rounded text-black mb-2 w-80 mx-auto block"
        />
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
          onClick={() => router.push("/")}
          className="mt-4 underline text-chocolate text-sm w-80 mx-auto block"
        >
          الرجوع للرئيسية
        </button>
      </div>
    </main>
  );
}