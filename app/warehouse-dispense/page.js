"use client";

import { useEffect, useState } from "react";
import jsPDF from "jspdf";

export default function WarehouseDispensePage() {
  const [orders, setOrders] = useState([]);
  const [groupedOrders, setGroupedOrders] = useState({});

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    const pendingOrders = storedOrders.filter((order) => order.status === "بانتظار الصرف");
    const grouped = {};
    pendingOrders.forEach((order) => {
      const key = `${order.client}_${order.date}`;
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(order);
    });
    setOrders(storedOrders);
    setGroupedOrders(grouped);
  }, []);

  const handleDispense = (groupKey) => {
    const updatedOrders = [...orders];
    const group = groupedOrders[groupKey];
    const manager = localStorage.getItem("currentUser") || "unknown";

    // تحديث حالة الطلبات
    group.forEach((entry) => {
      const idx = updatedOrders.findIndex(
        (o) => o.client === entry.client && o.code === entry.code && o.date === entry.date
      );
      if (idx !== -1) {
        updatedOrders[idx].status = "تم الصرف";
        updatedOrders[idx].warehouseManager = manager;

        // ✅ خصم الكمية من المخزون
        const allStocks = ["chocolate", "packs", "cafe"];
        for (const stockKey of allStocks) {
          const stock = JSON.parse(localStorage.getItem(stockKey) || "[]");
          const stockIndex = stock.findIndex((item) => item.code === entry.code);
          if (stockIndex !== -1) {
            stock[stockIndex].quantity -= Number(entry.quantity);
            if (stockKey === "chocolate") {
              const unitWeight = stock[stockIndex].weightPerUnit || 1;
              stock[stockIndex].weight -= unitWeight * Number(entry.quantity);
            }
            localStorage.setItem(stockKey, JSON.stringify(stock));
            break;
          }
        }
      }
    });

    // تحديث البيانات
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));

    // ✅ إزالة الطلب من الواجهة
    delete groupedOrders[groupKey];
    setGroupedOrders({ ...groupedOrders });

    alert("✅ تم صرف الطلب بالكامل!");
    generatePDF(group, manager);
  };

  const generatePDF = (group, manager) => {
    const doc = new jsPDF();
    const invoiceNumber = Math.floor(Math.random() * 90000 + 10000);
    const { client, date } = group[0];

    doc.setFontSize(16);
    doc.text("DOLCE COMPANY", 105, 15, { align: "center" });
    doc.setFontSize(12);
    doc.text(`Invoice #${invoiceNumber}`, 20, 25);
    doc.text(`Client: ${client}`, 20, 35);
    doc.text(`Date: ${date}`, 150, 35);

    let y = 50;
    doc.setFontSize(10);
    doc.text("Code", 20, y);
    doc.text("Qty", 180, y, { align: "right" });
    y += 10;

    group.forEach((order) => {
      doc.text(order.code, 20, y);
      doc.text(String(order.quantity), 180, y, { align: "right" });
      y += 8;
    });

    y += 10;
    doc.text(`Warehouse Manager: ${manager}`, 20, y);
    y += 20;
    doc.text("Receiver Signature: ____________________", 20, y);

    doc.save(`invoice-${client}-${invoiceNumber}.pdf`);
  };

  return (
    <main className="bg-amber-50 min-h-screen p-6 text-chocolate">
      <h1 className="text-2xl font-bold mb-6 text-center">📦 الطلبات المعلقة</h1>

      {Object.keys(groupedOrders).length === 0 ? (
        <p className="text-center">لا توجد طلبات حالياً.</p>
      ) : (
        Object.entries(groupedOrders).map(([key, group], index) => (
          <div key={index} className="mb-6 border rounded p-4 bg-white max-w-3xl mx-auto">
            <h2 className="text-lg font-semibold mb-2 text-center">
              👤 {group[0].client} | 📅 {group[0].date}
            </h2>
            <table className="w-full border text-sm">
              <thead>
                <tr className="bg-chocolate text-white">
                  <th className="border px-2 py-1 text-center">الكود</th>
                  <th className="border px-2 py-1 text-center">المنتج</th>
                  <th className="border px-2 py-1 text-center">الكمية</th>
                </tr>
              </thead>
              <tbody>
                {group.map((order, idx) => (
                  <tr key={idx} className="hover:bg-amber-100 text-center">
                    <td className="border px-2 py-1">{order.code}</td>
                    <td className="border px-2 py-1">{order.product}</td>
                    <td className="border px-2 py-1">{order.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 text-center">
              <button
                onClick={() => handleDispense(key)}
                className="bg-green-600 text-white px-4 py-2 rounded hover:opacity-90"
              >
                ✅ صرف الطلب
              </button>
            </div>
          </div>
        ))
      )}

      <div className="mt-6 text-center">
        <button
          onClick={() => window.location.href = "/warehouse-dashboard"}
          className="bg-gray-300 text-chocolate px-6 py-2 rounded hover:opacity-90"
        >
          ⬅️ العودة إلى لوحة تحكم المخزن
        </button>
      </div>
    </main>
  );
}
