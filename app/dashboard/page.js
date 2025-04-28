"use client";

import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#f5e6d3] to-white">
      {/* Header Section */}
      <div className="relative w-full bg-cover bg-center h-64" style={{backgroundImage: "url('https://readdy.ai/api/search-image?query=Elegant%2520luxury%2520chocolate%2520background%2520with%2520soft%2520gradient%2520from%2520cream%2520to%2520white&width=1920&height=600')"}}>
        <div className="absolute inset-0 bg-gradient-to-l from-white/90 to-white/30 flex flex-col justify-center items-center">
          <h1 className="text-5xl font-bold text-[#4A3428] mb-2 tracking-wide">DOLCE CHOCOLATE</h1>
          <div className="w-32 h-1 bg-[#D4AF37] mb-4"></div>
          <p className="text-primary/80 text-lg">نظام ادارة مخازن دولتشي</p>
        </div>
      </div>

      {/* Menu Section */}
      <div className="container mx-auto px-6 py-12 flex-grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MenuItem href="/chocolate" icon="ri-store-2-line" title="مخزن الشوكولاتة" subtitle="إدارة مخزون الشوكولاتة الفاخرة" />
        <MenuItem href="/packs" icon="ri-gift-line" title="مخزن الباكوات" subtitle="إدارة التغليف ومجموعات الهدايا" />
        <MenuItem href="/cafe" icon="ri-cup-line" title="مخزن الكافي" subtitle="إدارة حبوب القهوة والمنتجات" />
        <MenuItem href="/search" icon="ri-search-line" title="البحث برمز المنتج" subtitle="البحث عن المنتجات بالرمز التعريفي" />
        <MenuItem href="/dashboard/add" icon="ri-add-circle-line" title="إضافة منتج جديد" subtitle="إنشاء إدخالات منتج جديدة" />
        <MenuItem href="/admin-dashboard/manage-users" icon="ri-user-settings-line" title="إدارة المستخدمين" subtitle="إضافة وتعديل مستخدمي النظام" />
        <MenuItem href="/reports" icon="ri-file-chart-line" title="التقارير" subtitle="إنشاء تقارير المخزون والمبيعات" />
        <MenuItem href="/unified-login" icon="ri-logout-box-line" title="تسجيل الخروج" subtitle="الخروج من نظام الإدارة" clearStorage />
      </div>

      {/* Footer */}
      <footer className="bg-primary/5 border-t border-primary/10 py-6">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <h2 className="text-2xl font-semibold text-[#4A3428]">DOLCE CHOCOLATE</h2>
          <div className="text-sm text-primary/70">جميع الحقوق محفوظة &copy; ٢٠٢٥ نظام إدارة دولتشي شوكولاتة</div>
        </div>
      </footer>
    </div>
  );
}

function MenuItem({ href, icon, title, subtitle, clearStorage }) {
  const handleClick = () => {
    if (clearStorage) localStorage.clear();
  };

  return (
    <Link href={href}>
      <div
        onClick={handleClick}
        className="menu-card flex flex-col items-center p-6 rounded-2xl bg-white/80 border border-[#D4AF37]/20 shadow-md hover:shadow-lg hover:scale-105 transition-all cursor-pointer"
      >
        <div className="w-16 h-16 flex items-center justify-center mb-4">
          <i className={`${icon} ri-2x text-[#4A3428] hover:text-[#D4AF37] transition`} />
        </div>
        <h3 className="text-lg font-bold text-center text-[#4A3428] whitespace-nowrap">{title}</h3>
        <p className="text-sm text-primary/70 text-center mt-2">{subtitle}</p>
      </div>
    </Link>
  );
}
