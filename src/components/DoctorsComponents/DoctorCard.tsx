import { User, Mail, Phone, MapPin, Calendar, Award, FileText, Pencil, Trash2, Eye } from "lucide-react"
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
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1 bg-[var(--accent)] rounded-full">
            <FileText className="w-4 h-4 text-[var(--primary)]" />
            <span className="text-sm font-semibold text-[var(--textPrimary)]">
              {doctor.filesCount}
            </span>
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

  
       
        <div className="flex items-center md:gap-2 gap-10 justify-center md:justify-start">
        <button
          onClick={() => onViewDetails(doctor)}
          className="p-2 rounded-lg bg-[var(--accent)] hover:bg-[var(--primary)] hover:text-white transition-colors"
        >
          <Eye className="w-6 h-6" />
        </button>
         <button
           onClick={(e) => {
             e.stopPropagation()
             setIsUpdateModalOpen(true)
           }}
           className="p-2 rounded-lg bg-[var(--accent)] hover:bg-[var(--primary)] hover:text-white transition-colors"
           aria-label={t('dashboard.updateDoctor')}
           title={t('dashboard.updateDoctor')}
         >
           <Pencil className="w-6 h-6" />
         </button>
      
      
         <button
           onClick={(e) => {
             e.stopPropagation()
             setIsDeleteModalOpen(true)
           }}
           className="p-2 rounded-lg bg-[var(--accent)] hover:bg-red-500 hover:text-white transition-colors"
           aria-label={t('dashboard.deleteDoctor')}
           title={t('dashboard.deleteDoctor')}
         >
           <Trash2 className="w-6 h-6" />
         </button>
      
   
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