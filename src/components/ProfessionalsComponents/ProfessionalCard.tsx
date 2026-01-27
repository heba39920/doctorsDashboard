import { User, Mail, Phone, Calendar, Award, Pencil, Trash2, Eye, IdCard, Briefcase, Building2, Hash } from "lucide-react"
import { useTranslation } from "react-i18next"
import { formatValue } from "../../utils/helperfunctions/ProfessionalUtils"
import type { professional, professionalData, professionalListItem } from "../../interfaces/interfaces"
import { useUpdateProfessional, useDeleteProfessional, useGetProfessionalById } from "../../utils/hooks/Hooks"
import { toast } from "react-toastify"
import { useState } from "react"
import { DeleteConfirmModal } from "../DeleteConfirmModal"
import { EditProfessionalModal } from "../EditProfessionalModal"

interface ProfessionalCardProps {
  professional: professional
  onViewDetails: (professional: professional) => void
  originalItem?: professionalListItem & { professional_type?: string; job_title?: string | null; current_workplace?: string | null }
}

const ProfessionalCard = ({ professional, onViewDetails, originalItem }: ProfessionalCardProps) => {
  const { t } = useTranslation()
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  
  // Fetch full doctor data only when edit modal is open
  const { data: professionalDataResponse } = useGetProfessionalById(professional.id, isUpdateModalOpen)
  const professionalData = professionalDataResponse?.data || null

  // Extract properties from originalItem or professional
  const professionalId = originalItem?.professional_id || professional.id
  const professionalType = originalItem?.professional_type
  const jobTitle = originalItem?.job_title
  const specializations = originalItem?.specializations || []
  const yearsOfExperience = originalItem?.years_of_experience
  const currentWorkplace = originalItem?.current_workplace
  const phone = originalItem?.phone || professional.phone
  const email = originalItem?.email || professional.email
  const createdAt = originalItem?.created_at || professional.joinDate

  const updateProfessionalMutation = useUpdateProfessional()
  const handleUpdate = (updateData: Partial<professionalData>) => {
    updateProfessionalMutation.mutate(
      { id: professional.id, data: updateData },
      {
        onSuccess: () => {
          setIsUpdateModalOpen(false)
          toast.success(t('professionalDetails.professionalUpdated'))
        },
        onError: (error: Error) => {
          toast.error(t('professionalDetails.failedToUpdate'))
          console.error('Error updating professional:', error)
        }
      }
    )
  }

  const deleteProfessionalMutation = useDeleteProfessional()
  const handleDelete = () => {
    deleteProfessionalMutation.mutate(professional.id, {
      onSuccess: () => {
        setIsDeleteModalOpen(false)
        toast.success(t('professionalDetails.professionalDeleted'))
      },
      onError: (error: Error) => {
        toast.error(t('professionalDetails.failedToDelete'))
        console.error('Error deleting professional:', error)
      }
    })
  }
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 py-6 px-4 border border-[var(--accent)] hover:border-[var(--primary)]v flex flex-col justify-between min-h-[200px]">
    <div>
    <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[var(--accent)] flex items-center justify-center flex-shrink-0">
            <User className="w-8 h-8 text-[var(--primary)]" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[var(--textPrimary)] mb-1">
              {professional.name}
            </h3>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[var(--primary)]" />
              <span className="text-sm font-medium text-[var(--secondary)]">
                {formatValue(professional.specialization)}
              </span>
            </div>
          </div>
        </div>

      </div>

      <div className="space-y-3 mb-4">
        {professionalId && (
          <div className="flex items-center gap-3 text-sm">
            <Hash className="w-4 h-4 text-[var(--textSecondary)] flex-shrink-0" />
            <span className="text-[var(--textPrimary)]">
              {t('professionalDetails.professionalId')}: {professionalId}
            </span>
          </div>
        )}
        {professionalType && (
          <div className="flex items-center gap-3 text-sm">
            <IdCard className="w-4 h-4 text-[var(--textSecondary)] flex-shrink-0" />
            <span className="text-[var(--textPrimary)]">
              {t('professionalDetails.professionalType')}: {formatValue(professionalType)}
            </span>
          </div>
        )}
        {jobTitle && (
          <div className="flex items-center gap-3 text-sm">
            <Briefcase className="w-4 h-4 text-[var(--textSecondary)] flex-shrink-0" />
            <span className="text-[var(--textPrimary)]">
              {t('professionalDetails.jobTitle')}: {formatValue(jobTitle)}
            </span>
          </div>
        )}
        {specializations && specializations.length > 0 && (
          <div className="flex items-start gap-3 text-sm">
            <Award className="w-4 h-4 text-[var(--textSecondary)] flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="text-[var(--textPrimary)]">{t('dashboard.specialization')}: </span>
              <span className="text-[var(--textPrimary)]">{specializations.join(", ")}</span>
            </div>
          </div>
        )}
        {yearsOfExperience !== null && yearsOfExperience !== undefined && (
          <div className="flex items-center gap-3 text-sm">
            <Calendar className="w-4 h-4 text-[var(--textSecondary)] flex-shrink-0" />
            <span className="text-[var(--textPrimary)]">
              {t('professionalDetails.experience')}: {yearsOfExperience} {t('common.years')}
            </span>
          </div>
        )}
        {currentWorkplace && (
          <div className="flex items-center gap-3 text-sm">
            <Building2 className="w-4 h-4 text-[var(--textSecondary)] flex-shrink-0" />
            <span className="text-[var(--textPrimary)]">
              {t('professionalDetails.currentWorkplace')}: {formatValue(currentWorkplace)}
            </span>
          </div>
        )}
        {email && (
          <div className="flex items-center gap-3 text-sm">
            <Mail className="w-4 h-4 text-[var(--textSecondary)] flex-shrink-0" />
            <span className="text-[var(--textPrimary)] truncate">{formatValue(email)}</span>
          </div>
        )}
        {phone && (
          <div className="flex items-center gap-3 text-sm">
            <Phone className="w-4 h-4 text-[var(--textSecondary)] flex-shrink-0" />
            <span className="text-[var(--textPrimary)]">{formatValue(phone)}</span>
          </div>
        )}
        {createdAt && (
          <div className="flex items-center gap-3 text-sm">
            <Calendar className="w-4 h-4 text-[var(--textSecondary)] flex-shrink-0" />
            <span className="text-[var(--textPrimary)]">
              {t('professionalDetails.joinDate')}: {new Date(createdAt).toLocaleDateString()}
            </span>
          </div>
        )}
      </div>
    </div>
      <div className="pt-4 border-t border-[var(--accent)] ">
        <div className="flex items-center gap-2 flex-wrap justify-between">
          <button
            onClick={() => onViewDetails(professional)}
            className="group relative cursor-pointer flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white font-semibold shadow-lg hover:shadow-xl hover:shadow-[var(--primary)]/30 hover:scale-[1.02] active:scale-[0.98] transform transition-all duration-300 ease-out overflow-hidden"
            aria-label={t('dashboard.viewDetails')}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--secondary)] to-[var(--primary)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></div>
            <Eye className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" />
            <span className="text-sm hidden sm:inline relative z-10">{t('dashboard.viewDetails')}</span>
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap sm:hidden shadow-lg z-20">
              {t('dashboard.viewDetails')}
            </span>
          </button>
          
          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation()
                setIsUpdateModalOpen(true)
              }}
              className="group cursor-pointer relative flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-[var(--primary)] font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-[var(--primary)]/20 hover:scale-[1.02] active:scale-[0.98] transform border-2 border-[var(--primary)]/30 hover:border-transparent disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
              aria-label={t('dashboard.updateProfessional')}
              disabled={updateProfessionalMutation.isPending}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></div>
              <Pencil className="w-4 h-4 relative z-10 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 group-hover:text-white" />
              <span className="text-sm hidden sm:inline relative z-10 transition-colors duration-300 group-hover:text-white">{t('dashboard.updateProfessional')}</span>
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap sm:hidden shadow-lg z-20">
                {t('dashboard.updateProfessional')}
              </span>
              {updateProfessionalMutation.isPending && (
                <span className="absolute inset-0 pointer-events-none flex items-center justify-center bg-gradient-to-r from-[var(--primary)]/80 to-[var(--secondary)]/80 backdrop-blur-sm rounded-xl z-10">
                  <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
                </span>
              )}
            </button>
          
            <button
              onClick={(e) => {
                e.stopPropagation()
                setIsDeleteModalOpen(true)
              }}
              className="group cursor-pointer relative flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-50 to-red-100 text-red-600 font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-red-500/30 hover:scale-[1.02] active:scale-[0.98] transform border-2 border-red-200 hover:border-transparent disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
              aria-label={t('dashboard.deleteProfessional')}
              disabled={deleteProfessionalMutation.isPending}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></div>
              <Trash2 className="w-4 h-4 relative z-10 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 group-hover:text-white" />
              <span className="text-sm hidden sm:inline relative z-10 transition-colors duration-300 group-hover:text-white">{t('dashboard.deleteProfessional')}</span>
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap sm:hidden shadow-lg z-20">
                {t('dashboard.deleteProfessional')}
              </span>
              {deleteProfessionalMutation.isPending && (
                <span className="absolute inset-0 pointer-events-none flex items-center justify-center bg-gradient-to-r from-red-600/80 to-red-700/80 backdrop-blur-sm rounded-xl z-10">
                  <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        professionalName={professional.name}
        isDeleting={deleteProfessionalMutation.isPending}
      />
      {professionalData && (
        <EditProfessionalModal
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          onSave={handleUpdate}
          professional={professionalData}
          isUpdating={updateProfessionalMutation.isPending}
        />
      )}
    </div>
  )
}

export default ProfessionalCard