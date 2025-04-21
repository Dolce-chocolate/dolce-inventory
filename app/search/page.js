"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SearchPage() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);
  const router = useRouter();

  const handleSearch = () => {
    const allStores = ["chocolate", "packs", "cafe"];
    let found = null;

    for (let store of allStores) {
      const data = localStorage.getItem(store);
      if (data) {
        const items = JSON.parse(data);
        const match = items.find((item) => item.code === code);
        if (match) {
          found = { ...match, store };
          break;
        }
      }
    }

    setResult(found);
  };

  return (
    <main className="bg-cream min-h-screen px-4 py-8 text-center text-chocolate">
      <h1 className="text-2xl font-bold mb-6">🔍 نظام البحث بالكود</h1>

      <input
        type="text"
        placeholder="أدخل كود الصنف"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="px-4 py-2 rounded border text-black"
      />
      <button
        onClick={handleSearch}
        className="ml-4 px-6 py-2 bg-chocolate text-white rounded hover:opacity-90"
      >
        بحث
      </button>

      {result ? (
        <div className="mt-6 bg-white p-4 rounded shadow text-sm max-w-md mx-auto">
          <p><strong>📦 المخزن:</strong> {result.store}</p>
          <p><strong>🔢 الكود:</strong> {result.code}</p>
          <p><strong>📛 الاسم:</strong> {result.name}</p>
          <p><strong>🔢 الكمية:</strong> {result.quantity}</p>
          {result.weight && <p><strong>⚖️ الوزن:</strong> {result.weight} كجم</p>}
          <div className="mt-2">
            <Image
              src={`/${result.image}`}
              alt="صورة الصنف"
              width={80}
              height={80}
              className="mx-auto rounded"
            />
          </div>
        </div>
      ) : (
        code && <p className="mt-4 text-red-600">لم يتم العثور على الصنف.</p>
      )}

      <button
        onClick={() => router.push("/dashboard")}
        className="mt-10 px-6 py-2 bg-chocolate text-white rounded hover:opacity-90"
      >
        ⬅️ العودة للوحة التحكم
      </button>
    </main>
  );
}
