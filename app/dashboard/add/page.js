"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/app/firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

export default function AddProductPage() {
  const router = useRouter();
  const [product, setProduct] = useState({
    code: "",
    name: "",
    quantity: "",
    weight: "",
    store: "chocolate",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddProduct = async () => {
    setError("");
    if (!product.code || !product.quantity) {
      setError("يجب تعبئة الكود والكمية على الأقل.");
      return;
    }

    try {
      setLoading(true);

      // تحقق من عدم تكرار الكود
      const q = query(collection(db, "products"), where("code", "==", product.code));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        setError("🚫 الكود موجود مسبقًا. اختر كود مختلف.");
        setLoading(false);
        return;
      }

      // أضف المنتج حسب المخزن المحدد
      await addDoc(collection(db, product.store), {
        code: product.code,
        name: product.name || "بدون اسم",
        quantity: Number(product.quantity),
        weight: product.weight ? Number(product.weight) : null,
        createdAt: new Date().toISOString(),
      });

      alert("✅ تمت إضافة المنتج بنجاح!");
      setProduct({ code: "", name: "", quantity: "", weight: "", store: "chocolate" });
      setLoading(false);
    } catch (err) {
      console.error("فشل الإضافة:", err);
      setError("حدث خطأ أثناء الإضافة. حاول مجددًا.");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-amber-50 p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">➕ إضافة منتج</h1>

      <div className="max-w-sm mx-auto bg-white p-6 rounded shadow space-y-4">
        {error && <p className="text-red-600 text-sm">{error}</p>}

        <input
          type="text"
          placeholder="🔢 كود المنتج (إجباري)"
          value={product.code}
          onChange={(e) => setProduct({ ...product, code: e.target.value })}
          className="border px-3 py-2 w-[100px] text-sm rounded"
        />

        <input
          type="text"
          placeholder="📦 اسم المنتج (اختياري)"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          className="border px-3 py-2 w-[100px] text-sm rounded"
        />

        <input
          type="text"
          placeholder="📦 الكمية (إجباري)"
          value={product.quantity}
          onChange={(e) => setProduct({ ...product, quantity: e.target.value })}
          className="border px-3 py-2 w-[100px] text-sm rounded"
        />

        <input
          type="text"
          placeholder="⚖️ الوزن بالكيلو (اختياري)"
          value={product.weight}
          onChange={(e) => setProduct({ ...product, weight: e.target.value })}
          className="border px-3 py-2 w-[100px] text-sm rounded"
        />

        <select
          value={product.store}
          onChange={(e) => setProduct({ ...product, store: e.target.value })}
          className="border px-2 py-2 w-[100px] text-sm rounded"
        >
          <option value="chocolate">شكلاطة</option>
          <option value="packs">باكوات</option>
          <option value="cafe">كافي</option>
        </select>

        <button
          onClick={handleAddProduct}
          disabled={loading}
          className="bg-brown-700 text-white w-full py-2 rounded hover:bg-brown-800 text-sm"
        >
          {loading ? "...جاري الإضافة" : "إضافة المنتج"}
        </button>
      </div>
    </main>
  );
}
