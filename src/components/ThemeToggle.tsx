import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

function getInitialTheme() {
  const saved = localStorage.getItem("theme")
  if (saved === "light" || saved === "dark") return saved
  return "dark"
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(getInitialTheme())
  const { t } = useTranslation()

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
    localStorage.setItem("theme", theme)
  }, [theme])

  const toggle = () => setTheme((t) => (t === "light" ? "dark" : "light"))

  return (
    <button
      className={`theme-toggle ${theme}`}
      onClick={toggle}
      aria-label={t("theme.label")}
      role="switch"
      aria-checked={theme === "dark"}
    >
      <span className="icon" aria-hidden>
        {theme === "light" ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="5" fill="currentColor" />
            <path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.4 1.4M17.6 17.6L19 19M5 19l1.4-1.4M17.6 6.4L19 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 12.8A9 9 0 0 1 11.2 3a8 8 0 1 0 9.8 9.8Z" fill="currentColor" />
          </svg>
        )}
      </span>
      <span className="thumb" />
    </button>
  )
}
