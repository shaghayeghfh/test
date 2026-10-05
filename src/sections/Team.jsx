import { team } from '../data/content.js'
import Reveal from '../components/Reveal.jsx'

export default function Team() {
  return (
    <section className="section" id="team">
      <div className="container">
        <Reveal className="section-head">
          <span className="section-label">Our People</span>
          <h2 className="section-title">Meet the Team</h2>
        </Reveal>
        <div className="team-grid">
          {team.map((member, i) => (
            <Reveal key={member.name} delay={i + 1}>
              <div className="team-card">
                <div className="team-photo">
                  <img src={member.photo} alt={member.name} loading="lazy" />
                  <div className="team-social">
                    <a href={`mailto:${member.email}`} aria-label="Email"><svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor"><path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zM22 6l-10 7L2 6"/></svg></a>
                    <a href={`tel:${member.phone.replace(/[^0-9]/g,'')}`} aria-label="Phone"><svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z"/></svg></a>
                    <a href="#" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 2a2 2 0 100 4 2 2 0 000-4z"/></svg></a>
                  </div>
                </div>
                <div className="team-info">
                  <h4>{member.name}</h4>
                  <div className="role">{member.role}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
