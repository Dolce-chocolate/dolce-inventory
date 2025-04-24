"use client";

import { useEffect, useState } from "react";
import { db } from "@/app/firebase";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";

export default function WarehouseDispensePage() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const warehouseUser = typeof window !== "undefined" ? localStorage.getItem("username") || "Warehouse" : "Warehouse";

  useEffect(() => {
    const fetchProducts = async () => {
      const snapshot = await getDocs(collection(db, "products"));
      const allProducts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(allProducts);
    };

    const fetchOrders = async () => {
      const snapshot = await getDocs(collection(db, "orders"));
      const allOrders = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(allOrders);
    };

    fetchProducts();
    fetchOrders();
  }, []);

  const handleDispense = async (orderId, orderDetails) => {
    const orderRef = doc(db, "orders", orderId);
    await updateDoc(orderRef, { status: "تم الصرف" });

    const invoiceWindow = window.open("", "Invoice", "width=800,height=600");
    const now = new Date();
    const time = now.toLocaleTimeString();
    const date = now.toLocaleDateString("ar-EG");

    invoiceWindow.document.write(`
      <html dir="rtl">
        <head>
          <title>Invoice</title>
          <style>
            body { font-family: Arial; padding: 20px; text-align: center; }
            table { margin: 20px auto; border-collapse: collapse; width: 80%; direction: rtl; }
            th, td { border: 1px solid #000; padding: 8px; text-align: center; }
            .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
            .title { font-size: 20px; margin-bottom: 10px; }
            .info { font-size: 14px; margin-bottom: 20px; text-align: right; padding-right: 40px; }
          </style>
        </head>
        <body>
          <div class="info">
            <div>التاريخ: ${date}</div>
            <div>الوقت: ${time}</div>
            <div>رقم الفاتورة: ${orderId}</div>
          </div>
          <div class="logo">🍫 Dolce Chocolate</div>
          <div class="title">فاتورة صرف</div>
          <div class="title">${orderDetails.client}</div>
          <table>
            <thead>
              <tr>
                <th>رقم تسلسلي</th>
                <th>الكود</th>
                <th>الكمية</th>
                <th>ملاحظات</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>${orderDetails.code}</td>
                <td>${orderDetails.quantity}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <div class="info" style="margin-top: 30px;">
            اسم أمين المخزن: ${warehouseUser}<br>
            توقيع المستلم: ...................
          </div>
          <p style="margin-top: 20px;">❤️ Thank you</p>
          <script>window.print();</script>
        </body>
      </html>
    `);

    invoiceWindow.document.close();
    alert("✅ تم صرف الطلب وتم إصدار الفاتورة");

    const snapshot = await getDocs(collection(db, "orders"));
    const updatedOrders = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setOrders(updatedOrders);
  };

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold mb-4">📦 Warehouse Dispense Page</h1>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <table className="min-w-full border text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 py-1">الكود</th>
              <th className="border px-2 py-1">الاسم</th>
              <th className="border px-2 py-1">العدد</th>
              <th className="border px-2 py-1">الوزن</th>
              <th className="border px-2 py-1">العملية</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => {
              const relatedOrder = orders.find(
                (order) =>
                  order.code === item.code &&
                  order.status === "بانتظار الصرف"
              );

              return (
                <tr key={item.id}>
                  <td className="border px-2 py-1">{item.code}</td>
                  <td className="border px-2 py-1">{item.name}</td>
                  <td className="border px-2 py-1">{item.quantity}</td>
                  <td className="border px-2 py-1">
                    {item.weight && item.quantity
                      ? Number(item.weight) * Number(item.quantity) + " kg"
                      : "-"}
                  </td>
                  <td className="border px-2 py-1">
                    {relatedOrder ? (
                      <button
                        onClick={() =>
                          handleDispense(relatedOrder.id, relatedOrder)
                        }
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                      >
                        صرف
                      </button>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </main>
  );
}
