import { User, Mail, Phone, MapPin, Calendar, Award, FileText } from "lucide-react"
import { useTranslation } from "react-i18next"
import { formatValue } from "../../utils/helperfunctions/doctorUtils"
import type { Doctor } from "../../interfaces/interfaces"

const DoctorCard = ({ doctor, onViewDetails }: { doctor: Doctor; onViewDetails: (doctor: Doctor) => void }) => {
  const { t } = useTranslation()
  
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-[var(--accent)] hover:border-[var(--primary)]">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[var(--accent)] flex items-center justify-center flex-shrink-0">
            <User className="w-8 h-8 text-[var(--primary)]" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[var(--textPrimary)] mb-1">
              {doctor.name}
            </h3>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[var(--primary)]" />
              <span className="text-sm font-medium text-[var(--secondary)]">
                {formatValue(doctor.specialization)}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-[var(--accent)] rounded-full">
          <FileText className="w-4 h-4 text-[var(--primary)]" />
          <span className="text-sm font-semibold text-[var(--textPrimary)]">
            {doctor.filesCount}
          </span>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-3 text-sm">
          <Mail className="w-4 h-4 text-[var(--textSecondary)] flex-shrink-0" />
          <span className="text-[var(--textPrimary)] truncate">{formatValue(doctor.email)}</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Phone className="w-4 h-4 text-[var(--textSecondary)] flex-shrink-0" />
          <span className="text-[var(--textPrimary)]">{formatValue(doctor.phone)}</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <MapPin className="w-4 h-4 text-[var(--textSecondary)] flex-shrink-0" />
          <span className="text-[var(--textPrimary)]">{formatValue(doctor.location)}</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Calendar className="w-4 h-4 text-[var(--textSecondary)] flex-shrink-0" />
          <span className="text-[var(--textPrimary)]">
            {t('doctorDetails.experience')}: {formatValue(doctor.experience)} | {t('doctorDetails.joinDate')}: {new Date(doctor.joinDate).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="pt-4 border-t border-[var(--accent)]">
        <button
          onClick={() => onViewDetails(doctor)}
          className="w-full py-2.5 px-4 bg-[var(--primary)] text-white font-medium rounded-lg hover:bg-[var(--secondary)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
        >
          {t('dashboard.viewDetails')}
        </button>
      </div>
    </div>
  )
}

export default DoctorCard