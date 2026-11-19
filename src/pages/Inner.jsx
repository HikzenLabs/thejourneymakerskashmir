import { Link, useParams } from 'react-router-dom'
import {
  site, packages, destinations, offbeatNote, travelServices, eventServices, eventTypes, eventTiers,
  photos, inr, contacts, team, waLink, telLink, track,
} from '../data'
import RouteMap from '../RouteMap'
import Slideshow from '../Slideshow'
import { WA } from '../Contact'
import { TripForm, EventForm } from '../Forms'
import { Page, PackageCards, Disclaimer, Extras, DestinationList, Img, Socials, initials, TechPartner } from '../components'
import '../styles/pages.css'

// Small stroke icons, 24px grid.
const paths = {
  check: 'M5 12.5l4.5 4.5L19 7.5',
  clock: 'M12 7v5l3 2M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z',
  pin: 'M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Zm0-9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z',
  info: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 8v5m0-8.5v.5',
  food: 'M7 3v8a2 2 0 0 0 4 0V3M9 13v8M17 3c-2 0-3 2.5-3 6s1 4 3 4v8',
  serve: 'M3 18h18M5 18a7 7 0 0 1 14 0M12 8V6m-2-1h4',
  people: 'M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-6 9a6 6 0 0 1 12 0m1-9a3 3 0 1 0 0-6m2 15h3a5 5 0 0 0-4-5',
  tent: 'M12 3 2 20h20L12 3Zm0 0v17m-4 0 4-7 4 7',
  phone: 'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z',
}
const Icon = ({ name }) => (
  <svg className="icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d={paths[name]} />
  </svg>
)
const serviceIcons = ['food', 'serve', 'people', 'tent']

// Plain page head on a sand band.
const PageHead = ({ title, lead, children }) => (
  <section className="pagehead">
    <div className="wrap">
      <h1>{title}</h1>
      {lead && <p className="lead">{lead}</p>}
      {children}
    </div>
  </section>
)

// Full-bleed image hero; header overlays it.
const ImageHero = ({ src, alt, crumb, title, lead }) => (
  <section className="dhero">
    <img src={src} alt={alt} />
    <div className="wrap">
      {crumb && (
        <nav className="crumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link><span aria-hidden="true">/</span>
          <Link to={crumb[0]}>{crumb[1]}</Link><span aria-hidden="true">/</span>
          <span aria-current="page">{title}</span>
        </nav>
      )}
      <h1>{title}</h1>
      {lead && <p className="lead">{lead}</p>}
    </div>
  </section>
)

const Checklist = ({ items, className = '' }) => (
  <ul className={'checklist ' + className}>
    {items.map((x) => <li key={x}><Icon name="check" />{x}</li>)}
  </ul>
)

export function Packages() {
  return (
    <Page title="Packages">
      <PageHead title="Kashmir tour packages" lead="Three clear levels, all Srinagar to Srinagar. Prices are per person." />
      <section className="wrap">
        <PackageCards />
        <Disclaimer />
      </section>
      <Extras />
      <section className="wrap split">
        <div className="panel panel-crocus">
          <h2>Hidden Kashmir: custom quote</h2>
          <p>Trips to Uri, Gurez, Keran and Karnah are priced on request. {offbeatNote}</p>
          <Link className="quiet light" to="/hidden-kashmir">See the border valleys</Link>
        </div>
        <div className="panel panel-sand">
          <h2>Build your own package</h2>
          <p>Choose your destinations, stay, transport and meals. We'll send a personalised quote.</p>
          <Link className="btn no-icon" to="/plan-my-trip">Get My Custom Travel Package</Link>
        </div>
      </section>
      <section className="wrap">
        <div className="intro"><h2>Travel services</h2><p className="lead">Everything handled by one local team. Services vary by package.</p></div>
        <Checklist items={travelServices} className="two-col" />
      </section>
    </Page>
  )
}

export function Destinations() {
  return (
    <Page title="Destinations">
      <PageHead title="Destinations" lead="Eleven places, all reached from Srinagar. Tap a stop on the map to see what's there." />
      <section className="wrap">
        <RouteMap />
      </section>
      <section className="wrap">
        <div className="intro"><h2>Popular destinations</h2></div>
        <DestinationList list={destinations.filter((d) => !d.offbeat)} />
      </section>
      <section className="wrap">
        <div className="intro"><h2>Hidden Kashmir</h2><p className="lead">Remote border valleys, priced on request.</p></div>
        <DestinationList list={destinations.filter((d) => d.offbeat)} />
      </section>
    </Page>
  )
}

