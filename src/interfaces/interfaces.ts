// Certification interface


// SCFHS License interface
export interface SCFHSLicense {
  license_number: string
  license_type: string
  issue_date: string
  expiry_date: string
  classification: string
}

// Other License interface
export interface OtherLicense {
  issuer: string
  license_number: string
  expiry: string
}

// Training Course interface
export interface TrainingCourse {
  name: string
  provider: string
  year: string
}

// Work Place interface
export interface WorkPlace {
  workplace_name: string
  position: string
  start_date: string
  end_date: string | "Current"
  responsibilities: string
}

// professional data interface (from API)
export interface professionalData {
  professional_id: string
  professional_type: string
  name: string
  phone: string | null
  email: string | null
  national_id: string | null
  specializations: string[] | null
  sub_specializations: string[] | null
  years_of_experience: number | null
  job_title: string | null
  summary_arabic: string | null
  professional_journey_arabic: string | null
  degrees_and_certificates: string[] | null
  scfhs_license: SCFHSLicense | null
  other_licenses: OtherLicense[] | null
  languages: string[] | null
  certifications: string[] | null
  training_courses: TrainingCourse[] | null
  awards_and_recognition: string[] | null
  research_and_publications: string[] | null
  work_places: WorkPlace[] | null
  current_workplace: string | null
  consultation_fees: string | null
  availability: string | null
  skills: string[] | null
  equipment_expertise: string[] | null
  created_at: string
  updated_at: string
  uploaded_files: string[]
  raw_analysis: string | null
  analysis_error: string | null
  [key: string]: unknown // For additional properties
}

// professional list item (from GET /professionals)
export interface professionalListItem {
  professional_id: string
  name: string
  specializations: string[] | null
  years_of_experience: number | null
  phone: string | null
  email: string | null
  created_at: string
}

// Create professional Response
export interface CreateprofessionalResponse {
  status: string
  message: string
  professional_id: string
  data: professionalData
}

// Get professional By ID Response
export interface GetprofessionalByIdResponse {
  status: string
  message: string
  professional_id: string
  data: professionalData
}

// Get professionals Response
export interface GetprofessionalsResponse {
  total: number
  professionals: professionalListItem[]
}

// Update professional Response
export interface UpdateprofessionalResponse {
  status: string
  message: string
  data: professionalData
}

// Delete professional Response
export interface DeleteprofessionalResponse {
  status: string
  message: string
  deleted_professional: string
}

// Form data for creating/updating professional
export interface professionalFormData {
  name?: string
  files?: File[]
}

// Legacy professional interface (for backward compatibility with existing components)
export interface professional {
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

export interface ProfessionalType {
   value: string
   name: string
}

 export interface GetAllTypesResponse {
  professional_types: ProfessionalType[]
}

export interface SearchByTypeResponse {
  professional_type: string
  total: number
  results: professionalListItem[]
}
export interface SearchBySpecializationResponse {
  specialization: string
  total: number
  results: professionalListItem[]
}
export interface GetStatsResponse {
  total_professionals: number
  by_professional_type: {
    [key: string]: number
  }
  total_specializations: number
  top_specializations: {
    [key: string]: number
  }
  average_years_of_experience: number
  professionals_with_scfhs_license: number
  professionals_with_certifications: number
}