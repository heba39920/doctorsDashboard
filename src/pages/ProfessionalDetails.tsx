import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, User, Mail, Phone, Award, FileText, Briefcase, Building2, Calendar, Star, Loader2, AlertCircle, Trash2, Edit, IdCard, GraduationCap, Shield, BookOpen, Trophy, BookMarked, BriefcaseBusiness, DollarSign, Clock, Code, AlertTriangle } from "lucide-react"
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
  const subSpecializations = professionalData.sub_specializations || []
  const languages = professionalData.languages || []
  const certifications = professionalData.certifications || []
  const skills = professionalData.skills || []
  const degrees = professionalData.degrees_and_certificates || []
  const equipment_expertise = professionalData.equipment_expertise || []
  const trainingCourses = professionalData.training_courses || []
  const awardsAndRecognition = professionalData.awards_and_recognition || []
  const researchAndPublications = professionalData.research_and_publications || []
  const workPlaces = professionalData.work_places || []
  const otherLicenses = professionalData.other_licenses || []
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
                {professionalData.professional_type && (
                  <div className="flex items-start gap-4 p-4 bg-[var(--surface)] rounded-lg">
                    <Briefcase className="w-6 h-6 text-[var(--primary)] flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-[var(--textPrimary)] mb-1">{t('professionalDetails.professionalType')}</h3>
                      <p className="text-[var(--textSecondary)]">{professionalData.professional_type}</p>
                    </div>
                  </div>
                )}
                {professionalData.job_title && (
                  <div className="flex items-start gap-4 p-4 bg-[var(--surface)] rounded-lg">
                    <BriefcaseBusiness className="w-6 h-6 text-[var(--primary)] flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-[var(--textPrimary)] mb-1">{t('professionalDetails.jobTitle')}</h3>
                      <p className="text-[var(--textSecondary)]">{professionalData.job_title}</p>
                    </div>
                  </div>
                )}
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

              {specializations.length > 0 && (
                <div className="mt-6 p-4 bg-[var(--surface)] rounded-lg">
                  <h3 className="font-semibold text-[var(--textPrimary)] mb-3 flex items-center gap-2">
                    <Award className="w-5 h-5 text-[var(--primary)]" />
                    {t('professionalDetails.specialization')}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {specializations.map((spec: string, index: number) => (
                      <span key={index} className="px-3 py-1 bg-[var(--accent)] text-[var(--primary)] rounded-full text-sm font-medium">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {subSpecializations.length > 0 && (
                <div className="mt-6 p-4 bg-[var(--surface)] rounded-lg">
                  <h3 className="font-semibold text-[var(--textPrimary)] mb-3 flex items-center gap-2">
                    <Award className="w-5 h-5 text-[var(--primary)]" />
                    {t('professionalDetails.subSpecializations')}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {subSpecializations.map((subSpec: string, index: number) => (
                      <span key={index} className="px-3 py-1 bg-[var(--accent)] text-[var(--primary)] rounded-full text-sm font-medium">
                        {subSpec}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {degrees.length > 0 && (
                <div className="mt-6 p-4 bg-[var(--surface)] rounded-lg">
                  <h3 className="font-semibold text-[var(--textPrimary)] mb-3 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-[var(--primary)]" />
                    {t('professionalDetails.degreesCertificates')}
                  </h3>
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
                  <h3 className="font-semibold text-[var(--textPrimary)] mb-3 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-[var(--primary)]" />
                    {t('professionalDetails.certifications')}
                  </h3>
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

              {professionalData.scfhs_license && (
                <div className="mt-6 p-4 bg-[var(--surface)] rounded-lg">
                  <h3 className="font-semibold text-[var(--textPrimary)] mb-3 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-[var(--primary)]" />
                    {t('professionalDetails.scfhsLicense')}
                  </h3>
                  <div className="space-y-3">
                    {professionalData.scfhs_license.license_number && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-[var(--textSecondary)]">{t('professionalDetails.licenseNumber')}:</span>
                        <span className="text-sm font-medium text-[var(--textPrimary)]">{professionalData.scfhs_license.license_number}</span>
                      </div>
                    )}
                    {professionalData.scfhs_license.license_type && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-[var(--textSecondary)]">{t('professionalDetails.licenseType')}:</span>
                        <span className="text-sm font-medium text-[var(--textPrimary)]">{professionalData.scfhs_license.license_type}</span>
                      </div>
                    )}
                    {professionalData.scfhs_license.issue_date && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-[var(--textSecondary)]">{t('professionalDetails.issueDate')}:</span>
                        <span className="text-sm font-medium text-[var(--textPrimary)]">{professionalData.scfhs_license.issue_date}</span>
                      </div>
                    )}
                    {professionalData.scfhs_license.expiry_date && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-[var(--textSecondary)]">{t('professionalDetails.expiryDate')}:</span>
                        <span className="text-sm font-medium text-[var(--textPrimary)]">{professionalData.scfhs_license.expiry_date}</span>
                      </div>
                    )}
                    {professionalData.scfhs_license.classification && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-[var(--textSecondary)]">{t('professionalDetails.classification')}:</span>
                        <span className="text-sm font-medium text-[var(--textPrimary)]">{professionalData.scfhs_license.classification}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {otherLicenses.length > 0 && (
                <div className="mt-6 p-4 bg-[var(--surface)] rounded-lg">
                  <h3 className="font-semibold text-[var(--textPrimary)] mb-3 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-[var(--primary)]" />
                    {t('professionalDetails.otherLicenses')}
                  </h3>
                  <div className="space-y-4">
                    {otherLicenses.map((license, index: number) => (
                      <div key={index} className="p-3 bg-white rounded-lg border border-[var(--accent)]">
                        {license.issuer && (
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-[var(--textSecondary)]">{t('professionalDetails.issuer')}:</span>
                            <span className="text-sm font-medium text-[var(--textPrimary)]">{license.issuer}</span>
                          </div>
                        )}
                        {license.license_number && (
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-[var(--textSecondary)]">{t('professionalDetails.licenseNumber')}:</span>
                            <span className="text-sm font-medium text-[var(--textPrimary)]">{license.license_number}</span>
                          </div>
                        )}
                        {license.expiry && (
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-[var(--textSecondary)]">{t('professionalDetails.expiry')}:</span>
                            <span className="text-sm font-medium text-[var(--textPrimary)]">{license.expiry}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {trainingCourses.length > 0 && (
                <div className="mt-6 p-4 bg-[var(--surface)] rounded-lg">
                  <h3 className="font-semibold text-[var(--textPrimary)] mb-3 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-[var(--primary)]" />
                    {t('professionalDetails.trainingCourses')}
                  </h3>
                  <div className="space-y-3">
                    {trainingCourses.map((course, index: number) => (
                      <div key={index} className="p-3 bg-white rounded-lg border border-[var(--accent)]">
                        {course.name && (
                          <div className="font-medium text-[var(--textPrimary)] mb-1">{course.name}</div>
                        )}
                        <div className="flex flex-wrap gap-4 text-sm text-[var(--textSecondary)]">
                          {course.provider && (
                            <span>{t('professionalDetails.provider')}: {course.provider}</span>
                          )}
                          {course.year && (
                            <span>{t('professionalDetails.year')}: {course.year}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {awardsAndRecognition.length > 0 && (
                <div className="mt-6 p-4 bg-[var(--surface)] rounded-lg">
                  <h3 className="font-semibold text-[var(--textPrimary)] mb-3 flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-[var(--primary)]" />
                    {t('professionalDetails.awardsAndRecognition')}
                  </h3>
                  <ul className="space-y-2">
                    {awardsAndRecognition.map((award: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-[var(--textSecondary)]">
                        <span className="text-[var(--primary)] mt-1">•</span>
                        <span>{award}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {researchAndPublications.length > 0 && (
                <div className="mt-6 p-4 bg-[var(--surface)] rounded-lg">
                  <h3 className="font-semibold text-[var(--textPrimary)] mb-3 flex items-center gap-2">
                    <BookMarked className="w-5 h-5 text-[var(--primary)]" />
                    {t('professionalDetails.researchAndPublications')}
                  </h3>
                  <ul className="space-y-2">
                    {researchAndPublications.map((publication: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-[var(--textSecondary)]">
                        <span className="text-[var(--primary)] mt-1">•</span>
                        <span>{publication}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {workPlaces.length > 0 && (
                <div className="mt-6 p-4 bg-[var(--surface)] rounded-lg">
                  <h3 className="font-semibold text-[var(--textPrimary)] mb-3 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-[var(--primary)]" />
                    {t('professionalDetails.workPlaces')}
                  </h3>
                  <div className="space-y-4">
                    {workPlaces.map((workplace, index: number) => (
                      <div key={index} className="p-4 bg-white rounded-lg border border-[var(--accent)]">
                        {workplace.workplace_name && (
                          <h4 className="font-semibold text-[var(--textPrimary)] mb-2">{workplace.workplace_name}</h4>
                        )}
                        {workplace.position && (
                          <div className="text-sm text-[var(--textSecondary)] mb-2">
                            {t('professionalDetails.position')}: <span className="font-medium text-[var(--textPrimary)]">{workplace.position}</span>
                          </div>
                        )}
                        <div className="flex flex-wrap gap-4 text-sm text-[var(--textSecondary)] mb-2">
                          {workplace.start_date && (
                            <span>{t('professionalDetails.startDate')}: {workplace.start_date}</span>
                          )}
                          {workplace.end_date && (
                            <span>{t('professionalDetails.endDate')}: {workplace.end_date}</span>
                          )}
                        </div>
                        {workplace.responsibilities && (
                          <div className="mt-2">
                            <span className="text-sm font-medium text-[var(--textPrimary)]">{t('professionalDetails.responsibilities')}:</span>
                            <p className="text-sm text-[var(--textSecondary)] mt-1">{workplace.responsibilities}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {professionalData.current_workplace && (
                <div className="mt-6 p-4 bg-[var(--surface)] rounded-lg">
                  <h3 className="font-semibold text-[var(--textPrimary)] mb-2 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-[var(--primary)]" />
                    {t('professionalDetails.currentWorkplace')}
                  </h3>
                  <p className="text-[var(--textSecondary)]">{professionalData.current_workplace}</p>
                </div>
              )}

              {professionalData.consultation_fees && (
                <div className="mt-6 p-4 bg-[var(--surface)] rounded-lg">
                  <h3 className="font-semibold text-[var(--textPrimary)] mb-2 flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-[var(--primary)]" />
                    {t('professionalDetails.consultationFees')}
                  </h3>
                  <p className="text-[var(--textSecondary)]">{professionalData.consultation_fees}</p>
                </div>
              )}

              {professionalData.availability && (
                <div className="mt-6 p-4 bg-[var(--surface)] rounded-lg">
                  <h3 className="font-semibold text-[var(--textPrimary)] mb-2 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[var(--primary)]" />
                    {t('professionalDetails.availability')}
                  </h3>
                  <p className="text-[var(--textSecondary)]">{professionalData.availability}</p>
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
                  <h3 className="font-semibold text-[var(--textPrimary)] mb-3">{t('professionalDetails.equipmentExpertise')}</h3>
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

            {/* Analysis Section */}
            {professionalData.raw_analysis && (
              <section className="bg-white rounded-2xl shadow-lg p-8 border border-[var(--accent)]">
                <h2 className="text-3xl font-bold text-[var(--textPrimary)] mb-6 flex items-center gap-3">
                  <Code className="w-8 h-8 text-[var(--primary)]" />
                  {t('professionalDetails.rawAnalysis')}
                </h2>
                <div className="p-4 bg-[var(--surface)] rounded-lg max-h-96 overflow-y-auto">
                  <pre className="text-sm text-[var(--textSecondary)] whitespace-pre-wrap font-mono">
                    {professionalData.raw_analysis}
                  </pre>
                </div>
              </section>
            )}

            {professionalData.analysis_error && (
              <section className="bg-white rounded-2xl shadow-lg p-8 border border-red-200">
                <h2 className="text-2xl font-bold text-red-600 mb-4 flex items-center gap-3">
                  <AlertTriangle className="w-6 h-6" />
                  {t('professionalDetails.analysisError')}
                </h2>
                <div className="p-4 bg-red-50 rounded-lg">
                  <p className="text-sm text-red-800">{professionalData.analysis_error}</p>
                </div>
              </section>
            )}
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
 
             {professionalData.national_id && (
              <div className="flex items-center gap-3 p-3 bg-[var(--surface)] rounded-lg">
                <IdCard className="w-5 h-5 text-[var(--primary)]" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-[var(--textSecondary)]">{t('professionalDetails.nationalId')}</p>
                  <p className="text-sm font-medium text-[var(--textPrimary)]">{professionalData.national_id}</p>
                </div>
              </div>
             )}
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
