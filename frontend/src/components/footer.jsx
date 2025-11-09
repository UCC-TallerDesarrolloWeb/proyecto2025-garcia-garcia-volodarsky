// logo moved to public
const logo = '/logo-bulls.png'

const Footer = () => {
  return (
    <footer className="site-footer wireframe">
      <div className="footer-inner">
  <div className="footer-left">
      <img
        className="footer-logo"
        src={logo}
        alt="Chicago Bulls"
      />
  </div>
        <nav className="footer-right" aria-label="Redes sociales">
            <a
                    href="https://x.com/chicagobulls"
                    target="_blank"
                    rel="noopener"
                    aria-label="X"
            >X</a>
            <span className="dot" aria-hidden="true">•</span>
            <a
                    href="https://www.instagram.com/chicagobulls/?hl=es"
                    target="_blank"
                    rel="noopener"
                    aria-label="Instagram"
            >Instagram</a>
            <span className="dot" aria-hidden="true">•</span>
            <a
                    href="https://www.youtube.com/channel/UCvZi1jVVZ2yq0k5kkjzmuGw"
                    target="_blank"
                    rel="noopener"
                    aria-label="YouTube"
            >YouTube</a>
        </nav>
      </div>
    </footer>
  )
}

export default Footer;
