import { useRef, useCallback, useEffect } from 'react'

export default function Carousel({ children, itemSelector = '.prop-card' }) {
  const trackRef = useRef(null)
  const isDown = useRef(false)
  const startX = useRef(0)
  const startScroll = useRef(0)
  const moved = useRef(0)

  const scrollByItem = useCallback((dir) => {
    const track = trackRef.current
    if (!track) return
    const item = track.querySelector(itemSelector)
    if (!item) return
    const gap = parseInt(getComputedStyle(track).gap) || 0
    const dist = item.offsetWidth + gap
    track.scrollBy({ left: dir * dist, behavior: 'smooth' })
  }, [itemSelector])

  const onDown = (e) => {
    const track = trackRef.current
    if (!track) return
    isDown.current = true
    moved.current = 0
    startX.current = e.pageX || e.touches?.[0]?.pageX || 0
    startScroll.current = track.scrollLeft
    track.classList.add('dragging')
  }
  const onMove = (e) => {
    if (!isDown.current) return
    const track = trackRef.current
    const x = e.pageX || e.touches?.[0]?.pageX || 0
    const dx = x - startX.current
    moved.current = Math.abs(dx)
    track.scrollLeft = startScroll.current - dx
  }
  const onUp = () => {
    isDown.current = false
    trackRef.current?.classList.remove('dragging')
  }

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const onKey = (e) => {
      if (document.activeElement !== track) return
      if (e.key === 'ArrowLeft') scrollByItem(-1)
      if (e.key === 'ArrowRight') scrollByItem(1)
    }
    track.addEventListener('keydown', onKey)
    return () => track.removeEventListener('keydown', onKey)
  }, [scrollByItem])

  return (
    <div className="carousel-wrap">
      <button className="carousel-nav prev" onClick={() => scrollByItem(-1)} aria-label="Previous">
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
      <div
        ref={trackRef}
        className="carousel-track"
        tabIndex={0}
        onMouseDown={onDown}
        onMouseMove={onMove}
        onMouseUp={onUp}
        onMouseLeave={onUp}
        onTouchStart={onDown}
        onTouchMove={onMove}
        onTouchEnd={onUp}
      >
        {children}
      </div>
      <button className="carousel-nav next" onClick={() => scrollByItem(1)} aria-label="Next">
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor"><path d="M9 18l6-6-6-6"/></svg>
      </button>
    </div>
  )
}
