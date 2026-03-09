"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Beaker, FileText, Settings, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  const navItems = [
    { label: "لوحة التحكم", href: "/admin", icon: LayoutDashboard },
    { label: "إدارة الفحوصات", href: "/admin/tests", icon: Beaker },
    { label: "إدارة المقالات", href: "/admin/articles", icon: FileText },
    { label: "إعدادات الموقع", href: "/admin/settings", icon: Settings },
  ];

  return (
    <>
      {/* Mobile Toggle */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-50 bg-primary-dark-green text-white p-4 rounded-full shadow-xl"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed lg:sticky top-0 right-0 h-screen w-72 bg-white border-l border-gray-100 shadow-sm z-40
        flex flex-col transition-transform duration-300
        ${isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
      `}>
        {/* Brand */}
        <div className="p-6 border-b border-gray-50 flex-shrink-0">
          <Link href="/" className="flex items-center gap-2">
            <div className="text-primary-dark-green font-tajawal font-bold text-2xl flex flex-col leading-none">
              <span>مختبر</span>
              <span>الفيروز</span>
            </div>
            <div className="text-xs text-gray-500 font-cairo">لوحة الإدارة</div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link 
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl font-tajawal font-medium transition-all
                  ${isActive 
                    ? 'bg-secondary-soft-green text-primary-dark-green' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-primary-dark-green'}
                `}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-primary-light-green' : ''}`} />
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Footer actions */}
        <div className="p-4 border-t border-gray-50 flex-shrink-0">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-right text-red-600 font-tajawal font-medium hover:bg-red-50 rounded-xl transition-colors"
          >
            <LogOut className="w-5 h-5 ltr:rotate-180" />
            تسجيل الخروج
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

