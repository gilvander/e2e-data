import { useEffect, useState } from "react"
import { Database, Workflow, ScrollText, Bot, Search, KeyRound, Cloud } from "lucide-react"
import { useTranslation } from "react-i18next"

type Tech = "dlthub" | "polars" | "duckdb" | "pandas" | "llms"
type Third = "vault" | "groq"

const UI_ICONS = [Database, Workflow, ScrollText, Bot, Search]
const TECH: { key: Tech; label: string }[] = [
  { key: "dlthub", label: "dltHub" },
  { key: "polars", label: "Polars" },
  { key: "duckdb", label: "DuckDB" },
  { key: "pandas", label: "pandas" },
  { key: "llms", label: "LLMs" },
]

/** Which parts of the engine and third parties each UI capability touches (illustrative). */
const FLOWS: { eng: Tech[]; third: Third[] }[] = [
  { eng: ["dlthub", "polars"], third: ["vault"] },
  { eng: ["dlthub"], third: ["vault"] },
  { eng: ["duckdb"], third: [] },
  { eng: ["llms"], third: ["groq"] },
  { eng: ["duckdb", "pandas"], third: [] },
]

/** Animated version of the architecture overview: the highlighted path moves through the stack. */
export default function ArchitectureDiagram() {
  const { t } = useTranslation()
  const [active, setActive] = useState(0)

  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    if (reduce) return
    const id = setInterval(() => setActive((a) => (a + 1) % FLOWS.length), 1800)
    return () => clearInterval(id)
  }, [])

  const flow = FLOWS[active]
  const uiItems = t("home.arch.uiItems", { returnObjects: true }) as string[]

  return (
    <div className="arch" role="img" aria-label={t("home.architectureAlt")}>
      <div className="arch-col arch-ui">
        <h3>{t("home.arch.uiTitle")}</h3>
        <ul>
          {uiItems.map((label, i) => {
            const Icon = UI_ICONS[i]
            return (
              <li key={label} className={i === active ? "on" : undefined}>
                <Icon size={16} /> <span>{label}</span>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="arch-link on" aria-hidden="true"><i /></div>

      <div className="arch-col arch-engine">
        <h3>{t("home.arch.engineTitle")}</h3>
        <div className="arch-tech">
          {TECH.map((x) => (
            <span key={x.key} className={flow.eng.includes(x.key) ? "on" : undefined}>{x.label}</span>
          ))}
        </div>
      </div>

      <div className={`arch-link${flow.third.length ? " on" : ""}`} aria-hidden="true"><i /></div>

      <div className="arch-col arch-third">
        <h3>{t("home.arch.thirdTitle")}</h3>
        <div className={`arch-ext${flow.third.includes("vault") ? " on" : ""}`}>
          <KeyRound size={18} />
          <span><strong>HashiCorp Vault</strong><small>{t("home.arch.vaultDesc")}</small></span>
        </div>
        <div className={`arch-ext${flow.third.includes("groq") ? " on" : ""}`}>
          <Cloud size={18} />
          <span><strong>Groq</strong><small>{t("home.arch.groqDesc")}</small></span>
        </div>
      </div>
      <p className="arch-note">{t("home.arch.note")}</p>
    </div>
  )
}
