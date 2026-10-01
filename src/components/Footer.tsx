import { useTranslation } from "react-i18next"
import { DEMO_URL, docsUrl } from "../lib/links"

export default function Footer() {
  const { t, i18n } = useTranslation()
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
          <a href={docsUrl(i18n.language)}>{t("nav.docs")}</a>
          <span className="sep" />
          <a href="/help">{t("nav.help")}</a>
          <span className="sep" />
          <a href={DEMO_URL} target="_blank" rel="noreferrer">{t("common.demoUrlLabel")}</a>
        </div>
      </div>
    </footer>
  )
}
