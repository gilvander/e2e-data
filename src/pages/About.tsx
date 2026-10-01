import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { GitBranch, Globe, Wrench, Library, Bot, ShieldCheck, FileText, Eye, History, Users, BarChart3, FlaskConical, Rocket, Check, Clock } from "lucide-react"
import { useTranslation } from "react-i18next"
import "./About.css"

export default function About() {
  const { t } = useTranslation()
  const [active, setActive] = useState("plataforma")
  useEffect(() => {
    const ids = ["plataforma", "transparencia", "publico", "roadmap"]
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && (e.target as HTMLElement).id) {
            setActive((e.target as HTMLElement).id)
          }
        })
      },
      { rootMargin: "0px 0px -60% 0px", threshold: 0.2 }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])
  return (
    <div className="about">
      <section className="container about-hero modern">
        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1>{t("product.title")}</h1>
          <p className="lead">{t("product.lead")}</p>
          <p>{t("product.body1")}</p>
          <p><strong>{t("product.body2")}</strong></p>
        </motion.div>
        <div className="anchor-nav">
          <a className={`pill${active === "plataforma" ? " active" : ""}`} href="#plataforma">{t("product.pills.platform")}</a>
          <a className={`pill${active === "transparencia" ? " active" : ""}`} href="#transparencia">{t("product.pills.transparency")}</a>
          <a className={`pill${active === "publico" ? " active" : ""}`} href="#publico">{t("product.pills.audience")}</a>
          <a className={`pill${active === "roadmap" ? " active" : ""}`} href="#roadmap">{t("product.pills.roadmap")}</a>
        </div>
      </section>

      

      <section id="plataforma" className="container about-section">
        <motion.h2 className="section-title" initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>{t("product.platformTitle")}</motion.h2>
        <div className="grid">
          <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <div className="card">
              <div className="icon"><GitBranch /></div>
              <h3>{t("product.platform.pipelinesVisualTitle")}</h3>
              <p>{t("product.platform.pipelinesVisualDesc")}</p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.05 }}>
            <div className="card">
              <div className="icon"><Globe /></div>
              <h3>{t("product.platform.supportMultipleTitle")}</h3>
              <ul>
                {(t("product.platform.supportMultipleItems", { returnObjects: true }) as string[]).map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.1 }}>
            <div className="card">
              <div className="icon"><Wrench /></div>
              <h3>{t("product.platform.transformIntelligentTitle")}</h3>
              <ul>
                {(t("product.platform.transformIntelligentItems", { returnObjects: true }) as string[]).map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.15 }}>
            <div className="card">
              <div className="icon"><Library /></div>
              <h3>{t("product.platform.catalogTitle")}</h3>
              <ul>
                {(t("product.platform.catalogItems", { returnObjects: true }) as string[]).map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.2 }}>
            <div className="card">
              <div className="icon"><Bot /></div>
              <h3>{t("product.platform.intelligenceAssistiveTitle")}</h3>
              <p>{t("product.platform.intelligenceAssistiveIntro")}</p>
              <ul>
                {(t("product.platform.intelligenceAssistiveItems", { returnObjects: true }) as string[]).map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.25 }}>
            <div className="card">
              <div className="icon"><ShieldCheck /></div>
              <h3>{t("product.platform.secureTitle")}</h3>
              <ul>
                {(t("product.platform.secureItems", { returnObjects: true }) as string[]).map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="transparencia" className="container about-section">
        <motion.h2 className="section-title" initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>{t("product.transparencyTitle")}</motion.h2>
        <div className="grid">
          {(() => {
            const items = t("product.transparencyItems", { returnObjects: true }) as { title: string; desc: string }[]
            const icons = [FileText, Eye, History, GitBranch]
            return items.map((it, idx) => {
              const Icon = icons[idx % icons.length]
              return (
                <motion.div key={it.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: idx * 0.05 }}>
                  <div className="card">
                    <div className="icon"><Icon /></div>
                    <h3>{it.title}</h3>
                    <p>{it.desc}</p>
                  </div>
                </motion.div>
              )
            })
          })()}
        </div>
      </section>

      <section id="publico" className="container about-section">
        <motion.h2 className="section-title" initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>{t("product.audienceTitle")}</motion.h2>
        <motion.ul className="audience-list" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.4 }}>
          {(() => {
            const items = t("product.audienceItems", { returnObjects: true }) as string[]
            const icons = [Users, BarChart3, FlaskConical, Rocket]
            return items.map((it, idx) => {
              const Icon = icons[idx % icons.length]
              return (
                <motion.li key={it} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: idx * 0.05 }}>
                  <Icon className="icon" />
                  {it}
                </motion.li>
              )
            })
          })()}
        </motion.ul>
        <p>{t("product.closing")}</p>
      </section>
          <section id="roadmap" className="container about-section">
        <motion.h2 className="section-title" initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>{t("product.roadmapTitle")}</motion.h2>
        <p className="roadmap-intro">{t("product.roadmapIntro")}</p>
        <div className="roadmap-grid">
          <div className="roadmap-col now">
            <h3><Check size={18} /> {t("product.roadmapNow")}</h3>
            <ul>
              {(t("product.roadmapNowItems", { returnObjects: true }) as string[]).map((it) => <li key={it}>{it}</li>)}
            </ul>
          </div>
          <div className="roadmap-col next">
            <h3><Clock size={18} /> {t("product.roadmapNext")}</h3>
            <ul>
              {(t("product.roadmapNextItems", { returnObjects: true }) as string[]).map((it) => <li key={it}>{it}</li>)}
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
