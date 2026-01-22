import type { DoctorData, DoctorListItem, Doctor } from "../../interfaces/interfaces"

/**
 * Helper function to get "Not specified" text based on current language
 */
const getNotSpecified = (): string => {
  const lang = localStorage.getItem('language') || 'en'
  return lang === 'ar' ? 'غير محدد' : 'Not specified'
}

/**
 * Convert API DoctorData to legacy Doctor format for backward compatibility
 */
export const convertDoctorDataToLegacy = (data: DoctorData): Doctor => {
  const notSpecified = getNotSpecified()
  return {
    id: data.doctor_id,
    name: data.name,
    email: data.email || null,
    phone: data.phone || null,
    specialization: data.specializations?.[0] || notSpecified,
    location: data.hospital_affiliations?.[0] || notSpecified,
    experience: data.years_of_experience ? `${data.years_of_experience} years` : notSpecified,
    joinDate: data.created_at,
    filesCount: data.uploaded_files?.length || 0,
  }
}

/**
 * Convert API DoctorListItem to legacy Doctor format
 */
export const convertDoctorListItemToLegacy = (item: DoctorListItem): Doctor => {
  const notSpecified = getNotSpecified()
  return {
    id: item.doctor_id,
    name: item.name,
    email: item.email || null,
    phone: item.phone || null,
    specialization: item.specializations?.[0] || notSpecified,
    location: notSpecified,
    experience: item.years_of_experience ? `${item.years_of_experience} years` : notSpecified,
    joinDate: item.created_at,
    filesCount: 0, // Not available in list response
  }
}

/**
 * Helper to format null/undefined values
 */
export const formatValue = (value: string | null | undefined, fallback?: string): string => {
  const notSpecified = getNotSpecified()
  if (value === null || value === undefined || value === '') {
    return fallback || notSpecified
  }
  return value
}
