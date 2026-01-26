import { X, AlertTriangle } from "lucide-react"
import { useTranslation } from "react-i18next"

interface DeleteConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  professionalName: string
  isDeleting?: boolean
}

export const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, professionalName, isDeleting = false }: DeleteConfirmModalProps) => {
  const { t } = useTranslation()

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-[var(--textPrimary)]">
                {t('professionalDetails.deleteProfessional')}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-[var(--surface)] rounded-lg transition-colors"
              aria-label={t('common.close')}
            >
              <X className="w-5 h-5 text-[var(--textPrimary)]" />
            </button>
          </div>

          <p className="text-[var(--textSecondary)] mb-2">
            {t('professionalDetails.confirmDelete')}
          </p>
          <p className="font-semibold text-[var(--textPrimary)] mb-4">
            {professionalName}
          </p>
          <p className="text-sm text-red-600 mb-6">
            {t('professionalDetails.deleteConfirmMessage')}
          </p>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 px-4 bg-[var(--surface)] text-[var(--textPrimary)] font-medium rounded-lg hover:bg-[var(--accent)] transition-colors"
              disabled={isDeleting}
            >
              {t('common.cancel')}
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 py-2.5 px-4 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <span className="animate-spin">⏳</span>
                  {t('professionalDetails.deleting')}
                </>
              ) : (
                t('common.delete')
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
