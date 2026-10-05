import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { properties, propertyTypes, locations } from '../data/properties.js'
import PropertyCard from '../components/PropertyCard.jsx'
import Reveal from '../components/Reveal.jsx'

export default function Properties() {
  const [filters, setFilters] = useState({ search: '', location: '', type: '', beds: '', maxPrice: '', sort: 'default' })

  const set = (key, val) => setFilters((f) => ({ ...f, [key]: val }))

  const filtered = useMemo(() => {
    let list = [...properties]
    if (filters.search) {
      const q = filters.search.toLowerCase()
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.location.toLowerCase().includes(q))
    }
    if (filters.location) list = list.filter((p) => `${p.city}, ${p.state}` === filters.location)
    if (filters.type) list = list.filter((p) => p.type === filters.type)
    if (filters.beds) list = list.filter((p) => p.beds >= parseInt(filters.beds))
    if (filters.maxPrice) list = list.filter((p) => p.priceValue <= parseInt(filters.maxPrice))
    if (filters.sort === 'price-asc') list.sort((a, b) => a.priceValue - b.priceValue)
    if (filters.sort === 'price-desc') list.sort((a, b) => b.priceValue - a.priceValue)
    return list
  }, [filters])

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <h1>Properties</h1>
          <p>Explore our curated collection of exceptional homes and investments</p>
        </div>
      </div>

      <div className="container">
        <div className="filters-bar">
          <div className="filter-field">
            <label>Search</label>
            <input type="text" placeholder="Property name or city" value={filters.search} onChange={(e) => set('search', e.target.value)} />
          </div>
          <div className="filter-field">
            <label>Location</label>
            <select value={filters.location} onChange={(e) => set('location', e.target.value)}>
              <option value="">All Locations</option>
              {locations.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          <div className="filter-field">
            <label>Property Type</label>
            <select value={filters.type} onChange={(e) => set('type', e.target.value)}>
              <option value="">All Types</option>
              {propertyTypes.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div className="filter-field">
            <label>Bedrooms</label>
            <select value={filters.beds} onChange={(e) => set('beds', e.target.value)}>
              <option value="">Any</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
              <option value="5">5+</option>
              <option value="6">6+</option>
            </select>
          </div>
          <div className="filter-field">
            <label>Max Price</label>
            <select value={filters.maxPrice} onChange={(e) => set('maxPrice', e.target.value)}>
              <option value="">Any</option>
              <option value="2000000">Up to $2M</option>
              <option value="3000000">Up to $3M</option>
              <option value="4000000">Up to $4M</option>
              <option value="6000000">Up to $6M</option>
            </select>
          </div>
        </div>

        <div className="results-bar">
          <span className="results-count"><strong>{filtered.length}</strong> {filtered.length === 1 ? 'property' : 'properties'} found</span>
          <select className="sort-select" value={filters.sort} onChange={(e) => set('sort', e.target.value)}>
            <option value="default">Sort: Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>

        {filtered.length > 0 ? (
          <div className="properties-grid">
            {filtered.map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) + 1}>
                <PropertyCard property={p} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="no-results">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" stroke="currentColor" style={{ margin: '0 auto 20px', display: 'block' }}>
              <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
            </svg>
            <h3 style={{ marginBottom: 8 }}>No properties found</h3>
            <p>Try adjusting your filters to see more results.</p>
          </div>
        )}
      </div>
    </>
  )
}
