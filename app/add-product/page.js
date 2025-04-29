'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '@/app/firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

export default function AddProductPage() {
  const router = useRouter();
  const [product, setProduct] = useState({
    code: '',
    name: '',
    quantity: '',
    weight: '',
    store: 'chocolate'
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleAddProduct = async () => {
    setError('');
    setSuccess('');

    if (!product.code || !product.quantity) {
      setError('❌ يجب تعبئة كود المنتج والكمية.');
      return;
    }

    try {
      const existingQuery = query(
        collection(db, 'products'),
        where('code', '==', product.code),
        where('store', '==', product.store)
      );
      const existingSnapshot = await getDocs(existingQuery);

      if (!existingSnapshot.empty) {
        setError('⚠️ الكود موجود بالفعل في نفس المخزن.');
        return;
      }

      await addDoc(collection(db, 'products'), {
        code: product.code,
        name: product.name,
        quantity: Number(product.quantity),
        weight: Number(product.weight || 0),
        store: product.store,
        image: '' // لا يوجد رفع صور حالياً في الخطة المجانية
      });

      setSuccess('✅ تمت إضافة المنتج بنجاح!');
      setProduct({ code: '', name: '', quantity: '', weight: '', store: 'chocolate' });
    } catch (e) {
      setError('❌ حدث خطأ أثناء الإضافة.');
      console.error(e);
    }
  };

  return (
    <main className="min-h-screen bg-amber-50 p-6 text-center">
      <h1 className="text-3xl font-bold text-brown-700 mb-6">➕ إضافة منتج جديد</h1>

      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
        {error && <p className="text-red-600 mb-2">{error}</p>}
        {success && <p className="text-green-600 mb-2">{success}</p>}

        <input
          type="text"
          placeholder="🔢 كود المنتج"
          value={product.code}
          onChange={(e) => setProduct({ ...product, code: e.target.value })}
          className="w-full mb-4 p-2 border rounded text-right text-sm h-[100px]"
        />

        <input
          type="text"
          placeholder="📦 اسم المنتج (اختياري)"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          className="w-full mb-4 p-2 border rounded text-right text-sm h-[100px]"
        />

        <input
          type="number"
          placeholder="📦 الكمية"
          value={product.quantity}
          onChange={(e) => setProduct({ ...product, quantity: e.target.value })}
          className="w-full mb-4 p-2 border rounded text-right text-sm h-[100px]"
        />

        <input
          type="number"
          placeholder="⚖️ الوزن بالكيلو (اختياري)"
          value={product.weight}
          onChange={(e) => setProduct({ ...product, weight: e.target.value })}
          className="w-full mb-4 p-2 border rounded text-right text-sm h-[100px]"
        />

        <select
          value={product.store}
          onChange={(e) => setProduct({ ...product, store: e.target.value })}
          className="w-full mb-4 p-2 border rounded text-sm h-[100px]"
        >
          <option value="chocolate">🍫 مخزن الشكلاطه</option>
          <option value="packs">🎁 مخزن الباكوات</option>
          <option value="cafe">☕ مخزن الكافي</option>
        </select>

        <button
          onClick={handleAddProduct}
          className="w-full bg-brown-700 text-white py-2 rounded hover:bg-brown-800"
        >
          إضافة المنتج
        </button>

        <button
          onClick={() => router.push('/dashboard')}
          className="w-full mt-4 underline text-brown-700"
        >
          ⬅️ العودة إلى لوحة التحكم
        </button>
      </div>
    </main>
  );
}
