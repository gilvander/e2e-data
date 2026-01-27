import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!wrapRef.current) return
      if (!wrapRef.current.contains(e.target as Node)) setOpen(false)
    }
    const onEsc = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false) }
    document.addEventListener("mousedown", onDoc)
    document.addEventListener("keydown", onEsc)
    return () => {
      document.removeEventListener("mousedown", onDoc)
      document.removeEventListener("keydown", onEsc)
    }
  }, [])

  const isPt = i18n.language.startsWith("pt")
  const isEn = !isPt

  return (
    <div ref={wrapRef} className="lang-wrap">
      <button
        className={`lang-control${open ? " open" : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-label={i18n.t("language.label")}
        aria-haspopup="true"
        aria-expanded={open}
      >
        <span className="i18n-icon" aria-hidden>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" fill="none" />
            <path d="M12 3a14 14 0 0 0 0 18" stroke="currentColor" strokeWidth="2" fill="none" />
            <path d="M12 3a14 14 0 0 1 0 18" stroke="currentColor" strokeWidth="2" fill="none" />
            <path d="M3 12h18" stroke="currentColor" strokeWidth="2" />
          </svg>
        </span>
        <span className="label">{isPt ? "PT" : "EN"}</span>
        <span className="caret">▾</span>
      </button>
      {open && (
        <div className="lang-menu" role="menu">
          <button role="menuitem" className={isEn ? "active" : undefined} onClick={() => { i18n.changeLanguage("en"); setOpen(false) }}>English</button>
          <button role="menuitem" className={isPt ? "active" : undefined} onClick={() => { i18n.changeLanguage("pt"); setOpen(false) }}>Português</button>
        </div>
      )}
    </div>
  )
}
