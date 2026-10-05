import { useRef, useEffect, useState } from 'react'
import { img } from '../data/properties.js'
import { heroImage } from '../data/content.js'

/**
 * Scroll-driven video hero.
 *
 * The video NEVER autoplays. Instead, the user's scroll position directly
 * scrubs video.currentTime via a requestAnimationFrame loop with smooth
 * interpolation (lerp). This creates a "controlling the camera" 3D feel.
 *
 * Architecture (performance-critical — NO React state on scroll):
 *   - scroll listener (passive) → updates scrollProgress target only
 *   - RAF loop → lerps currentVideoTime toward target, sets video.currentTime
 *   - Only seeks when the delta is meaningful (>3ms) to avoid seek flooding
 *   - Text opacity/transform updated via direct DOM refs
 *
 * For best seeking performance, the source video should have frequent keyframes
 * (every 1-2s), H.264 / WebM with web-optimized moov atom, and a moderate
 * bitrate. The lerp smoothing (0.18) masks minor seek stutter.
 */
export default function Hero() {
  const containerRef = useRef(null)
  const videoRef = useRef(null)
  const textRef = useRef(null)
  const hintRef = useRef(null)
  const readyRef = useRef(false)
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const onChange = () => setReducedMotion(mq.matches)
    mq.addEventListener?.('change', onChange)
    return () => mq.removeEventListener?.('change', onChange)
  }, [])

  useEffect(() => {
    if (reducedMotion || failed) return

    const video = videoRef.current
    const container = containerRef.current
    if (!video || !container) return

    let rafId = null
    let scrollProgress = 0
    let currentVideoTime = 0
    let duration = 0
    let inView = false
    const SMOOTHING = 0.18
    const SEEK_THRESHOLD = 0.004 // seconds — skip sub-frame seeks

    const updateProgress = () => {
      const rect = container.getBoundingClientRect()
      const scrollable = container.offsetHeight - window.innerHeight
      if (scrollable <= 0) { scrollProgress = 0; return }
      // rect.top goes from 0 → -(scrollable) as user scrolls through the section
      scrollProgress = Math.max(0, Math.min(1, -rect.top / scrollable))
    }

    const tick = () => {
      if (!inView) { rafId = null; return }
      rafId = requestAnimationFrame(tick)

      const targetTime = scrollProgress * duration
      currentVideoTime += (targetTime - currentVideoTime) * SMOOTHING

      // Only seek when the delta is meaningful to prevent flooding
      if (Math.abs(video.currentTime - currentVideoTime) > SEEK_THRESHOLD) {
        video.currentTime = currentVideoTime
      }

      // Scroll-driven text fade (only after video is ready, preserving entrance animation)
      if (readyRef.current && textRef.current) {
        const opacity = Math.max(0, 1 - scrollProgress * 4)
        const y = scrollProgress * -30
        textRef.current.style.opacity = opacity
        textRef.current.style.transform = `translateY(${y}px)`
      }
      if (readyRef.current && hintRef.current) {
        hintRef.current.style.opacity = Math.max(0, 1 - scrollProgress * 6)
      }
    }

    const onScroll = () => { updateProgress() }

    const onLoadedMetadata = () => {
      duration = video.duration
      if (!isFinite(duration) || duration <= 0) { setFailed(true); return }
      updateProgress()
      currentVideoTime = scrollProgress * duration
      video.currentTime = currentVideoTime
    }
    const onLoadedData = () => {
      readyRef.current = true
      setReady(true)
    }
    const onError = () => { setFailed(true) }

    // IntersectionObserver: start/stop the RAF loop when the section enters/leaves viewport
    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
      if (inView && !rafId) {
        updateProgress()
        rafId = requestAnimationFrame(tick)
      }
    }, { rootMargin: '0px' })

    video.addEventListener('loadedmetadata', onLoadedMetadata)
    video.addEventListener('loadeddata', onLoadedData)
    video.addEventListener('error', onError)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    // Handle already-cached video (events may have fired before listeners attached)
    if (video.readyState >= 1 && isFinite(video.duration) && video.duration > 0) {
      duration = video.duration
      updateProgress()
      currentVideoTime = scrollProgress * duration
      video.currentTime = currentVideoTime
    }
    if (video.readyState >= 2) {
      readyRef.current = true
      setReady(true)
    }

    // Explicitly trigger load (ensures preload kicks in immediately)
    video.load()

    updateProgress()
    io.observe(container)

    return () => {
      video.removeEventListener('loadedmetadata', onLoadedMetadata)
      video.removeEventListener('loadeddata', onLoadedData)
      video.removeEventListener('error', onError)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      io.disconnect()
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [reducedMotion, failed])

  const showVideo = !reducedMotion && !failed

  return (
    <section
      className={showVideo ? 'hero-video-section' : 'hero hero-static'}
      ref={containerRef}
    >
      <div className={showVideo ? 'hero-sticky' : undefined}>
        {/* Fallback image — always present, revealed if video fails or for reduced motion */}
        <div
          className="hero-img-fallback"
          style={{ backgroundImage: `url(${img(heroImage, 2000)})` }}
        />

        {showVideo && (
          <video
            ref={videoRef}
            className={`hero-video-bg ${ready ? 'ready' : ''}`}
            src="/hero-video.mp4"
            preload="auto"
            muted
            playsInline
            webkit-playsinline="true"
            disablePictureInPicture
            tabIndex={-1}
            aria-hidden="true"
          />
        )}

        {/* Subtle overlay for text readability — kept light so video dominates */}
        <div className="hero-overlay" />

        {/* Minimal loading indicator */}
        {showVideo && !ready && <div className="hero-loading-line" />}

        <div className="hero-sticky-inner">
          <div className="hero-content-wrap" ref={textRef}>
            <h1 className="hero-fade hero-fade-1">
              Discover Exceptional<br />Homes &amp; Investments
            </h1>
            <p className="hero-sub hero-fade hero-fade-2">
              Premium properties in prime locations. Find your dream home<br />
              or the perfect investment with confidence.
            </p>
          </div>
          <div className="hero-scroll" ref={hintRef}>
            <span>Scroll</span>
            <div className="hero-scroll-line" />
          </div>
        </div>
      </div>
    </section>
  )
}
