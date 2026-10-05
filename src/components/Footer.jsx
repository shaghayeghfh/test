import { useState } from 'react'
import { Link } from 'react-router-dom'
import { navLinks, contactInfo } from '../data/content.js'

function Social({ d }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor"><path d={d}/></svg>
  )
}

export default function Footer() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const subscribe = (e) => { e.preventDefault(); setSent(true); setEmail(''); setTimeout(() => setSent(false), 3000) }

  return (
    <footer className="footer" id="contact">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link to="/" className="logo">
              <svg className="logo-icon" viewBox="0 0 30 30" fill="none" strokeWidth="1.5">
                <rect x="4" y="6" width="9" height="18" rx="1" />
                <rect x="14" y="2" width="12" height="22" rx="1" />
              </svg>
              HORIZON <span style={{ color: 'var(--gold)' }}>PROPERTIES</span>
            </Link>
            <p>Connecting discerning buyers with extraordinary homes and smart investments. Integrity, transparency, and client satisfaction are at the heart of everything we do.</p>
            <div className="footer-social">
              <a href="#" aria-label="Facebook"><Social d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></a>
              <a href="#" aria-label="Instagram"><Social d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z"/></a>
              <a href="#" aria-label="LinkedIn"><Social d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 2a2 2 0 100 4 2 2 0 000-4z"/></a>
              <a href="#" aria-label="Twitter"><Social d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></a>
            </div>
          </div>

          <div>
            <h5>Navigation</h5>
            <ul className="footer-links">
              {navLinks.map((link) => (
                <li key={link.label}><Link to={link.path}>{link.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h5>Contact</h5>
            <ul className="footer-contact">
              <li>
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z"/></svg>
                {contactInfo.phone}
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor"><path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zM22 6l-10 7L2 6"/></svg>
                {contactInfo.email}
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"/></svg>
                {contactInfo.address}
              </li>
            </ul>
          </div>

          <div>
            <h5>Newsletter</h5>
            <p style={{ maxWidth: 'none' }}>Get curated luxury listings and market insights delivered to your inbox.</p>
            <form className="newsletter-form" onSubmit={subscribe}>
              <input type="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <button type="submit" aria-label="Subscribe">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </button>
            </form>
            {sent && <p style={{ color: 'var(--gold)', fontSize: '0.82rem', marginTop: 10 }}>Thank you for subscribing!</p>}
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Horizon Properties. All rights reserved.</span>
          <span>Designed for exceptional living.</span>
        </div>
      </div>
    </footer>
  )
}
