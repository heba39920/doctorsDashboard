import { Form } from "../components/Form"
import { UserPlus } from "lucide-react"
import { useTranslation } from "react-i18next"

const Home = () => {
    const { t } = useTranslation()
    
    return (
        <div className="min-h-screen bg-[var(--surface)]">
            <div className="bg-white border-b border-[var(--accent)] shadow-sm">
                <div className="max-w-2xl mx-auto px-4 py-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-[var(--accent)] rounded-lg">
                            <UserPlus className="w-6 h-6 text-[var(--primary)]" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-[var(--textPrimary)]">
                                {t('home.addNewDoctor')}
                            </h1>
                            <p className="text-sm text-[var(--textSecondary)]">
                                {t('home.registerDoctor')}
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