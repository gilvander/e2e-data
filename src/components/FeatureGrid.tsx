type Item = { title: string; desc: string; icon?: string }

export default function FeatureGrid({ items }: { items: Item[] }) {
  return (
    <div className="grid">
      {items.map((it, i) => (
        <div className="card" key={i}>
          <div className="icon">{it.icon || "•"}</div>
          <h3>{it.title}</h3>
          <p>{it.desc}</p>
        </div>
      ))}
    </div>
  )
}
