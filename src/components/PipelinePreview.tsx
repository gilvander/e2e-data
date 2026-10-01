import { useEffect, useState } from "react"
import { Play, FileSpreadsheet, Wand2, Database, Check } from "lucide-react"
import { useTranslation } from "react-i18next"

const NODES = [
  { key: "start", label: "Start", sub: "", icon: Play },
  { key: "source", label: "Source Bucket", sub: "sales_2025.csv", icon: FileSpreadsheet },
  { key: "transform", label: "Transformation", sub: "3 steps", icon: Wand2 },
  { key: "output", label: "DuckDB Output", sub: "sales.orders", icon: Database },
]

const LOG = [
  "[INFO] Files/Bucket loaded successfully",
  "[INFO] Transformation #1 process completed",
  "[INFO] Loading data into DuckDB",
  "PIPELINE COMPLETED SUCCESSFULLY",
]

/** Illustrative mock of the pipeline canvas: nodes turn green one by one, like a real run. */
export default function PipelinePreview() {
  const { t } = useTranslation()
  const [step, setStep] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s >= NODES.length + 2 ? 0 : s + 1)), 1100)
    return () => clearInterval(id)
  }, [])

  return (
    <figure className="pp" aria-label={t("home.previewTitle")}>
      <div className="pp-window">
        <div className="pp-bar">
          <span className="pp-dots"><i /><i /><i /></span>
          <span className="pp-title">Pipeline: sales_to_duckdb</span>
          <span className="pp-run">Run &amp; Save</span>
        </div>
        <div className="pp-canvas">
          {NODES.map((n, i) => {
            const done = step > i
            const running = step === i && !done
            const Icon = n.icon
            return (
              <div className="pp-item" key={n.key}>
                <div className={`pp-node${done ? " done" : ""}${running ? " running" : ""}`}>
                  <span className="pp-node-icon"><Icon size={18} /></span>
                  <span className="pp-node-text">
                    <strong>{n.label}</strong>
                    {n.sub && <small>{n.sub}</small>}
                  </span>
                  <span className="pp-status">{done && <Check size={14} />}</span>
                </div>
                {i < NODES.length - 1 && <span className={`pp-link${step > i ? " on" : ""}`} />}
              </div>
            )
          })}
        </div>
        <div className="pp-log" aria-hidden="true">
          {LOG.slice(0, Math.max(0, Math.min(step - 1, LOG.length))).map((l) => (
            <div key={l} className={l.startsWith("PIPELINE") ? "ok" : undefined}>{l}</div>
          ))}
        </div>
      </div>
      <figcaption>{t("home.previewCaption")}</figcaption>
    </figure>
  )
}
