'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { db, storage } from '@/app/firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function AddProductPage() {
  const router = useRouter();
  const [product, setProduct] = useState({
    code: '',
    name: '',
    quantity: '',
    weight: '',
    store: 'chocolate',
    imageFile: null,
  });
  const [loading, setLoading] = useState(false);

  const handleAddProduct = async () => {
    if (!product.code.trim()) {
      alert('⚠️ يجب تعبئة كود المنتج.');
      return;
    }

    if (!product.quantity.trim()) {
      alert('⚠️ يجب تعبئة الكمية.');
      return;
    }

    setLoading(true);

    try {
      // تحقق من عدم تكرار الكود
      const q = query(collection(db, 'products'), where('code', '==', product.code));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        alert('⚠️ الكود مستخدم من قبل، يرجى اختيار كود آخر.');
        setLoading(false);
        return;
      }

      let imageUrl = '';

      if (product.imageFile) {
        const storageRef = ref(storage, `products/${product.imageFile.name}`);
        await uploadBytes(storageRef, product.imageFile);
        imageUrl = await getDownloadURL(storageRef);
      }

      await addDoc(collection(db, 'products'), {
        code: product.code,
        name: product.name || '',
        quantity: Number(product.quantity),
        weight: product.weight ? Number(product.weight) : 0,
        store: product.store,
        image: imageUrl,
      });

      alert('✅ تمت إضافة المنتج بنجاح!');
      setProduct({
        code: '',
        name: '',
        quantity: '',
        weight: '',
        store: 'chocolate',
        imageFile: null,
      });
    } catch (error) {
      console.error('❌ خطأ أثناء إضافة المنتج:', error);
      alert('❌ حدث خطأ أثناء إضافة المنتج.');
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-amber-50 p-6 flex flex-col items-center justify-start">
      <h1 className="text-3xl font-bold text-brown-700 mb-8">➕ إضافة منتج جديد</h1>

      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
        <input
          type="text"
          placeholder="🔢 كود المنتج (إجباري)"
          value={product.code}
          onChange={(e) => setProduct({ ...product, code: e.target.value })}
          className="w-[100px] mb-4 p-2 border rounded"
        />

        <input
          type="text"
          placeholder="📦 اسم المنتج (اختياري)"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          className="w-[100px] mb-4 p-2 border rounded"
        />

        <input
          type="number"
          placeholder="📦 الكمية (إجباري)"
          value={product.quantity}
          onChange={(e) => setProduct({ ...product, quantity: e.target.value })}
          className="w-[100px] mb-4 p-2 border rounded"
        />

        <input
          type="number"
          placeholder="⚖️ الوزن بالكيلو (اختياري)"
          value={product.weight}
          onChange={(e) => setProduct({ ...product, weight: e.target.value })}
          className="w-[100px] mb-4 p-2 border rounded"
        />

        <select
          value={product.store}
          onChange={(e) => setProduct({ ...product, store: e.target.value })}
          className="w-[100px] mb-4 p-2 border rounded"
        >
          <option value="chocolate">مخزن الشكولاته</option>
          <option value="packs">مخزن الباكوات</option>
          <option value="cafe">مخزن الكافي</option>
        </select>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setProduct({ ...product, imageFile: e.target.files[0] })}
          className="w-[100px] mb-4"
        />

        <button
          onClick={handleAddProduct}
          disabled={loading}
          className="w-full bg-brown-700 text-white py-2 rounded hover:bg-brown-800 transition disabled:opacity-50"
        >
          {loading ? 'جاري الإضافة...' : '➕ إضافة المنتج'}
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
