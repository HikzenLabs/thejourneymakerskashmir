import { useEffect, useRef, useState } from 'react'
import { contacts, waLink, telLink, track } from './data'

// One dialog for the whole site. Any button calls openContact() and the visitor picks a person.
export const openContact = (kind, text = '', label = '') =>
  window.dispatchEvent(new CustomEvent('tjm:contact', { detail: { kind, text, label } }))

export const WA = ({ text, label, children = 'Chat on WhatsApp', className = 'btn' }) => (
  <button type="button" className={className} onClick={() => openContact('whatsapp', text, label)}>{children}</button>
)
export const Call = ({ children = 'Call us', className = 'quiet', label = 'call' }) => (
  <button type="button" className={className} onClick={() => openContact('call', '', label)}>{children}</button>
)

const initials = (name) => name.split(/\s+/).map((w) => w[0]).slice(0, 2).join('').toUpperCase()

export default function ContactChooser() {
  const ref = useRef(null)
  const [req, setReq] = useState({ kind: 'whatsapp' })

  useEffect(() => {
    const open = (e) => { setReq(e.detail); ref.current.showModal() }
    window.addEventListener('tjm:contact', open)
    return () => window.removeEventListener('tjm:contact', open)
  }, [])

  const wa = req.kind === 'whatsapp'
  const close = () => ref.current.close()
  return (
    <dialog
      ref={ref}
      className={'chooser ' + (wa ? 'is-wa' : 'is-call')}
      aria-labelledby="chooser-title"
      onClick={(e) => e.target === ref.current && close()}
    >
      <div className="chooser-head">
        <div>
          <h2 id="chooser-title">{wa ? 'Chat on WhatsApp' : 'Call our team'}</h2>
          <p>{wa ? 'Choose who you’d like to message.' : 'Choose who you’d like to call.'}</p>
        </div>
        <button type="button" className="chooser-x" aria-label="Close" onClick={close}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
      </div>
      <ul>
        {contacts.map((c) => (
          <li key={c.phone}>
            <a
              href={wa ? waLink(req.text, c.phone) : telLink(c.phone)}
              target={wa ? '_blank' : undefined}
              rel="noreferrer"
              onClick={() => { track(wa ? 'whatsapp_click' : 'call_click', `${req.label}:${c.name}`); close() }}
            >
              <span className="avatar" aria-hidden="true">{initials(c.name)}</span>
              <span className="who">
                <strong>{c.name}</strong>
                <span>{c.phone}</span>
              </span>
              <span className="glyph" aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </dialog>
  )
}
