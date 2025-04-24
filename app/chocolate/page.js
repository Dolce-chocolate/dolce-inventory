"use client";

import { useEffect, useState } from "react";
import { db } from "@/app/firebase";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";

export default function ChocolateStockPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
      const chocolateItems = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((item) => item.category === "chocolate");
      setProducts(chocolateItems);
    });

    return () => unsubscribe();
  }, []);

  const handleQuantityChange = async (id, newQuantity) => {
    if (isNaN(newQuantity) || newQuantity < 0) return;
    const productRef = doc(db, "products", id);
    await updateDoc(productRef, { quantity: Number(newQuantity) });
  };

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold mb-4">🍫 مخزن الشكلاطة (أدمن)</h1>
      <a href="/dashboard" className="text-blue-600 underline mb-4 block">⬅️ العودة إلى لوحة التحكم</a>
      {products.length === 0 ? (
        <p>لا توجد منتجات حالياً.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-collapse text-sm">
            <thead>
              <tr className="bg-gray-200 text-center">
                <th className="border px-3 py-2">الصورة</th>
                <th className="border px-3 py-2">الكود</th>
                <th className="border px-3 py-2">الاسم</th>
                <th className="border px-3 py-2">الكمية</th>
                <th className="border px-3 py-2">الوزن بالكيلو</th>
                <th className="border px-3 py-2">تعديل</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => (
                <tr key={item.id} className="text-center">
                  <td className="border px-2 py-1">
                    <div className="w-14 h-14 overflow-hidden mx-auto">
                      <img
                        src={`/${item.image}`}
                        alt={item.name}
                        className="w-full h-full object-contain cursor-pointer transition-transform duration-300 hover:scale-[2.5]"
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
                  <td className="border px-2 py-1">
                    <input
                      type="number"
                      min="0"
                      className="w-20 border rounded text-center"
                      defaultValue={item.quantity}
                      onBlur={(e) => handleQuantityChange(item.id, e.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
