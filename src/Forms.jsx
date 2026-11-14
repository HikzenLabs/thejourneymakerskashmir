import { useState } from 'react'
import { Link } from 'react-router-dom'
import './styles/pages.css'
import { destinations, eventTypes, eventTiers, packages, contacts } from './data'
import { WA } from './Contact'

// Field names double as labels in the WhatsApp summary.
function summarise(form, title) {
  const out = {}
  for (const [k, v] of new FormData(form)) {
    if (k === 'website' || !String(v).trim()) continue // honeypot + empties
    out[k] = out[k] ? out[k] + ', ' + v : v
  }
  return [title, ...Object.entries(out).map(([k, v]) => `${k}: ${v}`)].join('\n')
}

// ponytail: no form-to-email provider yet, so the enquiry goes out via WhatsApp only.
// Add Web3Forms/Formspree POST in onSubmit once the provider and business email are chosen.
function Sent({ text, label }) {
  return (
    <div className="sent card" role="status">
      <span className="sent-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
      </span>
      <h2>Your enquiry is ready</h2>
      <p>Tap below to send it to our team on WhatsApp. We review every enquiry and reply with a personalised quote.</p>
      <WA text={text} label={label}>Send on WhatsApp</WA>
      <pre className="summary">{text}</pre>
      <p className="fine">Prefer to call? {contacts.map((c) => `${c.name}: ${c.phone}`).join(' · ')}</p>
    </div>
  )
}

const Privacy = () => (
  <p className="fine">
    We only use these details to reply to your enquiry. See our <Link to="/privacy">privacy notice</Link>.
  </p>
)
const Honeypot = () => (
  <input className="hp" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
)

function useSubmit(title, label) {
  const [text, setText] = useState(null)
  const onSubmit = (e) => {
    e.preventDefault()
    if (e.currentTarget.website.value) return setText('') // bot
    setText(summarise(e.currentTarget, title))
    window.scrollTo({ top: 0 })
  }
  return [text, onSubmit, label]
}

const today = new Date().toISOString().slice(0, 10)
const phoneProps = { type: 'tel', required: true, pattern: '[+0-9 ]{10,15}', title: '10 to 15 digits, e.g. +91 98765 43210' }

export function TripForm() {
  const [step, setStep] = useState(1)
  const [text, onSubmit, label] = useSubmit('New trip enquiry (website)', 'form:trip')
  if (text !== null) return <Sent text={text} label={label} />

  const next = (e) => {
    const form = e.currentTarget.form
    if (form.reportValidity()) setStep(2)
  }

  return (
    <form className="form card" onSubmit={onSubmit}>
      <Honeypot />
      <div className="steps" aria-hidden="true">
        <span className={step === 1 ? 'on' : 'done'}>1. The basics</span>
        <span className={step === 2 ? 'on' : ''}>2. Optional details</span>
        <div className="progress"><i style={{ width: step === 1 ? '50%' : '100%' }} /></div>
      </div>
      <fieldset hidden={step !== 1}>
        <legend className="sr">Step 1 of 2: the basics</legend>
        <label>Your name<input name="Name" required autoComplete="name" /></label>
        <label>WhatsApp number<input name="WhatsApp" {...phoneProps} autoComplete="tel" /></label>
        <fieldset className="checks">
          <legend>Where would you like to go?</legend>
          <label className="check"><input type="checkbox" name="Destinations" value="Not sure, suggest for me" /> Not sure, suggest for me</label>
          {destinations.map((d) => (
            <label key={d.slug} className="check"><input type="checkbox" name="Destinations" value={d.name} /> {d.name}</label>
          ))}
        </fieldset>
        <div className="row">
          <label>Arrival date<input type="date" name="Arrival" min={today} required /></label>
          <label>Travellers<input type="number" name="Travellers" min="1" defaultValue="2" required /></label>
        </div>
        <div className="actions">
          <button type="button" className="btn no-icon" onClick={next}>Next: optional details</button>
          <button type="submit" className="quiet">Skip and send now</button>
        </div>
      </fieldset>

      <fieldset hidden={step !== 2}>
        <legend className="sr">Step 2 of 2: optional details</legend>
        <div className="row">
          <label>Days<input type="number" name="Days" min="1" /></label>
          <label>Nights<input type="number" name="Nights" min="0" /></label>
        </div>
        <label>Stay
          <select name="Stay" defaultValue="">
            <option value="">No preference</option>
            {packages.map((p) => <option key={p.id}>{p.name}</option>)}
            <option>Houseboat</option>
            <option>Homestay</option>
          </select>
        </label>
        <label>Transport
          <select name="Transport" defaultValue="">
            <option value="">No preference</option>
            <option>Sedan</option><option>SUV</option><option>Tempo Traveller</option><option>Bus</option>
          </select>
        </label>
        <label>Meals
          <select name="Meals" defaultValue="">
            <option value="">No preference</option>
            <option>Breakfast and dinner</option><option>All meals</option><option>Vegetarian only</option>
          </select>
        </label>
        <label>Budget per person (₹)<input name="Budget" inputMode="numeric" /></label>
        <label>Special requests<textarea name="Requests" rows="3" /></label>
        <div className="actions">
          <button type="submit" className="btn no-icon">Get My Custom Travel Package</button>
          <button type="button" className="quiet" onClick={() => setStep(1)}>Back</button>
        </div>
      </fieldset>
      <Privacy />
    </form>
  )
}

export function EventForm() {
  const [text, onSubmit, label] = useSubmit('New event enquiry (website)', 'form:event')
  if (text !== null) return <Sent text={text} label={label} />
  return (
    <form className="form card" onSubmit={onSubmit}>
      <Honeypot />
      <label>Your name<input name="Name" required autoComplete="name" /></label>
      <label>Phone<input name="Phone" {...phoneProps} autoComplete="tel" /></label>
      <label>Event type
        <select name="Event type" required defaultValue="">
          <option value="" disabled>Choose one</option>
          {eventTypes.map((t) => <option key={t}>{t}</option>)}
        </select>
      </label>
      <div className="row">
        <label>Date<input type="date" name="Date" min={today} required /></label>
        <label>Guests<input type="number" name="Guests" min="1" required /></label>
      </div>
      <label>Location<input name="Location" /></label>
      <fieldset className="checks">
        <legend>Services needed</legend>
        {['Food and menus', 'Catering', 'Volunteers and staff', 'Tents, decor and venue'].map((s) => (
          <label key={s} className="check"><input type="checkbox" name="Services" value={s} /> {s}</label>
        ))}
      </fieldset>
      <label>Preferred package
        <select name="Package" defaultValue="">
          <option value="">Not sure yet</option>
          {eventTiers.map((t) => <option key={t}>{t}</option>)}
        </select>
      </label>
      <label>Budget (₹)<input name="Budget" inputMode="numeric" /></label>
      <label>Anything else we should know<textarea name="Instructions" rows="3" /></label>
      <div className="actions"><button type="submit" className="btn no-icon">Plan My Event</button></div>
      <Privacy />
    </form>
  )
}
