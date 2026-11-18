import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Link, NavLink, useLocation } from 'react-router-dom'
import { site } from './data'
import ContactChooser, { WA, Call } from './Contact'
import { ContactList, Socials } from './components'
import Home from './pages/Home'
import { Packages, Destinations, Destination, Hidden, Events, About, Contact, Privacy, NotFound, PlanTrip, PlanEvent } from './pages/Inner'
import './styles/shell.css'

const nav = [['/packages', 'Packages'], ['/destinations', 'Destinations'], ['/hidden-kashmir', 'Hidden Kashmir'], ['/events', 'Events'], ['/about', 'About'], ['/contact', 'Contact']]
const tripMsg = "Hi TJM Kashmir, I'd like to plan a Kashmir trip."

function Brand({ light }) {
  return (
    <Link to="/" className={'brand' + (light ? ' light' : '')} aria-label={site.name + ', home'}>
      <img src="/logo.webp" alt="" width="52" height="52" />
      <span>The Journey Makers<em>Kashmir</em></span>
    </Link>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const home = pathname === '/'

  useEffect(() => { setOpen(false); window.scrollTo(0, 0) }, [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const over = home && !scrolled && !open
  return (
    <>
    <header className={'top' + (home ? ' on-home' : '') + (over ? ' over' : ' solid')}>
      <div className="wrap bar">
        <Brand light={over} />
        <nav className="desk" aria-label="Main">
          {nav.map(([to, label]) => <NavLink key={to} to={to}>{label}</NavLink>)}
        </nav>
        <WA text={tripMsg} label="header" className="btn head-cta">WhatsApp us</WA>
        <button className="menu" aria-expanded={open} aria-controls="mnav" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>
          <span /><span /><span />
        </button>
      </div>
    </header>

      {/* Sibling of the header, not a child: the header's backdrop-filter would trap a fixed child inside it. */}
      <div id="mnav" className={'mpanel' + (open ? ' open' : '')} hidden={!open}>
        <nav aria-label="Mobile">
          <NavLink to="/" end>Home</NavLink>
          {nav.map(([to, label]) => <NavLink key={to} to={to}>{label}</NavLink>)}
        </nav>
        <div className="mfoot">
          <WA text={tripMsg} label="mobile-menu">Chat on WhatsApp</WA>
          <div className="mcontacts"><ContactList /></div>
          <Socials />
        </div>
      </div>
    </>
  )
}

function Footer() {
  return (
    <footer className="site-foot">
      <section className="foot-cta">
        <div className="wrap foot-cta-inner">
          <div>
            <h2>{site.tagline}</h2>
            <p>Tell us your dates and who's travelling. A real person from our Srinagar team will reply with a plan and a quote.</p>
          </div>
          <div className="foot-cta-actions">
            <WA text={tripMsg} label="footer-cta" />
            <Link className="quiet light" to="/plan-my-trip">Plan my trip</Link>
          </div>
        </div>
      </section>

      <div className="wrap foot">
        <div className="foot-brand">
          <img src="/logo.webp" alt={site.name} width="104" height="104" loading="lazy" />
          <p className="signoff">{site.signoff}</p>
        </div>
        <div className="foot-col">
          <h3>Travel</h3>
          <Link to="/packages">Packages</Link>
          <Link to="/destinations">Destinations</Link>
          <Link to="/hidden-kashmir">Hidden Kashmir</Link>
          <Link to="/plan-my-trip">Plan my trip</Link>
        </div>
        <div className="foot-col">
          <h3>Events</h3>
          <Link to="/events">Event management</Link>
          <Link to="/plan-my-event">Plan my event</Link>
          <Link to="/about">About us</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="foot-col">
          <h3>Talk to us</h3>
          <ContactList />
          {site.email && <a href={`mailto:${site.email}`}>{site.email}</a>}
          <p className="foot-note">Srinagar, Kashmir</p>
          <Socials className="light" />
        </div>
      </div>

      <div className="wrap foot-bottom">
        <p>© {new Date().getFullYear()} {site.name}</p>
        <Link to="/privacy">Privacy notice</Link>
      </div>
    </footer>
  )
}

function StickyBar() {
  return (
    <div className="sticky" role="region" aria-label="Quick contact">
      <WA text={tripMsg} label="sticky">WhatsApp</WA>
      <Call className="btn ghost call" label="sticky">Call us</Call>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <a className="skip" href="#main">Skip to content</a>
      <Header />
      <div id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/destinations/:slug" element={<Destination />} />
          <Route path="/hidden-kashmir" element={<Hidden />} />
          <Route path="/plan-my-trip" element={<PlanTrip />} />
          <Route path="/events" element={<Events />} />
          <Route path="/plan-my-event" element={<PlanEvent />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
      <StickyBar />
      <ContactChooser />
    </BrowserRouter>
  )
}
