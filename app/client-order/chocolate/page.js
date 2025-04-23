"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/app/firebase";
import { collection, onSnapshot, addDoc } from "firebase/firestore";

export default function ChocolateClientOrder() {
  const router = useRouter();
  const [chocolateStock, setChocolateStock] = useState([]);
  const [order, setOrder] = useState({});
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "client") {
      router.push("/unified-login");
    }
  }, [router]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
      const allProducts = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((item) => item.category === "chocolate");

      const sortedStock = allProducts.sort((a, b) => Number(b.weight || 0) - Number(a.weight || 0));
      setChocolateStock(sortedStock);
    });

    return () => unsubscribe();
  }, []);

  const handleQuantityChange = (code, value) => {
    setOrder({ ...order, [code]: value });
  };

  const handleSubmit = async () => {
    const today = new Date().toISOString().split("T")[0];
    const currentUser = localStorage.getItem("currentUser") || "عميل مجهول";

    const newOrders = Object.entries(order)
      .filter(([, qty]) => Number(qty) > 0)
      .map(([code, quantity]) => {
        const product = chocolateStock.find((item) => item.code === code);
        return {
          client: currentUser,
          product: product.name,
          code,
          quantity,
          status: "بانتظار الصرف",
          date: today,
        };
      });

    try {
      for (const orderItem of newOrders) {
        await addDoc(collection(db, "orders"), orderItem);
      }
      alert("✅ تم إرسال الطلب بنجاح إلى Firebase");
      router.push("/client-home");
    } catch (error) {
      console.error("❌ فشل إرسال الطلب:", error);
      alert("حدث خطأ أثناء إرسال الطلب.");
    }
  };

  const totalWeight = chocolateStock.reduce((sum, item) => sum + Number(item.weight || 0), 0);
  const totalBoxes = chocolateStock.reduce((sum, item) => sum + Number(item.quantity || 0), 0);

  return (
    <main className="bg-amber-50 min-h-screen p-6 text-chocolate text-center">
      <h1 className="text-2xl font-bold mb-6">🍫 طلب من مخزن الشكلاطة</h1>

      {chocolateStock.length === 0 ? (
        <p>لا توجد أصناف متاحة حاليًا.</p>
      ) : (
        <>
          <table className="min-w-full border mb-6 text-sm">
            <thead>
              <tr className="bg-chocolate text-white">
                <th className="border px-2 py-1">الصورة</th>
                <th className="border px-2 py-1">الكود</th>
                <th className="border px-2 py-1">اسم المنتج</th>
                <th className="border px-2 py-1">عدد العلب</th>
                <th className="border px-2 py-1">الوزن بالكيلو</th>
                <th className="border px-2 py-1">الطلب بالعدد</th>
              </tr>
            </thead>
            <tbody>
              {chocolateStock.map((item) => (
                <tr key={item.code} className="hover:bg-amber-100">
                  <td className="border px-2 py-1">
                    <div className="w-[60px] h-[60px] overflow-hidden mx-auto">
                      <img
                        src={`/${item.image}`}
                        alt={item.name}
                        className="w-full h-full object-contain cursor-pointer transition-transform duration-300 hover:scale-[2.5]"
                        onClick={() => setModalImage(item.image)}
                      />
                    </div>
                  </td>
                  <td className="border px-2 py-1">{item.code}</td>
                  <td className="border px-2 py-1">{item.name}</td>
                  <td className="border px-2 py-1">{item.quantity}</td>
                  <td className="border px-2 py-1">{item.weight}</td>
                  <td className="border px-2 py-1">
                    <input
                      type="number"
                      min="0"
                      className="w-20 text-center border rounded"
                      value={order[item.code] || ""}
                      onChange={(e) => handleQuantityChange(item.code, e.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="text-right text-sm font-semibold mb-4">
            <p>📦 إجمالي العلب: {totalBoxes} علبة</p>
            <p>⚖️ إجمالي الوزن: {totalWeight} كجم</p>
          </div>
        </>
      )}

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
        ⬅️ العودة للمخازن
      </button>

      {modalImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
          onClick={() => setModalImage(null)}
        >
          <img
            src={`/${modalImage}`}
            className="max-w-full max-h-[80vh] rounded shadow-lg"
            alt="Zoomed"
          />
        </div>
      )}
    </main>
  );
}
