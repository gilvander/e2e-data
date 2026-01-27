import { useTranslation } from "react-i18next"
import { Twitter, Youtube, Linkedin } from "lucide-react"

export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="footer-top">
        <p>
          {t("footer.top")}
        </p>
      </div>
      <div className="footer-legal">
        <div className="legal-left">{t("footer.rights", { year })}</div>
        <div className="legal-links">
          <a href="/documentation">{t("nav.docs")}</a>
          <span className="sep" />
          <a href="/help">{t("nav.help")}</a>
          <span className="sep" />
          <a href="https://twitter.com" aria-label="Twitter"><Twitter size={16} /></a>
          <a href="https://youtube.com" aria-label="YouTube" style={{ marginLeft: 8 }}><Youtube size={16} /></a>
          <a href="https://www.linkedin.com" aria-label="LinkedIn" style={{ marginLeft: 8 }}><Linkedin size={16} /></a>
        </div>
      </div>
    </footer>
  )
}
