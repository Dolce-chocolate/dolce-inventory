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
    store: "chocolate",
    imageFile: null,
  });

  const handleAddProduct = async () => {
    if (!product.code || !product.quantity) {
      alert("يرجى تعبئة الكود والكمية.");
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
        code: product.code,
        name: product.name,
        quantity: Number(product.quantity),
        weight: Number(product.weight),
        store: product.store,
        image: imageUrl,
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
      console.error("خطأ في إضافة المنتج:", error);
      alert("❌ فشل في إضافة المنتج.");
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
          className="border rounded px-3 py-2 w-[100px]"
        />
        <input
          type="text"
          placeholder="📦 اسم المنتج"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          className="border rounded px-3 py-2 w-[100px]"
        />
        <input
          type="text"
          placeholder="📦 الكمية"
          value={product.quantity}
          onChange={(e) => setProduct({ ...product, quantity: e.target.value })}
          className="border rounded px-3 py-2 w-[100px]"
        />
        <input
          type="text"
          placeholder="⚖️ الوزن بالكيلو"
          value={product.weight}
          onChange={(e) => setProduct({ ...product, weight: e.target.value })}
          className="border rounded px-3 py-2 w-[100px]"
        />
        <select
          value={product.store}
          onChange={(e) => setProduct({ ...product, store: e.target.value })}
          className="border rounded px-3 py-2 w-[100px]"
        >
          <option value="chocolate">شكلاطة</option>
          <option value="packs">باكوات</option>
          <option value="cafe">كافي</option>
        </select>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setProduct({ ...product, imageFile: e.target.files[0] })}
          className="w-full"
        />
        <button
          onClick={handleAddProduct}
          className="bg-brown-700 text-white px-4 py-2 rounded hover:bg-brown-800 w-full"
        >
          إضافة المنتج
        </button>
        <button
          onClick={() => router.push("/dashboard")}
          className="underline text-brown-700 w-full"
        >
          ⬅️ العودة إلى لوحة التحكم
        </button>
      </div>
    </main>
  );
}