export function Destination() {
  const { slug } = useParams()
  const d = destinations.find((x) => x.slug === slug)
  if (!d) return <NotFound />
  const msg = `Hi TJM Kashmir, I'd like to plan a trip to ${d.name}.`
  const crumb = d.offbeat ? ['/hidden-kashmir', 'Hidden Kashmir'] : ['/destinations', 'Destinations']
  return (
    <Page title={d.name}>
      <ImageHero src={d.photo} alt={d.name} crumb={crumb} title={d.name} lead={d.line} />
      <section className="wrap detail">
        <div>
          <p className="lead big">{d.intro}</p>
          <dl className="facts">
            <div><dt><Icon name="clock" />Suggested time</dt><dd>{d.duration}</dd></div>
            <div><dt><Icon name="pin" />Starts from</dt><dd>Srinagar</dd></div>
          </dl>
          <h2>Things to do</h2>
          <ul className="chips">{d.activities.map((a) => <li key={a}><Icon name="check" />{a}</li>)}</ul>
          {d.offbeat && <p className="note"><Icon name="info" /><span>{offbeatNote}</span></p>}
        </div>
        <aside className="ask">
          <h2>Plan a trip to {d.name}</h2>
          <p>{d.offbeat ? 'Priced on request, with permits and logistics handled by us.' : <>Included in our packages from <strong>{inr(packages[0].price)}</strong> per person.</>}</p>
          <WA text={msg} label={'destination:' + d.slug} />
          <Link className="quiet" to="/plan-my-trip">Or fill the trip form</Link>
        </aside>
      </section>
      {d.gallery && (
        <section className="wrap">
          <div className="intro"><h2>{d.name} in pictures</h2></div>
          <Slideshow slides={d.gallery} label={`Photos of ${d.name}`} />
        </section>
      )}
      {d.story && (
        <section className="story-band">
          <div className="wrap story">
            <div>
              <h2>{d.story.title}</h2>
              {d.story.paras.map((p) => <p key={p} className="lead">{p}</p>)}
            </div>
            <div>
              <h3>{d.story.sub}</h3>
              {d.story.subParas.map((p) => <p key={p}>{p}</p>)}
            </div>
          </div>
        </section>
      )}
      {!d.offbeat && (
        <section className="wrap">
          <div className="intro"><h2>Packages that include {d.name}</h2></div>
          <PackageCards /><Disclaimer />
        </section>
      )}
    </Page>
  )
}

export function Hidden() {
  const list = destinations.filter((d) => d.offbeat)
  return (
    <Page title="Hidden Kashmir">
      <PageHead title="Beyond the Ordinary – Discover Hidden Kashmir" lead="Natural beauty, cultural heritage and local communities in Kashmir's remote border valleys." />
      <section className="wrap tiles">
        {list.map((d) => (
          <Link key={d.slug} to={`/destinations/${d.slug}`} className="tile">
            <img src={d.photo} alt="" loading="lazy" />
            <div><h3>{d.name}</h3><p>{d.line}</p></div>
          </Link>
        ))}
      </section>
      <section className="wrap">
        <p className="note"><Icon name="info" /><span>{offbeatNote}</span></p>
        <div className="actions">
          <WA text="Hi TJM Kashmir, I'd like a quote for a Hidden Kashmir trip (Uri / Gurez / Keran / Karnah)." label="hidden">Ask for a custom quote</WA>
        </div>
      </section>
    </Page>
  )
}

