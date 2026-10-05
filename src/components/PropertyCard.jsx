import { useState } from 'react'
import { Link } from 'react-router-dom'
import { img } from '../data/properties.js'

export function FavButton({ id }) {
  const [fav, setFav] = useState(() => {
    try { return JSON.parse(localStorage.getItem('horizon-favs') || '{}')[id] } catch { return false }
  })
  const toggle = (e) => {
    e.preventDefault()
    e.stopPropagation()
    let favs = {}
    try { favs = JSON.parse(localStorage.getItem('horizon-favs') || '{}') } catch {}
    favs[id] = !fav
    localStorage.setItem('horizon-favs', JSON.stringify(favs))
    setFav(!fav)
  }
  return (
    <button className={`prop-fav ${fav ? 'active' : ''}`} onClick={toggle} aria-label="Save property">
      <svg viewBox="0 0 24 24" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
    </button>
  )
}

export default function PropertyCard({ property, featured }) {
  return (
    <Link to={`/properties/${property.id}`} className={`prop-card ${featured ? 'featured' : ''}`}>
      <div className="prop-card-img">
        <img src={img(property.cover, featured ? 900 : 700)} alt={property.name} loading="lazy" />
        <span className="prop-type-badge">{property.type}</span>
        <FavButton id={property.id} />
        {(featured || true) && (
          <div className="prop-card-overlay">
            <div className="name">{property.name}</div>
            <div className="loc">
              <svg viewBox="0 0 24 24" strokeWidth="2" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"/></svg>
              {property.location}
            </div>
            <div className="price">{property.price}</div>
          </div>
        )}
      </div>
      <div className="prop-card-body">
        <div className="name-static">{property.name}</div>
        <div className="loc-static">
          <svg viewBox="0 0 24 24" strokeWidth="2" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"/></svg>
          {property.location}
        </div>
        <div className="stats">
          <span>
            <svg viewBox="0 0 24 24" strokeWidth="2" fill="none" stroke="currentColor"><path d="M3 12l9-9 9 9M5 10v10h14V10"/></svg>
            {property.beds} Beds
          </span>
          <span>
            <svg viewBox="0 0 24 24" strokeWidth="2" fill="none" stroke="currentColor"><path d="M4 12V6a2 2 0 012-2h12a2 2 0 012 2v6M2 12h20v6a2 2 0 01-2 2v-3H4v3a2 2 0 01-2-2v-6z"/></svg>
            {property.baths} Baths
          </span>
        </div>
        <div className="price-static">{property.price}</div>
      </div>
    </Link>
  )
}
