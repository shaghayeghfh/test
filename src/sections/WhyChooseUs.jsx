import { whyChoose } from '../data/content.js'
import Reveal from '../components/Reveal.jsx'

export default function WhyChooseUs() {
  return (
    <section className="section section-grey">
      <div className="container">
        <Reveal className="section-head">
          <span className="section-label">Why Horizon</span>
          <h2 className="section-title">Why Choose Us</h2>
        </Reveal>
        <div className="why-grid">
          {whyChoose.map((item, i) => (
            <Reveal key={item.title} delay={i + 1} className="why-item">
              <div className="why-num">0{i + 1}</div>
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
