// Certification interface
export interface Certification {
  name: string
}

// Doctor data interface (from API)
export interface DoctorData {
  doctor_id: string
  name: string
  phone: string | null
  email: string | null
  specializations: string[] | null
  years_of_experience: number | null
  summary_arabic: string | null
  degrees_and_certificates: string[] | null
  professional_journey_arabic: string | null
  licenses: string | null
  languages: string[] | null
  certifications: Certification[] | null
  awards_and_recognition: string | null
  research_and_publications: string | null
  hospital_affiliations: string[] | null
  consultation_fees: number | null
  availability: string | null
  created_at: string
  updated_at: string
  uploaded_files: string[]
  raw_analysis: string | null
  analysis_error: string | null
  [key: string]: unknown // For additional properties
}

// Doctor list item (from GET /doctors)
export interface DoctorListItem {
  doctor_id: string
  name: string
  specializations: string[] | null
  years_of_experience: number | null
  phone: string | null
  email: string | null
  created_at: string
}

// Create Doctor Response
export interface CreateDoctorResponse {
  status: string
  message: string
  doctor_id: string
  data: DoctorData
}

// Get Doctor By ID Response
export interface GetDoctorByIdResponse {
  status: string
  data: DoctorData
}

// Get Doctors Response
export interface GetDoctorsResponse {
  total: number
  doctors: DoctorListItem[]
}

// Update Doctor Response
export interface UpdateDoctorResponse {
  status: string
  message: string
  data: DoctorData
}

// Delete Doctor Response
export interface DeleteDoctorResponse {
  status: string
  message: string
  deleted_doctor: string
}

// Form data for creating/updating doctor
export interface DoctorFormData {
  name?: string
  files?: File[]
}

// Legacy Doctor interface (for backward compatibility with existing components)
export interface Doctor {
  id: string
  name: string
  email: string | null
  phone: string | null
  specialization: string
  location?: string
  experience: string
  joinDate: string
  filesCount: number
  avatar?: string
}