// All site content lives here, so a price or text change is a one-line edit.

// Every WhatsApp / Call button asks the visitor which of these to contact.
export const contacts = [
  { name: 'Syed Shafayat', phone: '+91 9103203 359' },
  { name: 'Ahil', phone: '+91 88990 02449' },
]

export const site = {
  name: 'The Journey Makers Kashmir',
  short: 'TJM Kashmir',
  tagline: 'Your Journey, Our Responsibility. An Tourism unit of Window of Kashmir',
  signoff: 'Explore Kashmir. Create Memories. Travel With Us.',
  phones: contacts.map((c) => c.phone),
  email: 'contact@thejourneymakers.com', // TODO: real business Gmail (client Q6)
}

// TODO: replace the '#' placeholders with the real profile URLs (client Q8).
// Technology partner shown in the footer.
export const techPartner = {
  name: 'HikzenLabs',
  logo: '/hikzenlabs.png',
  url: 'https://www.hikzenlabs.com',
  whatsapp: '+91 78899 12123',
}

export const socials = [
  { id: 'instagram', label: 'Instagram', href: '#' },
  { id: 'facebook', label: 'Facebook', href: '#' },
  { id: 'youtube', label: 'YouTube', href: '#' },
  { id: 'gmail', label: 'Gmail', href: `mailto:${site.email}` },
]

// About page team. photo: put a file in public/team/ and set e.g. '/team/shafayat.jpg'.
// TODO: confirm roles and the third member with the client.
export const team = [
  { name: 'Syed Shafayat', role: 'Founder & Managing Director (MD)', tag: 'Providing leadership and strategic direction to the organisation.', phone: '+91 9103203 359', photo: '/team/shafayat.webp' },
  { name: 'Ahil Farooq', role: 'Co-Founder & Chief Executive Officer (CEO)', tag: 'Leading business operations and organisational growth.', phone: '+91 88990 02449', photo: '/team/ahil.jpeg' },
  { name: 'Syed Moin Geelani', role: 'Chief Advisor | Board of Directors', tag: 'Advising on overall strategy, supervision and tourism development.', phone: '+91 70062 27685', photo: '' },
  { name: 'Syed Zubair Kazmi', role: 'Advisor | Board of Directors', tag: '', phone: 'NA', photo: '' },
  { name: 'Syed Aamir', role: 'Advisor | Board of Directors', tag: '', phone: 'NA', photo: '' },
]
 

const digits = (phone) => phone.replace(/\D/g, '')
export const waLink = (text, phone) => `https://wa.me/${digits(phone)}?text=${encodeURIComponent(text)}`
export const telLink = (phone) => `tel:+${digits(phone)}`

// Every WhatsApp/call click is an analytics event. No-op until analytics is added (client Q14).
export const track = (name, label) => window.gtag?.('event', name, { event_label: label })

