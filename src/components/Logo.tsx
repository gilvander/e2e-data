import { useTranslation } from "react-i18next"

export default function Logo({ size = 40, color }: { size?: number; color?: string }) {
  const { t } = useTranslation()
  const s = size
  return (
    <svg width={s} height={s} viewBox="0 0 100 100" aria-label={t("brand.logoAria")} className="brand-logo-svg"> 
      <g fill="none" stroke={color || "currentColor"} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="50,5 90,30 90,70 50,95 10,70 10,30" />
        <line x1="10" y1="30" x2="90" y2="70" />
        <line x1="90" y1="30" x2="10" y2="70" />
        <line x1="10" y1="50" x2="90" y2="50" />
        <line x1="30" y1="18" x2="30" y2="82" />
        <line x1="70" y1="18" x2="70" y2="82" />
      </g>
      <g fill={color || "currentColor"}>
        <circle cx="50" cy="5" r="5" />
        <circle cx="90" cy="30" r="5" />
        <circle cx="90" cy="70" r="5" />
        <circle cx="50" cy="95" r="5" />
        <circle cx="10" cy="70" r="5" />
        <circle cx="10" cy="30" r="5" />
      </g>
    </svg>
  )
}
