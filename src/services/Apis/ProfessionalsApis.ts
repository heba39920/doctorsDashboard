import { axiosInstance } from "../endPoints/ENDPOINTS"
import { PROFESSIONALS } from "../endPoints/ENDPOINTS"
import type { 
    GetprofessionalsResponse, 
    CreateprofessionalResponse, 
    GetprofessionalByIdResponse, 
    UpdateprofessionalResponse, 
    DeleteprofessionalResponse,
    professionalData,
    SearchByTypeResponse,
    SearchBySpecializationResponse,
    GetStatsResponse,
    GetAllTypesResponse
} from "../../interfaces/interfaces"

const getProfessionals = async (): Promise<GetprofessionalsResponse> => {
    const response = await axiosInstance.get<GetprofessionalsResponse>(PROFESSIONALS.GET_ALL_PROFESSIONALS)
    return response.data
}

const createProfessional = async (formData: FormData): Promise<CreateprofessionalResponse> => {
    const response = await axiosInstance.post<CreateprofessionalResponse>(PROFESSIONALS.CREATE_PROFESSIONAL, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    return response.data
}

const getProfessionalById = async (id: string): Promise<GetprofessionalByIdResponse> => {
    const response = await axiosInstance.get<GetprofessionalByIdResponse>(PROFESSIONALS.GET_PROFESSIONAL_BY_ID(id))
    return response.data
}

const updateProfessional = async (id: string, data: Partial<professionalData>): Promise<UpdateprofessionalResponse> => {
    const response = await axiosInstance.put<UpdateprofessionalResponse>(PROFESSIONALS.UPDATE_PROFESSIONAL(id), data)
    return response.data
}

const deleteProfessional = async (id: string): Promise<DeleteprofessionalResponse> => {
    const response = await axiosInstance.delete<DeleteprofessionalResponse>(PROFESSIONALS.DELETE_PROFESSIONAL(id))
    return response.data
}
const searchByType = async (type: string): Promise<SearchByTypeResponse> => {
    const response = await axiosInstance.get<SearchByTypeResponse>(PROFESSIONALS.SEARCH_BY_TYPE(type))
    return response.data
}
const searchBySpecialization = async (specialization: string): Promise<SearchBySpecializationResponse> => {
    const response = await axiosInstance.get<SearchBySpecializationResponse>(PROFESSIONALS.SEARCH_BY_SPECIALIZATION(specialization))
    return response.data
}

const getStats = async (): Promise<GetStatsResponse> => {
    const response = await axiosInstance.get<GetStatsResponse>(PROFESSIONALS.GET_STATS)
    return response.data
}
const getAllTypes = async (): Promise<GetAllTypesResponse> => {
    const response = await axiosInstance.get<GetAllTypesResponse>(PROFESSIONALS.GET_ALL_TYPES)
    return response.data
}

    export { getProfessionals, createProfessional, getProfessionalById, updateProfessional, deleteProfessional, searchByType, searchBySpecialization, getStats, getAllTypes }