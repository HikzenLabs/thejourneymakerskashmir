import { useEffect, useState } from 'react'
import './styles/slideshow.css'

// Crossfading photo slideshow with a slow zoom on the active slide.
// Auto-advances, pauses on hover/focus, and stays still for reduced-motion users.
const DELAY = 5000

export default function Slideshow({ slides, label }) {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const n = slides.length
  const go = (k) => setI((k + n) % n)

  useEffect(() => {
    if (paused || n < 2 || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setTimeout(() => go(i + 1), DELAY)
    return () => clearTimeout(t)
  }, [i, paused, n])

  return (
    <div
      className="slideshow"
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(e) => { if (e.key === 'ArrowRight') go(i + 1); if (e.key === 'ArrowLeft') go(i - 1) }}
    >
      <div className="slides">
        {slides.map((s, k) => (
          <figure key={s.src} className={'slide' + (k === i ? ' on' : '')} aria-hidden={k !== i}>
            <img src={s.src} alt={s.alt} loading={k === 0 ? 'eager' : 'lazy'} />
          </figure>
        ))}
        <p className="slide-cap" aria-live="polite">{slides[i].alt}</p>
      </div>
      {n > 1 && (
        <div className="slide-nav">
          <button type="button" className="slide-btn" onClick={() => go(i - 1)} aria-label="Previous photo">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
          </button>
          <div className="slide-dots">
            {slides.map((s, k) => (
              <button key={s.src} type="button" className={k === i ? 'on' : ''} aria-label={`Photo ${k + 1} of ${n}`} aria-current={k === i} onClick={() => go(k)}>
                {k === i && !paused && <span style={{ animationDuration: DELAY + 'ms' }} />}
              </button>
            ))}
          </div>
          <button type="button" className="slide-btn" onClick={() => go(i + 1)} aria-label="Next photo">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      )}
    </div>
  )
}
