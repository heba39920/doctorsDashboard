import { UserPlus, LayoutDashboard, BarChart3, Stethoscope } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '../LanguageSwitcher';

export const Sidebar = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-[var(--surface)] text-[var(--textPrimary)] w-25 h-screen py-5 px-1 border-r border-[var(--accent)] flex flex-col fixed left-0 me-25">
      <div className="mb-8">
        <div className="flex items-center gap-1">
          <Stethoscope className="w-10 h-10 text-[var(--primary)]" />
          <h6 className="text-xs font-bold text-[var(--primary)] mb-1">SCFHS.</h6>
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
              <span className="font-medium">{t('sidebar.addDoctor')}</span>
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
              <span className="font-medium">{t('sidebar.dashboard')}</span>
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
                <span className="font-medium">{t('sidebar.analytics')}</span>
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="mt-auto pt-4 border-t border-[var(--accent)] space-y-3">
        <div className="flex justify-center">
          <LanguageSwitcher />
        </div>
        <p className="text-xs text-[var(--textSecondary)] text-center">
          {t('sidebar.copyright')}
        </p>
      </div>
    </div>
  )
}
