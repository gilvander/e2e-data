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
let cachedAll: DocIndexItem[] | null = null

/** Pages that are part of the documentation menu (see mkdocs.yml). Leftover draft pages are not searched. */
const DOC_PAGES = new Set([
  "index", "getting-started", "workspace", "connections", "source-integration", "pipelines", "transformations", "data-catalog",
  "analytics", "scheduling", "versioning", "editor", "monitoring", "architecture", "installation", "ai-agent", "final",
])

function isNavPage(location: string, lang: string): boolean {
  const [path] = location.split("#")
  const m = path.match(new RegExp(`^${lang}/(?:([a-z-]+)/)?$`))
  if (!m) return false
  return m[1] === undefined ? true : DOC_PAGES.has(m[1])
}

function decode(s: string): string {
  return s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'")
}

const STOP = new Set([
  "de", "da", "do", "das", "dos", "a", "o", "as", "os", "um", "uma", "e", "em", "no", "na", "nos", "nas", "para", "por", "com", "que", "como", "se", "ao", "ou", "me", "te", "eu", "tu",
  "the", "of", "to", "in", "on", "and", "or", "is", "are", "for", "with", "how", "do", "does", "can", "i", "my", "an", "it", "what",
])

/** Lowercase and strip accents so "configuração" matches "configuracao". */
function fold(s: string): string {
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

function tokens(query: string): string[] {
  return fold(query).split(/[^a-z0-9]+/).filter((w) => w.length > 1 && !STOP.has(w))
}

async function loadDocIndex(): Promise<DocIndexItem[]> {
  if (cachedAll) return cachedAll
  const paths = ["/docs/search/search_index.json", "/site/search/search_index.json"]
  for (const p of paths) {
    try {
      const res = await fetch(p)
      if (!res.ok) continue
      const data = await res.json()
      cachedAll = Array.isArray(data.docs) ? (data.docs as DocIndexItem[]) : []
      return cachedAll
    } catch { continue }
  }
  return []
}

/** Rank one index entry: title hits weigh more, repeated body hits are capped, coverage of all words matters. */
function scoreItem(item: DocIndexItem, words: string[]): number {
  if (!words.length) return 0
  const title = fold(item.title)
  const text = fold(clean(item.text))
  let total = 0
  let matched = 0
  for (const w of words) {
    let hit = false
    if (title.includes(w)) { total += 6; hit = true }
    const n = text.split(w).length - 1
    if (n > 0) { total += Math.min(n, 5); hit = true }
    if (hit) matched += 1
  }
  if (!matched) return 0
  total *= matched / words.length
  if (!item.location.includes("#")) total *= 1.3 // whole-page entries are better entry points
  return total
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
      return `• ${decode(item.title)}\n${i18n.t("chat.stepsIntro")}\n${decode(list)}\nLink: ${url}`
    }
    const pre = extractInstructionalText(item.text)
    const snippet = pre.length > 360 ? `${pre.slice(0, 357)}...` : pre
    return `• ${decode(item.title)}\n${decode(snippet)}\nLink: ${url}`
  })
  const intro = i18n.t("chat.replyIntro")
  return `${intro}\n\n${parts.join("\n\n")}`
}

export const docTransport: ChatTransport = {
  async send(text: string) {
    const lang = (i18n.language || "pt").toLowerCase().startsWith("pt") ? "pt" : "en"
    // Only search pages in the visitor's language; ignore leftover pages outside en/ and pt/.
    const items = (await loadDocIndex()).filter((it) => isNavPage(it.location, lang))
    const words = tokens(text)
    const ranked = items
      .map((item) => ({ item, score: scoreItem(item, words) }))
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
    // Keep one result per page so the two answers are different pages.
    const seen = new Set<string>()
    const distinct = ranked.filter((r) => {
      const page = r.item.location.split("#")[0]
      if (seen.has(page)) return false
      seen.add(page)
      return true
    })
    return makeReply(distinct, "/docs/")
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
