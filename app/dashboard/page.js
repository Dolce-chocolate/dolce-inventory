'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.clear();
    router.push('/unified-login?loggedout=true');
  };

  return (
    <div className="min-h-screen flex flex-col text-primary font-sans">
      {/* Hero Section */}
      <div className="w-full relative bg-gradient-to-l from-white/90 to-white/30 bg-cover bg-center" style={{ backgroundImage: "url('https://readdy.ai/api/search-image?query=Elegant%2520luxury%2520chocolate%2520background%2520with%2520soft%2520gradient%2520from%2520cream%2520to%2520white%2C%2520featuring%2520subtle%2520cocoa%2520patterns%2520and%2520gold%2520accents.&width=1920&height=600')" }}>
        <div className="container mx-auto px-6 py-16 relative">
          <h1 className="text-5xl md:text-6xl font-bold text-primary mb-4 font-[Playfair_Display]">DOLCE CHOCOLATE</h1>
          <div className="h-1 w-32 bg-[#D4AF37] mb-6"></div>
          <p className="text-lg md:text-xl text-primary/80 max-w-xl">
            نظام إدارة مخازن دولتشي
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12 flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardButton href="/chocolate" icon="ri-store-2-line" title="مخزن الشوكولاته" desc="إدارة مخزون الشوكولاتة الفاخرة" />
          <DashboardButton href="/packs" icon="ri-gift-line" title="مخزن الباكوات" desc="إدارة التغليف ومجموعات الهدايا" />
          <DashboardButton href="/cafe" icon="ri-cup-line" title="مخزن الكافي" desc="إدارة حبوب القهوة والمنتجات" />
          <DashboardButton href="/search" icon="ri-search-line" title="البحث برمز المنتج" desc="البحث عن المنتجات بالرمز التعريفي" />
          <DashboardButton href="/dashboard/add" icon="ri-add-circle-line" title="إضافة منتج جديد" desc="إنشاء إدخالات منتج جديدة" />
          <DashboardButton href="/admin-dashboard/manage-users" icon="ri-user-settings-line" title="إدارة المستخدمين" desc="إضافة وتعديل مستخدمي النظام" />
          <DashboardButton href="/reports" icon="ri-file-chart-line" title="التقارير" desc="إنشاء تقارير المخزون والمبيعات" />
          <button onClick={handleLogout} className="menu-card flex flex-col items-center p-6 rounded-md !rounded-button bg-white/80 border border-primary/10 hover:shadow-lg transition-all">
            <div className="w-16 h-16 flex items-center justify-center mb-4 text-primary hover:text-[#D4AF37]">
              <i className="ri-logout-box-line ri-2x"></i>
            </div>
            <h3 className="text-lg font-semibold text-center whitespace-nowrap">تسجيل الخروج</h3>
            <p className="text-sm text-primary/70 text-center mt-2">الخروج من نظام الإدارة</p>
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-primary/5 border-t border-primary/10 py-6">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <h2 className="logo-text text-2xl font-semibold text-primary">DOLCE CHOCOLATE</h2>
          <div className="text-sm text-primary/70 mt-2 md:mt-0">
            جميع الحقوق محفوظة &copy; ٢٠٢٥ نظام إدارة دولتشي شوكولاتة
          </div>
        </div>
      </footer>
    </div>
  );
}

function DashboardButton({ href, icon, title, desc }) {
  return (
    <Link href={href}>
      <div className="menu-card flex flex-col items-center p-6 rounded-md !rounded-button bg-white/80 border border-primary/10 hover:shadow-lg transition-all cursor-pointer">
        <div className="w-16 h-16 flex items-center justify-center mb-4 text-primary hover:text-[#D4AF37]">
          <i className={`${icon} ri-2x`}></i>
        </div>
        <h3 className="text-lg font-semibold text-center whitespace-nowrap">{title}</h3>
        <p className="text-sm text-primary/70 text-center mt-2">{desc}</p>
      </div>
    </Link>
  );
}
