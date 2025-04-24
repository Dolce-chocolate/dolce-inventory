"use client";

import { useEffect, useState } from "react";
import { db } from "@/app/firebase";
import { collection, getDocs } from "firebase/firestore";
import Image from "next/image";

export default function AdminChocolateStock() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const snapshot = await getDocs(collection(db, "products"));
      const allProducts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProducts(allProducts);
    };

    fetchProducts();
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold mb-4">📦 مخزن الشكلاطة (لوحة تحكم الأدمن)</h1>
      <a href="/dashboard" className="text-blue-600 underline mb-4 block">⬅️ العودة إلى لوحة التحكم</a>
      {products.length === 0 ? (
        <p>لا توجد منتجات حالياً.</p>
      ) : (
        <table className="min-w-full border text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 py-1">الصورة</th>
              <th className="border px-2 py-1">الكود</th>
              <th className="border px-2 py-1">الاسم</th>
              <th className="border px-2 py-1">الكمية</th>
              <th className="border px-2 py-1">الوزن بالكيلو</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr key={item.id}>
                <td className="border px-2 py-1">
                  <div className="w-16 h-16 overflow-hidden">
                    <Image
                      src={`/${item.image}`}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="hover:scale-150 transition-transform duration-300 cursor-zoom-in"
                    />
                  </div>
                </td>
                <td className="border px-2 py-1">{item.code}</td>
                <td className="border px-2 py-1">{item.name}</td>
                <td className="border px-2 py-1">{item.quantity}</td>
                <td className="border px-2 py-1">
                  {item.weight && item.quantity
                    ? (Number(item.weight) * Number(item.quantity)).toFixed(2) + " كجم"
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
