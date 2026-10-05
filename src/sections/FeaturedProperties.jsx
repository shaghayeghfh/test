import { featuredProperties } from '../data/properties.js'
import PropertyCard from '../components/PropertyCard.jsx'
import Carousel from '../components/Carousel.jsx'
import Reveal from '../components/Reveal.jsx'

export default function FeaturedProperties() {
  const featured = featuredProperties()
  return (
    <section className="section section-grey">
      <div className="container">
        <Reveal className="section-head">
          <span className="section-label">Featured</span>
          <h2 className="section-title">Featured Properties</h2>
        </Reveal>
        <Reveal delay={1}>
          <Carousel>
            {featured.map((p, i) => (
              <PropertyCard key={p.id} property={p} featured={i === 0} />
            ))}
          </Carousel>
        </Reveal>
      </div>
    </section>
  )
}
