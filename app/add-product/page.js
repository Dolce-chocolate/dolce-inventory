"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [weightPerBox, setWeightPerBox] = useState("");
  const [image, setImage] = useState("");
  const [storageType, setStorageType] = useState("chocolate");
  const [error, setError] = useState("");

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      router.push("/unified-login");
    }
  }, [router]);

  const handleSubmit = () => {
    if (!code || !name || !quantity || !weightPerBox || !image) {
      setError("❌ جميع الحقول مطلوبة.");
      return;
    }

    const current = JSON.parse(localStorage.getItem(storageType) || "[]");
    const exists = current.find((item) => item.code === code);
    if (exists) {
      setError("❌ الكود موجود مسبقًا!");
      return;
    }

    const totalWeight = Number(quantity) * Number(weightPerBox);

    const newProduct = {
      code,
      name,
      quantity: Number(quantity),
      weight: totalWeight,
      image,
    };

    localStorage.setItem(storageType, JSON.stringify([...current, newProduct]));
    alert("✅ تم إضافة المنتج بنجاح!");
    setCode("");
    setName("");
    setQuantity("");
    setWeightPerBox("");
    setImage("");
    setError("");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const fileName = file.name;
    setImage(fileName);
  };

  return (
    <main className="min-h-screen bg-amber-50 p-6 text-chocolate text-center">
      <h1 className="text-xl font-bold mb-6">➕ إضافة منتج جديد</h1>

      <div className="flex flex-col gap-3 w-full max-w-sm mx-auto text-sm">
        <input
          type="text"
          placeholder="الكود"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="p-2 border rounded text-center"
        />
        <input
          type="text"
          placeholder="اسم المنتج"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border rounded text-center"
        />
        <input
          type="number"
          placeholder="عدد العلب"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="p-2 border rounded text-center"
        />
        <input
          type="number"
          placeholder="وزن العلبة بالكيلو"
          value={weightPerBox}
          onChange={(e) => setWeightPerBox(e.target.value)}
          className="p-2 border rounded text-center"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="p-2 border rounded text-center"
        />
        <select
          value={storageType}
          onChange={(e) => setStorageType(e.target.value)}
          className="p-2 border rounded text-center"
        >
          <option value="chocolate">مخزن الشكلاطة</option>
          <option value="packs">مخزن الباكوات</option>
          <option value="cafe">مخزن الكافي</option>
        </select>

        {error && <p className="text-red-600 text-sm mt-1">{error}</p>}

        <button
          onClick={handleSubmit}
          className="bg-chocolate text-white py-2 rounded hover:opacity-90"
        >
          حفظ المنتج
        </button>

        <button
          onClick={() => router.push("/dashboard")}
          className="bg-gray-300 text-chocolate px-4 py-2 rounded hover:opacity-80 mt-4"
        >
          ⬅️ العودة للوحة التحكم
        </button>
      </div>
    </main>
  );
}
