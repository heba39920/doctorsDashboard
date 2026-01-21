import { X, User, Mail, Phone, MapPin, Award, FileText, Briefcase, Building2 } from "lucide-react"
import type { Doctor } from "../../interfaces/interfaces"

interface DoctorDetailsModalProps {
  doctor: Doctor | null
  isOpen: boolean
  onClose: () => void
}

export const DoctorDetailsModal = ({ doctor, isOpen, onClose }: DoctorDetailsModalProps) => {
  if (!isOpen || !doctor) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[var(--accent)] p-6 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[var(--accent)] flex items-center justify-center flex-shrink-0">
              <User className="w-8 h-8 text-[var(--primary)]" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[var(--textPrimary)]">
                {doctor.name}
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <Award className="w-4 h-4 text-[var(--primary)]" />
                <span className="text-sm font-medium text-[var(--secondary)]">
                  {doctor.specialization}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[var(--surface)] rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6 text-[var(--textPrimary)]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold text-[var(--textPrimary)] mb-4 flex items-center gap-2">
              <Mail className="w-5 h-5 text-[var(--primary)]" />
              Contact Information
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-[var(--surface)] rounded-lg">
                <Mail className="w-5 h-5 text-[var(--textSecondary)] flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-[var(--textSecondary)] mb-1">Email</p>
                  <p className="text-sm font-medium text-[var(--textPrimary)] truncate">
                    {doctor.email}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-[var(--surface)] rounded-lg">
                <Phone className="w-5 h-5 text-[var(--textSecondary)] flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-[var(--textSecondary)] mb-1">Phone</p>
                  <p className="text-sm font-medium text-[var(--textPrimary)]">
                    {doctor.phone}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-[var(--surface)] rounded-lg">
                <MapPin className="w-5 h-5 text-[var(--textSecondary)] flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-[var(--textSecondary)] mb-1">Location</p>
                  <p className="text-sm font-medium text-[var(--textPrimary)]">
                    {doctor.location}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div>
            <h3 className="text-lg font-semibold text-[var(--textPrimary)] mb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-[var(--primary)]" />
              Professional Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3 bg-[var(--surface)] rounded-lg">
                <p className="text-xs text-[var(--textSecondary)] mb-1">Experience</p>
                <p className="text-sm font-medium text-[var(--textPrimary)]">
                  {doctor.experience}
                </p>
              </div>
              <div className="p-3 bg-[var(--surface)] rounded-lg">
                <p className="text-xs text-[var(--textSecondary)] mb-1">Join Date</p>
                <p className="text-sm font-medium text-[var(--textPrimary)]">
                  {new Date(doctor.joinDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Files Information */}
          <div>
            <h3 className="text-lg font-semibold text-[var(--textPrimary)] mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[var(--primary)]" />
              Documents
            </h3>
            <div className="p-4 bg-[var(--surface)] rounded-lg border border-[var(--accent)]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[var(--accent)] rounded-lg">
                    <FileText className="w-5 h-5 text-[var(--primary)]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[var(--textPrimary)]">
                      Total Files
                    </p>
                    <p className="text-xs text-[var(--textSecondary)]">
                      Documents uploaded
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-[var(--primary)]">
                    {doctor.filesCount}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="pt-4 border-t border-[var(--accent)]">
            <div className="flex items-center gap-2 text-sm text-[var(--textSecondary)]">
              <Building2 className="w-4 h-4" />
              <span>Doctor ID: {doctor.id}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-[var(--accent)] p-6 rounded-b-2xl flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 px-4 bg-[var(--surface)] text-[var(--textPrimary)] font-medium rounded-lg hover:bg-[var(--accent)] transition-colors"
          >
            Close
          </button>
          <button
            className="flex-1 py-2.5 px-4 bg-[var(--primary)] text-white font-medium rounded-lg hover:bg-[var(--secondary)] transition-colors"
          >
            Edit Details
          </button>
        </div>
      </div>
    </div>
  )
}
