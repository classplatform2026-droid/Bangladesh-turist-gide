import { useMemo, useState } from 'react'
import {
  Activity,
  ArrowRight,
  BarChart3,
  Bell,
  Bus,
  CalendarDays,
  Camera,
  Check,
  ChevronDown,
  Compass,
  Heart,
  Hotel,
  Languages,
  Leaf,
  LocateFixed,
  MapPin,
  Menu,
  MessageCircle,
  Mic,
  Mountain,
  Navigation,
  ShieldCheck,
  Sparkles,
  Star,
  SunMedium,
  User,
  Utensils,
  X,
} from 'lucide-react'

import DestinationDetails from './components/DestinationDetails'

export type Page = 'home' | 'explore' | 'details' | 'planner' | 'guide' | 'translator' | 'booking' | 'trip' | 'profile' | 'safety'

export type Destination = {
  name: string
  location: string
  category: string
  rating: number
  price: string
  image: string
  description: string
  gallery: string[]
  highlights: string[]
  bestTime: string
  duration: string
  difficulty: string
  howToGo: string
  tips: string[]
  reviewCount: number
}

const destinations: Destination[] = [
  {
    name: 'Sajek Valley',
    location: 'Rangamati, Chattogram',
    category: 'Hills',
    rating: 4.9,
    price: '৳8,500',
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80',
    description:
      'Sajek is a cloud-kissed hill destination where bamboo houses, winding roads and endless valley views create a beautiful escape. It blends dramatic mountain scenery with warm local hospitality and vibrant tribal culture.',
    gallery: [
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1501555088652-f886f2a6d5cf?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=900&q=80',
    ],
    highlights: ['Cloudy sunrise viewpoints', 'Bamboo cottage stay', 'Tribal cultural experiences'],
    bestTime: 'Oct - Mar',
    duration: '2 - 3 days',
    difficulty: 'Easy to moderate',
    howToGo: 'Bus to Khagrachhari, then local jeep or rented car',
    tips: ['Carry warm clothes for the evenings.', 'Book homestay early during holidays.', 'Try local hill chicken and bamboo rice.'],
    reviewCount: 284,
  },
  {
    name: "Cox's Bazar",
    location: 'Chattogram Division',
    category: 'Beaches',
    rating: 4.8,
    price: '৳12,000',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    description:
      'Bangladesh’s iconic sea beach stretches for miles with golden sand, turquoise water and a lively shoreline. It is ideal for both laid-back relaxation and family-friendly coastal adventures.',
    gallery: [
      'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80',
    ],
    highlights: ['Longest sea beach in the world', 'Sunset walks and seafood', 'Beachside resorts and cafés'],
    bestTime: 'Nov - Feb',
    duration: '2 - 4 days',
    difficulty: 'Easy',
    howToGo: 'Direct bus or flight to Chattogram, then road transfer',
    tips: ['Avoid peak noon heat.', 'Keep valuables secure on crowded beaches.', 'Try fresh seafood near Laboni Point.'],
    reviewCount: 562,
  },
  {
    name: 'Sundarbans',
    location: 'Khulna Division',
    category: 'Nature',
    rating: 4.7,
    price: '৳14,500',
    image: 'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1200&q=80',
    description:
      'The Sundarbans is a UNESCO-listed mangrove forest that feels wild, mysterious and deeply connected to nature. It offers boat safaris, birdwatching and an unforgettable reminder of Bangladesh’s ecological richness.',
    gallery: [
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80',
    ],
    highlights: ['Mangrove boat safari', 'Royal Bengal tiger sightings', 'Bird and crocodile spotting'],
    bestTime: 'Nov - Feb',
    duration: '2 - 3 days',
    difficulty: 'Moderate',
    howToGo: 'Drive to Khulna, then launch trip to the forest reserve',
    tips: ['Book a guided safari.', 'Carry light rain gear.', 'Follow forest authority guidance closely.'],
    reviewCount: 198,
  },
  {
    name: 'Srimangal',
    location: 'Moulvibazar, Sylhet',
    category: 'Nature',
    rating: 4.8,
    price: '৳7,200',
    image: 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=1200&q=80',
    description:
      'Known as Bangladesh’s tea capital, Srimangal offers emerald tea gardens, misty hills and quiet nature trails. It is a favorite for slow travel, scenic walks and peaceful escapes.',
    gallery: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=900&q=80',
    ],
    highlights: ['Tea garden tours', 'Misty hill drives', 'Eco-resort stays'],
    bestTime: 'Sep - Apr',
    duration: '2 days',
    difficulty: 'Easy',
    howToGo: 'Train or bus to Sylhet, then local transport to Srimangal',
    tips: ['Visit a tea estate in the morning.', 'Carry a light jacket for cool mornings.', 'Try fresh Sylheti snacks.'],
    reviewCount: 231,
  },
  {
    name: 'Rangamati',
    location: 'Chattogram Hill Tracts',
    category: 'Hills',
    rating: 4.6,
    price: '৳9,000',
    image: 'https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=1200&q=80',
    description:
      'Rangamati captures the natural beauty and cultural diversity of the hill tracts, with mountains, lakes and indigenous traditions all in one place. It is ideal for scenic drives and relaxed getaways.',
    gallery: [
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=900&q=80',
    ],
    highlights: ['Lake views and boat rides', 'Tribal markets and crafts', 'Mountain panoramas'],
    bestTime: 'Oct - Mar',
    duration: '2 - 3 days',
    difficulty: 'Easy to moderate',
    howToGo: 'Bus to Chattogram, then direct road transfer to Rangamati',
    tips: ['Visit Kaptai Lake for sunset.', 'Ask your host about local handicrafts.', 'Keep cash handy for remote areas.'],
    reviewCount: 187,
  },
  {
    name: 'Paharpur',
    location: 'Naogaon, Rajshahi',
    category: 'Heritage',
    rating: 4.7,
    price: '৳5,500',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80',
    description:
      'Paharpur is one of the most important Buddhist archaeological sites in South Asia. The ancient ruins and calm surroundings make it a fascinating educational destination for history lovers.',
    gallery: [
      'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=900&q=80',
    ],
    highlights: ['UNESCO heritage site', 'Ancient monastic ruins', 'Rich archaeology and history'],
    bestTime: 'Nov - Feb',
    duration: '1 day',
    difficulty: 'Easy',
    howToGo: 'Train or bus to Rajshahi, then short road transfer',
    tips: ['Go early to avoid heat.', 'Bring a hat and water.', 'Combine with local historical sites nearby.'],
    reviewCount: 164,
  },
  {
    name: 'Ratargul',
    location: 'Sylhet Division',
    category: 'Nature',
    rating: 4.6,
    price: '৳6,800',
    image: 'https://images.unsplash.com/photo-1473445361085-b9a07f55608b?auto=format&fit=crop&w=1200&q=80',
    description:
      'Ratargul is a freshwater swamp forest full of floating greenery, still waters and unforgettable boat routes. It is a peaceful and unique wetland experience rarely found in Bangladesh.',
    gallery: [
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1482192505345-5655af888cc4?auto=format&fit=crop&w=900&q=80',
    ],
    highlights: ['Swamp forest boat ride', 'Floating marsh ecosystem', 'Peaceful rural feel'],
    bestTime: 'Jun - Oct',
    duration: '1 day',
    difficulty: 'Easy',
    howToGo: 'Road trip to Sylhet, then local transfer to the swamp area',
    tips: ['Carry waterproof footwear.', 'Visit during monsoon for the fullest view.', 'Hire local boatmen for the best route.'],
    reviewCount: 149,
  },
]

