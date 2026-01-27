export type ChatMessage = { id: string; role: "user" | "bot"; text: string; time: number }

export type ChatTransport = {
  send: (text: string) => Promise<string>
}

function uuid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

export const mockTransport: ChatTransport = {
  async send(text: string) {
    await new Promise((r) => setTimeout(r, 500))
    return `Recebido: ${text}`
  },
}

export const whatsappTransport: ChatTransport = {
  async send(text: string) {
    const res = await fetch("/api/chat/whatsapp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    })
    if (!res.ok) throw new Error("Failed to send")
    const data = await res.json().catch(() => ({}))
    return typeof data.reply === "string" ? data.reply : "Mensagem enviada"
  },
}

export function createMessage(role: "user" | "bot", text: string): ChatMessage {
  return { id: uuid(), role, text, time: Date.now() }
}

type DocIndexItem = { title: string; location: string; text: string }
let cachedPt: DocIndexItem[] | null = null
let cachedEn: DocIndexItem[] | null = null

async function loadDocIndex(lang: string): Promise<{ items: DocIndexItem[]; base: string }> {
  const paths = lang.startsWith("pt")
    ? ["/site/pt/search/search_index.json", "/site/search/search_index.json", "/docs/search/search_index.json"]
    : ["/site/en/search/search_index.json", "/site/search/search_index.json", "/docs/search/search_index.json"]
  for (const p of paths) {
    try {
      const res = await fetch(p)
      if (!res.ok) continue
      const data = await res.json()
      const items = Array.isArray(data.docs) ? data.docs as DocIndexItem[] : []
      const base = p.replace(/search\/search_index\.json$/, "")
      return { items, base }
    } catch { continue }
  }
  return { items: [], base: "/docs/" }
}

function score(text: string, query: string): number {
  const q = query.toLowerCase().split(/\s+/).filter(Boolean)
  const t = text.toLowerCase()
  let s = 0
  for (const w of q) {
    const m = t.split(w).length - 1
    s += m
  }
  return s
}

function normalizeQuery(query: string, lang: string): string {
  if (lang.startsWith("pt")) {
    const map: Record<string, string> = {
      "conectores": "connectors",
      "conector": "connector",
      "transformações": "transformations",
      "transformacao": "transformation",
      "armazenamento": "storage",
      "instalação": "installation",
      "instalacao": "installation",
      "orquestração": "orchestration",
      "orquestracao": "orchestration",
      "monitorização": "monitoring",
      "monitorizacao": "monitoring",
      "fontes de dados": "data sources",
      "dados": "data",
      "transparência": "transparency",
      "transparencia": "transparency",
      "logs": "logs",
      "pipeline": "pipeline",
      "pipelines": "pipelines",
      "duckdb": "duckdb",
      "api": "api",
      "agente": "agent",
      "ai": "ai",
    }
    let q = query.toLowerCase()
    for (const [pt, en] of Object.entries(map)) {
      q = q.replace(new RegExp(pt, "g"), en)
    }
    return q
  }
  return query
}

function makeReply(results: Array<{ item: DocIndexItem; score: number }>, base: string): string {
  if (!results.length || results[0].score < 1) {
    return i18n.t("chat.fallbackNoAnswer")
  }
  const top = results.slice(0, 2)
  const parts = top.map(({ item }) => {
    const url = `${base}${item.location}`
    const steps = extractSteps(item.text)
    if (steps.length) {
      const limited = steps.slice(0, 3)
      const list = limited.map((s, i) => `${i + 1}) ${s}`).join("\n")
      return `• ${item.title}\n${i18n.t("chat.stepsIntro")}\n${list}\nLink: ${url}`
    }
    const pre = extractInstructionalText(item.text)
    const snippet = pre.length > 360 ? `${pre.slice(0, 357)}...` : pre
    return `• ${item.title}\n${snippet}\nLink: ${url}`
  })
  const intro = i18n.t("chat.replyIntro")
  return `${intro}\n\n${parts.join("\n\n")}`
}

export const docTransport: ChatTransport = {
  async send(text: string) {
    const lang = (i18n.language || "pt").toLowerCase()
    const cache = lang.startsWith("pt") ? cachedPt : cachedEn
    let items = cache
    let base = lang.startsWith("pt") ? "/site/pt/search/" : "/site/en/search/"
    if (!items) {
      const loaded = await loadDocIndex(lang)
      items = loaded.items
      base = loaded.base
      if (lang.startsWith("pt")) cachedPt = items
      else cachedEn = items
    }
    const q = normalizeQuery(text, lang)
    const ranked = items
      .map((it) => ({ item: it, score: score(`${it.title} ${it.text}`, q) }))
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
    return makeReply(ranked, base)
  },
}

function extractInstructionalText(raw: string): string {
  const t = raw.replace(/\s+/g, " ").trim()
  const parts = t.split(/(?<=[.!?])\s+/)
  const filtered = parts.filter((p) => {
    const s = p.toLowerCase()
    if (!s || s.length < 40) return false
    if (/```|<code>|<pre>|SELECT\s|INSERT\s|UPDATE\s|DELETE\s|CREATE\s|FROM\s|curl\s|npm\s|pip\s|\$\s|GET\s\/|POST\s\/|PUT\s\/|DELETE\s\//i.test(s)) return false
    return true
  })
  if (filtered.length) return filtered.slice(0, 2).join(" ")
  return parts.slice(0, 2).join(" ") || raw
}

function extractSteps(raw: string): string[] {
  const liMatches = Array.from(raw.matchAll(/<li[^>]*>(.*?)<\/li>/gi)).map((m) => clean(m[1]))
  if (liMatches.length) return liMatches
  const lines = raw.split(/\n+/).map((l) => clean(l)).filter(Boolean)
  const numbered = lines.filter((l) => /^\s*(\d+\.|\d+\))\s+/.test(l)).map((l) => l.replace(/^\s*(\d+\.|\d+\))\s+/, ""))
  if (numbered.length) return numbered
  return []
}

function clean(s: string): string {
  return s.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()
}

export const discordTransport: ChatTransport = {
  async send(text: string) {
    const url = import.meta.env.VITE_DISCORD_WEBHOOK_URL
    if (!url) return i18n.t("chat.discordNotConfigured")
    const payload = { content: text.slice(0, 1800) }
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error("Failed to send")
    return i18n.t("chat.discordSent")
  },
}
import i18n from "../i18n"
