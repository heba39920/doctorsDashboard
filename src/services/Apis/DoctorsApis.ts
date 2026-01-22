import { axiosInstance } from "../endPoints/ENDPOINTS"
import { DOCTORS } from "../endPoints/ENDPOINTS"
import type { 
    GetDoctorsResponse, 
    CreateDoctorResponse, 
    GetDoctorByIdResponse, 
    UpdateDoctorResponse, 
    DeleteDoctorResponse,
    DoctorData 
} from "../../interfaces/interfaces"

const getDoctors = async (): Promise<GetDoctorsResponse> => {
    const response = await axiosInstance.get<GetDoctorsResponse>(DOCTORS.GET_ALL_DOCTORS)
    return response.data
}

const createDoctor = async (formData: FormData): Promise<CreateDoctorResponse> => {
    const response = await axiosInstance.post<CreateDoctorResponse>(DOCTORS.CREATE_DOCTOR, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    return response.data
}

const getDoctorById = async (id: string): Promise<GetDoctorByIdResponse> => {
    const response = await axiosInstance.get<GetDoctorByIdResponse>(DOCTORS.GET_DOCTOR_BY_ID(id))
    return response.data
}

const updateDoctor = async (id: string, data: Partial<DoctorData>): Promise<UpdateDoctorResponse> => {
    const response = await axiosInstance.put<UpdateDoctorResponse>(DOCTORS.UPDATE_DOCTOR(id), data)
    return response.data
}

const deleteDoctor = async (id: string): Promise<DeleteDoctorResponse> => {
    const response = await axiosInstance.delete<DeleteDoctorResponse>(DOCTORS.DELETE_DOCTOR(id))
    return response.data
}

export { getDoctors, createDoctor, getDoctorById, updateDoctor, deleteDoctor }