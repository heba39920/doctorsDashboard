import { User, Mail, Phone, MapPin, Calendar, Award,  Pencil, Trash2, Eye } from "lucide-react"
import { useTranslation } from "react-i18next"
import { formatValue } from "../../utils/helperfunctions/doctorUtils"
import type { Doctor, DoctorData } from "../../interfaces/interfaces"
import { useUpdateDoctor, useDeleteDoctor, useGetDoctorById } from "../../utils/hooks/Hooks"
import { toast } from "react-toastify"
import { useState } from "react"
import { DeleteConfirmModal } from "../DeleteConfirmModal"
import { EditDoctorModal } from "../EditDoctorModal"

interface DoctorCardProps {
  doctor: Doctor
  onViewDetails: (doctor: Doctor) => void
}

const DoctorCard = ({ doctor, onViewDetails }: DoctorCardProps) => {
  const { t } = useTranslation()
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  
  // Fetch full doctor data only when edit modal is open
  const { data: doctorDataResponse } = useGetDoctorById(doctor.id, isUpdateModalOpen)
  const doctorData = doctorDataResponse?.data || null

  const updateDoctorMutation = useUpdateDoctor()
  const handleUpdate = (updateData: Partial<DoctorData>) => {
    updateDoctorMutation.mutate(
      { id: doctor.id, data: updateData },
      {
        onSuccess: () => {
          setIsUpdateModalOpen(false)
          toast.success(t('doctorDetails.doctorUpdated'))
        },
        onError: (error: Error) => {
          toast.error(t('doctorDetails.failedToUpdate'))
          console.error('Error updating doctor:', error)
        }
      }
    )
  }

  const deleteDoctorMutation = useDeleteDoctor()
  const handleDelete = () => {
    deleteDoctorMutation.mutate(doctor.id, {
      onSuccess: () => {
        setIsDeleteModalOpen(false)
        toast.success(t('doctorDetails.doctorDeleted'))
      },
      onError: (error: Error) => {
        toast.error(t('doctorDetails.failedToDelete'))
        console.error('Error deleting doctor:', error)
      }
    })
  }
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 py-6 px-4 border border-[var(--accent)] hover:border-[var(--primary)]">
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
        <div className="flex items-center gap-1 flex-wrap justify-between ">
          <button
            onClick={() => onViewDetails(doctor)}
            className="group relative cursor-pointer flex items-center gap-1 px-2 py-2.5 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--secondary)] transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
            aria-label={t('dashboard.viewDetails')}
          >
            <Eye className="w-4 h-4 transition-transform group-hover:scale-110" />
            <span className="text-sm hidden sm:inline">{t('dashboard.viewDetails')}</span>
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap sm:hidden">
              {t('dashboard.viewDetails')}
            </span>
          </button>
          
        <div className="flex gap-3">
        <button
            onClick={(e) => {
              e.stopPropagation()
              setIsUpdateModalOpen(true)
            }}
            className="group cursor-pointer relative flex items-center gap-1 px-2 py-2.5 rounded-lg bg-[var(--accent)] text-[var(--primary)] font-medium hover:bg-[var(--primary)] hover:text-white transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 border border-[var(--primary)]/20"
            aria-label={t('dashboard.updateDoctor')}
            disabled={updateDoctorMutation.isPending}
          >
            <Pencil className="w-4 h-4 transition-transform group-hover:scale-110" />
            <span className="text-sm hidden sm:inline">{t('dashboard.updateDoctor')}</span>
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap sm:hidden">
              {t('dashboard.updateDoctor')}
            </span>
            {updateDoctorMutation.isPending && (
              <span className="absolute inset-0 flex items-center justify-center bg-[var(--primary)]/50 rounded-lg">
                <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
              </span>
            )}
          </button>
        
          <button
            onClick={(e) => {
              e.stopPropagation()
              setIsDeleteModalOpen(true)
            }}
            className="cursor-pointer group relative flex items-center gap-1 px-2 py-2.5 rounded-lg bg-red-50 text-red-600 font-medium hover:bg-red-600 hover:text-white transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 border border-red-200 hover:border-red-600"
            aria-label={t('dashboard.deleteDoctor')}
            disabled={deleteDoctorMutation.isPending}
          >
            <Trash2 className="w-4 h-4 transition-transform group-hover:scale-110" />
            <span className="text-sm hidden sm:inline">{t('dashboard.deleteDoctor')}</span>
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap sm:hidden">
              {t('dashboard.deleteDoctor')}
            </span>
            {deleteDoctorMutation.isPending && (
              <span className="absolute inset-0 flex items-center justify-center bg-red-600/50 rounded-lg">
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
        doctorName={doctor.name}
        isDeleting={deleteDoctorMutation.isPending}
      />
      {doctorData && (
        <EditDoctorModal
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          onSave={handleUpdate}
          doctor={doctorData}
          isUpdating={updateDoctorMutation.isPending}
        />
      )}
    </div>
  )
}

export default DoctorCard