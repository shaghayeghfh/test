import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProperty, properties, img } from '../data/properties.js'
import { agents } from '../data/content.js'
import PropertyCard from '../components/PropertyCard.jsx'
import Reveal from '../components/Reveal.jsx'

export default function PropertyDetail() {
  const { id } = useParams()
  const property = getProperty(id)
  const [activeImg, setActiveImg] = useState(0)
  const [lightbox, setLightbox] = useState(false)
  const [schedule, setSchedule] = useState(false)

  useEffect(() => { setActiveImg(0); setSchedule(false) }, [id])

  if (!property) {
    return (
      <div className="container" style={{ paddingTop: 140, paddingBottom: 80, textAlign: 'center' }}>
        <h1 style={{ marginBottom: 16 }}>Property not found</h1>
        <Link to="/properties" className="btn btn-primary">Back to Properties</Link>
      </div>
    )
  }

  const agent = agents[0]
  const images = property.images
  const similar = properties.filter((p) => p.id !== property.id && p.type === property.type).slice(0, 3)
  const fallbackSimilar = properties.filter((p) => p.id !== property.id).slice(0, 3)
  const similarList = similar.length >= 3 ? similar : fallbackSimilar

  return (
    <div className="container">
      <Link to="/properties" className="detail-back">
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        Back to Properties
      </Link>

      <div className="detail-gallery">
        <div className="detail-main-img">
          <img src={img(images[activeImg], 1400, 600)} alt={property.name} />
          <button className="detail-fullscreen" onClick={() => setLightbox(true)}>
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor"><path d="M8 3H5a2 2 0 00-2 2v3M16 3h3a2 2 0 012 2v3M8 21H5a2 2 0 01-2-2v-3M16 21h3a2 2 0 002-2v-3"/></svg>
            Fullscreen
          </button>
        </div>
        <div className="detail-thumbs">
          {images.map((im, i) => (
            <div key={i} className={`detail-thumb ${i === activeImg ? 'active' : ''}`} onClick={() => setActiveImg(i)}>
              <img src={img(im, 400, 300)} alt={`View ${i + 1}`} loading="lazy" />
            </div>
          ))}
        </div>
      </div>

      <div className="detail-layout">
        <div>
          <h1 className="detail-title">{property.name}</h1>
          <div className="detail-loc">
            <svg viewBox="0 0 24 24" strokeWidth="2" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"/></svg>
            {property.location}
          </div>

          <div className="detail-stats">
            <div className="detail-stat"><div className="val">{property.beds}</div><div className="label">Bedrooms</div></div>
            <div className="detail-stat"><div className="val">{property.baths}</div><div className="label">Bathrooms</div></div>
            <div className="detail-stat"><div className="val">{property.sqft.toLocaleString()}</div><div className="label">Sq Ft</div></div>
          </div>

          <div className="detail-desc">
            <h4>About this property</h4>
            <p>{property.description}</p>
          </div>

          <div className="detail-features">
            <h4>Key Features</h4>
            <ul className="feature-list">
              {property.features.map((f) => (
                <li key={f}>
                  <svg viewBox="0 0 24 24" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="detail-features">
            <h4>Amenities</h4>
            <ul className="feature-list">
              {property.amenities.map((a) => (
                <li key={a}>
                  <svg viewBox="0 0 24 24" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="detail-sidebar">
          <div className="detail-price">{property.price}</div>
          <div className="type-line">{property.type} · For Sale</div>

          <div className="agent-box">
            <img src={img(agent.photo, 120, 120)} alt={agent.name} />
            <div>
              <div className="agent-name">{agent.name}</div>
              <div className="agent-role">{agent.role}</div>
            </div>
          </div>

          <button className="btn btn-primary" onClick={() => setSchedule(!schedule)}>
            {schedule ? 'Request Sent ✓' : 'Schedule a Viewing'}
          </button>
          <a href={`mailto:${agent.email}?subject=Inquiry: ${property.name}`} className="btn btn-outline-dark">
            Contact Agent
            <span className="arrow"><svg viewBox="0 0 24 24" width="16" fill="none" strokeWidth="2" stroke="currentColor"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>
          </a>
        </aside>
      </div>

      <section className="similar-section">
        <Reveal className="section-head">
          <span className="section-label">You May Also Like</span>
          <h2 className="section-title" style={{ fontSize: '1.7rem' }}>Similar Properties</h2>
        </Reveal>
        <div className="similar-grid">
          {similarList.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      </section>

      <div className="detail-mobile-cta">
        <a href={`mailto:${agent.email}?subject=Inquiry: ${property.name}`} className="btn btn-outline-dark">Email</a>
        <button className="btn btn-primary" onClick={() => setSchedule(!schedule)}>
          {schedule ? 'Sent ✓' : 'Schedule Viewing'}
        </button>
      </div>

      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(false)}>
          <button className="lightbox-close" onClick={() => setLightbox(false)} aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
          <button className="lightbox-nav prev" onClick={(e) => { e.stopPropagation(); setActiveImg((activeImg - 1 + images.length) % images.length) }} aria-label="Previous">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <img src={img(images[activeImg], 1600)} alt={property.name} onClick={(e) => e.stopPropagation()} />
          <button className="lightbox-nav next" onClick={(e) => { e.stopPropagation(); setActiveImg((activeImg + 1) % images.length) }} aria-label="Next">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>
      )}
    </div>
  )
}
