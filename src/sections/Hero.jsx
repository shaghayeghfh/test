import { img } from '../data/properties.js'
import { heroImage } from '../data/content.js'
import Reveal from '../components/Reveal.jsx'

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg" style={{ backgroundImage: `url(${img(heroImage, 2000)})` }} />
      <div className="hero-overlay" />
      <div className="hero-content">
        <h1 className="hero-fade hero-fade-1">Discover Exceptional<br />Homes &amp; Investments</h1>
        <p className="hero-sub hero-fade hero-fade-2">
          Premium properties in prime locations. Find your dream home<br />
          or the perfect investment with confidence.
        </p>
      </div>
      <div className="hero-scroll">
        <span>Scroll</span>
        <div className="hero-scroll-line" />
      </div>
    </section>
  )
}
