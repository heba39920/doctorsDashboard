import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, User, Mail, Phone, MapPin, Award, FileText, Briefcase, Building2, Calendar, Star, Loader2, AlertCircle, Trash2, Edit } from "lucide-react"
import { useTranslation } from "react-i18next"
import { useGetProfessionalById, useDeleteProfessional, useUpdateProfessional } from "../utils/hooks/Hooks"
import { convertProfessionalDataToLegacy, formatValue } from "../utils/helperfunctions/ProfessionalUtils"
import { DeleteConfirmModal } from "../components/DeleteConfirmModal"
import { EditProfessionalModal } from "../components/EditProfessionalModal"
import { useState } from "react"
import type { professionalData } from "../interfaces/interfaces"

const ProfessionalDetails = () => {
  const { t } = useTranslation()
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data, isLoading, isError, error } = useGetProfessionalById(id || "")
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  
  const deleteProfessionalMutation = useDeleteProfessional()
  const updateProfessionalMutation = useUpdateProfessional()

  const handleDelete = () => {
    if (!id) return
    deleteProfessionalMutation.mutate(id, {
      onSuccess: () => {
        setIsDeleteModalOpen(false)
        navigate("/dashboard")
      }
    })
  }

  const handleUpdate = (updateData: Partial<professionalData>) => {
    if (!id) return
    updateProfessionalMutation.mutate({ id, data: updateData }, {
      onSuccess: () => {
        setIsEditModalOpen(false)
      }
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--surface)] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[var(--primary)] animate-spin mx-auto mb-4" />
          <p className="text-[var(--textSecondary)]">{t('professionalDetails.loadingDetails')}</p>
        </div>
      </div>
    )
  }

  if (isError || !data?.data) {
    return (
      <div className="min-h-screen bg-[var(--surface)] flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-[var(--textPrimary)] mb-2">{t('professionalDetails.professionalNotFound')}</h1>
          <p className="text-[var(--textSecondary)] mb-4">
            {error instanceof Error ? error.message : t('professionalDetails.professionalRemoved')}
          </p>
          <button
            onClick={() => navigate("/dashboard")}
            className="px-4 py-2 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--secondary)] transition-colors"
          >
            {t('professionalDetails.backToDashboard')}
          </button>
        </div>
      </div>
    )
  }

  const professionalData = data.data
  const professional = convertProfessionalDataToLegacy(professionalData)
  const specializations = professionalData.specializations || []
  const languages = professionalData.languages || []
  const certifications = professionalData.certifications || []
  const skills = professionalData.skills || []
  const degrees = professionalData.degrees_and_certificates || []
  const equipment_expertise = professionalData.equipment_expertise || []

  return (
    <div className="min-h-screen bg-[var(--surface)]">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[var(--primary)] via-[var(--secondary)] to-[var(--primary)] text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <button
            onClick={() => navigate("/dashboard")}
            className="mb-8 flex items-center gap-2 text-white/90 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{t('professionalDetails.backToDashboard')}</span>
          </button>
          
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-4 border-white/30">
              <User className="w-16 h-16 text-white" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-5xl font-bold mb-3">{professional.name}</h1>
              <div className="flex items-center justify-center md:justify-start gap-2 mb-4 flex-wrap">
                <Award className="w-6 h-6" />
                <span className="text-xl">
                  {specializations.length > 0 ? specializations.join(", ") : professional.specialization}
                </span>
              </div>
              <p className="text-white/90 text-lg">{formatValue(professional.location)}</p>
            </div>
            <div className="flex flex-col gap-3">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/20">
                <p className="text-3xl font-bold">
                  {professionalData.years_of_experience || formatValue(professional.experience)}
                </p>
                <p className="text-sm text-white/80">{t('professionalDetails.experience')}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/20">
                <p className="text-3xl font-bold">{professional.filesCount}</p>
                <p className="text-sm text-white/80">{t('professionalDetails.documents')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <section className="bg-white rounded-2xl shadow-lg p-8 border border-[var(--accent)]">
              <h2 className="text-3xl font-bold text-[var(--textPrimary)] mb-6 flex items-center gap-3">
                <Briefcase className="w-8 h-8 text-[var(--primary)]" />
                {t('professionalDetails.professionalProfile')}
              </h2>
              
              {professionalData.summary_arabic && (
                <div className="mb-6 p-4 bg-[var(--surface)] rounded-lg">
                  <h3 className="font-semibold text-[var(--textPrimary)] mb-2">{t('professionalDetails.summary')}</h3>
                  <p className="text-[var(--textSecondary)] leading-relaxed">{professionalData.summary_arabic}</p>
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-[var(--surface)] rounded-lg">
                  <Calendar className="w-6 h-6 text-[var(--primary)] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-[var(--textPrimary)] mb-1">{t('professionalDetails.joinDate')}</h3>
                    <p className="text-[var(--textSecondary)]">
                      {new Date(professional.joinDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-[var(--surface)] rounded-lg">
                  <Star className="w-6 h-6 text-[var(--primary)] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-[var(--textPrimary)] mb-1">{t('professionalDetails.experience')}</h3>
                    <p className="text-[var(--textSecondary)]">
                      {professionalData.years_of_experience 
                        ? `${professionalData.years_of_experience} ${t('common.years')} of dedicated professional practice`
                        : formatValue(professional.experience)}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-[var(--surface)] rounded-lg">
                  <Building2 className="w-6 h-6 text-[var(--primary)] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-[var(--textPrimary)] mb-1">{t('professionalDetails.professionalId')}</h3>
                    <p className="text-[var(--textSecondary)] font-mono">{professional.id}</p>
                  </div>
                </div>
              </div>

              {degrees.length > 0 && (
                <div className="mt-6 p-4 bg-[var(--surface)] rounded-lg">
                  <h3 className="font-semibold text-[var(--textPrimary)] mb-3">{t('professionalDetails.degreesCertificates')}</h3>
                  <ul className="space-y-2">
                    {degrees.map((degree: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-[var(--textSecondary)]">
                        <span className="text-[var(--primary)] mt-1">•</span>
                        <span>{degree}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {certifications.length > 0 && (
                <div className="mt-6 p-4 bg-[var(--surface)] rounded-lg">
                  <h3 className="font-semibold text-[var(--textPrimary)] mb-3">{t('professionalDetails.certifications')}</h3>
                  <ul className="space-y-2">
                    {certifications.map((cert: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-[var(--textSecondary)]">
                        <span className="text-[var(--primary)] mt-1">•</span>
                        <span>{cert}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
                  {skills.length > 0 && (
                <div className="mt-6 p-4 bg-[var(--surface)] rounded-lg">
                  <h3 className="font-semibold text-[var(--textPrimary)] mb-3">{t('professionalDetails.skills')}</h3>
                  <ul className="space-y-2 grid md:grid-cols-3 grid-cols-1 gap-1">
                    {skills.map((skill: string, index: number) => (
                      <li key={index} className=" flex items-start gap-2 text-[var(--textSecondary)]">
                        <span className="text-[var(--primary)] mt-1">•</span>
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
                 {equipment_expertise.length > 0 && (
                <div className="mt-6 p-4 bg-[var(--surface)] rounded-lg">
                  <h3 className="font-semibold text-[var(--textPrimary)] mb-3">{t('professionalDetails.skills')}</h3>
                  <ul className="space-y-2 grid md:grid-cols-3 grid-cols-1 gap-1">
                    {equipment_expertise.map((equipment: string, index: number) => (
                      <li key={index} className=" flex items-start gap-2 text-[var(--textSecondary)]">
                        <span className="text-[var(--primary)] mt-1">•</span>
                        <span>{equipment}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {languages.length > 0 && (
                <div className="mt-6 p-4 bg-[var(--surface)] rounded-lg">
                  <h3 className="font-semibold text-[var(--textPrimary)] mb-3">{t('professionalDetails.languages')}</h3>
                  <div className="flex flex-wrap gap-2">
                    {languages.map((lang: string, index: number) => (
                      <span key={index} className="px-3 py-1 bg-[var(--accent)] text-[var(--primary)] rounded-full text-sm font-medium">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {professionalData.professional_journey_arabic && (
                <div className="mt-6 p-4 bg-[var(--surface)] rounded-lg">
                  <h3 className="font-semibold text-[var(--textPrimary)] mb-3">{t('professionalDetails.professionalJourney')}</h3>
                  <p className="text-[var(--textSecondary)] leading-relaxed">{professionalData.professional_journey_arabic}</p>
                </div>
              )}
            </section>

            {/* Documents Section */}
            <section className="bg-white rounded-2xl shadow-lg p-8 border border-[var(--accent)]">
              <h2 className="text-3xl font-bold text-[var(--textPrimary)] mb-6 flex items-center gap-3">
                <FileText className="w-8 h-8 text-[var(--primary)]" />
                {t('professionalDetails.documentsFiles')}
              </h2>
              <div className="bg-gradient-to-r from-[var(--accent)] to-[var(--primary)]/20 rounded-xl p-6 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                      <FileText className="w-8 h-8 text-[var(--primary)]" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-[var(--textPrimary)]">{t('professionalDetails.totalFiles')}</p>
                      <p className="text-[var(--textSecondary)]">{t('professionalDetails.allUploadedDocuments')}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-5xl font-bold text-[var(--primary)]">{professional.filesCount}</p>
                  </div>
                </div>
              </div>
              {professionalData.uploaded_files && professionalData.uploaded_files.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-semibold text-[var(--textPrimary)] mb-3">{t('professionalDetails.uploadedFiles')}</h3>
                  {professionalData.uploaded_files.map((fileName: string, index: number) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-[var(--surface)] rounded-lg">
                      <FileText className="w-5 h-5 text-[var(--primary)] flex-shrink-0" />
                      <span className="text-sm text-[var(--textPrimary)] truncate">{fileName}</span>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* Right Column - Contact & Quick Info */}
          <div className="space-y-6">
            {/* Contact Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-[var(--accent)] sticky top-6">
              <h3 className="text-xl font-bold text-[var(--textPrimary)] mb-6">{t('professionalDetails.contactInformation')}</h3>
              <div className="space-y-4">
                {professional.email ? (
                  <a
                    href={`mailto:${professional.email}`}
                    className="flex items-center gap-3 p-3 bg-[var(--surface)] rounded-lg hover:bg-[var(--accent)] transition-colors group"
                  >
                    <Mail className="w-5 h-5 text-[var(--primary)] group-hover:scale-110 transition-transform" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-[var(--textSecondary)]">{t('professionalDetails.email')}</p>
                      <p className="text-sm font-medium text-[var(--textPrimary)] truncate">{professional.email}</p>
                    </div>
                  </a>
                ) : (
                  <div className="flex items-center gap-3 p-3 bg-[var(--surface)] rounded-lg">
                    <Mail className="w-5 h-5 text-[var(--textSecondary)]" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-[var(--textSecondary)]">{t('professionalDetails.email')}</p>
                      <p className="text-sm font-medium text-[var(--textPrimary)]">{t('common.notSpecified')}</p>
                    </div>
                  </div>
                )}
                {professional.phone ? (
                  <a
                    href={`tel:${professional.phone}`}
                    className="flex items-center gap-3 p-3 bg-[var(--surface)] rounded-lg hover:bg-[var(--accent)] transition-colors group"
                  >
                    <Phone className="w-5 h-5 text-[var(--primary)] group-hover:scale-110 transition-transform" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-[var(--textSecondary)]">{t('professionalDetails.phone')}</p>
                      <p className="text-sm font-medium text-[var(--textPrimary)]">{professional.phone}</p>
                    </div>
                  </a>
                ) : (
                  <div className="flex items-center gap-3 p-3 bg-[var(--surface)] rounded-lg">
                    <Phone className="w-5 h-5 text-[var(--textSecondary)]" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-[var(--textSecondary)]">{t('professionalDetails.phone')}</p>
                      <p className="text-sm font-medium text-[var(--textPrimary)]">{t('common.notSpecified')}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3 p-3 bg-[var(--surface)] rounded-lg">
                  <MapPin className="w-5 h-5 text-[var(--primary)]" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-[var(--textSecondary)]">{t('professionalDetails.location')}</p>
                    <p className="text-sm font-medium text-[var(--textPrimary)]">{formatValue(professional.location)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-[var(--accent)]">
              <h3 className="text-xl font-bold text-[var(--textPrimary)] mb-4">{t('professionalDetails.quickStats')}</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-[var(--surface)] rounded-lg">
                  <span className="text-sm text-[var(--textSecondary)]">{t('professionalDetails.specialization')}</span>
                  <span className="text-sm font-semibold text-[var(--primary)]">
                    {specializations.length > 0 ? specializations.join(", ") : formatValue(professional.specialization)}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-[var(--surface)] rounded-lg">
                  <span className="text-sm text-[var(--textSecondary)]">{t('professionalDetails.experience')}</span>
                  <span className="text-sm font-semibold text-[var(--primary)]">{formatValue(professional.experience)}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-[var(--surface)] rounded-lg">
                  <span className="text-sm text-[var(--textSecondary)]">{t('professionalDetails.files')}</span>
                  <span className="text-sm font-semibold text-[var(--primary)]">{professional.filesCount}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="w-full py-3 px-4 bg-[var(--primary)] text-white font-medium rounded-lg hover:bg-[var(--secondary)] transition-colors flex items-center justify-center gap-2"
              >
                <Edit className="w-5 h-5" />
                {t('professionalDetails.editDetails')}
              </button>
              <button
                onClick={() => setIsDeleteModalOpen(true)}
                className="w-full py-3 px-4 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
              >
                <Trash2 className="w-5 h-5" />
                {t('professionalDetails.deleteProfessional')}
              </button>
              <button className="w-full py-3 px-4 bg-white border-2 border-[var(--primary)] text-[var(--primary)] font-medium rounded-lg hover:bg-[var(--surface)] transition-colors flex items-center justify-center gap-2">
                <FileText className="w-5 h-5" />
                {t('professionalDetails.viewDocuments')}
              </button>
            </div>
          </div>
        </div>
      </div>

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        professionalName={professionalData.name as string}
        isDeleting={deleteProfessionalMutation.isPending}
      />

      <EditProfessionalModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleUpdate}
        professional={professionalData as professionalData}
        isUpdating={updateProfessionalMutation.isPending}
      />
    </div>
  )
}

export default ProfessionalDetails
