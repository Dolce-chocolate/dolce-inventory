"use client";

import { useEffect, useState } from "react";
import { db } from "@/app/firebase";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";

export default function WarehouseDispensePage() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

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

    const warehouseUser = localStorage.getItem("username") || "[اسم الأمين]";
    const invoiceWindow = window.open("", "Invoice", "width=800,height=600");
    invoiceWindow.document.write(`
      <html>
        <head>
          <title>Invoice</title>
          <style>
            body { font-family: Arial; padding: 20px; text-align: center; }
            table { margin: 20px auto; border-collapse: collapse; width: 60%; }
            th, td { border: 1px solid #000; padding: 8px; }
            .logo { font-size: 24px; font-weight: bold; margin-bottom: 20px; }
            .date { text-align: right; font-size: 12px; margin-bottom: 10px; }
          </style>
        </head>
        <body>
          <div class="date">${orderDetails.date}</div>
          <div class="logo">🍫 Dolce Chocolate</div>
          <h2>Invoice</h2>
          <table>
            <tr><th>Invoice No.</th><td>${orderId}</td></tr>
            <tr><th>Client Name</th><td>${orderDetails.client}</td></tr>
            <tr><th>Product Code</th><td>${orderDetails.code}</td></tr>
            <tr><th>Quantity</th><td>${orderDetails.quantity}</td></tr>
            <tr><th>Warehouse Officer</th><td>${warehouseUser}</td></tr>
            <tr><th>Receiver Signature</th><td>...................</td></tr>
          </table>
          <p>Thanks 💝</p>
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
              <th className="border px-2 py-1">Code</th>
              <th className="border px-2 py-1">Name</th>
              <th className="border px-2 py-1">Quantity</th>
              <th className="border px-2 py-1">Total Weight</th>
              <th className="border px-2 py-1">Action</th>
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
                        Dispense
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
