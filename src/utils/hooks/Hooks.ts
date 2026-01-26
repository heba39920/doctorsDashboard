import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createProfessional, deleteProfessional, getProfessionalById, getProfessionals, searchByType, searchBySpecialization, updateProfessional, getStats, getAllTypes } from '../../services/Apis/ProfessionalsApis'
import type { professionalData } from '../../interfaces/interfaces'

export const useGetProfessionals = () => {
    return useQuery({
        queryKey: ['professionals'],
        queryFn: getProfessionals
    })
}

export const useCreateProfessional = () => {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: (formData: FormData) => createProfessional(formData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['professionals'] })
        },
        onError: (error: Error) => {
            console.error('Error creating professional:', error)
        }
    })
}

export const useGetProfessionalById = (id: string, enabled: boolean = true) => {
    return useQuery({
        queryKey: ['professional', id],
        queryFn: () => getProfessionalById(id),
        enabled: !!id && enabled
    })
}

export const useUpdateProfessional = () => {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<professionalData> }) => updateProfessional(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['professionals'] })
            queryClient.invalidateQueries({ queryKey: ['professional', variables.id] })
        },
        onError: (error: Error) => {
            console.error('Error updating professional:', error)
        }
    })
}

export const useDeleteProfessional = () => {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: (id: string) => deleteProfessional(id),
        onSuccess: (_, id) => {
            queryClient.invalidateQueries({ queryKey: ['professionals'] })
            queryClient.removeQueries({ queryKey: ['professional', id] })
        },
        onError: (error: Error) => {
            console.error('Error deleting professional:', error)
        }
    })
}
export const useSearchByType = (professional_type: string) => {
    return useQuery({
        queryKey: ['searchByType', professional_type],
        queryFn: () => searchByType(professional_type),
        enabled: !!professional_type && professional_type.trim() !== ''
    })
}
export const useSearchBySpecialization = (specialization: string) => {
    return useQuery({
        queryKey: ['searchBySpecialization', specialization],
        queryFn: () => searchBySpecialization(specialization),
        enabled: !!specialization && specialization.trim() !== ''
    })
}
export const useGetStats = () => {
    return useQuery({
        queryKey: ['stats'],
        queryFn: getStats
    })
}
export const useGetAllTypes = () => {
    return useQuery({
        queryKey: ['allTypes'],
        queryFn: getAllTypes
    })
}