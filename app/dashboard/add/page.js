"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/app/firebase"; // فقط Firestore بدون Storage
import { collection, addDoc } from "firebase/firestore";

export default function AddProductPage() {
  const router = useRouter();
  const [product, setProduct] = useState({
    code: "",
    name: "",
    quantity: "",
    weight: "",
    store: "chocolate",
    imageUrl: "", // بدل imageFile
  });

  const handleAddProduct = async () => {
    if (!product.code || !product.name || !product.quantity) {
      alert("يرجى تعبئة الكود والاسم والكمية.");
      return;
    }

    try {
      await addDoc(collection(db, "products"), {
        code: product.code,
        name: product.name,
        quantity: Number(product.quantity),
        weight: Number(product.weight),
        store: product.store,
        image: product.imageUrl, // نحفظ الرابط مباشرة
      });

      alert("✅ تمت إضافة المنتج بنجاح!");
      setProduct({
        code: "",
        name: "",
        quantity: "",
        weight: "",
        store: "chocolate",
        imageUrl: "",
      });
    } catch (error) {
      console.error("خطأ في إضافة المنتج:", error);
      alert("❌ حدث خطأ أثناء إضافة المنتج.");
    }
  };

  return (
    <main className="min-h-screen bg-amber-50 p-6 text-center">
      <h1 className="text-3xl font-bold text-brown-700 mb-8">➕ إضافة منتج جديد</h1>

      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow space-y-4">
        <input
          type="text"
          placeholder="🔢 كود المنتج"
          value={product.code}
          onChange={(e) => setProduct({ ...product, code: e.target.value })}
          className="w-[100px] p-2 border rounded"
        />
        <input
          type="text"
          placeholder="📦 اسم المنتج"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          className="w-[100px] p-2 border rounded"
        />
        <input
          type="number"
          min="0"
          placeholder="📦 الكمية"
          value={product.quantity}
          onChange={(e) => setProduct({ ...product, quantity: e.target.value })}
          className="w-[100px] p-2 border rounded"
        />
        <input
          type="number"
          min="0"
          placeholder="⚖️ الوزن بالكيلو"
          value={product.weight}
          onChange={(e) => setProduct({ ...product, weight: e.target.value })}
          className="w-[100px] p-2 border rounded"
        />
        <select
          value={product.store}
          onChange={(e) => setProduct({ ...product, store: e.target.value })}
          className="w-[100px] p-2 border rounded"
        >
          <option value="chocolate">مخزن الشكلاطه</option>
          <option value="packs">مخزن الباكوات</option>
          <option value="cafe">مخزن الكافي</option>
        </select>
        <input
          type="text"
          placeholder="🔗 رابط صورة المنتج"
          value={product.imageUrl}
          onChange={(e) => setProduct({ ...product, imageUrl: e.target.value })}
          className="w-[100px] p-2 border rounded"
        />

        <button
          onClick={handleAddProduct}
          className="w-full bg-brown-700 text-white py-2 rounded hover:bg-brown-800"
        >
          إضافة المنتج
        </button>

        <button
          onClick={() => router.push("/dashboard")}
          className="w-full mt-4 underline text-brown-700"
        >
          ⬅️ العودة إلى لوحة التحكم
        </button>
      </div>
    </main>
  );
}
