import { Sidebar } from "../Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { t } = useTranslation();
  const isRTL = localStorage.getItem('language') === 'ar';
  
  return (
    <div className={`flex min-h-screen bg-[var(--background)] `}>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <main className={`flex-1 overflow-auto relative md:ml-25`}>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={`fixed top-4 z-50 p-3 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 md:hidden ${
            isRTL ? 'left-4' : 'right-4'
          }`}
          aria-label={isSidebarOpen ? t('sidebar.closeMenu') : t('sidebar.openMenu')}
        >
          {isSidebarOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout;