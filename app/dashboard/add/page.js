"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { db, storage } from "@/app/firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function AddProductPage() {
  const router = useRouter();
  const [product, setProduct] = useState({
    code: "",
    name: "",
    quantity: "",
    weight: "",
    store: "chocolate", // يبدأ افتراضي بمخزن الشكلاطة
    imageFile: null,
  });

  const handleAddProduct = async () => {
    if (!product.code || !product.name || !product.quantity) {
      alert("❌ يجب تعبئة الكود، الاسم، والكمية!");
      return;
    }

    try {
      let imageUrl = "";

      if (product.imageFile) {
        const storageRef = ref(storage, `products/${product.imageFile.name}`);
        await uploadBytes(storageRef, product.imageFile);
        imageUrl = await getDownloadURL(storageRef);
      }

      await addDoc(collection(db, "products"), {
        code: product.code.trim(),
        name: product.name.trim(),
        quantity: Number(product.quantity),
        weight: Number(product.weight),
        store: product.store,  // ✍️ نضيف نوع المخزن هنا مضبوط
        image: imageUrl,
        createdAt: new Date(),  // نضيف وقت الانشاء (اختياري لتحسين المزامنة)
      });

      alert("✅ تمت إضافة المنتج بنجاح!");
      setProduct({
        code: "",
        name: "",
        quantity: "",
        weight: "",
        store: "chocolate",
        imageFile: null,
      });

    } catch (error) {
      console.error("❌ خطأ أثناء الإضافة:", error);
      alert("❌ حدث خطأ أثناء إضافة المنتج، حاول مجددًا.");
    }
  };

  return (
    <main className="min-h-screen bg-amber-50 p-6 text-center">
      <h1 className="text-3xl font-bold text-brown-700 mb-8">➕ إضافة منتج جديد</h1>

      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
        <input
          type="text"
          placeholder="🔢 كود المنتج"
          value={product.code}
          onChange={(e) => setProduct({ ...product, code: e.target.value })}
          className="w-[100px] mb-4 p-2 border rounded text-center"
        />

        <input
          type="text"
          placeholder="📦 اسم المنتج"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          className="w-[100px] mb-4 p-2 border rounded text-center"
        />

        <input
          type="number"
          placeholder="📦 الكمية"
          value={product.quantity}
          onChange={(e) => setProduct({ ...product, quantity: e.target.value })}
          className="w-[100px] mb-4 p-2 border rounded text-center"
        />

        <input
          type="number"
          placeholder="⚖️ الوزن بالكيلو"
          value={product.weight}
          onChange={(e) => setProduct({ ...product, weight: e.target.value })}
          className="w-[100px] mb-4 p-2 border rounded text-center"
        />

        <select
          value={product.store}
          onChange={(e) => setProduct({ ...product, store: e.target.value })}
          className="w-[100px] mb-4 p-2 border rounded text-center"
        >
          <option value="chocolate">مخزن الشكلاطه</option>
          <option value="packs">مخزن الباكوات</option>
          <option value="cafe">مخزن الكافي</option>
        </select>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setProduct({ ...product, imageFile: e.target.files[0] })}
          className="w-[100px] mb-4 p-2"
        />

        <button
          onClick={handleAddProduct}
          className="w-[100px] bg-brown-700 text-white py-2 rounded hover:bg-brown-800 mt-4"
        >
          إضافة المنتج
        </button>

        <button
          onClick={() => router.push("/dashboard")}
          className="w-[100px] mt-4 underline text-brown-700"
        >
          ⬅️ العودة
        </button>
      </div>
    </main>
  );
}
