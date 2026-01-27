export default function HeroIllustration() {
  return (
    <div className="hero-illustration">
      <svg className="hero-svg" width="560" height="140" viewBox="0 0 560 140" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(75,75,75,0.2)" />
            <stop offset="100%" stopColor="rgba(75,75,75,0)" />
          </linearGradient>
        </defs>
        <circle cx="40" cy="70" r="10" className="dot" />
        <circle cx="140" cy="40" r="10" className="dot" />
        <circle cx="240" cy="90" r="10" className="dot" />
        <circle cx="340" cy="50" r="10" className="dot" />
        <circle cx="440" cy="90" r="10" className="dot" />
        <circle cx="520" cy="50" r="10" className="dot" />
        <line x1="50" y1="70" x2="130" y2="40" className="link" />
        <line x1="150" y1="40" x2="230" y2="90" className="link" />
        <line x1="250" y1="90" x2="330" y2="50" className="link" />
        <line x1="350" y1="50" x2="430" y2="90" className="link" />
        <line x1="450" y1="90" x2="510" y2="50" className="link" />
      </svg>
    </div>
  )
}
