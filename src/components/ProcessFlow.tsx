export default function ProcessFlow({ steps: customSteps }: { steps?: string[] }) {
  const steps = customSteps && customSteps.length > 0
    ? customSteps
    : ["Collect", "Transform", "Validate", "Store", "Visualize", "Analyze"]
  return (
    <div className="flow">
      {steps.map((s, i) => (
        <div className="flow-step" key={s}>
          <div className="flow-node">{i + 1}</div>
          <div className="flow-label">{s}</div>
          {i < steps.length - 1 && <div className="flow-line" />}
        </div>
      ))}
    </div>
  )
}
