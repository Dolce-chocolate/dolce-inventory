"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ReportsPage() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [clientName, setClientName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [invoice, setInvoice] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(data);
    setFiltered(data);
  }, []);

  const filterReports = () => {
    const filteredData = orders.filter((order) => {
      const matchName = clientName ? order.client.includes(clientName) : true;
      const matchInvoice = invoice ? order.invoice?.includes(invoice) : true;
      const matchDate = (!startDate || new Date(order.date) >= new Date(startDate)) &&
                        (!endDate || new Date(order.date) <= new Date(endDate));
      return matchName && matchInvoice && matchDate;
    });
    setFiltered(filteredData);
  };

  const clearFilters = () => {
    setClientName("");
    setInvoice("");
    setStartDate("");
    setEndDate("");
    setFiltered(orders);
  };

  const mostOrdered = () => {
    const count = {};
    orders.forEach((o) => {
      count[o.product] = (count[o.product] || 0) + Number(o.quantity || 0);
    });
    return Object.entries(count).sort((a, b) => b[1] - a[1])[0]?.[0] || "لا يوجد";
  };

  const totalByClient = (client) => {
    return orders
      .filter((o) => o.client === client)
      .reduce((sum, o) => sum + Number(o.quantity || 0), 0);
  };

  return (
    <main className="bg-amber-50 min-h-screen p-4 text-chocolate text-center">
      <h1 className="text-xl font-bold mb-4">📊 تقارير الطلبات</h1>

      <div className="flex flex-wrap justify-center gap-3 mb-4 text-sm">
        <input
          type="text"
          placeholder="👤 اسم العميل"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          className="border p-2 rounded w-40"
        />
        <input
          type="text"
          placeholder="📄 رقم الفاتورة"
          value={invoice}
          onChange={(e) => setInvoice(e.target.value)}
          className="border p-2 rounded w-40"
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border p-2 rounded w-32"
          placeholder="🗓️ Start (Y-M-D)"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border p-2 rounded w-32"
          placeholder="🗓️ End (Y-M-D)"
        />
        <button
          onClick={filterReports}
          className="bg-chocolate text-white px-4 py-1 rounded hover:opacity-90"
        >
          🔍 تصفية
        </button>
        <button
          onClick={clearFilters}
          className="bg-gray-300 px-4 py-1 rounded hover:opacity-90"
        >
          🧹 مسح
        </button>
      </div>

      <div className="text-sm mb-4">
        <p>🧾 أكثر منتج عليه طلب: <strong>{mostOrdered()}</strong></p>
        {clientName && (
          <p>📦 مجموع ما طلبه {clientName}: <strong>{totalByClient(clientName)}</strong> وحدة</p>
        )}
      </div>

      <table className="min-w-full border text-sm">
        <thead>
          <tr className="bg-chocolate text-white">
            <th className="border px-2 py-1">اسم العميل</th>
            <th className="border px-2 py-1">المنتج</th>
            <th className="border px-2 py-1">الكمية</th>
            <th className="border px-2 py-1">رقم الفاتورة</th>
            <th className="border px-2 py-1">التاريخ</th>
            <th className="border px-2 py-1">الحالة</th>
            <th className="border px-2 py-1">أمين المخزن</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((o, idx) => (
            <tr key={idx} className="hover:bg-amber-100">
              <td className="border px-2 py-1">{o.client}</td>
              <td className="border px-2 py-1">{o.product}</td>
              <td className="border px-2 py-1">{o.quantity}</td>
              <td className="border px-2 py-1">{o.invoice || "-"}</td>
              <td className="border px-2 py-1">{o.date}</td>
              <td className="border px-2 py-1">{o.status}</td>
              <td className="border px-2 py-1">{o.warehouseUser || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={() => router.push("/dashboard")}
        className="mt-6 bg-chocolate text-white px-6 py-2 rounded hover:opacity-90"
      >
        ⬅️ العودة للوحة التحكم
      </button>
    </main>
  );
}
