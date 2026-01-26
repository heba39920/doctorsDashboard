import { useNavigate } from "react-router-dom"
  import { Loader2, AlertCircle, Search, X } from "lucide-react"
  import { useTranslation } from "react-i18next"
import { useGetProfessionals, useSearchByType, useSearchBySpecialization, useGetAllTypes } from "../utils/hooks/Hooks"
import { convertProfessionalListItemToLegacy } from "../utils/helperfunctions/ProfessionalUtils"
import type { professional, professionalListItem } from "../interfaces/interfaces"
import ProfessionalCard from "../components/ProfessionalsComponents/ProfessionalCard"
import { useState } from "react"
const Dashboard = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { data, isLoading, isError, error } = useGetProfessionals()
  const [selectedType, setSelectedType] = useState<string>("")
  const [specialization, setSpecialization] = useState<string>("")
  const isRTL = localStorage.getItem('language') === 'ar';
  const { data: typesData } = useGetAllTypes()
  const { data: typeSearchData, isLoading: typeSearchLoading } = useSearchByType(selectedType)
  const { data: specializationSearchData, isLoading: specializationSearchLoading } = useSearchBySpecialization(specialization)

  const handleViewDetails = (professional: professional) => {
    navigate(`/professional/${professional.id}`)
  }

  const allProfessionals = data?.professionals ? data.professionals.map(convertProfessionalListItemToLegacy) : []
 

  // Helper function to check if specialization matches (case-insensitive, partial match)
  // Checks all specializations in the original data
  const matchesSpecialization = (prof: professional, searchTerm: string, originalItem?: professionalListItem): boolean => {
    if (!searchTerm.trim()) return true
    const searchLower = searchTerm.toLowerCase().trim()
    
    // Check the converted specialization (first one)
    const specialization = prof.specialization?.toLowerCase() || ""
    if (specialization.includes(searchLower)) return true
    
    // Check all specializations from original data if available
    if (originalItem?.specializations) {
      return originalItem.specializations.some((spec: string) => 
        spec.toLowerCase().includes(searchLower)
      )
    }
    
    return false
  }

  // Determine which professionals to show
  let professionalsToShow: professional[] = []
  let isSearching = false
  let searchResultsCount = 0
  const hasTypeSearch = selectedType && selectedType.trim() !== ""
  const hasSpecializationSearch = specialization && specialization.trim() !== ""

  // Helper to get original item for a professional
  const getOriginalItem = (prof: professional): professionalListItem & { professional_type?: string; job_title?: string | null; current_workplace?: string | null } | undefined => {
    return data?.professionals?.find((item: professionalListItem) => item.professional_id === prof.id) as professionalListItem & { professional_type?: string; job_title?: string | null; current_workplace?: string | null } | undefined
  }

  if (hasTypeSearch && hasSpecializationSearch) {
    // Both searches active - combine results intelligently
    isSearching = true
    
    if (typeSearchData && specializationSearchData) {
      // Get professionals from both searches with original data
      const typeResults = typeSearchData.results.map(item => ({
        professional: convertProfessionalListItemToLegacy(item),
        original: item
      }))
      const specializationResults = specializationSearchData.results.map(item => ({
        professional: convertProfessionalListItemToLegacy(item),
        original: item
      }))
      
      // Find intersection (professionals that appear in both results)
      const typeResultIds = new Set(typeResults.map(r => r.professional.id))
      const intersection = specializationResults
        .filter(r => typeResultIds.has(r.professional.id))
        .map(r => r.professional)
      
      // Also filter type results by specialization for partial matches
      const filteredFromType = typeResults
        .filter(r => matchesSpecialization(r.professional, specialization, r.original))
        .map(r => r.professional)
      
      // Combine and deduplicate
      const allCombined = [...intersection, ...filteredFromType]
      const uniqueResults = Array.from(
        new Map(allCombined.map(p => [p.id, p])).values()
      )
      
      professionalsToShow = uniqueResults
      searchResultsCount = uniqueResults.length
    } else if (typeSearchData) {
      // Only type search data available, filter by specialization client-side
      const typeResults = typeSearchData.results.map(item => ({
        professional: convertProfessionalListItemToLegacy(item),
        original: item
      }))
      professionalsToShow = typeResults
        .filter(r => matchesSpecialization(r.professional, specialization, r.original))
        .map(r => r.professional)
      searchResultsCount = professionalsToShow.length
    } else if (specializationSearchData) {
      // Only specialization search data available, wait for type search or filter client-side
      const specializationResults = specializationSearchData.results.map(convertProfessionalListItemToLegacy)
      // Filter by checking if they would match type (we'll show all for now since type data not available in list)
      professionalsToShow = specializationResults
      searchResultsCount = professionalsToShow.length
    } else {
      // No search data yet, filter all professionals client-side
      professionalsToShow = allProfessionals.filter(prof => {
        const original = data?.professionals?.find((item: professionalListItem) => item.professional_id === prof.id)
        return matchesSpecialization(prof, specialization, original)
      })
      searchResultsCount = professionalsToShow.length
    }
  } else if (hasTypeSearch && typeSearchData) {
    // Only type search
    professionalsToShow = typeSearchData.results.map(convertProfessionalListItemToLegacy)
    isSearching = true
    searchResultsCount = typeSearchData.total
  } else if (hasSpecializationSearch) {
    // Only specialization search - use API results and also do client-side filtering for better matches
    isSearching = true
    
    if (specializationSearchData) {
      const apiResults = specializationSearchData.results.map(item => ({
        professional: convertProfessionalListItemToLegacy(item),
        original: item
      }))
      
      // Also search in all professionals for partial matches that API might have missed
      const clientResults = data?.professionals
        .filter(item => {
          const prof = convertProfessionalListItemToLegacy(item)
          return matchesSpecialization(prof, specialization, item) &&
            !apiResults.some(api => api.professional.id === prof.id)
        })
        .map(convertProfessionalListItemToLegacy) || []
      
      // Combine API results and client-side results, deduplicate
      const allResults = [
        ...apiResults.map(r => r.professional),
        ...clientResults
      ]
      professionalsToShow = Array.from(
        new Map(allResults.map(p => [p.id, p])).values()
      )
      searchResultsCount = professionalsToShow.length
    } else {
      // No API results yet, do client-side filtering on all professionals
      professionalsToShow = data?.professionals
        .filter(item => {
          const prof = convertProfessionalListItemToLegacy(item)
          return matchesSpecialization(prof, specialization, item)
        })
        .map(convertProfessionalListItemToLegacy) || []
      searchResultsCount = professionalsToShow.length
    }
  } else {
    // No search active
    professionalsToShow = allProfessionals
  }

  // Create final list with original items for rendering
  const professionalsForRendering = professionalsToShow.map(prof => ({
    professional: prof,
    original: getOriginalItem(prof)
  }))

  const handleClearType = () => {
    setSelectedType("")
  }

  const handleClearSpecialization = () => {
    setSpecialization("")
  }

  const handleClearAll = () => {
    setSelectedType("")
    setSpecialization("")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--surface)] flex items-center justify-center z-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[var(--primary)] animate-spin mx-auto mb-4" />
          <p className="text-[var(--textSecondary)]">{t('dashboard.loadingProfessionals')}</p>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-[var(--surface)] flex items-center justify-center p-6 z-50">
        <div className="text-center max-w-md">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-[var(--textPrimary)] mb-2">{t('dashboard.errorLoadingProfessionals')}</h2>
          <p className="text-[var(--textSecondary)] mb-4">
            {error instanceof Error ? error.message : t('dashboard.errorOccurred')}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--secondary)] transition-colors"
          >
            {t('common.retry')}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--surface)] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className={`text-2xl font-bold text-[var(--textPrimary)] mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
            {t('dashboard.title')}
          </h1>
          <p className={`text-[var(--textSecondary)] ${isRTL ? 'text-right' : 'text-left'}`}>
            {t('dashboard.subtitle')}
          </p>
        </div>

        <div className={`mb-6 flex items-center justify-between flex-wrap gap-4 ${isRTL ? 'justify-end' : 'justify-start'}`}>
          <div className="flex items-center gap-4">
            <div className="px-4 py-2 bg-white rounded-lg border border-[var(--accent)]">
              <span className="text-sm text-[var(--textSecondary)]">{t('dashboard.totalProfessionals')}</span>
              <span className="ml-2 text-lg font-bold text-[var(--primary)]">
                {isSearching ? searchResultsCount : (data?.total || allProfessionals.length)}
              </span>
            </div>
           
          </div>
        </div>

        {/* Search Inputs */}
        <div className="mb-6 bg-white rounded-xl shadow-lg p-6 border border-[var(--accent)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search by Type */}
            <div>
              <label className="block text-sm font-medium text-[var(--textPrimary)] mb-2 flex items-center gap-2">
                <Search className="w-4 h-4 text-[var(--primary)]" />
                {t('dashboard.searchByType')}
              </label>
              <div className="flex items-center gap-2">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="flex-1 px-4 py-2 border border-[var(--accent)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-[var(--textPrimary)] bg-white"
                >
                  <option value="">{t('dashboard.selectType')}</option>
                  {typesData?.professional_types.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.name}
                    </option>
                  ))}
                </select>
                {selectedType && (
                  <button
                    onClick={handleClearType}
                    className="px-3 py-2 bg-[var(--accent)] text-[var(--primary)] rounded-lg hover:bg-[var(--primary)] hover:text-white transition-colors"
                    title={t('dashboard.clearSearch')}
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Search by Specialization */}
            <div>
              <label className="block text-sm font-medium text-[var(--textPrimary)] mb-2 flex items-center gap-2">
                <Search className="w-4 h-4 text-[var(--primary)]" />
                {t('dashboard.searchBySpecialization')}
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  placeholder={t('dashboard.enterSpecialization')}
                  className="flex-1 px-4 py-2 border border-[var(--accent)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-[var(--textPrimary)] bg-white"
                />
                {specialization && (
                  <button
                    onClick={handleClearSpecialization}
                    className="px-3 py-2 bg-[var(--accent)] text-[var(--primary)] rounded-lg hover:bg-[var(--primary)] hover:text-white transition-colors"
                    title={t('dashboard.clearSearch')}
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Clear All Button */}
          {(selectedType || specialization) && (
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleClearAll}
                className="px-4 py-2 bg-[var(--accent)] text-[var(--primary)] rounded-lg hover:bg-[var(--primary)] hover:text-white transition-colors flex items-center gap-2 text-sm"
              >
                <X className="w-4 h-4" />
                {t('dashboard.clearAllFilters')}
              </button>
            </div>
          )}

          {/* Search Status */}
          {(typeSearchLoading || specializationSearchLoading) && (
            <div className="mt-4 flex items-center justify-center gap-2 text-[var(--textSecondary)]">
              <Loader2 className="w-4 h-4 animate-spin text-[var(--primary)]" />
              <span>{t('dashboard.searching')}</span>
            </div>
          )}

          {isSearching && !typeSearchLoading && !specializationSearchLoading && (
            <div className="mt-4 text-sm text-[var(--textSecondary)] space-y-1">
              {hasTypeSearch && typeSearchData && (
                <div>
                  {t('dashboard.searchByType')}: <span className="font-semibold text-[var(--primary)]">{typeSearchData.professional_type}</span>
                  {!hasSpecializationSearch && (
                    <> - {t('dashboard.totalProfessionals')}: <span className="font-semibold text-[var(--primary)]">{typeSearchData.total}</span></>
                  )}
                </div>
              )}
              {hasSpecializationSearch && specializationSearchData && (
                <div>
                  {t('dashboard.searchBySpecialization')}: <span className="font-semibold text-[var(--primary)]">{specializationSearchData.specialization}</span>
                  {!hasTypeSearch && (
                    <> - {t('dashboard.totalProfessionals')}: <span className="font-semibold text-[var(--primary)]">{specializationSearchData.total}</span></>
                  )}
                </div>
              )}
              {hasTypeSearch && hasSpecializationSearch && (
                <div className="font-semibold text-[var(--primary)]">
                  {t('dashboard.combinedResults')}: {searchResultsCount} {t('dashboard.totalProfessionals')}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Professionals Grid */}
        {professionalsToShow.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-[var(--textSecondary)] text-lg mb-4">
              {isSearching ? t('dashboard.noResultsFound') : t('dashboard.noProfessionalsFound')}
            </p>
            {!isSearching && (
              <button
                onClick={() => navigate("/")}
                className="px-4 py-2 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--secondary)] transition-colors"
              >
                {t('dashboard.addFirstProfessional')}
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {professionalsForRendering.map(({ professional, original }) => (
              <ProfessionalCard 
                key={professional.id} 
                professional={professional} 
                onViewDetails={handleViewDetails}
                originalItem={original}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
