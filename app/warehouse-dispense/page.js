"use client";

import { useEffect, useState } from "react";
import { db } from "@/app/firebase";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";

export default function WarehouseDispensePage() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const warehouseUser = typeof window !== "undefined" ? localStorage.getItem("username") || "أمين مخزن" : "أمين مخزن";

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

    const productRef = products.find((p) => p.code === orderDetails.code);
    if (productRef) {
      const prodDoc = doc(db, "products", productRef.id);
      const newQuantity = Number(productRef.quantity) - Number(orderDetails.quantity);
      await updateDoc(prodDoc, { quantity: newQuantity });
    }

    const invoiceWindow = window.open("", "Invoice", "width=800,height=600");
    const now = new Date();
    const time = now.toLocaleTimeString();
    const date = now.toLocaleDateString("ar-EG");

    invoiceWindow.document.write(`
      <html dir="rtl">
        <head>
          <title>فاتورة</title>
          <style>
            body { font-family: Arial; padding: 20px; }
            .header { text-align: center; margin-bottom: 20px; }
            .header h1 { margin: 0; font-size: 24px; }
            .header h2 { margin: 5px 0; }
            .info { margin-bottom: 20px; text-align: right; font-size: 14px; }
            table { width: 100%; border-collapse: collapse; font-size: 14px; margin-top: 10px; direction: rtl; }
            th, td { border: 1px solid black; padding: 8px; text-align: center; }
            .footer { margin-top: 30px; font-size: 14px; text-align: right; }
          </style>
        </head>
        <body>
          <div class="info">
            <div>التاريخ: ${date}</div>
            <div>الوقت: ${time}</div>
            <div>رقم الفاتورة: ${orderId}</div>
          </div>

          <div class="header">
            <h1>🍫 Dolce Chocolate</h1>
            <h2>فاتورة صرف</h2>
            <div style="font-size: 18px; font-weight: bold;">${orderDetails.client}</div>
          </div>

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

          <div class="footer">
            <div>اسم أمين المخزن: ${warehouseUser}</div>
            <div>توقيع المستلم: ...................</div>
          </div>

          <p style="text-align: center; margin-top: 20px;">❤️ Thank you</p>

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
      <h1 className="text-xl font-bold mb-4">📦 صفحة صرف البضاعة</h1>
      {products.length === 0 ? (
        <p>لا توجد منتجات حالياً.</p>
      ) : (
        <table className="min-w-full border text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 py-1">الكود</th>
              <th className="border px-2 py-1">الاسم</th>
              <th className="border px-2 py-1">المتوفر</th>
              <th className="border px-2 py-1">الوزن الإجمالي</th>
              <th className="border px-2 py-1">الإجراء</th>
              <th className="border px-2 py-1">المطلوب</th>
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
                      ? Number(item.weight) * Number(item.quantity) + " كجم"
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
                  <td className="border px-2 py-1">
                    {relatedOrder ? relatedOrder.quantity : "-"}
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
