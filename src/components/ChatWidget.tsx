import { useEffect, useRef, useState } from "react"
import { MessageCircle, List } from "lucide-react"
import { useTranslation } from "react-i18next"
import type { ChatMessage } from "../services/chat"
import { createMessage, whatsappTransport, docTransport, discordTransport } from "../services/chat"

export default function ChatWidget() {
  const { t } = useTranslation()
  const mode = (import.meta.env.VITE_CHAT_MODE || "docs").toLowerCase()
  const transport = mode === "whatsapp" ? whatsappTransport : mode === "discord" ? discordTransport : docTransport
  const IDLE_MS = 90000
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [text, setText] = useState("")
  const [sending, setSending] = useState(false)
  const [showHint, setShowHint] = useState(true)
  const [lastQuestion, setLastQuestion] = useState("")
  const [greeted, setGreeted] = useState(false)
  const [showTopics, setShowTopics] = useState(false)
  const [ratings, setRatings] = useState<Record<string, "up" | "down" | null>>({})
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const onOpen = () => setOpen(true)
    document.addEventListener("e2e:openChat", onOpen as EventListener)
    return () => document.removeEventListener("e2e:openChat", onOpen as EventListener)
  }, [])

  useEffect(() => {
    if (!open && showHint) {
      const t = setTimeout(() => setShowHint(false), 8000)
      return () => clearTimeout(t)
    }
  }, [open, showHint])

  useEffect(() => {
    if (open && !greeted) {
      setMessages([createMessage("bot", t("chat.welcome"))])
      setGreeted(true)
    }
  }, [open, greeted, t])

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("e2e:chat:showTopics")
      if (saved === "1") setShowTopics(true)
    } catch (e) { void e }
  }, [])

  useEffect(() => {
    try { sessionStorage.setItem("e2e:chat:showTopics", showTopics ? "1" : "0") } catch (e) { void e }
  }, [showTopics])

  useEffect(() => {
    if (!open) {
      if (idleTimerRef.current) { clearTimeout(idleTimerRef.current); idleTimerRef.current = null }
      return
    }
    if (idleTimerRef.current) { clearTimeout(idleTimerRef.current); idleTimerRef.current = null }
    idleTimerRef.current = setTimeout(() => {
      if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null }
      setOpen(false)
      setMessages([])
      setLastQuestion("")
      setText("")
      setSending(false)
      setGreeted(false)
    }, IDLE_MS)
  }, [open, messages, text, showTopics, sending])

  async function send() {
    if (!text.trim() || sending) return
    const userMsg = createMessage("user", text.trim())
    setMessages((m) => [...m, userMsg])
    setLastQuestion(userMsg.text)
    setText("")
    setSending(true)
    try {
      const reply = await transport.send(userMsg.text)
      const botMsg = createMessage("bot", "")
      setMessages((m) => [...m, botMsg])
      let i = 0
      const step = 12
      const speed = 25
      timerRef.current = setInterval(() => {
        i += step
        const slice = reply.slice(0, i)
        setMessages((m) => m.map((msg) => msg.id === botMsg.id ? { ...msg, text: slice } : msg))
        if (i >= reply.length) {
          if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null }
          setSending(false)
        }
      }, speed)
    } catch {
      setMessages((m) => [...m, createMessage("bot", t("chat.errorSend"))])
      setSending(false)
    } finally {
      // sending é finalizado no término do streaming
    }
  }

  return (
    <div>
      {!open && showHint && (
        <div className="chat-hint">{t("chat.hint")}</div>
      )}
      {!open && (
        <button aria-label="chat" className="chat-toggle" onClick={() => { setOpen(true); setShowHint(false) }}>
          <MessageCircle size={16} />
        </button>
      )}
      {open && (
        <div className="chat-panel">
          <div className="chat-header">
            <img src="/e2etext.png" alt={t("brand.logoAlt")} className="chat-logo-text" />
            <div>
              <button
                className="chat-toggle-topics"
                aria-label={t(showTopics ? "chat.hideTopics" : "chat.showTopics")}
                onClick={() => setShowTopics((v) => !v)}
              ><List size={16} />&nbsp;{t(showTopics ? "chat.hideTopics" : "chat.showTopics")}</button>
              <button
                className="chat-close"
                aria-label={t("chat.close")}
                onClick={() => {
                  if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null }
                  setOpen(false)
                  setMessages([])
                  setLastQuestion("")
                  setText("")
                  setSending(false)
                  setGreeted(false)
                }}
              >×</button>
            </div>
          </div>
          <div className="chat-body">
          {messages.map((m) => {
            const isBot = m.role !== "user"
            const lines = m.text.split(/\n+/)
            const suggestsDiscord = isBot && /Discord/i.test(m.text)
            const linkLine = isBot ? lines.find((ln) => ln.startsWith("Link: ")) ?? null : null
            const firstLink = linkLine ? linkLine.slice(6).trim() : null
            return (
              <div key={m.id} className={isBot ? "msg bot" : "msg user"}>
                {isBot ? (
                  <>
                      {lines.map((ln, idx) => {
                        const linkMatch = ln.startsWith("Link: ") ? ln.slice(6).trim() : null
                        if (linkMatch) {
                          return (
                            <div key={idx}>
                              <a href={linkMatch} target="_blank" rel="noreferrer">{linkMatch}</a>
                            </div>
                          )
                        }
                        return <div key={idx}>{ln}</div>
                      })}
                      <div className="chat-actions">
                        <button className="chip" onClick={async () => {
                          try { await navigator.clipboard.writeText(m.text); setCopiedId(m.id); setTimeout(() => setCopiedId(null), 1500) } catch (e) { void e }
                        }}>{copiedId === m.id ? t("chat.copied") : t("chat.copy")}</button>
                        <button className="chip" onClick={() => setRatings((r) => ({ ...r, [m.id]: "up" }))} disabled={ratings[m.id] === "up"}>{t("chat.useful")}</button>
                        <button className="chip" onClick={() => setRatings((r) => ({ ...r, [m.id]: "down" }))} disabled={ratings[m.id] === "down"}>{t("chat.notUseful")}</button>
                      </div>
                      <div className="chat-suggestions" style={{ marginTop: 6 }}>
                        {((t("chat.followUps", { returnObjects: true }) as Array<{ label: string; action: string }>)).filter((f) => f.action !== "openDoc" || !!firstLink).map((f) => (
                          <button className="chip" key={f.label} disabled={sending} onClick={() => {
                            if (f.action === "openDoc" && firstLink) { window.open(firstLink, "_blank"); return }
                            setText(`${lastQuestion} — ${f.label}`)
                            setTimeout(() => send(), 0)
                          }}>{f.label}</button>
                        ))}
                      </div>
                      {suggestsDiscord && (
                        <div className="cta">
                          <button disabled={sending} onClick={async () => {
                            setSending(true)
                            try {
                              const r = await discordTransport.send(lastQuestion || "")
                              setMessages((m) => [...m, createMessage("bot", r)])
                            } catch {
                              setMessages((m) => [...m, createMessage("bot", t("chat.errorSend"))])
                            } finally {
                              setSending(false)
                            }
                          }}>{t("chat.sendToDiscord")}</button>
                        </div>
                      )}
                    </>
                  ) : (
                    <div>{m.text}</div>
                  )}
                </div>
              )
            })}
            {sending && (
              <div className="msg bot">{t("chat.typing")}</div>
            )}
          </div>
          {showTopics && (
            <div className="chat-suggestions">
              {(t("chat.suggestions", { returnObjects: true }) as string[]).map((s) => (
                <button className="chip" key={s} disabled={sending} onClick={() => { setText(s); setTimeout(() => send(), 0) }}>{s}</button>
              ))}
            </div>
          )}
          <div className="chat-input">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={t("chat.placeholder")}
              onKeyDown={(e) => {
                if (e.key === "Enter") send()
                if (e.key === "Tab") {
                  e.preventDefault()
                  const list = (t("chat.suggestions", { returnObjects: true }) as string[])
                  const val = text.trim().toLowerCase()
                  const match = list.find((s) => s.toLowerCase().startsWith(val) && s.length > val.length)
                  if (match) setText(match)
                }
              }}
            />
            <button onClick={send} disabled={sending}>{sending ? t("chat.sending") : t("chat.send")}</button>
          </div>
        </div>
      )}
    </div>
  )
}