export function Events() {
  return (
    <Page title="Events">
      <ImageHero
        src={photos.wedding}
        alt="Representative photo: a wedding stage under a floral canopy"
        title="We Plan. We Manage. You Celebrate."
        lead="One partner for food, staff, decor and venue setup, anywhere in Kashmir."
      />
      <section className="wrap">
        <div className="intro"><h2>Everything your event needs</h2></div>
        <div className="services">
          {eventServices.map(([t, d], i) => (
            <article key={t}>
              <span className="badge"><Icon name={serviceIcons[i]} /></span>
              <h3>{t}</h3><p>{d}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="wrap split center">
        <div>
          <h2>Events we manage</h2>
          <ul className="chips">{eventTypes.map((t) => <li key={t}>{t}</li>)}</ul>
        </div>
        <Img src={photos.catering} alt="Representative photo: event seating" />
      </section>
      <section className="wrap">
        <div className="intro">
          <h2>Event packages</h2>
          <p className="lead">Every event is different, so every package is a custom quote based on event type, guests, venue, menu, decor and seating, staff, duration and extras.</p>
        </div>
        <div className="etiers">
          {eventTiers.map((t, i) => (
            <article key={t} className={'etier etier-' + i}>
              <h3>{t}</h3>
              <p className="quote">Custom quote</p>
              <p>{['Essentials done right for smaller gatherings.', 'Full service for most weddings and corporate days.', 'Premium decor, menus and staffing, start to finish.'][i]}</p>
            </article>
          ))}
        </div>
        <div className="actions">
          <WA text="Hi TJM Kashmir, I'd like to plan an event." label="events" />
          <Link className="quiet" to="/plan-my-event">Plan My Event</Link>
        </div>
        <p className="fine">Photos on this page are representative, not TJM events.</p>
      </section>
    </Page>
  )
}

export const FormPage = ({ title, lead, children }) => (
  <Page title={title}>
    <PageHead title={title} lead={lead} />
    <section className="wrap narrow formwrap">{children}</section>
  </Page>
)

export function About() {
  return (
    <Page title="About">
      <PageHead title="About TJM Kashmir" lead={`${site.tagline}.`} />

      <section className="wrap split center">
        <div className="prose">
          <span className="about-num" aria-hidden="true">01</span>
          <h2>Who we are</h2>
          <p className="lead big">The Journey Makers Kashmir, popularly known as TJM KASHMIR, is a registered tour and travel company with the Department of Tourism, Jammu &amp; Kashmir.</p>
          <p>It operates as a tourism unit of Window of Kashmir, a community-based digital platform originating from Uri.</p>
          <p>We are committed to making travel across Jammu &amp; Kashmir accessible, affordable and memorable through professionally curated travel experiences and personalised services.</p>
          <p className="registered"><Icon name="check" />Registered with the Department of Tourism, J&amp;K</p>
        </div>
        <figure className="about-photo">
          <Img src={photos.about} alt="The TJM Kashmir team with their Welcome to Kashmir banner" />
          <figcaption>The TJM Kashmir team</figcaption>
        </figure>
      </section>

      <section className="about-band">
        <div className="wrap">
          <div className="intro">
            <span className="about-num" aria-hidden="true">02</span>
            <h2>What we do</h2>
            <p className="lead">Comprehensive travel and event management solutions under one roof.</p>
          </div>
          <div className="about-cols">
            <div className="about-card">
              <h3>Tours &amp; travel</h3>
              <Checklist items={['Customised tour packages across Jammu & Kashmir', 'Flight and transportation bookings', 'Hotel, hostel and homestay accommodation', 'Destination planning and local travel assistance', 'Group tours and customised itineraries']} />
              <Link className="quiet" to="/packages">See tour packages</Link>
            </div>
            <div className="about-card">
              <h3>Event management</h3>
              <Checklist items={['Wedding and celebration management', 'Sports events and tournaments', 'School and college events', 'Conferences, corporate gatherings and special occasions']} />
              <Link className="quiet" to="/events">See event services</Link>
            </div>
          </div>
          <p className="about-note">Whether you are planning a family holiday, an adventurous getaway or a special event, we take care of the details so you can enjoy the experience.</p>
        </div>
      </section>

      <section className="wrap split">
        <div className="prose">
          <span className="about-num" aria-hidden="true">03</span>
          <h2>Our mission</h2>
          <p className="lead">Our vision extends beyond tourism.</p>
          <p>We aspire to contribute to the growth of Jammu &amp; Kashmir's tourism sector by promoting unexplored destinations, encouraging responsible tourism, prioritising tourist safety and creating meaningful employment opportunities for local youth.</p>
          <p>By collaborating with local communities, service providers and tourism stakeholders, we aim to ensure that the benefits of tourism reach the people and regions that make Kashmir special.</p>
        </div>
        <div className="prose">
          <span className="about-num" aria-hidden="true">04</span>
          <h2>Our promise</h2>
          <p className="lead">At TJM KASHMIR, every traveller matters.</p>
          <p>We believe that exceptional travel experiences should not come with an unreasonable price tag. Our commitment is to deliver:</p>
          <Checklist items={['Affordable and transparent travel solutions', 'Customised packages tailored to individual preferences', 'Reliable assistance and responsible travel planning', 'Memorable experiences rooted in local culture and hospitality']} />
        </div>
      </section>

      <section className="wrap">
        <div className="intro">
          <h2>Meet the team</h2>
          <p className="lead">The people who plan your trip and answer your messages.</p>
        </div>
        <div className="team">
          {team.map((m) => (
            <article key={m.name} className="member">
              <div className="member-photo">
                <span aria-hidden="true">{initials(m.name)}</span>
                {/* Photo sits over the initials; if the file is missing it hides and the initials show. */}
                {m.photo && <img src={m.photo} alt={m.name} loading="lazy" style={m.photoPos && { objectPosition: m.photoPos }} onError={(e) => { e.currentTarget.hidden = true }} />}
              </div>
              <div className="member-body">
                <h3>{m.name}</h3>
                <p className="role">{m.role}</p>
                <p className="">{m.tag}</p>
                {/\d/.test(m.phone) ? (
                  <>
                    <p className="num">{m.phone}</p>
                    <div className="member-actions">
                      <a className="btn" href={waLink('Hi TJM Kashmir, I have a question.', m.phone)} target="_blank" rel="noreferrer"
                        onClick={() => track('whatsapp_click', 'team:' + m.name)}>WhatsApp</a>
                      <a className="btn ghost" href={telLink(m.phone)} onClick={() => track('call_click', 'team:' + m.name)}>Call</a>
                    </div>
                  </>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="wrap about-close">
        <h2>Discover Kashmir with us.</h2>
        <p className="lead">Let us make your journey memorable.</p>
        <div className="actions">
          <WA text="Hi TJM Kashmir, I'd like to plan a Kashmir trip." label="about" />
          <Link className="quiet" to="/plan-my-trip">Plan my trip</Link>
        </div>
      </section>
      <section className="wrap partner-wrap">
        <TechPartner />
      </section>
    </Page>
  )
}


export function Contact() {
  return (
    <Page title="Contact">
      <PageHead title="Talk to us" lead="WhatsApp is the fastest way to reach us. Pick who you'd like to speak with." />
      <section className="wrap">
        <div className="people">
          {contacts.map((c) => (
            <article key={c.phone} className="person">
              <span className="avatar" aria-hidden="true">{initials(c.name)}</span>
              <div>
                <h2>{c.name}</h2>
                <p className="num">{c.phone}</p>
              </div>
              <div className="person-actions">
                <a className="btn" href={waLink('Hi TJM Kashmir, I have a question.', c.phone)} target="_blank" rel="noreferrer"
                  onClick={() => track('whatsapp_click', 'contact:' + c.name)}>WhatsApp</a>
                <a className="btn ghost" href={telLink(c.phone)} onClick={() => track('call_click', 'contact:' + c.name)}>
                  <Icon name="phone" />Call
                </a>
              </div>
            </article>
          ))}
        </div>
        <div className="follow">
          <h2>Follow and email us</h2>
          <Socials />
          {site.email && <p><a href={`mailto:${site.email}`}>{site.email}</a></p>}
        </div>
        <div className="actions">
          <Link className="quiet" to="/plan-my-trip">Plan my trip</Link>
          <Link className="quiet" to="/plan-my-event">Plan my event</Link>
        </div>
      </section>
      <section className="wrap partner-wrap">
        <TechPartner />
      </section>
    </Page>
  )
}

export function Privacy() {
  return (
    <Page title="Privacy">
      <PageHead title="Privacy notice" lead="Draft, pending client approval." />
      <section className="wrap narrow prose">
        <h2>What we collect</h2>
        <p>When you send an enquiry, we receive the details you enter (such as your name, phone number, travel dates and preferences). We use them only to reply to you and plan your trip or event.</p>
        <h2>Who we share it with</h2>
        <p>We do not sell or share your details with anyone except the hotels, transport and service partners needed for your booking.</p>
        <h2>Deleting your details</h2>
        <p>To ask us to delete your details, message us on WhatsApp or call {contacts.map((c) => `${c.name} (${c.phone})`).join(' or ')}.</p>
      </section>
    </Page>
  )
}

export function NotFound() {
  return (
    <Page title="Page not found">
      <section className="wrap narrow notfound">
        <p className="code" aria-hidden="true">404</p>
        <h1>This page took a wrong turn</h1>
        <p className="lead">Let's get you back to Srinagar.</p>
        <div className="actions">
          <Link className="btn no-icon" to="/">Go home</Link>
          <Link className="quiet" to="/destinations">Browse destinations</Link>
        </div>
      </section>
    </Page>
  )
}

export const PlanTrip = () => <FormPage title="Plan my trip" lead="Two quick steps. Only the first is required."><TripForm /></FormPage>
export const PlanEvent = () => <FormPage title="Plan my event" lead="Tell us the basics and we'll send a custom quote."><EventForm /></FormPage>
