import { NavLink } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { Layers, Menu, X, Home, Package, Code, BookOpen, HelpCircle } from "lucide-react"
import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import LanguageSwitcher from "./LanguageSwitcher.tsx"
import ThemeToggle from "./ThemeToggle"
import { docsUrl } from "../lib/links"

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [logoBroken, setLogoBroken] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 0)
    h()
    window.addEventListener("scroll", h, { passive: true })
    return () => window.removeEventListener("scroll", h)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

  const links = [
    { to: "/", label: t("nav.home"), icon: Home },
    { to: "/product", label: t("nav.product"), icon: Package },
    { to: "/developers", label: t("nav.developers"), icon: Code },
    { to: docsUrl(i18n.language), label: t("nav.docs"), icon: BookOpen, external: true },
    { to: "/help", label: t("nav.help"), icon: HelpCircle },
  ]

  return (
    <>
      <header className={scrolled ? "navbar scrolled" : "navbar"}>
        <div className="navbar-inner">
          <NavLink to="/" className="brand">
            {logoBroken ? (
              <Layers className="brand-icon" />
            ) : (
              <img
                src="/Favicon.png"
                alt={t("brand.logoAlt")}
                className="brand-logo"
                onError={() => setLogoBroken(true)}
              />
            )}
          </NavLink>
          <nav className="desktop-nav">
            {links.map(link => (
              link.external ? (
                <a key={link.to} href={link.to} target="_blank" rel="noopener noreferrer">
                  {link.label}
                </a>
              ) : (
                <NavLink key={link.to} to={link.to} className={({ isActive }) => isActive ? "active" : undefined}>
                  {link.label}
                </NavLink>
              )
            ))}
          </nav>
          <div className="toolbar">
            <ThemeToggle />
            <LanguageSwitcher />
          </div>
          <button className="mobile-toggle" aria-label={t("nav.openMenu")} onClick={() => setMobileOpen(true)}>
            <Menu size={24} />
          </button>
        </div>
      </header>

      {mobileOpen && createPortal(
        <div className="mobile-menu-overlay">
          <div className="mobile-backdrop" onClick={() => setMobileOpen(false)} />
          <div className="mobile-drawer">
            <div className="mobile-drawer-header">
              <span className="mobile-brand-text">Menu</span>
              <button className="mobile-close-btn" onClick={() => setMobileOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <div className="mobile-links">
              {links.map(link => (
                link.external ? (
                  <a 
                    key={link.to} 
                    href={link.to} 
                    onClick={() => setMobileOpen(false)}
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <link.icon size={20} className="nav-icon" />
                    {link.label}
                  </a>
                ) : (
                  <NavLink 
                    key={link.to} 
                    to={link.to} 
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) => isActive ? "active" : undefined}
                  >
                    <link.icon size={20} className="nav-icon" />
                    {link.label}
                  </NavLink>
                )
              ))}
            </div>
            <div className="mobile-drawer-footer">
              <ThemeToggle />
              <LanguageSwitcher />
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
