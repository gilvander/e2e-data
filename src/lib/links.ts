export const DEMO_URL = "https://mvp2.e2e-data.com/"
export const DISCORD_URL = "https://discord.gg/e2edata"
/** Original project link from the previous Developers page. */
export const OPEN_SOURCE_URL = "https://github.com/e2e-data"

/** Documentation lives under /docs/<lang>/ (MkDocs). Unknown languages fall back to English. */
export function docsUrl(lang?: string): string {
  return `/docs/${lang && lang.toLowerCase().startsWith("pt") ? "pt" : "en"}/`
}
