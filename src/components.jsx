import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { site, packages, extras, nights, inr, contacts, socials, techPartner, waLink, telLink, track } from './data'
import { WA } from './Contact'
import './styles/components.css'

// Plain list of named numbers, for footer and contact page.
export const ContactList = () => contacts.map((c) => (
  <a key={c.phone} href={telLink(c.phone)} onClick={() => track('call_click', 'list:' + c.name)}>
    {c.name}: {c.phone}
  </a>
))
const socialIcons = {
  instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></>,
  facebook: <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8.5c0-.3.2-.5.5-.5Z" />,
  youtube: <><rect x="2.5" y="5.5" width="19" height="13" rx="4" /><path d="m10 9.5 5 2.5-5 2.5Z" fill="currentColor" /></>,
  gmail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3.5 6 8.5 7 8.5-7" /></>,
}

// Instagram / Facebook / YouTube / Gmail icon links. Profile URLs live in data.js.
export const Socials = ({ className = '' }) => (
  <ul className={'socials ' + className}>
    {socials.map((s) => (
      <li key={s.id}>
        <a href={s.href} aria-label={s.label} title={s.label}
          {...(s.id !== 'gmail' && s.href !== '#' && { target: '_blank', rel: 'noreferrer' })}>
          <svg viewBox="0 0 24 24" aria-hidden="true">{socialIcons[s.id]}</svg>
        </a>
      </li>
    ))}
  </ul>
)

// HikzenLabs technology-partner card. `dark` is the compact navy footer version.
export const TechPartner = ({ dark = false }) => (
  <aside className={'partner' + (dark ? ' dark' : '')} aria-label="Technology partner">
    <img src={techPartner.logo} alt="" width="56" height="56" loading="lazy" />
    <div className="partner-text">
      <span>Technology partner</span>
      <strong>{techPartner.name}</strong>
      <p className="partner-pitch">
        {dark
          ? 'Want a website like this? Talk to HikzenLabs.'
          : 'Designed and built by HikzenLabs. Need a website or a technical solution? We can help.'}
      </p>
    </div>
    <div className="partner-actions">
      <a className="partner-link" href={techPartner.url} target="_blank" rel="noreferrer">See now</a>
      <a className="partner-link wa" href={waLink(`Hi ${techPartner.name}, I found you on the TJM Kashmir website.`, techPartner.whatsapp)}
        target="_blank" rel="noreferrer" onClick={() => track('partner_whatsapp_click', techPartner.name)}>Contact now</a>
    </div>
  </aside>
)

export const initials =(name) => name.split(/\s+/).map((w) => w[0]).join('').slice(0, 2).toUpperCase()

export const Img =({ src, alt, className = '' }) => (
  <div className={'photo ' + className}><img src={src} alt={alt} loading="lazy" /></div>
)

export function Page({ title, children }) {
  useEffect(() => { document.title = title ? `${title} · ${site.short}` : `${site.name} · ${site.tagline}` }, [title])
  return <main>{children}</main>
}

const Check = () => (
  <svg className="tick" viewBox="0 0 20 20" aria-hidden="true"><path d="M5 10.5l3.2 3.2L15 7" /></svg>
)

export function PackageCards({ cta = true }) {
  return (
    <div className="tiers">
      {packages.map((p) => (
        <article key={p.id} className={'tier tier-' + p.id}>
          <header>
            <h3>{p.name}</h3>
            <p className="tier-route">{nights} · Srinagar to Srinagar</p>
          </header>
          <p className="price">
            <span className="amt">{inr(p.price)}</span>
            <span className="per">per person</span>
          </p>
          <ul>{p.points.map((x) => <li key={x}><Check />{x}</li>)}</ul>
          {cta && (
            <WA
              text={`Hi TJM Kashmir, I'm interested in the ${p.name} package (${inr(p.price)} per person).`}
              label={'package:' + p.id}
            >
              Ask about {p.name}
            </WA>
          )}
        </article>
      ))}
    </div>
  )
}

export const Disclaimer = () => (
  <p className="fine disclaimer">
    All packages are Srinagar-to-Srinagar pickup and drop. Flights are not included. Prices are per person and may change with season and availability.
  </p>
)

// Small line icons for the complimentary extras, in the order of data.extras.
const extraIcons = [
  <path key="b" d="M3 15c3 2 15 2 18 0M5 15l1.5-4h11L19 15M12 11V5l4 3" />, // shikara
  <path key="c" d="M5 9h11v5a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V9Zm11 1h1.5a2 2 0 0 1 0 4H16M8 3c0 1.5 1 1.5 1 3M12 3c0 1.5 1 1.5 1 3" />, // kahwa cup
  <path key="d" d="M4 8h3l1.5-2h7L17 8h3v11H4V8Zm8 9a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />, // camera
  <path key="e" d="M4 10h16v10H4V10Zm-1-3h18v3H3V7Zm9 0v13M12 7c-1-3-5-4-5-1.5S12 7 12 7Zm0 0c1-3 5-4 5-1.5S12 7 12 7Z" />, // gift
]

export function Extras() {
  return (
    <section className="extras wrap">
      <div className="intro">
        <h2>Included with every package</h2>
        <p className="lead">Small things that make a Kashmir trip feel looked after, at no extra cost.</p>
      </div>
      <dl>
        {extras.map(([t, d], i) => (
          <div key={t}>
            <span className="ico"><svg viewBox="0 0 24 24" aria-hidden="true">{extraIcons[i]}</svg></span>
            <dt>{t}</dt>
            <dd>{d}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

export function DestinationList({ list }) {
  const [hover, setHover] = useState(list[0])
  return (
    <div className="destlist">
      <ol>
        {list.map((d, i) => (
          <li key={d.slug} className={hover.slug === d.slug ? 'on' : ''} onMouseEnter={() => setHover(d)} onFocus={() => setHover(d)}>
            <Link to={`/destinations/${d.slug}`}>
              <span className="dnum">{String(i + 1).padStart(2, '0')}</span>
              <span className="dtext">
                <span className="dname">{d.name}</span>
                <span className="dline">{d.line}</span>
              </span>
              <img className="dthumb" src={d.photo.replace('w=1200', 'w=240')} alt="" loading="lazy" />
            </Link>
          </li>
        ))}
      </ol>
      <div className="swap">
        {list.map((d) => (
          <img key={d.slug} src={d.photo} alt="" loading="lazy" className={hover.slug === d.slug ? 'on' : ''} />
        ))}
        <p className="swap-cap"><strong>{hover.name}</strong> · {hover.duration}</p>
      </div>
    </div>
  )
}