const img = (id, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`

export const photos = {
  hero: img('1598091383021-15ddea10925d', 1800),
  wedding: img('1587271636175-90d58cdad458'),
  catering: img('1601482441062-b9f13131f33a'),
  about: '/team-photo.webp', // TJM team with their welcome banner
}

export const packages = [
  {
    id: 'deluxe',
    name: 'Deluxe',
    price: 10500,
    points: ['Good, comfortable hotels', 'Breakfast and dinner', 'Best available taxi', 'Comfortable stay and sightseeing'],
  },
  {
    id: 'super-deluxe',
    name: 'Super Deluxe',
    price: 12999,
    points: ['All 3-star hotels', 'Breakfast and dinner', 'Best taxi service', 'Comfortable and premium stay'],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 18999,
    points: ['3-star plus / premium accommodation', 'Breakfast and dinner', 'Premium taxi', 'Premium stay and sightseeing experience'],
  },
]

export const nights = '[N] nights' // TODO: package durations (client Q1)

export const extras = [
  ['Free shikara ride', 'An evening on Dal Lake, on us.'],
  ['Mushtaq Kahwa', 'The famous Kashmiri welcome drink when you arrive.'],
  ['DSLR photo shoot', 'A complimentary shoot so you go home with real pictures.'],
  ['Gift voucher', 'A free voucher with every package.'],
]

export const inr = (n) => '₹' + n.toLocaleString('en-IN')

export const destinations = [
  {
    slug: 'gulmarg', name: 'Gulmarg', line: 'Snow, skiing and the gondola',
    intro: 'A high meadow that turns into one of Asia’s best-known ski slopes in winter. In summer it is wildflowers, golf and wide mountain views.',
    activities: ['Gondola ride', 'Skiing and snowboarding', 'Sledging', 'Meadow walks'],
    duration: '1–2 days', photo: img('1651509094074-e8acaeb84d8f'),
  },
  {
    slug: 'srinagar', name: 'Srinagar & Dal Lake', line: 'Shikaras, houseboats and Mughal gardens',
    intro: 'Where every TJM trip starts and ends. Drift across Dal Lake, sleep on a houseboat and walk the Mughal gardens.',
    activities: ['Shikara ride', 'Houseboat stay', 'Mughal gardens', 'Old city and markets'],
    duration: '2–3 days', photo: img('1715457573748-8e8a70b2c1be'),
  },
  {
    slug: 'pahalgam', name: 'Pahalgam', line: 'Valleys, rivers and pine forest',
    intro: 'The Lidder river runs through a green valley ringed by pine. Base for Aru, Betaab and Baisaran valleys.',
    activities: ['Aru and Betaab valleys', 'Pony rides', 'River-side walks', 'Baisaran meadow'],
    duration: '1–2 days', photo: img('1701957494338-95527b753a7f'),
  },
  {
    slug: 'sonamarg', name: 'Sonamarg', line: 'Alpine meadows and glaciers',
    intro: 'The “meadow of gold”: open alpine country with the Thajiwas glacier a short ride away.',
    activities: ['Thajiwas glacier', 'Pony rides', 'Riverside picnics', 'Adventure activities'],
    duration: '1 day', photo: img('1623996243194-fd281057d568'),
  },
  {
    slug: 'yusmarg', name: 'Yusmarg', line: 'Quiet meadows and forest',
    intro: 'A calm meadow fringed by pine and fir, far from the crowds. Good for a slow day outdoors.',
    activities: ['Forest walks', 'Picnics', 'Pony rides', 'Doodh Ganga stream'],
    duration: '1 day', photo: img('1668173443752-bdec2fbb3c79'),
  },
  {
    slug: 'manasbal', name: 'Manasbal Lake', line: 'Lakeside calm and photography',
    intro: 'A deep, still lake close to Srinagar, known for lotus blooms and clear reflections.',
    activities: ['Lakeside sightseeing', 'Photography', 'Boating', 'Relaxation'],
    duration: 'Half day', photo: img('1595815771614-ade9d652a65d'),
  },
  {
    slug: 'wular', name: 'Wular Lake', line: 'Birdwatching and local life',
    intro: 'One of Asia’s largest freshwater lakes, with fishing villages and migratory birds.',
    activities: ['Lake experiences', 'Birdwatching', 'Village exploration', 'Sunset views'],
    duration: 'Half day', photo: img('1614591276564-7b3e69347a48'),
  },
  {
    slug: 'uri', name: 'Uri', line: 'The Window of Kashmir. Where nature, heritage and hospitality meet.', offbeat: true,
    intro: 'Uri, nestled in the picturesque Baramulla district of Jammu & Kashmir, is a region blessed with breathtaking mountain landscapes, flowing rivers, lush green valleys and a rich cultural heritage. Often celebrated as the “Window of Kashmir,” Uri holds a distinctive place in the region’s geographical, historical and cultural identity.',
    activities: ['Noorkhah Waterfall', 'Limber Wildlife Sanctuary', 'Lachipora Wildlife Sanctuary', 'Historic landmarks', 'Traditional villages', 'Jhelum valley drive'],
    duration: '1–2 days', photo: '/gallery/uri/jhelum-valley.jpeg',
    // Long-form story shown on the Uri page, one paragraph per item.
    story: {
      title: 'Uri: the Window of Kashmir',
      paras: [
        'From the pristine beauty of Noorkhah Waterfall and the wilderness of Limber and Lachipora Wildlife Sanctuaries to its historic landmarks, traditional villages and warm hospitality, Uri offers an experience that goes far beyond conventional tourism. It is a destination waiting to be discovered, experienced and celebrated.',
      ],
      sub: 'Window of Kashmir (WoK)',
      subParas: [
        'Window of Kashmir (WoK) is a community-based digital platform originating from Uri, founded with the vision of showcasing the region’s untapped potential and bringing its stories to the forefront. Through digital storytelling, tourism promotion, photography, filmmaking and local documentation, WoK works to highlight Uri’s natural attractions, historical landmarks, cultural traditions, local businesses and emerging talent. The platform serves as a bridge between Uri and the wider world, creating visibility for a region whose beauty, heritage and stories deserve greater recognition.',
        'Beyond digital promotion, Window of Kashmir aspires to make tourism a meaningful source of opportunity for local communities. By promoting unexplored destinations, encouraging local entrepreneurship, connecting travellers with local service providers, highlighting homestays and tourism initiatives, and empowering young people to participate in the tourism ecosystem, WoK seeks to contribute to sustainable regional development. Its larger vision is to position Uri as a recognised tourism destination while preserving its cultural identity, protecting its natural environment and creating opportunities for the generations to come.',
      ],
    },
    gallery: [
      { src: '/gallery/uri/jhelum-valley.jpeg', alt: 'The Jhelum river winding through the Uri valley' },
      { src: '/gallery/uri/waterfall.webp', alt: 'A tall waterfall falling down a rock face in Uri' },
      { src: '/gallery/uri/meadow.jpeg', alt: 'A green meadow below pine-covered hills in Uri' },
      { src: '/gallery/uri/sunset-river.webp', alt: 'Sunset over a mountain river in Uri' },
      { src: '/gallery/uri/window-of-kashmir.webp', alt: 'Two trekkers holding a Window of Kashmir banner on a flowering hillside' },
    ],
  },
  {
    slug: 'gurez', name: 'Gurez Valley', line: 'Log houses beneath Habba Khatoon peak', offbeat: true,
    intro: 'A remote valley along the Kishanganga, with Dard-Shina villages and wooden homes.',
    activities: ['Habba Khatoon peak', 'Village homestays', 'Kishanganga river', 'Local culture'],
    duration: '2–3 days', photo: img('1661668677794-6248890f6157'),
  },
  {
    slug: 'keran', name: 'Keran Valley', line: 'River-side border village', offbeat: true,
    intro: 'A quiet riverside village in Kupwara, surrounded by forested hills.',
    activities: ['River views', 'Village walks', 'Local food', 'Photography'],
    duration: '1–2 days', photo: img('1667125725078-7350e17c6329'),
  },
  {
    slug: 'karnah', name: 'Karnah Valley', line: 'Over the Sadhna pass', offbeat: true,
    intro: 'Reached over the Sadhna pass, a green valley with its own language and traditions.',
    activities: ['Sadhna pass drive', 'Local communities', 'Valley walks', 'Cultural heritage'],
    duration: '2 days', photo: img('1716746021360-3081b62f4f15'),
  },
]

export const offbeatNote =
  'Hidden Kashmir trips cost more because of distance, limited accommodation, logistics and permits. All trips are subject to government regulations, security advisories, road conditions and access permissions.'

export const travelServices = [
  'Guides and local assistance', 'Hotel, homestay and houseboat bookings', 'Flight booking assistance',
  'Airport pickup and drop', 'Private transport', 'Meals', 'Customised itineraries',
  'Travel coordination, safety guidance and emergency help',
]

export const eventServices = [
  ['Food and menus', 'Traditional Kashmiri Wazwan, veg and non-veg, buffets, snacks and beverages, custom menus.'],
  ['Catering', 'Professional teams, buffet management, dining setup, crockery and equipment, on-site coordination.'],
  ['Volunteers and event staff', 'Reception, registration desks, seating, crowd control and logistics for conferences, seminars, school and college events, job fairs, exhibitions, tournaments and public gatherings.'],
  ['Tents, decor and venue setup', 'Marquees, stages, wedding decor, seating, tables and chairs, lighting and sound, themes and venue preparation.'],
]

export const eventTypes = [
  'Wedding or family event', 'Educational event', 'Corporate or professional event', 'Sports event', 'Community or cultural event',
]

export const eventTiers = ['Basic', 'Standard', 'Luxury']
