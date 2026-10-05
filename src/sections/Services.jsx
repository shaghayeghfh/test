import { services } from '../data/content.js'
import Reveal from '../components/Reveal.jsx'

const icons = {
  home: <path d="M3 12l9-9 9 9M5 10v10h5v-6h4v6h5V10" />,
  chart: <path d="M3 3v18h18M7 16l4-6 3 4 5-7" />,
  megaphone: <path d="M3 11l13-5v12L3 13v-2zM3 11v2a2 2 0 002 2h1M16 8a3 3 0 010 6" />,
  compass: <path d="M12 2a10 10 0 100 20 10 10 0 000-20zM16 8l-4 8-4-4 8-4z" />,
  scale: <path d="M12 3v18M5 7h14M5 7l-3 6h6l-3-6zM19 7l-3 6h6l-3-6zM8 21h8" />,
  pin: <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />,
}

export default function Services() {
  return (
    <section className="section" id="services">
      <div className="container">
        <Reveal className="section-head">
          <span className="section-label">What We Do</span>
          <h2 className="section-title">Our Services</h2>
        </Reveal>
        <Reveal delay={1}>
          <div className="services-grid">
            {services.map((s) => (
              <div className="service-card" key={s.title}>
                <div className="service-icon">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" stroke="currentColor">{icons[s.icon]}</svg>
                </div>
                <h3 className="service-title">{s.title}</h3>
                <p className="service-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
