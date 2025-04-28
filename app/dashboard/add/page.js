'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { db, storage } from '@/app/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Image from 'next/image';

export default function AddPage() {
  const router = useRouter();
  const [newItem, setNewItem] = useState({
    code: '',
    name: '',
    quantity: '',
    weight: '',
    store: '',
    image: null,
  });
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (!newItem.code || !newItem.quantity || !newItem.store) {
      alert('يرجى تعبئة الحقول الأساسية (كود، الكمية، نوع المخزن)');
      return;
    }

    try {
      setLoading(true);
      let imageUrl = '';

      if (newItem.image) {
        const storageRef = ref(storage, `products/${newItem.image.name}`);
        await uploadBytes(storageRef, newItem.image);
        imageUrl = await getDownloadURL(storageRef);
      }

      await addDoc(collection(db, 'products'), {
        code: newItem.code,
        name: newItem.name || '',
        quantity: Number(newItem.quantity),
        weight: Number(newItem.weight) || 0,
        category: newItem.store,
        image: imageUrl,
      });

      alert('✅ تمت إضافة المنتج بنجاح!');
      router.push('/dashboard'); // يرجع مباشرة للوحة التحكم
    } catch (error) {
      console.error('فشل إضافة المنتج:', error);
      alert('❌ حدث خطأ أثناء إضافة المنتج.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#3B2A1A] to-[#5A3F28] flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-[#FFD700] mb-6">➕ إضافة منتج جديد</h1>

      <div className="bg-[#f5e8dc] p-6 rounded-xl shadow-lg w-full max-w-md">
        <input
          type="text"
          placeholder="كود المنتج"
          value={newItem.code}
          onChange={(e) => setNewItem({ ...newItem, code: e.target.value })}
          className="border px-4 py-2 rounded mb-4 w-full text-center text-black"
          inputMode="numeric"
        />
        <input
          type="text"
          placeholder="اسم المنتج (اختياري)"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          className="border px-4 py-2 rounded mb-4 w-full text-center text-black"
        />
        <input
          type="number"
          placeholder="الكمية"
          value={newItem.quantity}
          onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
          className="border px-4 py-2 rounded mb-4 w-full text-center text-black"
          inputMode="numeric"
        />
        <input
          type="number"
          placeholder="الوزن بالكيلو (اختياري)"
          value={newItem.weight}
          onChange={(e) => setNewItem({ ...newItem, weight: e.target.value })}
          className="border px-4 py-2 rounded mb-4 w-full text-center text-black"
          inputMode="numeric"
        />
        <select
          value={newItem.store}
          onChange={(e) => setNewItem({ ...newItem, store: e.target.value })}
          className="border px-4 py-2 rounded mb-4 w-full text-center text-black"
        >
          <option value="">اختر نوع المخزن</option>
          <option value="chocolate">مخزن الشكلاطه</option>
          <option value="pack">مخزن الباكوات</option>
          <option value="cafe">مخزن الكافي</option>
        </select>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setNewItem({ ...newItem, image: e.target.files[0] })}
          className="border px-4 py-2 rounded mb-4 w-full text-center bg-white text-black"
        />

        <button
          onClick={handleAdd}
          disabled={loading}
          className="bg-[#FFD700] text-[#3B2A1A] font-bold py-3 rounded w-full hover:opacity-90 transition"
        >
          {loading ? 'جارٍ الإضافة...' : '➕ إضافة المنتج'}
        </button>
      </div>
    </main>
  );
}
