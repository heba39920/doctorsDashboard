import { BarChart3, Users, FileText, TrendingUp, Award, MapPin, Calendar, Loader2, AlertCircle } from "lucide-react"
import { useTranslation } from "react-i18next"
import { useGetDoctors } from "../utils/hooks/Hooks"
import { convertDoctorListItemToLegacy, formatValue } from "../utils/helperfunctions/doctorUtils"

const Analytics = () => {
  const { t } = useTranslation()
  const { data, isLoading, isError, error } = useGetDoctors()
  
  const doctors = data?.doctors ? data.doctors.map(convertDoctorListItemToLegacy) : []
  
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

  // Calculate statistics
  const totalDoctors = doctors.length
  const totalFiles = doctors.reduce((sum, doc) => sum + doc.filesCount, 0)
  const avgFilesPerDoctor = totalDoctors > 0 ? Math.round(totalFiles / totalDoctors) : 0
  
  // Group by specialization
  const specializationCount: Record<string, number> = {}
  doctors.forEach(doc => {
    const spec = doc.specialization || "Not specified"
    specializationCount[spec] = (specializationCount[spec] || 0) + 1
  })
  
  // Group by location
  const locationCount: Record<string, number> = {}
  doctors.forEach(doc => {
    const loc = doc.location || "Not specified"
    locationCount[loc] = (locationCount[loc] || 0) + 1
  })
  
  // Calculate experience distribution
  const experienceGroups = {
    "0-10 years": doctors.filter(d => {
      const exp = parseInt(d.experience) || 0
      return exp <= 10
    }).length,
    "11-15 years": doctors.filter(d => {
      const exp = parseInt(d.experience) || 0
      return exp > 10 && exp <= 15
    }).length,
    "16+ years": doctors.filter(d => {
      const exp = parseInt(d.experience) || 0
      return exp > 15
    }).length,
  }
  
  // Get top doctors by files
  const topDoctorsByFiles = [...doctors]
    .sort((a, b) => b.filesCount - a.filesCount)
    .slice(0, 5)
  
  // Calculate max files for bar chart scaling
  const maxFiles = doctors.length > 0 ? Math.max(...doctors.map(d => d.filesCount), 1) : 1

  return (
    <div className="min-h-screen bg-[var(--surface)] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 className="w-8 h-8 text-[var(--primary)]" />
            <h1 className="text-4xl font-bold text-[var(--textPrimary)]">
              {t('analytics.title')}
            </h1>
          </div>
          <p className="text-[var(--textSecondary)]">
            {t('analytics.subtitle')}
          </p>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-[var(--accent)]">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-[var(--accent)] rounded-lg">
                <Users className="w-6 h-6 text-[var(--primary)]" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-sm text-[var(--textSecondary)] mb-1">{t('dashboard.totalDoctors')}</h3>
            <p className="text-3xl font-bold text-[var(--textPrimary)]">{totalDoctors}</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-[var(--accent)]">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-[var(--accent)] rounded-lg">
                <FileText className="w-6 h-6 text-[var(--primary)]" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-sm text-[var(--textSecondary)] mb-1">{t('dashboard.totalFiles')}</h3>
            <p className="text-3xl font-bold text-[var(--textPrimary)]">{totalFiles}</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-[var(--accent)]">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-[var(--accent)] rounded-lg">
                <FileText className="w-6 h-6 text-[var(--primary)]" />
              </div>
            </div>
            <h3 className="text-sm text-[var(--textSecondary)] mb-1">{t('analytics.avgFilesPerDoctor')}</h3>
            <p className="text-3xl font-bold text-[var(--textPrimary)]">{avgFilesPerDoctor}</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-[var(--accent)]">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-[var(--accent)] rounded-lg">
                <Award className="w-6 h-6 text-[var(--primary)]" />
              </div>
            </div>
            <h3 className="text-sm text-[var(--textSecondary)] mb-1">{t('analytics.specializations')}</h3>
            <p className="text-3xl font-bold text-[var(--textPrimary)]">
              {Object.keys(specializationCount).length}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Files Distribution Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-[var(--accent)]">
            <h2 className="text-xl font-bold text-[var(--textPrimary)] mb-6">
              {t('analytics.filesDistributionByDoctor')}
            </h2>
            <div className="space-y-4">
              {topDoctorsByFiles.map((doctor) => (
                <div key={doctor.id} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-[var(--textPrimary)] truncate flex-1">
                      {doctor.name}
                    </span>
                    <span className="text-[var(--textSecondary)] ml-2">
                      {doctor.filesCount} {t('analytics.files')}
                    </span>
                  </div>
                  <div className="w-full bg-[var(--surface)] rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-[var(--primary)] h-full rounded-full transition-all duration-500"
                      style={{ width: `${(doctor.filesCount / maxFiles) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Specialization Distribution */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-[var(--accent)]">
            <h2 className="text-xl font-bold text-[var(--textPrimary)] mb-6 flex items-center gap-2">
              <Award className="w-5 h-5 text-[var(--primary)]" />
              {t('analytics.specializationDistribution')}
            </h2>
            <div className="space-y-4">
              {Object.entries(specializationCount)
                .sort(([, a], [, b]) => b - a)
                .map(([specialization, count]) => (
                  <div key={specialization} className="flex items-center justify-between p-3 bg-[var(--surface)] rounded-lg">
                    <span className="font-medium text-[var(--textPrimary)]">
                      {formatValue(specialization)}
                    </span>
                    <div className="flex items-center gap-3">
                      <div className="w-24 bg-[var(--accent)] rounded-full h-2">
                        <div
                          className="bg-[var(--primary)] h-2 rounded-full"
                          style={{ width: `${(count / totalDoctors) * 100}%` }}
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Experience Distribution */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-[var(--accent)]">
            <h2 className="text-xl font-bold text-[var(--textPrimary)] mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[var(--primary)]" />
              {t('analytics.experienceDistribution')}
            </h2>
            <div className="space-y-4">
              {Object.entries(experienceGroups).map(([group, count]) => (
                <div key={group} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-[var(--textPrimary)]">{group}</span>
                    <span className="text-[var(--textSecondary)]">{count} {t('analytics.doctors')}</span>
                  </div>
                  <div className="w-full bg-[var(--surface)] rounded-full h-3">
                    <div
                      className="bg-[var(--secondary)] h-full rounded-full transition-all duration-500"
                      style={{ width: `${(count / totalDoctors) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Location Distribution */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-[var(--accent)]">
            <h2 className="text-xl font-bold text-[var(--textPrimary)] mb-6 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[var(--primary)]" />
              {t('analytics.locationDistribution')}
            </h2>
            <div className="space-y-3">
              {Object.entries(locationCount)
                .sort(([, a], [, b]) => b - a)
                .map(([location, count]) => (
                  <div
                    key={location}
                    className="flex items-center justify-between p-3 bg-[var(--surface)] rounded-lg hover:bg-[var(--accent)] transition-colors"
                  >
                    <span className="font-medium text-[var(--textPrimary)]">{formatValue(location)}</span>
                    <span className="px-3 py-1 bg-[var(--primary)] text-white rounded-full text-sm font-semibold">
                      {count}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Top Performers */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-[var(--accent)]">
          <h2 className="text-xl font-bold text-[var(--textPrimary)] mb-6">
            {t('analytics.topPerformers')}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--accent)]">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--textSecondary)]">
                    {t('analytics.rank')}
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--textSecondary)]">
                    {t('analytics.doctorName')}
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--textSecondary)]">
                    {t('doctorDetails.specialization')}
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--textSecondary)]">
                    {t('doctorDetails.location')}
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-[var(--textSecondary)]">
                    {t('doctorDetails.files')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {topDoctorsByFiles.map((doctor, index) => (
                  <tr
                    key={doctor.id}
                    className="border-b border-[var(--accent)] hover:bg-[var(--surface)] transition-colors"
                  >
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[var(--accent)] text-[var(--primary)] font-bold text-sm">
                        {index + 1}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-medium text-[var(--textPrimary)]">
                      {doctor.name}
                    </td>
                    <td className="py-3 px-4 text-[var(--textSecondary)]">
                      {formatValue(doctor.specialization)}
                    </td>
                    <td className="py-3 px-4 text-[var(--textSecondary)]">
                      {formatValue(doctor.location)}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-[var(--primary)] text-white rounded-full text-sm font-semibold">
                        <FileText className="w-4 h-4" />
                        {doctor.filesCount}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics
