import { Form } from "../components/Form"
import { UserPlus, Menu } from "lucide-react"
import { useTranslation } from "react-i18next"
import { useSidebar } from "../contexts/SidebarContext"

const Home = () => {
    const { t } = useTranslation()
    const { openSidebar } = useSidebar()
    const isRTL = localStorage.getItem('language') === 'ar';
    return (
        <div className="min-h-screen bg-[var(--surface)] p-6">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8 bg-white rounded-xl border border-[var(--accent)] shadow-sm p-6">
                    <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                            <div className={`flex items-center gap-3 mb-2 ${isRTL ? 'justify-end' : 'justify-start'}`}>
                                <UserPlus className="w-8 h-8 text-[var(--primary)]" />
                                <h1 className="text-2xl font-bold text-[var(--textPrimary)]">
                                    {t('home.addNewProfessional')}
                                </h1>
                            </div>
                            <p className="text-[var(--textSecondary)]">
                                {t('home.registerProfessional')}
                            </p>
                        </div>
                        <button
                            onClick={openSidebar}
                            className={`md:hidden p-3 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300`}
                            aria-label={t('sidebar.openMenu')}
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                </div>
                <Form />
            </div>
        </div>
    )
}

export default Home