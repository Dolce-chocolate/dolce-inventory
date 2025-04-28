"use client";

import { useState } from "react";
import { db } from "@/app/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function AddProductSimple() {
  const [product, setProduct] = useState({
    code: "",
    name: "",
    quantity: "",
    weight: "",
    store: "chocolate"
  });

  const handleAdd = async () => {
    if (!product.code || !product.name || !product.quantity) {
      alert("❌ يجب تعبئة الكود والاسم والكمية!");
      return;
    }

    try {
      await addDoc(collection(db, "products"), {
        code: product.code.trim(),
        name: product.name.trim(),
        quantity: Number(product.quantity),
        weight: Number(product.weight),
        store: product.store,
        createdAt: new Date()
      });
      alert("✅ تمت الإضافة بنجاح!");
      setProduct({
        code: "",
        name: "",
        quantity: "",
        weight: "",
        store: "chocolate"
      });
    } catch (err) {
      console.error("خطأ في الإضافة:", err);
      alert("❌ فشل في إضافة المنتج.");
    }
  };

  return (
    <main className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-6">إضافة منتج</h1>
      <input type="text" placeholder="الكود" value={product.code} onChange={(e) => setProduct({...product, code: e.target.value})} className="border mb-4 p-2 w-40" />
      <input type="text" placeholder="الاسم" value={product.name} onChange={(e) => setProduct({...product, name: e.target.value})} className="border mb-4 p-2 w-40" />
      <input type="number" placeholder="الكمية" value={product.quantity} onChange={(e) => setProduct({...product, quantity: e.target.value})} className="border mb-4 p-2 w-40" />
      <input type="number" placeholder="الوزن" value={product.weight} onChange={(e) => setProduct({...product, weight: e.target.value})} className="border mb-4 p-2 w-40" />
      <select value={product.store} onChange={(e) => setProduct({...product, store: e.target.value})} className="border mb-4 p-2 w-40">
        <option value="chocolate">مخزن الشكلاطه</option>
        <option value="packs">مخزن الباكوات</option>
        <option value="cafe">مخزن الكافي</option>
      </select>
      <br/>
      <button onClick={handleAdd} className="bg-green-600 text-white px-6 py-2 rounded">
        إضافة
      </button>
    </main>
  );
}
