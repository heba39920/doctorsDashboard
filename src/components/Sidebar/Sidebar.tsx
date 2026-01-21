import { UserPlus, LayoutDashboard, BarChart3, Stethoscope } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export const Sidebar = () => {
  return (
    <div className="bg-[var(--surface)] text-[var(--textPrimary)] w-20 h-screen py-5 px-1 border-r border-[var(--accent)] flex flex-col">
      <div className="mb-8">
      <div className="flex items-center gap-1">
        <Stethoscope className="w-10 h-10 text-[var(--primary)]" />
        <h6 className="text-xs font-bold text-[var(--primary)] mb-1">Hospital Portal</h6>
      </div>

      </div>
      <nav className="flex-1">
        <ul className="list-none p-0 space-y-2">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex flex-col justify-center items-center rounded-xl gap-3 py-3 text-xs  transition-all duration-200 ${
                  isActive
                    ? ' text-(--primary) text-shadow-lg shadow-black'
                    : ' text-[var(--textPrimary)] hover:bg-(--accent)'
                }`
              }
            >
              <UserPlus size={20} />
              <span className="font-medium">Add Doctor</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex flex-col justify-center items-center text-xs gap-3 p-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? ' text-(--primary) text-shadow-lg shadow-black'
                    : ' text-[var(--textPrimary)] hover:bg-(--accent)'
                }`
              }
            >
              <LayoutDashboard size={20} />
              <span className="font-medium">Dashboard</span>
            </NavLink>
          </li>
          <li>
          <NavLink to="/analytics" className={({ isActive }) =>
                `flex flex-col justify-center items-center text-xs gap-3 p-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? ' text-(--primary) text-shadow-lg shadow-black'
                    : ' text-[var(--textPrimary)] hover:bg-(--accent)'
                }`
              }>
              <BarChart3 size={20} />
              <span className="font-medium">Analytics</span>
              </NavLink>
          </li>
        </ul>
      </nav>
      <div className="mt-auto pt-4 border-t border-[var(--accent)]">
        <p className="text-xs text-[var(--textSecondary)] text-center">
          © 2024 Hospital Portal
        </p>
      </div>
    </div>
  )
}
