import { BarChart3, Users, FileText, TrendingUp, Award, Calendar, Loader2, AlertCircle, Menu } from "lucide-react"
import { useTranslation } from "react-i18next"
import { useGetStats } from "../utils/hooks/Hooks"
import { formatValue } from "../utils/helperfunctions/ProfessionalUtils"
import { useSidebar } from "../contexts/SidebarContext"

const Analytics = () => {
  const { t } = useTranslation()
  const { openSidebar } = useSidebar()
  const { data: statsData, isLoading, isError, error } = useGetStats()
  const isRTL = localStorage.getItem('language') === 'ar';
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--surface)] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[var(--primary)] animate-spin mx-auto mb-4" />
          <p className="text-[var(--textSecondary)]">{t('analytics.loadingAnalytics')}</p>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-[var(--surface)] flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-[var(--textPrimary)] mb-2">{t('analytics.errorLoadingAnalytics')}</h2>
          <p className="text-[var(--textSecondary)]">
            {error instanceof Error ? error.message : t('analytics.errorLoadingAnalytics')}
          </p>
        </div>
      </div>
    )
  }

  if (!statsData) {
    return null
  }

  // Use stats from API
  const totalProfessionals = statsData.total_professionals
  const totalSpecializations = statsData.total_specializations
  const avgYearsOfExperience = Math.round(statsData.average_years_of_experience)
  const professionalsWithSCFHS = statsData.professionals_with_scfhs_license
  const professionalsWithCertifications = statsData.professionals_with_certifications
  
  // Get top specializations
  const topSpecializations = Object.entries(statsData.top_specializations)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
  
  // Get professional types distribution
  const professionalTypes = Object.entries(statsData.by_professional_type)
    .sort(([, a], [, b]) => b - a)
  
  return (
    <div className="min-h-screen bg-[var(--surface)] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 bg-white rounded-xl border border-[var(--accent)] shadow-sm p-6">
          <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
              <div className={`flex items-center gap-1 mb-2 ${isRTL ? 'justify-end' : 'justify-start'}`}>
                <BarChart3 className="w-8 h-8 text-[var(--primary)]" />
                <h1 className="text-2xl font-bold text-[var(--textPrimary)]">
                  {t('analytics.title')}
                </h1>
              </div>
              <p className="text-[var(--textSecondary)]">
                {t('analytics.subtitle')}
              </p>
            </div>
            <button
              onClick={openSidebar}
              className={`md:hidden p-3 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 ${isRTL ? 'ml-4' : 'mr-4'}`}
              aria-label={t('sidebar.openMenu')}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-[var(--accent)]">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-[var(--accent)] rounded-lg">
                <Users className="w-6 h-6 text-[var(--primary)]" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-sm text-[var(--textSecondary)] mb-1">{t('dashboard.totalProfessionals')}</h3>
            <p className="text-3xl font-bold text-[var(--textPrimary)]">{totalProfessionals}</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-[var(--accent)]">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-[var(--accent)] rounded-lg">
                <Award className="w-6 h-6 text-[var(--primary)]" />
              </div>
            </div>
            <h3 className="text-sm text-[var(--textSecondary)] mb-1">{t('analytics.specializations')}</h3>
            <p className="text-3xl font-bold text-[var(--textPrimary)]">{totalSpecializations}</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-[var(--accent)]">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-[var(--accent)] rounded-lg">
                <Calendar className="w-6 h-6 text-[var(--primary)]" />
              </div>
            </div>
            <h3 className="text-sm text-[var(--textSecondary)] mb-1">{t('analytics.avgYearsOfExperience')}</h3>
            <p className="text-3xl font-bold text-[var(--textPrimary)]">{avgYearsOfExperience}</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-[var(--accent)]">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-[var(--accent)] rounded-lg">
                <FileText className="w-6 h-6 text-[var(--primary)]" />
              </div>
            </div>
            <h3 className="text-sm text-[var(--textSecondary)] mb-1">{t('analytics.withSCFHSLicense')}</h3>
            <p className="text-3xl font-bold text-[var(--textPrimary)]">{professionalsWithSCFHS}</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-[var(--accent)]">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-[var(--accent)] rounded-lg">
                <Award className="w-6 h-6 text-[var(--primary)]" />
              </div>
            </div>
            <h3 className="text-sm text-[var(--textSecondary)] mb-1">{t('analytics.withCertifications')}</h3>
            <p className="text-3xl font-bold text-[var(--textPrimary)]">{professionalsWithCertifications}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Professional Types Distribution */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-[var(--accent)]">
            <h2 className="text-xl font-bold text-[var(--textPrimary)] mb-6 flex items-center gap-2">
              <Users className="w-5 h-5 text-[var(--primary)]" />
              {t('analytics.professionalTypesDistribution')}
            </h2>
            <div className="space-y-4">
              {professionalTypes.map(([type, count]) => (
                <div key={type} className="flex items-center justify-between p-3 bg-[var(--surface)] rounded-lg">
                  <span className="font-medium text-[var(--textPrimary)]">
                    {formatValue(type)}
                  </span>
                  <div className="flex items-center gap-3">
                    <div className="w-24 bg-[var(--accent)] rounded-full h-2">
                      <div
                        className="bg-[var(--primary)] h-2 rounded-full"
                        style={{ width: `${(count / totalProfessionals) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-[var(--primary)] w-8 text-right">
                      {count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Specializations */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-[var(--accent)]">
            <h2 className="text-xl font-bold text-[var(--textPrimary)] mb-6 flex items-center gap-2">
              <Award className="w-5 h-5 text-[var(--primary)]" />
              {t('analytics.topSpecializations')}
            </h2>
            <div className="space-y-4">
              {topSpecializations.map(([specialization, count]) => (
                <div key={specialization} className="flex items-center justify-between p-3 bg-[var(--surface)] rounded-lg">
                  <span className="font-medium text-[var(--textPrimary)]">
                    {formatValue(specialization)}
                  </span>
                  <div className="flex items-center gap-3">
                    <div className="w-24 bg-[var(--accent)] rounded-full h-2">
                      <div
                        className="bg-[var(--primary)] h-2 rounded-full"
                        style={{ width: `${(count / totalProfessionals) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-[var(--primary)] w-8 text-right">
                      {count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics
