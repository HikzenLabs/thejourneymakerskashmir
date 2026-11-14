import './styles/components.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { destinations } from './data'
import { WA } from './Contact'

// Schematic, metro-style. Positions are only rough directions from Srinagar.
// Deliberately no borders or LoC (maps of J&K are legally sensitive in India).
const S = [300, 200]
const stops = {
  srinagar: S,
  gulmarg: [190, 200], uri: [70, 200],
  manasbal: [255, 155], wular: [210, 110], gurez: [210, 35],
  keran: [95, 55], karnah: [60, 110],
  sonamarg: [400, 100],
  pahalgam: [460, 280],
  yusmarg: [230, 290],
}
const lines = [
  { c: 'var(--saffron-500)', pts: [S, stops.gulmarg, stops.uri] },
  { c: 'var(--navy-600)', pts: [S, stops.manasbal, stops.wular, stops.gurez] },
  { c: 'var(--crocus-700)', pts: [stops.wular, [150, 110], stops.keran] },
  { c: 'var(--crocus-700)', pts: [[150, 110], stops.karnah] },
  { c: 'var(--lake-500)', pts: [S, stops.sonamarg] },
  { c: 'var(--rust-600)', pts: [S, [380, 280], stops.pahalgam] },
  { c: 'var(--pine-600)', pts: [S, stops.yusmarg] },
]
const labelLeft = new Set(['uri', 'karnah', 'keran', 'yusmarg', 'manasbal'])

export default function RouteMap() {
  const [sel, setSel] = useState('srinagar')
  const d = destinations.find((x) => x.slug === sel)
  const msg = `Hi TJM Kashmir, I'd like to plan a trip to ${d.name}.`

  return (
    <div className="routemap">
      <svg viewBox="-80 0 650 330" role="group" aria-label="Route map from Srinagar to 11 destinations">
        {lines.map((l, i) => (
          <polyline key={i} className="line" pathLength="1" points={l.pts.join(' ')} stroke={l.c} />
        ))}
        {Object.entries(stops).map(([slug, [x, y]]) => {
          const name = destinations.find((x) => x.slug === slug).name.replace(' & Dal Lake', '')
          const hub = slug === 'srinagar'
          return (
            <g
              key={slug}
              className={'stop' + (sel === slug ? ' on' : '')}
              role="button"
              tabIndex={0}
              aria-label={name}
              aria-pressed={sel === slug}
              onClick={() => setSel(slug)}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), setSel(slug))}
            >
              <circle className="halo" cx={x} cy={y} r={hub ? 26 : 18} />
              <circle cx={x} cy={y} r={hub ? 13 : 8} />
              <text
                x={hub ? x + 20 : labelLeft.has(slug) ? x - 14 : x + 14}
                y={hub ? y + 6 : y + 4}
                textAnchor={!hub && labelLeft.has(slug) ? 'end' : 'start'}
                className={hub ? 'hub' : ''}
              >
                {name}
              </text>
            </g>
          )
        })}
      </svg>
      <div className="stopcard" aria-live="polite">
        <div className="stopcard-img"><img key={d.slug} src={d.photo.replace('w=1200', 'w=720')} alt="" loading="lazy" /></div>
        <div className="stopcard-body">
          <h3>{d.name}</h3>
          <p className="stopcard-meta">{d.slug === 'srinagar' ? 'Where every trip starts' : d.duration + ' from Srinagar'}</p>
          <p>{d.line}.</p>
          <div className="actions">
            <WA text={msg} label={'routemap:' + d.slug}>Ask on WhatsApp</WA>
            <Link className="quiet" to={`/destinations/${d.slug}`}>About {d.name.replace(' & Dal Lake', '')}</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
