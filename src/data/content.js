import { img } from './properties.js'

export const agents = [
  { name: 'Daniel Morgan', role: 'Managing Director', phone: '(555) 246-1357', email: 'daniel@horizon.com', photo: '1507003211169-0a1dd7228f2d' },
  { name: 'Olivia Carter', role: 'Luxury Property Advisor', phone: '(555) 246-2246', email: 'olivia@horizon.com', photo: '1494790108377-be9c29b29330' },
  { name: 'James Wilson', role: 'Investment Consultant', phone: '(555) 246-3389', email: 'james@horizon.com', photo: '1500648767791-00dcc994a43e' },
  { name: 'Sophia Bennett', role: 'Senior Property Specialist', phone: '(555) 246-4471', email: 'sophia@horizon.com', photo: '1438761681033-6461ffad8d80' },
]

export const services = [
  { title: 'Luxury Home Sales', desc: 'Curated representation for distinctive residences, connecting discerning buyers with exceptional homes.', icon: 'home' },
  { title: 'Property Investment', desc: 'Data-driven guidance on acquisition and portfolio strategy across high-growth luxury markets.', icon: 'chart' },
  { title: 'Property Marketing', desc: 'Editorial-grade photography, film, and storytelling that position each listing as a destination.', icon: 'megaphone' },
  { title: 'Real Estate Advisory', desc: 'Strategic counsel on market timing, opportunity zones, and long-term wealth through property.', icon: 'compass' },
  { title: 'Property Valuation', desc: 'Rigorous, evidence-based appraisals reflecting architecture, location, and current market dynamics.', icon: 'scale' },
  { title: 'Relocation Services', desc: 'End-to-end support for clients transitioning cities or countries, from search to settlement.', icon: 'pin' },
]

export const team = agents.map((a) => ({
  name: a.name,
  role: a.role,
  photo: img(a.photo, 600, 700),
  email: a.email,
  phone: a.phone,
}))

export const aboutGallery = [
  '1600596542815-ffad4c1539a9',
  '1600585154526-990dced4db0d',
  '1486406146926-c627a92ad1ab',
]

export const heroImage = '1605276374104-dee2a0ed3cd6'
export const aboutMainImage = '1600596542815-ffad4c1539a9'
export const aboutSecondaryImage = '1600585154526-990dced4db0d'

export const whyChoose = [
  { title: '18 Years of Excellence', desc: 'Nearly two decades guiding clients through the luxury property market with a proven track record.' },
  { title: 'Curated Portfolio', desc: 'Every listing is hand-selected for architectural merit, location, and long-term value.' },
  { title: 'Trusted Advisory', desc: 'Discretion, transparency, and integrity inform every recommendation we make.' },
  { title: 'Global Network', desc: 'A connected reach across prime markets that unlocks off-market opportunity.' },
]

export const contactInfo = {
  phone: '(555) 246-7890',
  email: 'hello@horizonproperties.com',
  address: '1280 Architectural Way, Suite 900, Austin, TX 78701',
}

export const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Properties', path: '/properties' },
  { label: 'About Us', path: '/#about' },
  { label: 'Services', path: '/#services' },
  { label: 'Team', path: '/#team' },
  { label: 'Contact', path: '/#contact' },
]
