import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { navLinks, contactInfo } from '../data/content.js'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location])

  const isActive = (link) => {
    if (link.path === '/') return location.pathname === '/' && !location.hash
    if (link.path.startsWith('/properties')) return location.pathname.startsWith('/properties')
    return location.hash === link.path.split('#')[1]
  }

  return (
    <>
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container header-inner">
          <Link to="/" className="logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <svg className="logo-icon" viewBox="0 0 30 30" fill="none" strokeWidth="1.5">
              <rect x="4" y="6" width="9" height="18" rx="1" />
              <rect x="14" y="2" width="12" height="22" rx="1" />
              <line x1="8" y1="12" x2="8" y2="12" />
              <line x1="19" y1="8" x2="19" y2="8" />
              <line x1="7" y1="10" x2="9" y2="10" stroke="currentColor" strokeWidth="0" />
            </svg>
            HORIZON <span style={{ color: 'var(--gold)' }}>PROPERTIES</span>
          </Link>

          <nav className="nav-links">
            {navLinks.map((link) => (
              <Link key={link.label} to={link.path} className={`nav-link ${isActive(link) ? 'active' : ''}`}>
                {link.label}
              </Link>
            ))}
          </nav>

          <a href={`tel:${contactInfo.phone.replace(/[^0-9]/g, '')}`} className="phone-btn">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z"/>
            </svg>
            {contactInfo.phone}
          </a>

          <button className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </header>

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <Link key={link.label} to={link.path} className="nav-link" onClick={() => setMenuOpen(false)}>
            {link.label}
          </Link>
        ))}
        <a href={`tel:${contactInfo.phone.replace(/[^0-9]/g, '')}`} className="phone-btn" style={{ display: 'inline-flex' }}>
          {contactInfo.phone}
        </a>
      </div>
    </>
  )
}
