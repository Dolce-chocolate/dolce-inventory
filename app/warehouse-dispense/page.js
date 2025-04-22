"use client";

import { useEffect, useState } from "react";
import { db } from "../../../firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";

export default function WarehouseDispense() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "orders"), where("status", "==", "بانتظار الصرف"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const liveOrders = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setOrders(liveOrders);
    });

    return () => unsubscribe();
  }, []);

  return (
    <main className="min-h-screen bg-amber-50 p-6 text-chocolate">
      <h1 className="text-2xl font-bold mb-6 text-center">📦 طلبات العملاء - أمين المخزن</h1>

      {orders.length === 0 ? (
        <p className="text-center">لا توجد طلبات حالياً.</p>
      ) : (
        <table className="min-w-full border text-sm">
          <thead>
            <tr className="bg-chocolate text-white">
              <th className="border px-2 py-1">العميل</th>
              <th className="border px-2 py-1">المنتج</th>
              <th className="border px-2 py-1">الكود</th>
              <th className="border px-2 py-1">الكمية</th>
              <th className="border px-2 py-1">التاريخ</th>
              <th className="border px-2 py-1">الحالة</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-amber-100">
                <td className="border px-2 py-1">{order.client}</td>
                <td className="border px-2 py-1">{order.product}</td>
                <td className="border px-2 py-1">{order.code}</td>
                <td className="border px-2 py-1">{order.quantity}</td>
                <td className="border px-2 py-1">{order.date}</td>
                <td className="border px-2 py-1 text-red-600">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
