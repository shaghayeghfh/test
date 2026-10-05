import { img } from '../data/properties.js'
import { aboutMainImage, aboutSecondaryImage, aboutGallery } from '../data/content.js'
import Reveal from '../components/Reveal.jsx'

export default function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <div className="about-grid">
          <Reveal className="about-text">
            <span className="section-label">About Us</span>
            <h2 className="section-title">Who We Are</h2>
            <p>
              At Horizon Properties, we connect people with extraordinary homes and smart investments.
              Integrity, transparency, and client satisfaction are at the heart of everything we do.
            </p>
            <a href="#" className="btn btn-primary">
              Learn More
              <span className="arrow"><svg viewBox="0 0 24 24" width="16" fill="none" strokeWidth="2" stroke="currentColor"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>
            </a>
          </Reveal>

          <Reveal delay={1} className="about-images">
            <div className="about-img-wrap about-img-main">
              <img src={img(aboutMainImage, 800, 1000)} alt="Modern luxury home" loading="lazy" />
            </div>
            <div className="about-img-wrap about-img-side">
              <img src={img(aboutSecondaryImage, 500, 700)} alt="Architectural detail" loading="lazy" />
            </div>
            <button className="about-arrow" aria-label="Next image">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
