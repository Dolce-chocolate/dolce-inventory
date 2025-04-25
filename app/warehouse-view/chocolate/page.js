"use client";

import { useEffect, useState } from "react";
import { db } from "@/app/firebase";
import { collection, onSnapshot } from "firebase/firestore";

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

  return (
    <main className="p-4 sm:p-6 min-h-screen bg-amber-50">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-chocolate">
        🍫 Chocolate Stock
      </h1>

      {products.length === 0 ? (
        <p className="text-center text-chocolate">لا توجد منتجات حالياً.</p>
      ) : (
        <div className="overflow-x-auto flex justify-center">
          <table className="w-full max-w-4xl border border-collapse text-sm bg-white shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-chocolate text-white">
                <th className="border px-4 py-2">الصورة</th>
                <th className="border px-4 py-2">الكود</th>
                <th className="border px-4 py-2">الاسم</th>
                <th className="border px-4 py-2">الكمية</th>
                <th className="border px-4 py-2">الوزن بالكيلو</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => (
                <tr key={item.id} className="text-center hover:bg-amber-100">
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex justify-center mt-8">
        <button
          onClick={() => window.location.href = "/warehouse-dashboard"}
          className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-white rounded-xl group border border-gray-300 shadow-md"
        >
          <span className="w-48 h-48 rounded rotate-[-40deg] bg-green-400 absolute bottom-0 left-0 -translate-x-full translate-y-full mb-9 ml-3 transition-all duration-500 group-hover:mb-32 group-hover:ml-0 group-hover:translate-x-0"></span>
          <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">
            ⬅️ Go Back
          </span>
        </button>
      </div>
    </main>
  );
}
