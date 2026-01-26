import { Form } from "../components/Form"
import { UserPlus } from "lucide-react"
import { useTranslation } from "react-i18next"

const Home = () => {
    const { t } = useTranslation()
    const isRTL = localStorage.getItem('language') === 'ar';
    return (
        <div className="min-h-screen bg-[var(--surface)]">
            <div className="bg-white border-b border-[var(--accent)] shadow-sm">
                <div className={`py-6 ${isRTL ? 'me-10' : 'ms-10'}`}>
                    <div className={`flex items-center gap-3 ${isRTL ? 'justify-end' : 'justify-start'}`}>
                        <div className="p-2 bg-[var(--accent)] rounded-lg">
                            <UserPlus className="w-6 h-6 text-[var(--primary)]" />
                        </div>
                        <div>
                            <h1 className={`text-2xl font-bold text-[var(--textPrimary)] `}>
                                {t('home.addNewProfessional')}
                            </h1>
                            <p className={`text-sm text-[var(--textSecondary)] ${isRTL ? 'text-right' : 'text-left'}`}>
                                {t('home.registerProfessional')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Form />
        </div>
    )
}

export default Home