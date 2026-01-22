import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createDoctor, deleteDoctor, getDoctorById, getDoctors, updateDoctor } from '../../services/Apis/DoctorsApis'
import type { DoctorData } from '../../interfaces/interfaces'

export const useGetDoctors = () => {
    return useQuery({
        queryKey: ['doctors'],
        queryFn: getDoctors
    })
}

export const useCreateDoctor = () => {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: (formData: FormData) => createDoctor(formData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['doctors'] })
        },
        onError: (error: Error) => {
            console.error('Error creating doctor:', error)
        }
    })
}

export const useGetDoctorById = (id: string, enabled: boolean = true) => {
    return useQuery({
        queryKey: ['doctor', id],
        queryFn: () => getDoctorById(id),
        enabled: !!id && enabled
    })
}

export const useUpdateDoctor = () => {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<DoctorData> }) => updateDoctor(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['doctors'] })
            queryClient.invalidateQueries({ queryKey: ['doctor', variables.id] })
        },
        onError: (error: Error) => {
            console.error('Error updating doctor:', error)
        }
    })
}

export const useDeleteDoctor = () => {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: (id: string) => deleteDoctor(id),
        onSuccess: (_, id) => {
            queryClient.invalidateQueries({ queryKey: ['doctors'] })
            queryClient.removeQueries({ queryKey: ['doctor', id] })
        },
        onError: (error: Error) => {
            console.error('Error deleting doctor:', error)
        }
    })
}