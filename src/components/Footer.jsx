const FLAGS_SVG = [
  `<rect width="36" height="24" fill="#009c3b"/><polygon points="18,4 34,12 18,20 2,12" fill="#ffdf00"/><circle cx="18" cy="12" r="5" fill="#002776"/>`,
  `<rect width="36" height="24" fill="#74acdf"/><rect y="8" width="36" height="8" fill="#fff"/><circle cx="18" cy="12" r="3" fill="#f6b40e"/>`,
  `<rect width="36" height="8" fill="#000"/><rect y="8" width="36" height="8" fill="#dd0000"/><rect y="16" width="36" height="8" fill="#ffcc00"/>`,
  `<rect width="12" height="24" fill="#002395"/><rect x="12" width="12" height="24" fill="#fff"/><rect x="24" width="12" height="24" fill="#ed2939"/>`,
  `<rect width="12" height="24" fill="#008c45"/><rect x="12" width="12" height="24" fill="#fff"/><rect x="24" width="12" height="24" fill="#cd212a"/>`,
  `<rect width="36" height="6" fill="#c60b1e"/><rect y="6" width="36" height="12" fill="#ffc400"/><rect y="18" width="36" height="6" fill="#c60b1e"/>`,
  `<rect width="36" height="6" fill="#fff"/><rect y="6" width="36" height="6" fill="#5bcbeb"/><rect y="12" width="36" height="6" fill="#fff"/><rect y="18" width="36" height="6" fill="#5bcbeb"/><circle cx="9" cy="6" r="2.5" fill="#fff"/>`,
  `<rect width="36" height="8" fill="#ae1c28"/><rect y="8" width="36" height="8" fill="#fff"/><rect y="16" width="36" height="8" fill="#21468b"/>`,
]

export default function Footer() {
  return (
    <footer>
      <div className="ft-flags">
        {FLAGS_SVG.map((svg, i) => (
          <svg key={i} className="ft-flag" viewBox="0 0 36 24" dangerouslySetInnerHTML={{ __html: svg }} />
        ))}
      </div>
      <span className="ft-logo">⚽ COPA DO MUNDO</span>
      <p>Site educacional e interativo · Dados históricos das Copas 1986–2022<br />Desenvolvido para fins de estudo e aprendizado.</p>
    </footer>
  )
}
