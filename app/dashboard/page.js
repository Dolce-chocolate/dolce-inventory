'use client';

import Link from 'next/link';

export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-gradient-to-br from-[#F5E6D3] to-white text-[#4A3428]">
      {/* Hero Section */}
      <div className="relative bg-cover bg-center" style={{ backgroundImage: 'url(https://readdy.ai/api/search-image?query=Elegant%2520luxury%2520chocolate%2520background%2520with%2520soft%2520gradient%2520from%2520cream%2520to%2520white%2C%2520featuring%2520subtle%2520cocoa%2520patterns%2520and%2520gold%2520accents.&width=1920&height=600)' }}>
        <div className="bg-white/70 w-full h-full absolute inset-0"></div>
        <div className="relative z-10 container mx-auto px-6 py-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">DOLCE CHOCOLATE</h1>
          <div className="h-1 w-32 bg-[#D4AF37] mb-6"></div>
          <p className="text-lg md:text-xl text-[#4A3428]/80 max-w-xl">نظام ادارة مخازن دولتشي</p>
        </div>
      </div>

      {/* Main Section */}
      <div className="container mx-auto px-6 py-12 flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card href="/chocolate" icon="ri-store-2-line" title="مخزن الشكولاته" desc="إدارة مخزون الشوكولاتة الفاخرة" />
          <Card href="/packs" icon="ri-gift-line" title="مخزن الباكوات" desc="إدارة التغليف ومجموعات الهدايا" />
          <Card href="/cafe" icon="ri-cup-line" title="مخزن الكافي" desc="إدارة حبوب القهوة والمنتجات" />
          <Card href="/search" icon="ri-search-line" title="البحث برمز المنتج" desc="البحث عن المنتجات بالرمز التعريفي" />
          <Card href="/dashboard/add" icon="ri-add-circle-line" title="إضافة منتج جديد" desc="إنشاء إدخالات منتج جديدة" />
          <Card href="/admin-dashboard/manage-users" icon="ri-user-settings-line" title="إدارة المستخدمين" desc="إضافة وتعديل مستخدمي النظام" />
          <Card href="/reports" icon="ri-file-chart-line" title="التقارير" desc="إنشاء تقارير المخزون والمبيعات" />
          <Card href="/unified-login" icon="ri-logout-box-line" title="تسجيل الخروج" desc="الخروج من نظام الإدارة" clearStorage />
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#4A3428]/5 border-t border-[#4A3428]/10 py-6">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-semibold">DOLCE CHOCOLATE</h2>
          </div>
          <div className="text-sm text-[#4A3428]/70">
            جميع الحقوق محفوظة &copy; ٢٠٢٥ نظام إدارة دولتشي شوكولاتة
          </div>
        </div>
      </footer>
    </div>
  );
}

function Card({ href, icon, title, desc, clearStorage }) {
  const handleClick = () => {
    if (clearStorage) {
      localStorage.clear();
    }
  };

  return (
    <Link href={href}>
      <div onClick={handleClick} className="menu-card flex flex-col items-center p-6 rounded-button bg-white/80 shadow-md border border-[#D4AF37]/20 hover:shadow-lg hover:border-[#D4AF37]/40 transition-all cursor-pointer">
        <div className="w-16 h-16 flex items-center justify-center mb-4">
          <i className={`${icon} ri-2x menu-icon`}></i>
        </div>
        <h3 className="text-lg font-semibold text-center whitespace-nowrap">{title}</h3>
        <p className="text-sm text-[#4A3428]/70 text-center mt-2">{desc}</p>
      </div>
    </Link>
  );
}
