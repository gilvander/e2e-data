import { motion } from "framer-motion"
import { Rocket, BookOpen, MessageSquare } from "lucide-react"
import { useTranslation } from "react-i18next"


export default function Home() {
  const { t } = useTranslation()

  return (
    <>
      <section className="hero">
        <motion.div className="hero-content" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <img src="/e2etext.png" alt={t("brand.logoAlt")} className="hero-brand" />
          <p className="lead">{t("home.lead")}</p>
          <p>{t("home.heroBody")}</p>
          <div className="actions">
            <a className="btn primary" href="/documentation">{t("home.ctaDocs")}</a>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.7 }} className="hero-illustration">
          <svg viewBox="0 0 600 140" className="hero-svg">
            <defs>
              <linearGradient id="g" x1="0" x2="1">
                <stop offset="0%" stopColor="#2b6cff" />
                <stop offset="100%" stopColor="#11c5e8" />
              </linearGradient>
            </defs>
            <polyline
              className="link"
              fill="none"
              stroke="url(#g)"
              strokeWidth="3"
              points="20,100 120,60 220,110 320,70 420,120 520,80"
            />
            <motion.circle className="dot hero-node" cx="20" cy="100" r="6" initial={{ scale: 1 }} animate={{ scale: [1, 1.25, 1] }} transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 0.3, delay: 0.0 }} />
            <motion.circle className="dot hero-node" cx="120" cy="60" r="6" initial={{ scale: 1 }} animate={{ scale: [1, 1.25, 1] }} transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 0.3, delay: 0.6 }} />
            <motion.circle className="dot hero-node" cx="220" cy="110" r="6" initial={{ scale: 1 }} animate={{ scale: [1, 1.25, 1] }} transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 0.3, delay: 1.2 }} />
            <motion.circle className="dot hero-node" cx="320" cy="70" r="6" initial={{ scale: 1 }} animate={{ scale: [1, 1.25, 1] }} transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 0.3, delay: 1.8 }} />
            <motion.circle className="dot hero-node" cx="420" cy="120" r="6" initial={{ scale: 1 }} animate={{ scale: [1, 1.25, 1] }} transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 0.3, delay: 2.4 }} />
            <motion.circle className="dot hero-node" cx="520" cy="80" r="6" initial={{ scale: 1 }} animate={{ scale: [1, 1.25, 1] }} transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 0.3, delay: 3.0 }} />
            <motion.text className="hero-label" x="20" y="118" textAnchor="middle" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.5 }}>{t("home.cycleLabels.collect")}</motion.text>
            <motion.text className="hero-label" x="120" y="42" textAnchor="middle" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.5 }}>{t("home.cycleLabels.transform")}</motion.text>
            <motion.text className="hero-label" x="220" y="92" textAnchor="middle" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.5 }}>{t("home.cycleLabels.validate")}</motion.text>
            <motion.text className="hero-label" x="320" y="52" textAnchor="middle" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0, duration: 0.5 }}>{t("home.cycleLabels.store")}</motion.text>
            <motion.text className="hero-label" x="420" y="138" textAnchor="middle" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.5 }}>{t("home.cycleLabels.visualize")}</motion.text>
            <motion.text className="hero-label" x="520" y="62" textAnchor="middle" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.5 }}>{t("home.cycleLabels.analyze")}</motion.text>
          </svg>
        </motion.div>
      </section>
      <section className="features">
        <div className="container">
          <motion.h2 className="section-title" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>{t("home.featuresTitle")}</motion.h2>
          <div className="grid">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
              <div className="card">
                <Rocket className="icon" />
                <h3>{t("home.features.e2eTitle")}</h3>
                <p>{t("home.features.e2eDesc")}</p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
              <div className="card">
                <BookOpen className="icon" />
                <h3>{t("home.features.docsTitle")}</h3>
                <p>{t("home.features.docsDesc")}</p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
              <div className="card">
                <MessageSquare className="icon" />
                <h3>{t("home.features.chatTitle")}</h3>
                <p>{t("home.features.chatDesc")}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="container architecture-section">
        <motion.h2 className="section-title" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>{t("home.architectureTitle")}</motion.h2>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="architecture-img-wrapper">
          <img src="/architecture.jpeg" alt={t("home.architectureAlt")} className="architecture-img" />
        </motion.div>
      </section>

      <section className="container cycle">
        <motion.h2 className="section-title" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>{t("home.cycleTitle")}</motion.h2>
        <div className="cycle-grid">
          <motion.div className="cycle-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0 }}>
            <div className="cycle-step">01</div>
            <h3>{t("home.cycleLabels.collect")}</h3>
            <p>{t("home.cycleDesc.collect")}</p>
          </motion.div>
          <motion.div className="cycle-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
            <div className="cycle-step">02</div>
            <h3>{t("home.cycleLabels.transform")}</h3>
            <p>{t("home.cycleDesc.transform")}</p>
          </motion.div>
          <motion.div className="cycle-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
            <div className="cycle-step">03</div>
            <h3>{t("home.cycleLabels.validate")}</h3>
            <p>{t("home.cycleDesc.validate")}</p>
          </motion.div>
          <motion.div className="cycle-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }}>
            <div className="cycle-step">04</div>
            <h3>{t("home.cycleLabels.store")}</h3>
            <p>{t("home.cycleDesc.store")}</p>
          </motion.div>
          <motion.div className="cycle-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.4 }}>
            <div className="cycle-step">05</div>
            <h3>{t("home.cycleLabels.visualize")}</h3>
            <p>{t("home.cycleDesc.visualize")}</p>
          </motion.div>
          <motion.div className="cycle-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.5 }}>
            <div className="cycle-step">06</div>
            <h3>{t("home.cycleLabels.analyze")}</h3>
            <p>{t("home.cycleDesc.analyze")}</p>
          </motion.div>
        </div>
        <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }}>
          {t("home.cycleOutro")}
        </motion.p>
      </section>
    </>
  )
}