const navItems: { label: string; page: Page; icon: any }[] = [
  { label: 'Home', page: 'home', icon: Compass },
  { label: 'Explore', page: 'explore', icon: MapPin },
  { label: 'Bookings', page: 'booking', icon: CalendarDays },
  { label: 'AI Guide', page: 'guide', icon: Sparkles },
  { label: 'Safety', page: 'safety', icon: ShieldCheck },
]

const categories = [
  { name: 'Beaches', icon: SunMedium },
  { name: 'Hills', icon: Mountain },
  { name: 'Nature', icon: Leaf },
  { name: 'Heritage', icon: LandmarkIcon },
]

function LandmarkIcon({ className }: { className?: string }) {
  return <span className={className}>◫</span>
}

function App() {
  const [page, setPage] = useState<Page>('home')
  const [selected, setSelected] = useState<Destination>(destinations[0])
  const [menuOpen, setMenuOpen] = useState(false)
  const [toast, setToast] = useState('')
  const [favorites, setFavorites] = useState<string[]>(['Sajek Valley'])

  const notify = (message: string) => {
    setToast(message)
    window.clearTimeout((window as any).__toastTimeout)
    ;(window as any).__toastTimeout = setTimeout(() => setToast(''), 2600)
  }

  const go = (target: Page, destination?: Destination) => {
    if (destination) setSelected(destination)
    setPage(target)
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const toggleFavorite = (name: string) => {
    setFavorites((current) =>
      current.includes(name) ? current.filter((item) => item !== name) : [...current, name],
    )
    notify(`${name} saved to your favorites`)
  }

  const featured = useMemo(() => destinations.slice(0, 4), [])

  return (
    <div className="min-h-screen bg-[#f8fbf9] text-[#14352b]">
      <header className="sticky top-0 z-40 border-b border-[#dfeae4] bg-[#f8fbf9]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between gap-3 px-4 lg:px-8">
          <button onClick={() => go('home')} className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#0B3D2E] text-lg font-black text-white shadow-lg shadow-[#0B3D2E]/20">B</div>
            <div className="text-left">
              <div className="text-[11px] uppercase tracking-[0.18em] text-[#71897e]">Bangladesh</div>
              <div className="text-lg font-extrabold text-[#10372d]">Travel</div>
            </div>
          </button>

          <nav className="hidden items-center gap-1 rounded-full bg-white/80 px-2 py-2 shadow-sm ring-1 ring-[#dfe7e1] lg:flex">
            {navItems.map((item) => {
              const Icon = item.icon
              const active = page === item.page
              return (
                <button
                  key={item.label}
                  onClick={() => go(item.page)}
                  className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                    active ? 'bg-[#0B3D2E] text-white shadow-md shadow-[#0B3D2E]/15' : 'text-[#234b3f] hover:bg-[#eef5f1]'
                  }`}
                >
                  <Icon size={15} />
                  {item.label}
                </button>
              )
            })}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <button onClick={() => go('profile')} className="flex items-center gap-2 rounded-full border border-[#dfe8e2] bg-white px-3 py-2 text-sm font-semibold text-[#12372d]">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#eaf1ee] text-[#0B3D2E]">
                <User size={14} />
              </div>
              Hi, Raihan
            </button>
            <button onClick={() => go('planner')} className="rounded-full bg-[#CC4E31] px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-[#CC4E31]/20">
              AI Planner
            </button>
          </div>

          <button className="rounded-xl p-2 lg:hidden" onClick={() => setMenuOpen((value) => !value)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-[#e4eee7] bg-white px-4 py-4 lg:hidden">
            <div className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.label}
                    onClick={() => go(item.page)}
                    className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-semibold text-[#12372d] hover:bg-[#edf5f1]"
                  >
                    <Icon size={16} />
                    {item.label}
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </header>

      <main>
        {page === 'home' && (
          <HomePage go={go} toggleFavorite={toggleFavorite} favorites={favorites} />
        )}
        {page === 'explore' && (
          <ExplorePage go={go} toggleFavorite={toggleFavorite} favorites={favorites} />
        )}
        {page === 'details' && (
          <DestinationDetails
            destination={selected}
            onBack={() => go('explore')}
            onPlan={() => go('planner')}
            onSave={() => toggleFavorite(selected.name)}
          />
        )}
        {page === 'planner' && <PlannerPage notify={notify} />}
        {page === 'guide' && <GuidePage notify={notify} />}
        {page === 'translator' && <TranslatorPage />}
        {page === 'booking' && <BookingPage notify={notify} />}
        {page === 'trip' && <TripPage go={go} />}
        {page === 'profile' && <ProfilePage favorites={favorites} go={go} />}
        {page === 'safety' && <SafetyPage notify={notify} />}
      </main>

      <footer className="mt-20 border-t border-[#dfeae3] bg-[#0B3D2E] text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4 lg:px-8">
          <div className="md:col-span-2">
            <div className="mb-4 flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 font-black">B</div>
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-[#b7c9c2]">Bangladesh</div>
                <div className="text-lg font-extrabold">Travel Super App</div>
              </div>
            </div>
            <p className="max-w-md text-sm leading-7 text-[#dfeae6]">
              Helping local and international travelers discover Bangladesh with confidence, smart planning, bookings and safety support.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#a1c7b8]">Explore</h4>
            <ul className="mt-4 space-y-3 text-sm text-[#eaf2f0]">
              <li>Popular routes</li>
              <li>Seasonal trips</li>
              <li>Booking tools</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#a1c7b8]">Support</h4>
            <ul className="mt-4 space-y-3 text-sm text-[#eaf2f0]">
              <li>Travel safety</li>
              <li>Tourist helpline</li>
              <li>Trip guidance</li>
            </ul>
          </div>
        </div>
      </footer>

      <button
        onClick={() => go('safety')}
        className="fixed bottom-5 right-5 z-30 flex items-center gap-2 rounded-full bg-[#CC4E31] px-4 py-3 text-sm font-bold text-white shadow-[0_18px_42px_rgba(204,78,49,0.35)] hover:scale-[1.02]"
      >
        <ShieldCheck size={16} /> SOS
      </button>

      {toast && (
        <div className="fixed left-1/2 top-5 z-50 -translate-x-1/2 rounded-full bg-[#0B3D2E] px-4 py-2 text-sm font-semibold text-white shadow-xl">
          {toast}
        </div>
      )}
    </div>
  )
}

function HomePage({
  go,
  toggleFavorite,
  favorites,
}: {
  go: (page: Page, destination?: Destination) => void
  toggleFavorite: (name: string) => void
  favorites: string[]
}) {
  return (
    <>
      <section className="hero-pattern">
        <div className="mx-auto max-w-7xl px-4 py-12 md:py-20 lg:px-8">
          <div className="max-w-2xl text-white">
            <span className="mb-5 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#dfeee7]">
              Travel with confidence
            </span>
            <h1 className="text-4xl font-black leading-[1.05] tracking-[-0.06em] md:text-6xl">
              Discover the real <span className="text-[#d5f8ea]">Bangladesh.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-white/80 md:text-lg">
              Explore, plan, book and travel with confidence across beaches, hills, heritage and nature.
            </p>

            <div className="mt-8 rounded-[26px] border border-white/10 bg-white/10 p-3 backdrop-blur-md">
              <div className="flex flex-col gap-3 md:flex-row md:items-center">
                <div className="flex flex-1 items-center gap-3 rounded-2xl bg-white px-4 py-3.5 text-[#12372d]">
                  <MapPin size={18} className="text-[#0B3D2E]" />
                  <input
                    defaultValue="Where do you want to go?"
                    className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-[#5d7b6f]"
                  />
                </div>
                <button onClick={() => go('explore')} className="rounded-2xl bg-[#0B3D2E] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#0B3D2E]/20">
                  Explore
                </button>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-3 text-sm text-white/80">
              <Check size={16} className="text-[#b8f3d4]" /> Verified local tips & AI-powered planning
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        <div className="mb-6 flex items-end justify-between gap-3">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#CC4E31]">Take your pick</p>
            <h2 className="mt-2 text-3xl font-black tracking-[-0.06em] text-[#12372d] md:text-5xl">What are you in the mood for?</h2>
          </div>
          <button onClick={() => go('explore')} className="hidden rounded-full border border-[#d5e4dc] bg-white px-4 py-2 text-sm font-semibold text-[#12372d] md:inline-flex">
            View all <ArrowRight size={16} className="ml-2" />
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <button
                key={category.name}
                onClick={() => go('explore')}
                className="rounded-[26px] border border-[#dfeae3] bg-white p-5 text-left shadow-sm hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#edf6f0] text-[#0B3D2E]">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="mt-6 text-2xl font-bold text-[#12372d]">{category.name}</div>
                <div className="mt-1 text-sm text-[#5f786f]">Explore wonders</div>
              </button>
            )
          })}
        </div>
      </section>

      <section className="bg-[#eef5f1] py-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mb-6 flex items-end justify-between gap-3">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#CC4E31]">Handpicked for you</p>
              <h2 className="mt-2 text-3xl font-black tracking-[-0.06em] text-[#12372d] md:text-5xl">Popular right now</h2>
            </div>
            <button onClick={() => go('explore')} className="hidden rounded-full border border-[#dfeae3] bg-white px-4 py-2 text-sm font-semibold text-[#12372d] md:inline-flex">
              See all <ArrowRight size={16} className="ml-2" />
            </button>
          </div>

          <div className="grid gap-5 lg:grid-cols-4">
            {featured.map((destination) => {
              const isFavorite = favorites.includes(destination.name)
              return (
                <article key={destination.name} className="overflow-hidden rounded-[28px] bg-white shadow-sm ring-1 ring-[#e2ece7] transition hover:-translate-y-1 hover:shadow-lg">
                  <div className="relative">
                    <img src={destination.image} alt={destination.name} className="h-64 w-full object-cover" />
                    <button
                      onClick={() => toggleFavorite(destination.name)}
                      className="absolute right-4 top-4 rounded-full bg-white/90 p-2 text-[#12372d] shadow-sm"
                    >
                      <Heart size={16} fill={isFavorite ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                  <div className="p-5">
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <span className="rounded-full bg-[#edf6f0] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#0B3D2E]">
                        {destination.category}
                      </span>
                      <div className="flex items-center gap-1 text-sm font-bold text-[#12372d]">
                        <Star size={14} className="fill-[#f2b84b] text-[#f2b84b]" /> {destination.rating}
                      </div>
                    </div>
                    <h3 className="text-2xl font-extrabold tracking-[-0.04em] text-[#12372d]">{destination.name}</h3>
                    <div className="mt-2 flex items-center gap-2 text-sm text-[#597367]">
                      <MapPin size={14} /> {destination.location}
                    </div>
                    <p className="mt-3 text-sm leading-6 text-[#4d685f]">{destination.description.slice(0, 100)}...</p>
                    <div className="mt-5 flex items-center justify-between">
                      <div>
                        <div className="text-[11px] uppercase tracking-[0.16em] text-[#7f8f89]">From</div>
                        <div className="text-xl font-extrabold text-[#12372d]">{destination.price}</div>
                      </div>
                      <button onClick={() => go('details', destination)} className="rounded-full bg-[#0B3D2E] px-4 py-2.5 text-sm font-bold text-white">
                        View details
                      </button>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="rounded-[30px] bg-[#0B3D2E] p-7 text-white md:p-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#dbeee6]">AI trip planner</p>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.06em] md:text-5xl">Build your next trip in minutes.</h2>
              <p className="mt-4 max-w-md text-base leading-7 text-[#d9eee7]">
                Share your destination, travel style and budget, then let our AI generate a smart itinerary for you.
              </p>
            </div>
            <div className="rounded-[26px] border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
              <div className="mb-4 flex items-center gap-2 text-sm text-white/85">
                <Sparkles size={16} className="text-[#b8f3d4]" /> Example: “3 days Sajek trip, budget ৳10,000”
              </div>
              <button onClick={() => go('planner')} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-bold text-[#0B3D2E]">
                Try the planner <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-10 md:grid-cols-3 lg:px-8">
        {[{
          icon: ShieldCheck,
          title: 'Travel with confidence',
          desc: 'Safety contacts and smart local guidance when you need it.',
        }, {
          icon: Bell,
          title: 'Stay informed',
          desc: 'Update on weather, transport, and destination alerts.',
        }, {
          icon: MessageCircle,
          title: 'Plan faster',
          desc: 'AI tools help you discover routes, places and hotels quickly.',
        }].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="rounded-[26px] border border-[#dfeae3] bg-white p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#edf6f0] text-[#0B3D2E]">
              <Icon size={20} />
            </div>
            <h3 className="mt-5 text-xl font-extrabold text-[#12372d]">{title}</h3>
            <p className="mt-2 text-sm leading-7 text-[#567167]">{desc}</p>
          </div>
        ))}
      </section>
    </>
  )
}

function ExplorePage({
  go,
  toggleFavorite,
  favorites,
}: {
  go: (page: Page, destination?: Destination) => void
  toggleFavorite: (name: string) => void
  favorites: string[]
}) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [budget, setBudget] = useState('Any')

  const filtered = destinations.filter((destination) => {
    const matchesQuery = destination.name.toLowerCase().includes(query.toLowerCase()) || destination.location.toLowerCase().includes(query.toLowerCase())
    const matchesCategory = category === 'All' || destination.category === category
    const matchesBudget = budget === 'Any' || destination.price.replace(/[৳,]/g, '').length < 6
    return matchesQuery && matchesCategory && matchesBudget
  })

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <div className="rounded-[30px] border border-[#dfeae3] bg-white p-5 shadow-sm">
        <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr_0.7fr]">
          <div className="flex items-center gap-3 rounded-2xl bg-[#f3f8f4] px-4 py-3">
            <MapPin size={18} className="text-[#0B3D2E]" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search destinations"
              className="w-full bg-transparent text-sm outline-none placeholder:text-[#637d72]"
            />
          </div>

          <select value={category} onChange={(event) => setCategory(event.target.value)} className="rounded-2xl border border-[#dfeae3] bg-[#f9fbfa] px-3 py-3 text-sm outline-none">
            <option>All</option>
            <option>Beaches</option>
            <option>Hills</option>
            <option>Nature</option>
            <option>Heritage</option>
          </select>

          <select value={budget} onChange={(event) => setBudget(event.target.value)} className="rounded-2xl border border-[#dfeae3] bg-[#f9fbfa] px-3 py-3 text-sm outline-none">
            <option>Any</option>
            <option>৳5k-8k</option>
            <option>৳8k-12k</option>
            <option>৳12k+</option>
          </select>
        </div>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((destination) => {
          const isFavorite = favorites.includes(destination.name)
          return (
            <article key={destination.name} className="overflow-hidden rounded-[28px] border border-[#dfeae3] bg-white shadow-sm">
              <div className="relative">
                <img src={destination.image} alt={destination.name} className="h-56 w-full object-cover" />
                <button onClick={() => toggleFavorite(destination.name)} className="absolute right-4 top-4 rounded-full bg-white/90 p-2 text-[#12372d]">
                  <Heart size={16} fill={isFavorite ? 'currentColor' : 'none'} />
                </button>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between gap-4">
                  <span className="rounded-full bg-[#edf6f0] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#0B3D2E]">{destination.category}</span>
                  <div className="flex items-center gap-1 text-sm font-bold text-[#12372d]">
                    <Star size={14} className="fill-[#f2b84b] text-[#f2b84b]" /> {destination.rating}
                  </div>
                </div>
                <h3 className="mt-4 text-2xl font-extrabold tracking-[-0.04em] text-[#12372d]">{destination.name}</h3>
                <div className="mt-2 flex items-center gap-2 text-sm text-[#587169]">
                  <MapPin size={14} /> {destination.location}
                </div>
                <p className="mt-3 text-sm leading-6 text-[#4c685f]">{destination.description}</p>
                <div className="mt-5 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.16em] text-[#7f8f89]">From</div>
                    <div className="text-xl font-extrabold text-[#12372d]">{destination.price}</div>
                  </div>
                  <button onClick={() => go('details', destination)} className="rounded-full bg-[#0B3D2E] px-4 py-2.5 text-sm font-bold text-white">
                    Explore
                  </button>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

function PlannerPage({ notify }: { notify: (message: string) => void }) {
  const [loading, setLoading] = useState(false)
  const [trip, setTrip] = useState('3 days Sajek trip, budget ৳10,000')
  const [result, setResult] = useState<any>(null)

  const generatePlan = () => {
    setLoading(true)
    setTimeout(() => {
      setResult({
        title: '3 days in Sajek Valley',
        budget: '৳10,400',
        transport: 'Dhaka to Khagrachhari bus + local jeep',
        hotel: 'Hillview Cottage, Sajek',
        plan: [
          { day: 'Day 1', items: ['Arrive in Sajek', 'Sunset point visit', 'Local cultural evening'] },
          { day: 'Day 2', items: ['Konglak Hill sunrise', 'Fisherman village lunch', 'Bamboo hotel evening'] },
          { day: 'Day 3', items: ['Tea break and scenic viewpoints', 'Return journey', 'Souvenir shopping'] },
        ],
      })
      setLoading(false)
      notify('AI trip plan generated successfully')
    }, 1400)
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-10 lg:px-8">
      <div className="rounded-[30px] border border-[#dfeae3] bg-white p-6 shadow-sm">
        <div className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-[#CC4E31]">AI Trip Planner</div>
        <h2 className="text-3xl font-black tracking-[-0.06em] text-[#12372d] md:text-5xl">Plan your next destination</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <input value={trip} onChange={(event) => setTrip(event.target.value)} className="rounded-2xl border border-[#dfeae3] bg-[#f9fbfa] px-4 py-3 text-sm outline-none" />
          <button onClick={generatePlan} className="rounded-2xl bg-[#0B3D2E] px-4 py-3 text-sm font-bold text-white">
            {loading ? 'Planning...' : 'Generate itinerary'}
          </button>
        </div>

        {loading && (
          <div className="mt-6 rounded-[24px] bg-[#edf6f0] p-5">
            <div className="flex items-center gap-3">
              <span className="h-3 w-3 animate-pulse rounded-full bg-[#0B3D2E]" />
              <span className="text-sm font-semibold text-[#12372d]">AI is crafting an itinerary...</span>
            </div>
            <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-[#dfeae4]">
              <div className="h-full w-2/3 animate-pulse rounded-full bg-[#0B3D2E]" />
            </div>
          </div>
        )}

        {result && (
          <div className="mt-6 rounded-[28px] bg-[#f5faf6] p-5 ring-1 ring-[#dfeae4]">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-sm font-bold uppercase tracking-[0.18em] text-[#768c82]">Itinerary</div>
                <h3 className="mt-2 text-2xl font-black text-[#12372d]">{result.title}</h3>
              </div>
              <div className="rounded-full bg-[#0B3D2E] px-3 py-2 text-sm font-bold text-white">Estimated budget: {result.budget}</div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <div className="text-[11px] uppercase tracking-[0.16em] text-[#7f8f89]">Transport</div>
                <div className="mt-2 text-sm font-bold text-[#12372d]">{result.transport}</div>
              </div>
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <div className="text-[11px] uppercase tracking-[0.16em] text-[#7f8f89]">Hotel</div>
                <div className="mt-2 text-sm font-bold text-[#12372d]">{result.hotel}</div>
              </div>
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <div className="text-[11px] uppercase tracking-[0.16em] text-[#7f8f89]">Best time</div>
                <div className="mt-2 text-sm font-bold text-[#12372d]">Oct - Mar</div>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {result.plan.map((item: any) => (
                <div key={item.day} className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-[#dfeae4]">
                  <div className="text-lg font-extrabold text-[#12372d]">{item.day}</div>
                  <ul className="mt-3 space-y-2 text-sm text-[#4d685f]">
                    {item.items.map((line: string) => (
                      <li key={line} className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-[#0B3D2E]" /> {line}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function GuidePage({ notify }: { notify: (message: string) => void }) {
  const [image, setImage] = useState('https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80')
  const [selected, setSelected] = useState(true)

  return (
    <section className="mx-auto max-w-5xl px-4 py-10 lg:px-8">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-[30px] border border-[#dfeae3] bg-white p-6 shadow-sm">
          <div className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-[#CC4E31]">AI Visual Guide</div>
          <h2 className="text-3xl font-black tracking-[-0.06em] text-[#12372d]">Upload a landmark</h2>
          <div className="mt-5 rounded-[24px] border border-dashed border-[#cfe0d7] bg-[#f5faf6] p-5 text-center">
            <Camera size={30} className="mx-auto text-[#0B3D2E]" />
            <div className="mt-3 text-sm font-semibold text-[#12372d]">Upload or choose a landmark image</div>
            <input type="file" className="mt-4 block w-full text-sm text-[#465e54]" onChange={() => setSelected(true)} />
          </div>
          <button onClick={() => { setSelected(true); notify('Visual recognition complete') }} className="mt-5 rounded-2xl bg-[#0B3D2E] px-4 py-3 text-sm font-bold text-white">
            Identify landmark
          </button>
        </div>

        <div className="rounded-[30px] border border-[#dfeae3] bg-white p-5 shadow-sm">
          <img src={image} alt="Somapura Mahavihara" className="h-64 w-full rounded-[24px] object-cover" />
          {selected && (
            <div className="mt-5">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-black text-[#12372d]">Somapura Mahavihara</h3>
                <button className="rounded-full bg-[#edf6f0] p-2 text-[#0B3D2E]"> <Heart size={16} /> </button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-[0.12em]">
                <span className="rounded-full bg-[#edf6f0] px-2.5 py-1 text-[#0B3D2E]">Historical Site</span>
                <span className="rounded-full bg-[#edf6f0] px-2.5 py-1 text-[#0B3D2E]">Paharpur, Naogaon</span>
              </div>
              <p className="mt-4 text-sm leading-7 text-[#4d685f]">
                Somapura Mahavihara is one of the largest Buddhist monasteries in South Asia and one of Bangladesh’s most treasured heritage sites. It reflects a remarkable chapter in the region’s intellectual and religious history.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <button className="inline-flex items-center gap-2 rounded-full bg-[#0B3D2E] px-4 py-2.5 text-sm font-bold text-white"><Mic size={15} /> Listen</button>
                <button className="inline-flex items-center gap-2 rounded-full border border-[#dfeae3] px-4 py-2.5 text-sm font-bold text-[#12372d]"><MapPin size={15} /> Show on map</button>
                <button className="inline-flex items-center gap-2 rounded-full border border-[#dfeae3] px-4 py-2.5 text-sm font-bold text-[#12372d]"><Check size={15} /> Save</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function TranslatorPage() {
  const [text, setText] = useState('Where is the nearest tea garden?')
  const [lang, setLang] = useState<'bn' | 'en'>('en')
  const [output, setOutput] = useState('চা বাগানটি কোথায়?')

  const translate = () => {
    setOutput(lang === 'en' ? 'চা বাগানটি কোথায়?' : 'Where is the nearest tea garden?')
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-10 lg:px-8">
      <div className="rounded-[30px] border border-[#dfeae3] bg-white p-6 shadow-sm">
        <div className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-[#CC4E31]">AI Translator</div>
        <h2 className="text-3xl font-black tracking-[-0.06em] text-[#12372d] md:text-5xl">Bengali ↔ English</h2>

        <div className="mt-6 flex items-center gap-3 rounded-2xl bg-[#f3f8f4] p-2">
          <button onClick={() => setLang('bn')} className={`rounded-full px-4 py-2 text-sm font-bold ${lang === 'bn' ? 'bg-[#0B3D2E] text-white' : 'text-[#12372d]'}`}>
            BN → EN
          </button>
          <button onClick={() => setLang('en')} className={`rounded-full px-4 py-2 text-sm font-bold ${lang === 'en' ? 'bg-[#0B3D2E] text-white' : 'text-[#12372d]'}`}>
            EN → BN
          </button>
          <button className="ml-auto rounded-full bg-white p-2.5 text-[#0B3D2E] shadow-sm ring-1 ring-[#dfeae3]">
            <Mic size={16} />
          </button>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <textarea value={text} onChange={(event) => setText(event.target.value)} className="min-h-[120px] rounded-[24px] border border-[#dfeae3] bg-[#f9fbfa] p-4 text-sm leading-7 outline-none" />
          <div className="rounded-[24px] border border-[#dfeae3] bg-[#f9fbfa] p-4 text-sm leading-7 text-[#12372d]">{output}</div>
        </div>

        <button onClick={translate} className="mt-5 rounded-2xl bg-[#0B3D2E] px-5 py-3 text-sm font-bold text-white">Translate</button>

        <div className="mt-8 rounded-[24px] bg-[#f5faf6] p-4">
          <div className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-[#768c82]">Conversation</div>
          <div className="space-y-3 text-sm">
            <div className="ml-auto max-w-[80%] rounded-2xl bg-[#0B3D2E] px-4 py-3 text-white">Where can I find a tea garden nearby?</div>
            <div className="max-w-[80%] rounded-2xl bg-white px-4 py-3 text-[#12372d] ring-1 ring-[#dfeae3]">আপনি সিলেটের কাছাকাছি চা বাগান খুঁজে পেতে পারেন।</div>
          </div>
        </div>
      </div>
    </section>
  )
}

function BookingPage({ notify }: { notify: (message: string) => void }) {
  const [mode, setMode] = useState<'Transport' | 'Stay'>('Stay')
  const [selectedOption, setSelectedOption] = useState<number | null>(1)
  const options = [
    { name: 'Greenline Executive', price: '৳1,750', time: '8:00 AM', type: 'AC bus' },
    { name: 'Sundarban Coastal Stay', price: '৳4,800', time: '2 nights', type: 'Resort' },
    { name: 'Jungle View Resort', price: '৳6,200', time: '3 nights', type: 'Eco lodge' },
  ]

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 lg:px-8">
      <div className="rounded-[30px] border border-[#dfeae3] bg-white p-6 shadow-sm">
        <div className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-[#CC4E31]">Book your trip</div>
        <h2 className="text-3xl font-black tracking-[-0.06em] text-[#12372d] md:text-5xl">Transport & stay booking</h2>

        <div className="mt-6 flex gap-3 rounded-2xl bg-[#f3f8f4] p-2">
          {['Transport', 'Stay'].map((item) => (
            <button key={item} onClick={() => setMode(item as 'Transport' | 'Stay')} className={`rounded-full px-4 py-2 text-sm font-bold ${mode === item ? 'bg-[#0B3D2E] text-white' : 'text-[#12372d]'}`}>
              {item}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <input className="rounded-2xl border border-[#dfeae3] bg-[#f9fbfa] px-4 py-3 text-sm outline-none" placeholder="From" />
          <input className="rounded-2xl border border-[#dfeae3] bg-[#f9fbfa] px-4 py-3 text-sm outline-none" placeholder="To" />
          <input className="rounded-2xl border border-[#dfeae3] bg-[#f9fbfa] px-4 py-3 text-sm outline-none" placeholder="Date" type="date" />
          <button className="rounded-2xl bg-[#0B3D2E] px-4 py-3 text-sm font-bold text-white">Search</button>
        </div>

        <div className="mt-8 space-y-4">
          {options.map((option, idx) => (
            <div key={option.name} className={`flex flex-col gap-4 rounded-[24px] border p-4 md:flex-row md:items-center md:justify-between ${selectedOption === idx ? 'border-[#0B3D2E] bg-[#eef6f1]' : 'border-[#dfeae3] bg-white'}`}>
              <div>
                <div className="text-lg font-extrabold text-[#12372d]">{option.name}</div>
                <div className="mt-1 text-sm text-[#597367]">{option.type} • {option.time}</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-xl font-extrabold text-[#12372d]">{option.price}</div>
                <button onClick={() => setSelectedOption(idx)} className="rounded-full bg-[#0B3D2E] px-4 py-2.5 text-sm font-bold text-white">
                  {selectedOption === idx ? 'Selected' : 'Select'}
                </button>
              </div>
            </div>
          ))}
        </div>

        <button onClick={() => notify('Booking confirmed successfully')} className="mt-6 rounded-2xl bg-[#CC4E31] px-5 py-3 text-sm font-bold text-white">Confirm booking</button>
      </div>
    </section>
  )
}

function TripPage({ go }: { go: (page: Page, destination?: Destination) => void }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10 lg:px-8">
      <div className="rounded-[30px] border border-[#dfeae3] bg-white p-6 shadow-sm">
        <div className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-[#CC4E31]">My trip</div>
        <h2 className="text-3xl font-black tracking-[-0.06em] text-[#12372d] md:text-5xl">Upcoming journey</h2>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[26px] bg-[#f5faf6] p-5 ring-1 ring-[#dfeae3]">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[11px] uppercase tracking-[0.16em] text-[#7f8f89]">Destination</div>
                <div className="mt-2 text-2xl font-black text-[#12372d]">Sajek Valley</div>
              </div>
              <div className="rounded-full bg-[#0B3D2E] px-3 py-1.5 text-sm font-bold text-white">4 days</div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-white p-4"><div className="text-[11px] uppercase tracking-[0.16em] text-[#7f8f89]">Hotel</div><div className="mt-2 text-sm font-bold text-[#12372d]">Hillview Cottage</div></div>
              <div className="rounded-2xl bg-white p-4"><div className="text-[11px] uppercase tracking-[0.16em] text-[#7f8f89]">Transport</div><div className="mt-2 text-sm font-bold text-[#12372d]">Dhaka → Khagrachhari</div></div>
            </div>

            <div className="mt-6 space-y-3 text-sm text-[#4d685f]">
              {['Day 1: Scenic road trip', 'Day 2: Sunset point and local culture', 'Day 3: Village walk and tea break', 'Day 4: Return journey'].map((item) => (
                <div key={item} className="flex gap-2"><Check size={15} className="mt-0.5 shrink-0 text-[#0B3D2E]" /> {item}</div>
              ))}
            </div>
          </div>

          <div className="rounded-[26px] bg-white p-5 ring-1 ring-[#dfeae3]">
            <div className="text-[11px] uppercase tracking-[0.16em] text-[#7f8f89]">Budget</div>
            <div className="mt-2 text-3xl font-extrabold text-[#12372d]">৳10,400</div>
            <div className="mt-4 space-y-3 text-sm text-[#4d685f]">
              <div className="flex justify-between"><span>Hotel</span><span>৳4,000</span></div>
              <div className="flex justify-between"><span>Transport</span><span>৳3,200</span></div>
              <div className="flex justify-between"><span>Food</span><span>৳2,500</span></div>
              <div className="flex justify-between"><span>Activities</span><span>৳700</span></div>
            </div>
            <button onClick={() => go('booking')} className="mt-6 w-full rounded-2xl bg-[#CC4E31] px-4 py-3 text-sm font-bold text-white">Manage booking</button>
          </div>
        </div>
      </div>
    </section>
  )
}

function ProfilePage({ favorites, go }: { favorites: string[]; go: (page: Page, destination?: Destination) => void }) {
  return (
    <section className="mx-auto max-w-5xl px-4 py-10 lg:px-8">
      <div className="rounded-[30px] border border-[#dfeae3] bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#0B3D2E] text-xl font-black text-white">R</div>
          <div>
            <div className="text-2xl font-black text-[#12372d]">Raihan</div>
            <div className="text-sm text-[#597367]">Traveller profile</div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-[24px] bg-[#f5faf6] p-5 ring-1 ring-[#dfeae3]">
            <div className="text-[11px] uppercase tracking-[0.16em] text-[#7f8f89]">Saved destinations</div>
            <div className="mt-4 space-y-3">
              {favorites.map((item) => (
                <button key={item} onClick={() => go('explore')} className="flex w-full items-center justify-between rounded-2xl bg-white p-3 text-left text-sm font-semibold text-[#12372d] shadow-sm">
                  <span>{item}</span>
                  <ArrowRight size={15} />
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[24px] bg-[#f5faf6] p-5 ring-1 ring-[#dfeae3]">
            <div className="text-[11px] uppercase tracking-[0.16em] text-[#7f8f89]">Booking history</div>
            <div className="mt-4 space-y-3 text-sm text-[#4d685f]">
              <div className="rounded-2xl bg-white p-3">Cox’s Bazar • 2 nights</div>
              <div className="rounded-2xl bg-white p-3">Srimangal • 3 nights</div>
              <div className="rounded-2xl bg-white p-3">Rangamati • 2 nights</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function SafetyPage({ notify }: { notify: (message: string) => void }) {
  const [confirmed, setConfirmed] = useState(false)
  const actions = [
    { title: '999 Emergency Call', detail: 'National emergency hotline', icon: Activity },
    { title: 'Tourist Police', detail: '+880 1xxx-xxxx', icon: ShieldCheck },
    { title: 'Share Location', detail: 'Send current location to family', icon: LocateFixed },
    { title: 'Nearby Hospital', detail: 'Nearest medical assistance', icon: BarChart3 },
    { title: 'Nearby Police Station', detail: 'Find local help', icon: Bell },
  ]

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 lg:px-8">
      <div className="rounded-[30px] border border-[#dfeae3] bg-white p-6 shadow-sm">
        <div className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-[#CC4E31]">Safety & SOS</div>
        <h2 className="text-3xl font-black tracking-[-0.06em] text-[#12372d] md:text-5xl">Travel with confidence</h2>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {actions.map(({ title, detail, icon: Icon }) => (
            <div key={title} className="rounded-[24px] bg-[#f5faf6] p-5 ring-1 ring-[#dfeae3]">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0B3D2E] text-white">
                <Icon size={20} />
              </div>
              <div className="mt-4 text-lg font-extrabold text-[#12372d]">{title}</div>
              <div className="mt-2 text-sm text-[#597367]">{detail}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-[28px] bg-[#fff2ee] p-5 ring-1 ring-[#f6d4c7]">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <div className="text-[11px] uppercase tracking-[0.16em] text-[#c9674d]">Emergency</div>
              <div className="mt-2 text-2xl font-black text-[#12372d]">Need urgent help?</div>
            </div>
            <button
              onClick={() => setConfirmed((value) => !value)}
              className="rounded-full bg-[#CC4E31] px-4 py-2.5 text-sm font-bold text-white"
            >
              {confirmed ? 'SOS enabled' : 'Trigger SOS'}
            </button>
          </div>

          {confirmed && (
            <div className="mt-4 rounded-2xl bg-white p-4 text-sm text-[#4d685f] ring-1 ring-[#f1d8d1]">
              SOS action confirmed. Emergency services, your location and emergency contacts have been prepared.
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default App
