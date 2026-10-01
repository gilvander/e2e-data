import { motion } from "framer-motion"
import { Rocket, Code2, Bot, Library, BarChart3, ShieldCheck, Lock, Plug, HardDrive, Server } from "lucide-react"
import { useTranslation } from "react-i18next"
import PipelinePreview from "../components/PipelinePreview"
import ArchitectureDiagram from "../components/ArchitectureDiagram"
import { DEMO_URL, docsUrl } from "../lib/links"

export default function Home() {
  const { t, i18n } = useTranslation()
  const docs = docsUrl(i18n.language)
  const reveal = { initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.45 } }

  const features = [
    { icon: Rocket, k: "e2e" },
    { icon: Code2, k: "docs" },
    { icon: Bot, k: "chat" },
    { icon: Library, k: "catalog" },
    { icon: BarChart3, k: "bi" },
    { icon: ShieldCheck, k: "secure" },
  ]
  const serious = [
    { icon: Lock, k: "security" },
    { icon: Plug, k: "connectors" },
    { icon: HardDrive, k: "destinations" },
    { icon: Server, k: "deploy" },
  ]
  const cycle = ["collect", "transform", "validate", "store", "visualize", "analyze"]

  return (
    <>
      <section className="hero">
        <motion.div className="hero-content" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <img src="/e2etext.png" alt={t("brand.logoAlt")} className="hero-brand" />
          <p className="lead">{t("home.lead")}</p>
          <p>{t("home.heroBody")}</p>
          <div className="actions">
            <a className="btn primary" href={DEMO_URL} target="_blank" rel="noreferrer">{t("home.ctaDemo")}</a>
            <a className="btn ghost" href={docs}>{t("home.ctaDocs")}</a>
          </div>
          <ul className="trust">
            {(t("home.trust", { returnObjects: true }) as string[]).map((it) => <li key={it}>{it}</li>)}
          </ul>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.7 }} className="hero-preview">
          <PipelinePreview />
        </motion.div>
      </section>

      <section className="features">
        <div className="container">
          <motion.h2 className="section-title" {...reveal}>{t("home.featuresTitle")}</motion.h2>
          <div className="grid grid-3">
            {features.map(({ icon: Icon, k }, i) => (
              <motion.div key={k} {...reveal} transition={{ duration: 0.4, delay: i * 0.05 }}>
                <div className="card">
                  <Icon className="icon" />
                  <h3>{t(`home.features.${k}Title`)}</h3>
                  <p>{t(`home.features.${k}Desc`)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="container serious">
        <motion.h2 className="section-title" {...reveal}>{t("home.seriousTitle")}</motion.h2>
        <div className="serious-grid">
          {serious.map(({ icon: Icon, k }, i) => (
            <motion.div className="serious-col" key={k} {...reveal} transition={{ duration: 0.4, delay: i * 0.06 }}>
              <h3><Icon size={18} /> {t(`home.serious.${k}Title`)}</h3>
              <ul>
                {(t(`home.serious.${k}Items`, { returnObjects: true }) as string[]).map((it) => <li key={it}>{it}</li>)}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="container architecture-section">
        <motion.h2 className="section-title" {...reveal}>{t("home.architectureTitle")}</motion.h2>
        <motion.figure {...reveal} className="architecture-figure">
          <ArchitectureDiagram />
          <figcaption>{t("home.architectureCaption")}</figcaption>
        </motion.figure>
      </section>

      <section className="container cycle">
        <motion.h2 className="section-title" {...reveal}>{t("home.cycleTitle")}</motion.h2>
        <div className="cycle-grid">
          {cycle.map((k, i) => (
            <motion.div className="cycle-card" key={k} {...reveal} transition={{ duration: 0.4, delay: i * 0.06 }}>
              <div className="cycle-step">{String(i + 1).padStart(2, "0")}</div>
              <h3>{t(`home.cycleLabels.${k}`)}</h3>
              <p>{t(`home.cycleDesc.${k}`)}</p>
            </motion.div>
          ))}
        </div>
        <motion.p className="cycle-outro" {...reveal}>{t("home.cycleOutro")}</motion.p>
      </section>

      <section className="container final-cta">
        <motion.div className="final-cta-box" {...reveal}>
          <h2>{t("home.finalTitle")}</h2>
          <p>{t("home.finalBody")}</p>
          <div className="actions">
            <a className="btn primary" href={DEMO_URL} target="_blank" rel="noreferrer">{t("home.ctaDemo")}</a>
            <a className="btn ghost" href={docs}>{t("home.ctaDocs")}</a>
          </div>
        </motion.div>
      </section>
    </>
  )
}
