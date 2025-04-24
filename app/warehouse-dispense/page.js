"use client";

import { useEffect, useState } from "react";
import { db } from "@/app/firebase";
import { collection, getDocs, doc, updateDoc, query, orderBy, limit, onSnapshot } from "firebase/firestore";

export default function WarehouseDispensePage() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [username, setUsername] = useState("أمين مخزن");

  useEffect(() => {
    const loginInfo = localStorage.getItem("username");
    if (loginInfo) setUsername(loginInfo);

    const unsubscribeProducts = onSnapshot(collection(db, "products"), (snapshot) => {
      const allProducts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProducts(allProducts);
    });

    const unsubscribeOrders = onSnapshot(collection(db, "orders"), (snapshot) => {
      const allOrders = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setOrders(allOrders);
    });

    return () => {
      unsubscribeProducts();
      unsubscribeOrders();
    };
  }, []);

  const generateInvoiceNumber = async () => {
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"), limit(1));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return "00001";

    const lastInvoice = snapshot.docs[0].data().invoiceNumber || "00000";
    const next = String(parseInt(lastInvoice) + 1).padStart(5, "0");
    return next;
  };

  const handleDispense = async (orderId, orderDetails) => {
    const orderRef = doc(db, "orders", orderId);
    await updateDoc(orderRef, { status: "تم الصرف" });

    const productRef = products.find((p) => p.code === orderDetails.code);
    if (productRef) {
      const prodDoc = doc(db, "products", productRef.id);
      const newQuantity = Number(productRef.quantity) - Number(orderDetails.quantity);
      await updateDoc(prodDoc, { quantity: newQuantity });
    }

    const invoiceNumber = await generateInvoiceNumber();
    const now = new Date();
    const time = now.toLocaleTimeString("en-US");
    const date = now.toLocaleDateString("en-GB").replace(/[٠-٩]/g, d => d.charCodeAt(0) - 1632);
    const warehouseUser = username;

    await updateDoc(orderRef, { invoiceNumber, createdAt: new Date() });

    const invoiceWindow = window.open("", "Invoice", "width=800,height=600");
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
            <div>رقم الفاتورة: ${invoiceNumber}</div>
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
  };

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold mb-4">📦 صفحة صرف البضاعة</h1>
      <a href="/warehouse-dashboard" className="text-blue-600 underline mb-4 block">⬅️ العودة إلى لوحة التحكم</a>
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
                    {item.category === "chocolate" && item.weight && item.quantity
                      ? Number(item.weight) * Number(item.quantity) + " كجم"
                      : "-"}
                  </td>
                  <td className="border px-2 py-1">
                    {relatedOrder ? (
                      <button
                        onClick={() => handleDispense(relatedOrder.id, relatedOrder)}
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
