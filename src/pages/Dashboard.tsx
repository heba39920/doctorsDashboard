import { useNavigate } from "react-router-dom"
import { Loader2, AlertCircle } from "lucide-react"
import { useTranslation } from "react-i18next"
import { useGetDoctors } from "../utils/hooks/Hooks"
import { convertDoctorListItemToLegacy } from "../utils/helperfunctions/doctorUtils"
import type { Doctor } from "../interfaces/interfaces"
import DoctorCard from "../components/DoctorsComponents/DoctorCard"

const Dashboard = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { data, isLoading, isError, error } = useGetDoctors()

  const handleViewDetails = (doctor: Doctor) => {
    navigate(`/doctor/${doctor.id}`)
  }

  const doctors = data?.doctors ? data.doctors.map(convertDoctorListItemToLegacy) : []
  const totalFiles = doctors.reduce((sum, doc) => sum + doc.filesCount, 0)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--surface)] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[var(--primary)] animate-spin mx-auto mb-4" />
          <p className="text-[var(--textSecondary)]">{t('dashboard.loadingDoctors')}</p>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-[var(--surface)] flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-[var(--textPrimary)] mb-2">{t('dashboard.errorLoadingDoctors')}</h2>
          <p className="text-[var(--textSecondary)] mb-4">
            {error instanceof Error ? error.message : t('dashboard.errorOccurred')}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--secondary)] transition-colors"
          >
            {t('common.retry')}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--surface)] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[var(--textPrimary)] mb-2">
            {t('dashboard.title')}
          </h1>
          <p className="text-[var(--textSecondary)]">
            {t('dashboard.subtitle')}
          </p>
        </div>

        <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="px-4 py-2 bg-white rounded-lg border border-[var(--accent)]">
              <span className="text-sm text-[var(--textSecondary)]">{t('dashboard.totalDoctors')}</span>
              <span className="ml-2 text-lg font-bold text-[var(--primary)]">
                {data?.total || doctors.length}
              </span>
            </div>
            <div className="px-4 py-2 bg-white rounded-lg border border-[var(--accent)]">
              <span className="text-sm text-[var(--textSecondary)]">{t('dashboard.totalFiles')}</span>
              <span className="ml-2 text-lg font-bold text-[var(--primary)]">
                {totalFiles}
              </span>
            </div>
          </div>
        </div>

        {doctors.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-[var(--textSecondary)] text-lg mb-4">{t('dashboard.noDoctorsFound')}</p>
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--secondary)] transition-colors"
            >
              {t('dashboard.addFirstDoctor')}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} onViewDetails={handleViewDetails} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
