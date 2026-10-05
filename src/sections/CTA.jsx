import Reveal from '../components/Reveal.jsx'

export default function CTA() {
  return (
    <section className="section">
      <div className="container">
        <Reveal>
          <div className="cta">
            <div className="cta-icon">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" stroke="currentColor">
                <circle cx="8" cy="14" r="4" />
                <path d="M11 12l9-9M17 4l2 2M14 7l2 2" />
              </svg>
            </div>
            <div className="cta-text">
              <h3>Ready to Find Your Perfect Property?</h3>
              <p>Let our experts guide you to the right home or investment.</p>
            </div>
            <a href="#contact" className="btn btn-primary">
              Get In Touch
              <span className="arrow"><svg viewBox="0 0 24 24" width="16" fill="none" strokeWidth="2" stroke="currentColor"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
