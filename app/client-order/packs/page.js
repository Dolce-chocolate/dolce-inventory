"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PacksOrderPage() {
  const [packs, setPacks] = useState([]);
  const [order, setOrder] = useState({});
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "client") {
      router.push("/unified-login");
    }

    const data = JSON.parse(localStorage.getItem("packs") || "[]");
    setPacks(data);
  }, []);

  const handleChange = (code, value) => {
    setOrder({ ...order, [code]: value });
  };

  const handleSubmit = () => {
    const client = localStorage.getItem("currentUser") || "عميل مجهول";
    const date = new Date().toISOString().split("T")[0];
    const oldOrders = JSON.parse(localStorage.getItem("orders") || "[]");

    const newOrders = Object.entries(order)
      .filter(([, q]) => Number(q) > 0)
      .map(([code, quantity]) => {
        const product = packs.find((p) => p.code === code);
        return {
          client,
          product: product.name,
          code,
          quantity,
          status: "بانتظار الصرف",
          date,
        };
      });

    localStorage.setItem("orders", JSON.stringify([...oldOrders, ...newOrders]));
    alert("تم إرسال الطلب بنجاح");
    router.push("/client-home");
  };

  return (
    <main className="min-h-screen bg-amber-50 p-6 text-chocolate text-center">
      <h1 className="text-2xl font-bold mb-6">📦 طلب من مخزن الباكوات</h1>

      <table className="min-w-full text-sm border mb-6">
        <thead>
          <tr className="bg-chocolate text-white">
            <th className="border px-2 py-1">الكود</th>
            <th className="border px-2 py-1">الاسم</th>
            <th className="border px-2 py-1">الكمية</th>
            <th className="border px-2 py-1">الطلب</th>
          </tr>
        </thead>
        <tbody>
          {packs.map((item) => (
            <tr key={item.code} className="hover:bg-amber-100">
              <td className="border px-2 py-1">{item.code}</td>
              <td className="border px-2 py-1">{item.name}</td>
              <td className="border px-2 py-1">{item.quantity}</td>
              <td className="border px-2 py-1">
                <input
                  type="number"
                  min="0"
                  value={order[item.code] || ""}
                  onChange={(e) => handleChange(item.code, e.target.value)}
                  className="w-16 text-center border rounded"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={handleSubmit}
        className="bg-chocolate text-white px-6 py-2 rounded hover:opacity-90"
      >
        طلب
      </button>
      <button
        onClick={() => router.push("/client-home")}
        className="mt-4 bg-gray-300 text-chocolate px-6 py-2 rounded hover:opacity-90"
      >
        ⬅️ العودة
      </button>
    </main>
  );
}
