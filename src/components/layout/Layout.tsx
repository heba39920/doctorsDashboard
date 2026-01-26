import { Sidebar } from "../Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import { SidebarProvider, useSidebar } from "../../contexts/SidebarContext";

const LayoutContent = () => {
  const { isOpen, closeSidebar } = useSidebar();
  
  return (
    <div className={`flex min-h-screen bg-[var(--background)] `}>
      <Sidebar />
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}
      <main className={`flex-1 overflow-auto relative md:ml-25`}>
        <Outlet />
      </main>
    </div>
  )
}

const Layout = () => {
  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  )
}

export default Layout;