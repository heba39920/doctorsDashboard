import { Sidebar } from "../Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <main className="flex-1 overflow-auto md:ml-25">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute top-8 end-4 z-30 p-2 bg-[var(--primary)] text-white rounded-lg md:hidden hover:bg-[var(--secondary)] transition-colors"
          aria-label="Toggle sidebar"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isSidebarOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout;