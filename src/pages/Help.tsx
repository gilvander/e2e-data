import { motion } from "framer-motion"
import { HelpCircle } from "lucide-react"
import { useTranslation, Trans } from "react-i18next"

export default function Help() {
  const { t } = useTranslation()

  return (
    <>
      <section className="container help-hero modern">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <HelpCircle className="brand-icon" />
          <h1>{t("help.title")}</h1>
          <p className="lead">{t("help.lead")}</p>
        </motion.div>
      </section>

      <section className="container help-section">
        <div className="qa-grid">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="qa-card">
              <h3>{t("help.cards.faq.title")}</h3>
              <ul className="bullets">
                {(t("help.cards.faq.items", { returnObjects: true }) as Array<{ q: string; a: string }>).map((item, i) => (
                  <li key={i}>
                    <strong>{item.q}</strong> {item.a}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <div className="qa-card">
              <h3>{t("help.cards.pipeline.title")}</h3>
              <ol className="steps">
                {(t("help.cards.pipeline.steps", { returnObjects: true }) as string[]).map((_, i) => (
                  <li key={i}>
                    <Trans i18nKey={`help.cards.pipeline.steps.${i}`} components={{ 1: <strong /> }} />
                  </li>
                ))}
              </ol>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <div className="qa-card">
              <h3>{t("help.cards.env.title")}</h3>
              <ol className="steps">
                {(t("help.cards.env.steps", { returnObjects: true }) as string[]).map((_, i) => (
                  <li key={i}>
                    <Trans i18nKey={`help.cards.env.steps.${i}`} components={{ 1: <strong />, 3: <strong /> }} />
                  </li>
                ))}
              </ol>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
