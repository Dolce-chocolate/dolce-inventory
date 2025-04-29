'use client';

import { useRouter } from 'next/navigation';

export default function ComingSoonPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#F5E6D3] to-white text-[#4A3428] font-sans p-6">
      <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">Coming Soon...</h1>
      <p className="text-lg md:text-xl text-[#4A3428]/70 mb-10">نحن نجهز لكم خاصية الإحصائيات قريباً.</p>

      <button
        onClick={() => router.push('/dashboard')}
        className="bg-[#4A3428] text-[#F5E6D3] px-8 py-3 rounded-full shadow hover:bg-[#3B2A1A] transition"
      >
        ⬅️ العودة إلى لوحة التحكم
      </button>
    </div>
  );
}
