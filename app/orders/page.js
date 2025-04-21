"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ManageOrders() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("currentUser") || "";
    const userRole = localStorage.getItem("role") || "";
    setCurrentUser(user);
    setRole(userRole);

    if (!userRole || (userRole !== "admin" && userRole !== "warehouse")) {
      router.push("/unified-login");
    }
  }, [router]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(storedOrders);
  }, []);

  const handleDispense = (index) => {
    const updatedOrders = [...orders];
    updatedOrders[index].status = "تم الصرف";
    updatedOrders[index].dispenser = currentUser;
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    setOrders(updatedOrders);
    alert("✅ تم صرف الطلب بنجاح");
  };

  return (
    <main className="bg-amber-50 min-h-screen p-6 text-chocolate text-center">
      <h1 className="text-2xl font-bold mb-6">📋 إدارة الطلبات</h1>

      {orders.length === 0 ? (
        <p>لا توجد طلبات مسجلة.</p>
      ) : (
        <table className="mx-auto border text-sm w-full max-w-5xl">
          <thead>
            <tr className="bg-chocolate text-white">
              <th className="border px-3 py-2">العميل</th>
              <th className="border px-3 py-2">اسم المنتج</th>
              <th className="border px-3 py-2">الكود</th>
              <th className="border px-3 py-2">الكمية المطلوبة</th>
              <th className="border px-3 py-2">التاريخ</th>
              <th className="border px-3 py-2">الحالة</th>
              <th className="border px-3 py-2">إجراء</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index} className="hover:bg-amber-100">
                <td className="border px-2 py-1">{order.client}</td>
                <td className="border px-2 py-1">{order.product}</td>
                <td className="border px-2 py-1">{order.code}</td>
                <td className="border px-2 py-1">{order.quantity}</td>
                <td className="border px-2 py-1">{order.date}</td>
                <td className="border px-2 py-1">{order.status}</td>
                <td className="border px-2 py-1">
                  {order.status === "بانتظار الصرف" ? (
                    <button
                      onClick={() => handleDispense(index)}
                      className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:opacity-90"
                    >
                      صرف
                    </button>
                  ) : (
                    <span className="text-green-700">✔️ تم</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button
        onClick={() => router.push("/dashboard")}
        className="mt-6 bg-gray-300 text-chocolate px-6 py-2 rounded hover:opacity-90"
      >
        ⬅️ العودة للوحة التحكم
      </button>
    </main>
  );
}
