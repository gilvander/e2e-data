import { motion } from "framer-motion"
import { Code2, BookOpen, Play, Users, Github, ArrowRight } from "lucide-react"
import { useTranslation } from "react-i18next"
import { DEMO_URL, DISCORD_URL, OPEN_SOURCE_URL, docsUrl } from "../lib/links"
import "./Developers.css"

export default function Developers() {
  const { t, i18n } = useTranslation()

  const sections = [
    { key: "docs", icon: BookOpen, link: docsUrl(i18n.language) },
    { key: "demo", icon: Play, link: DEMO_URL },
    { key: "community", icon: Users, link: DISCORD_URL },
    { key: "opensource", icon: Github, link: OPEN_SOURCE_URL },
  ]

  return (
    <div className="developers-page">
      <section className="container dev-hero">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <Code2 className="brand-icon" />
          <h1>{t("developers.title")}</h1>
          <p className="lead">{t("developers.lead")}</p>
        </motion.div>
      </section>

      <section className="container">
        <div className="dev-grid">
          {sections.map((section, idx) => (
            <motion.div
              key={section.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div className="dev-card">
                <div className="dev-card-icon">
                  <section.icon />
                </div>
                <h3>{t(`developers.sections.${section.key}.title`)}</h3>
                <p>{t(`developers.sections.${section.key}.desc`)}</p>
                <a href={section.link} className="card-link" target={section.link.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                  {t(`developers.sections.${section.key}.cta`)} <ArrowRight size={16} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
