import { useEffect, useLayoutEffect, useRef } from "react"
import { useTranslation } from "react-i18next"

export default function Docs() {
  const { i18n } = useTranslation()
  const isPt = i18n.language.startsWith("pt")
  const src = isPt ? "/site/pt/index.html" : "/site/en/index.html"
  const ref = useRef<HTMLIFrameElement | null>(null)

  useLayoutEffect(() => {
    const resize = () => {
      const header = document.querySelector(".navbar") as HTMLElement | null
      const footer = document.querySelector(".footer") as HTMLElement | null
      const h = window.innerHeight - (header?.offsetHeight || 0) - (footer?.offsetHeight || 0)
      if (ref.current) ref.current.style.height = `${Math.max(320, h)}px`
    }
    resize()
    window.addEventListener("resize", resize)
    return () => window.removeEventListener("resize", resize)
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onLoad = () => {
      // Styles are now handled by theme-overrides.css and theme-sync.js
    }
    el.addEventListener("load", onLoad)
    return () => el.removeEventListener("load", onLoad)
  }, [src])

  return (
    <section>
      <iframe ref={ref} className="docs-iframe" src={src} title={isPt ? "Documentação" : "Documentation"} />
    </section>
  )
}
