"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(storedOrders);
  }, []);

  const handleDeleteOld = () => {
    const freshOrders = orders.filter(order => order.status !== "تم الصرف");
    localStorage.setItem("orders", JSON.stringify(freshOrders));
    setOrders(freshOrders);
    alert("✅ تم حذف الطلبات المصروفة.");
  };

  return (
    <main className="bg-amber-50 min-h-screen p-6 text-chocolate">
      <h1 className="text-2xl font-bold mb-6 text-center">📋 إدارة الطلبات</h1>

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
              <th className="border px-2 py-1">أمين المخزن</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index} className="hover:bg-amber-100">
                <td className="border px-2 py-1 text-center">{order.client}</td>
                <td className="border px-2 py-1 text-center">{order.product}</td>
                <td className="border px-2 py-1 text-center">{order.code}</td>
                <td className="border px-2 py-1 text-center">{order.quantity}</td>
                <td className="border px-2 py-1 text-center">{order.date}</td>
                <td className="border px-2 py-1 text-center">{order.status}</td>
                <td className="border px-2 py-1 text-center">{order.warehouseManager || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="mt-6 text-center flex flex-col gap-4 items-center">
        <button
          onClick={handleDeleteOld}
          className="bg-red-600 text-white px-6 py-2 rounded hover:opacity-90"
        >
          🗑️ حذف الطلبات المصروفة
        </button>
        <button
          onClick={() => router.push("/dashboard")}
          className="bg-gray-300 text-chocolate px-6 py-2 rounded hover:opacity-90"
        >
          ⬅️ العودة إلى لوحة التحكم
        </button>
      </div>
    </main>
  );
}