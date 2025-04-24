"use client";

import { useEffect, useState } from "react";
import { db } from "@/app/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function AdminChocolateInventory() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, "products"));
      const allProducts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(allProducts);
    };

    fetchData();
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold mb-4">📦 مخزن الشكلاطة - لوحة التحكم</h1>
      {products.length === 0 ? (
        <p>لا توجد منتجات حالياً.</p>
      ) : (
        <table className="min-w-full border text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 py-1">الكود</th>
              <th className="border px-2 py-1">الاسم</th>
              <th className="border px-2 py-1">الكمية</th>
              <th className="border px-2 py-1">الوزن الكلي</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr key={item.id}>
                <td className="border px-2 py-1">{item.code}</td>
                <td className="border px-2 py-1">{item.name}</td>
                <td className="border px-2 py-1">{item.quantity}</td>
                <td className="border px-2 py-1">
                  {item.weight && item.quantity
                    ? Number(item.weight) * Number(item.quantity) + " كجم"
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