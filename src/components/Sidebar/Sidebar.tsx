import { UserPlus, LayoutDashboard, BarChart3, Stethoscope } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '../LanguageSwitcher';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({  onClose }: SidebarProps) => {
  const { t } = useTranslation();

  return (
    <div className={`bg-[var(--textPrimary)] text-[var(--background)] w-1/2 md:w-26 h-screen py-5 px-1 flex flex-col fixed z-50 transition-transform duration-300`}>
      <div className="mb-8">
        <div className="flex items-center gap-1 justify-center md:justify-start">
          <Stethoscope className="w-10 h-10 text-[var(--background)]" />
          <h6 className="text-xs font-bold text-[var(--background)] mb-1">SCFHS.</h6>
        </div>
      </div>
      <nav className="flex-1">
        <ul className="list-none p-0 space-y-2">
          <li>
            <NavLink
              to="/"
              onClick={onClose}
              className={({ isActive }) =>
                `flex md:flex-col justify-start md:justify-center md:px-0 px-2 items-center rounded-xl gap-3 md:py-3 py-2 text-xs  transition-all duration-200 ${
                  isActive
                    ? ' text-(--primary) '
                    : ' text-[var(--background)] hover:bg-(--secondary)'
                }`
              }
            >
              <UserPlus size={20} />
              <span className="font-medium">{t('sidebar.addProfessional')}</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard"
              onClick={onClose}
              className={({ isActive }) =>
                `flex md:flex-col md:justify-center justify-start md:px-0 px-2 items-center text-xs gap-3 md:py-3 py-2 rounded-xl transition-all duration-200 ${
                  isActive
                    ? ' text-(--primary) '
                    : ' text-[var(--background)] hover:bg-(--secondary)'
                }`
              }
            >
              <LayoutDashboard size={20} />
              <span className="font-medium">{t('sidebar.dashboard')}</span>
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/analytics" 
              onClick={onClose}
              className={({ isActive }) =>
                  `flex md:flex-col md:justify-center justify-start md:px-0 px-2 items-center text-xs gap-3 md:py-3 py-2 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'text-(--primary)'
                      : 'text-[var(--background)] hover:bg-(--secondary)'
                  }`
                }>
                <BarChart3 size={20} />
                <span className="font-medium">{t('sidebar.analytics')}</span>
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="mt-auto pt-4 border-t border-[var(--secondary)] space-y-3">
        <div className="flex justify-center">
          <LanguageSwitcher />
        </div>
        <p className="text-xs text-[var(--background)] text-center">
          {t('sidebar.copyright')}
        </p>
      </div>
    </div>
  )
}
