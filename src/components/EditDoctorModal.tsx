import { X } from "lucide-react"
import { useTranslation } from "react-i18next"
import { useForm } from "react-hook-form"
import { useEffect } from "react"
import type { DoctorData } from "../interfaces/interfaces"

interface EditDoctorModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: Partial<DoctorData>) => void
  doctor: DoctorData | null
  isUpdating?: boolean
}

interface EditFormData {
  name: string
  email: string
  phone: string
  years_of_experience: number | null
}

export const EditDoctorModal = ({ isOpen, onClose, onSave, doctor, isUpdating = false }: EditDoctorModalProps) => {
  const { t } = useTranslation()
  const { register, handleSubmit, formState: { errors }, reset } = useForm<EditFormData>({
    defaultValues: {
      name: doctor?.name || "",
      email: doctor?.email || "",
      phone: doctor?.phone || "",
      years_of_experience: doctor?.years_of_experience || null,
    }
  })

  useEffect(() => {
    if (doctor && isOpen) {
      reset({
        name: doctor.name || "",
        email: doctor.email || "",
        phone: doctor.phone || "",
        years_of_experience: doctor.years_of_experience || null,
      })
    }
  }, [doctor, isOpen, reset])

  if (!isOpen || !doctor) return null

  const onSubmit = (data: EditFormData) => {
    onSave({
      name: data.name,
      email: data.email || null,
      phone: data.phone || null,
      years_of_experience: data.years_of_experience || null,
    })
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-[var(--accent)] p-6 rounded-t-2xl flex items-center justify-between">
          <h2 className="text-2xl font-bold text-[var(--textPrimary)]">
            {t('doctorDetails.editDetails')}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[var(--surface)] rounded-lg transition-colors"
            aria-label={t('common.close')}
          >
            <X className="w-6 h-6 text-[var(--textPrimary)]" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--textPrimary)] mb-2">
              {t('form.doctorName')}
            </label>
            <input
              type="text"
              {...register("name", { required: t('form.nameRequired') })}
              className="w-full p-3 rounded-lg border-2 border-[var(--primary)] focus:border-[var(--secondary)] focus:ring-2 focus:ring-[var(--accent)] outline-none"
            />
            {errors.name && (
              <span className="text-red-500 text-sm mt-1">{errors.name.message}</span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--textPrimary)] mb-2">
              {t('doctorDetails.email')}
            </label>
            <input
              type="email"
              {...register("email")}
              className="w-full p-3 rounded-lg border-2 border-[var(--primary)] focus:border-[var(--secondary)] focus:ring-2 focus:ring-[var(--accent)] outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--textPrimary)] mb-2">
              {t('doctorDetails.phone')}
            </label>
            <input
              type="tel"
              {...register("phone")}
              className="w-full p-3 rounded-lg border-2 border-[var(--primary)] focus:border-[var(--secondary)] focus:ring-2 focus:ring-[var(--accent)] outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--textPrimary)] mb-2">
              {t('doctorDetails.experience')} ({t('common.years')})
            </label>
            <input
              type="number"
              min="0"
              {...register("years_of_experience", { valueAsNumber: true })}
              className="w-full p-3 rounded-lg border-2 border-[var(--primary)] focus:border-[var(--secondary)] focus:ring-2 focus:ring-[var(--accent)] outline-none"
            />
          </div>

          <div className="flex gap-3 pt-4 border-t border-[var(--accent)]">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 px-4 bg-[var(--surface)] text-[var(--textPrimary)] font-medium rounded-lg hover:bg-[var(--accent)] transition-colors"
              disabled={isUpdating}
            >
              {t('common.cancel')}
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 px-4 bg-[var(--primary)] text-white font-medium rounded-lg hover:bg-[var(--secondary)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              disabled={isUpdating}
            >
              {isUpdating ? (
                <>
                  <span className="animate-spin">⏳</span>
                  {t('doctorDetails.updating')}
                </>
              ) : (
                t('common.save')
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
