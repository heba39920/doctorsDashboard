import { Search, X, Loader2 } from "lucide-react"
import { useTranslation } from "react-i18next"
import { useSearchBySpecialization } from "../utils/hooks/Hooks"
import { useState } from "react"
import { convertProfessionalListItemToLegacy } from "../utils/helperfunctions/ProfessionalUtils"
import type { professional } from "../interfaces/interfaces"
import ProfessionalCard from "./ProfessionalsComponents/ProfessionalCard"

interface SearchBySpecializationProps {
  onViewDetails: (professional: professional) => void
}

const SearchBySpecialization = ({ onViewDetails }: SearchBySpecializationProps) => {
  const { t } = useTranslation()
  const [specialization, setSpecialization] = useState<string>("")
  const { data: searchData, isLoading: searchLoading, isError } = useSearchBySpecialization(specialization)

  const handleClear = () => {
    setSpecialization("")
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // The hook will automatically trigger when specialization changes
  }

  const professionals = searchData?.results 
    ? searchData.results.map(convertProfessionalListItemToLegacy)
    : []

  return (
    <div className="mb-6">
      <div className="bg-white rounded-xl shadow-lg p-6 border border-[var(--accent)]">
        <div className="flex items-center gap-3 mb-4">
          <Search className="w-5 h-5 text-[var(--primary)]" />
          <h2 className="text-xl font-bold text-[var(--textPrimary)]">
            {t('dashboard.searchBySpecialization')}
          </h2>
        </div>

        <form onSubmit={handleSearch} className="flex items-center gap-3 mb-4">
          <input
            type="text"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            placeholder={t('dashboard.enterSpecialization')}
            className="flex-1 px-4 py-2 border border-[var(--accent)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-[var(--textPrimary)] bg-white"
          />
          
          {specialization && (
            <button
              type="button"
              onClick={handleClear}
              className="px-4 py-2 bg-[var(--accent)] text-[var(--primary)] rounded-lg hover:bg-[var(--primary)] hover:text-white transition-colors flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              {t('dashboard.clearSearch')}
            </button>
          )}
        </form>

        {searchLoading && specialization && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 text-[var(--primary)] animate-spin" />
            <span className="ml-2 text-[var(--textSecondary)]">{t('dashboard.searching')}</span>
          </div>
        )}

        {isError && specialization && (
          <div className="text-center py-4 text-red-500">
            {t('common.error')}
          </div>
        )}

        {searchData && specialization && (
          <div className="mt-4">
            <div className="mb-4 text-sm text-[var(--textSecondary)]">
              {t('dashboard.searchBySpecialization')}: <span className="font-semibold text-[var(--primary)]">{searchData.specialization}</span> - 
              {t('dashboard.totalProfessionals')}: <span className="font-semibold text-[var(--primary)]">{searchData.total}</span>
            </div>

            {professionals.length === 0 ? (
              <div className="text-center py-8 text-[var(--textSecondary)]">
                {t('dashboard.noResultsFound')}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {professionals.map((professional) => (
                  <ProfessionalCard 
                    key={professional.id} 
                    professional={professional} 
                    onViewDetails={onViewDetails} 
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchBySpecialization
