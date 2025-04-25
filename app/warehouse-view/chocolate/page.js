"use client";

import { useEffect, useState } from "react";
import { db } from "@/app/firebase";
import { collection, onSnapshot, updateDoc, doc } from "firebase/firestore";

export default function ChocolateStockWarehouse() {
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
      <h1 className="text-2xl font-bold text-center mb-4">🍫 Chocolate Stock</h1>

      <div className="flex justify-center mb-6">
        <button
          type="button"
          className="bg-white text-center w-48 rounded-2xl h-14 relative text-black text-xl font-semibold border-4 border-white group"
          onClick={() => window.location.href = "/warehouse-dashboard"}
        >
          <div
            className="bg-green-400 rounded-xl h-12 w-1/4 grid place-items-center absolute left-0 top-0 group-hover:w-full z-10 duration-500"
          >
            <svg
              width="25px"
              height="25px"
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#000000"
                d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
              ></path>
              <path
                fill="#000000"
                d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
              ></path>
            </svg>
          </div>
          <p className="translate-x-4">Go Back</p>
        </button>
      </div>

      {products.length === 0 ? (
        <p className="text-center">لا توجد منتجات حالياً.</p>
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
                    <div className="w-[60px] h-[60px] overflow-hidden mx-auto">
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
