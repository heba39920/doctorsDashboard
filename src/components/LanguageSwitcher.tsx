import { Globe } from "lucide-react"
import { useTranslation } from "react-i18next"
import { useState, useRef, useEffect } from "react"

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [isLargeScreen, setIsLargeScreen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ top: 0, left: 0 })

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
    localStorage.setItem('language', lng)
    setIsOpen(false)
  }

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 768)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)

    return () => {
      window.removeEventListener('resize', checkScreenSize)
    }
  }, [])

  useEffect(() => {
    const updatePosition = () => {
      if (isOpen && buttonRef.current && dropdownRef.current && isLargeScreen) {
        const buttonRect = buttonRef.current.getBoundingClientRect()
        const dropdownHeight = dropdownRef.current.offsetHeight
        setPosition({
          top: buttonRect.top - dropdownHeight - 8, // 8px gap above
          left: buttonRect.left
        })
      }
    }

    updatePosition()
    if (isLargeScreen) {
      window.addEventListener('resize', updatePosition)
      window.addEventListener('scroll', updatePosition, true)
    }

    return () => {
      if (isLargeScreen) {
        window.removeEventListener('resize', updatePosition)
        window.removeEventListener('scroll', updatePosition, true)
      }
    }
  }, [isOpen, isLargeScreen])

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-[var(--secondary)] rounded-lg hover:bg-[var(--primary)] hover:text-white transition-colors"
        aria-label="Change language"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium uppercase">{i18n.language}</span>
      </button>
      
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div
            ref={dropdownRef}
            className="absolute bottom-full mb-2 left-0 bg-white rounded-lg shadow-lg border border-[var(--accent)] z-20 min-w-[120px] md:fixed"
            style={isLargeScreen ? {
              top: `${position.top}px`,
              left: `${position.left}px`,
              bottom: 'auto',
              marginBottom: 0
            } : {}}
          >
            <button
              onClick={() => changeLanguage('en')}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-[var(--surface)] transition-colors ${
                i18n.language === 'en' ? 'bg-[var(--accent)] text-[var(--primary)] font-semibold' : ''
              }`}
            >
              English
            </button>
            <button
              onClick={() => changeLanguage('ar')}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-[var(--surface)] transition-colors ${
                i18n.language === 'ar' ? 'bg-[var(--accent)] text-[var(--primary)] font-semibold' : ''
              }`}
            >
              العربية
            </button>
          </div>
        </>
      )}
    </div>
  )
}
