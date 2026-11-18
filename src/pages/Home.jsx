import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { site, packages, destinations, photos, inr } from '../data'
import RouteMap from '../RouteMap'
import { WA } from '../Contact'
import { Page, PackageCards, Disclaimer, Extras, DestinationList } from '../components'
import '../styles/home.css'

const trust = ['Srinagar to Srinagar', 'Local Kashmiri team', 'Free shikara ride', 'Breakfast and dinner included']

// Portrait video on phones and small screens, landscape one on larger screens.
const SMALL = '(max-width: 767px)'
function useHeroVideo() {
  const [small, setSmall] = useState(() => matchMedia(SMALL).matches)
  useEffect(() => {
    const mq = matchMedia(SMALL)
    const on = () => setSmall(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return small ? '/hero-portrait.mp4' : '/hero.mp4'
}

export default function Home() {
  const heroVideo = useHeroVideo()
  const main = destinations.filter((d) => !d.offbeat)
  const dal = destinations.find((d) => d.slug === 'srinagar')
  return (
    <Page>
      <section className="hero">
        <video
          key={heroVideo}
          src={heroVideo}
          poster={photos.hero}
          autoPlay={!matchMedia('(prefers-reduced-motion: reduce)').matches}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
        <div className="wrap hero-inner">
          <h1>Explore Kashmir with The Journey Makers</h1>
          <p className="hero-tag">{site.tagline}.</p>
          <p className="hero-price">
            Tour packages from <strong>{inr(packages[0].price)}</strong> per person, planned by a local team.
          </p>
          <div className="actions">
            <WA text="Hi TJM Kashmir, I'd like to plan a Kashmir trip." label="hero" />
            <Link className="quiet light" to="/plan-my-trip">Build your own package</Link>
          </div>
          <ul className="trust" aria-label="Why travel with us">
            {trust.map((t) => <li key={t}>{t}</li>)}
          </ul>
        </div>
      </section>

      <section className="doors wrap" aria-label="What we do">
        <Link to="/packages" className="door">
          <img src={dal.photo} alt="" loading="lazy" />
          <div className="door-body">
            <h2>Kashmir tours</h2>
            <p>Deluxe, Super Deluxe and Premium packages, eleven destinations and trips built around you.</p>
            <span className="quiet light">See packages</span>
          </div>
        </Link>
        <Link to="/events" className="door door-events">
          <img src={photos.wedding} alt="" loading="lazy" />
          <div className="door-body">
            <h2>Events in Kashmir</h2>
            <p>Weddings, school and college events, corporate days and tournaments. We plan, we manage, you celebrate.</p>
            <span className="quiet light">See event services</span>
          </div>
        </Link>
      </section>

      <section className="wrap">
        <div className="intro">
          <h2>Three ways to see Kashmir</h2>
          <p className="lead">Clear prices, shown upfront. Every package includes hotels, breakfast and dinner, and your own taxi.</p>
        </div>
        <PackageCards />
        <Disclaimer />
      </section>

      <Extras />

      <section className="starts">
        <div className="wrap">
          <div className="intro">
            <h2>Everything starts in Srinagar</h2>
            <p className="lead">Every trip begins and ends on the shores of Dal Lake. Tap a stop to see what's there.</p>
          </div>
          <RouteMap />
        </div>
      </section>

      <section className="wrap">
        <div className="intro">
          <h2>Popular destinations</h2>
          <p className="lead">Seven places most travellers fit into a week, each within a day's drive of Srinagar.</p>
        </div>
        <DestinationList list={main} />
      </section>

      <section className="band">
        <div className="wrap band-inner">
          <h2>Beyond the Ordinary – Discover Hidden Kashmir</h2>
          <p className="lead">Uri, Gurez, Keran and Karnah: remote valleys, border villages and cultures few travellers ever see.</p>
          <Link className="btn ghost light" to="/hidden-kashmir">Explore Hidden Kashmir</Link>
        </div>
      </section>

      <section className="wrap cta">
        <img className="cta-mark" src="/logo.webp" alt="" width="88" height="88" loading="lazy" />
        <h2>Not sure where to start?</h2>
        <p className="lead">Tell us your dates and who's travelling. We'll suggest a route and send you a quote.</p>
        <div className="actions">
          <WA text="Hi TJM Kashmir, I'm not sure where to go. Can you suggest a trip?" label="home-cta" />
          <Link className="quiet" to="/plan-my-trip">Fill the trip form</Link>
        </div>
      </section>
    </Page>
  )
}
