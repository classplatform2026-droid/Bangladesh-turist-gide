import { useMemo, useState } from 'react'
import { ArrowLeft, CalendarDays, Check, ChevronLeft, ChevronRight, Heart, MapPin, Navigation, Share2, Star, X } from 'lucide-react'

type Destination = {
  name: string
  location: string
  category: string
  rating: number
  price: string
  image: string
  description: string
  gallery?: string[]
  highlights?: string[]
  bestTime?: string
  duration?: string
  difficulty?: string
  howToGo?: string
  tips?: string[]
  reviewCount?: number
}

type Props = {
  destination: Destination
  onBack?: () => void
  onPlan?: () => void
  onSave?: () => void
}

export default function DestinationDetails({ destination, onBack, onPlan, onSave }: Props) {
  const [activeImage, setActiveImage] = useState(0)
  const [saved, setSaved] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const images = useMemo(() => [destination.image, ...(destination.gallery ?? [])], [destination])
  const currentImage = images[activeImage] ?? destination.image
  const highlights = destination.highlights ?? ['Scenic views and local culture', 'Comfortable visitor experience', 'Memorable photo opportunities']
  const tips = destination.tips ?? ['Carry water and comfortable footwear.', 'Respect local communities and nature.', 'Keep some cash for local transport.']

  const save = () => {
    setSaved((value) => !value)
    onSave?.()
  }

  const move = (step: number) => setActiveImage((value) => (value + step + images.length) % images.length)

  return (
    <section className="destination-details-page min-h-screen bg-[#f4f8f5]">
      <div className="mx-auto max-w-7xl px-4 pb-12 pt-6 lg:px-8">
        <div className="mb-5 flex items-center justify-between gap-3">
          <button onClick={onBack} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-bold text-[#12372d] shadow-sm ring-1 ring-[#dfeae3]"><ArrowLeft size={16} /> Back to explore</button>
          <div className="flex gap-2"><button onClick={() => navigator.clipboard?.writeText(window.location.href)} className="rounded-full bg-white p-2.5 text-[#12372d] shadow-sm ring-1 ring-[#dfeae3]"><Share2 size={16} /></button><button onClick={save} className="rounded-full bg-white p-2.5 text-[#cc4e31] shadow-sm ring-1 ring-[#dfeae3]"><Heart size={16} fill={saved ? 'currentColor' : 'none'} /></button></div>
        </div>

        <div className="grid gap-3 lg:h-[470px] lg:grid-cols-[1.6fr_0.8fr] lg:grid-rows-2">
          <button onClick={() => setLightboxOpen(true)} className="group relative overflow-hidden rounded-[28px] text-left lg:row-span-2"><img src={currentImage} alt={destination.name} className="h-full min-h-[320px] w-full object-cover transition duration-500 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/10" /><div className="absolute bottom-6 left-6 text-white"><span className="rounded-full bg-white/20 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[.18em] backdrop-blur">{destination.category}</span><h1 className="mt-3 text-4xl font-black md:text-5xl">{destination.name}</h1><p className="mt-2 flex items-center gap-2 text-sm text-white/85"><MapPin size={15} /> {destination.location}</p></div><span className="absolute bottom-5 right-5 rounded-full bg-black/35 px-3 py-1.5 text-xs font-bold text-white">{activeImage + 1} / {images.length}</span></button>
          <button onClick={() => { setActiveImage(Math.min(1, images.length - 1)); setLightboxOpen(true) }} className="hidden overflow-hidden rounded-[28px] lg:block"><img src={images[1] ?? destination.image} alt="Destination view" className="h-full w-full object-cover" /></button>
          <button onClick={() => { setActiveImage(Math.min(2, images.length - 1)); setLightboxOpen(true) }} className="relative hidden overflow-hidden rounded-[28px] lg:block"><img src={images[2] ?? destination.image} alt="Destination landscape" className="h-full w-full object-cover" /><span className="absolute bottom-4 right-4 rounded-full bg-white/90 px-3 py-2 text-xs font-bold text-[#12372d]">View gallery</span></button>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div>
            <div className="flex flex-wrap items-center gap-4 border-b border-[#dfeae3] pb-6"><span className="inline-flex items-center gap-1 rounded-full bg-[#fff5e8] px-3 py-1.5 text-sm font-bold text-[#a86613]"><Star size={15} className="fill-[#f2b84b] text-[#f2b84b]" /> {destination.rating} <span className="font-normal">({destination.reviewCount ?? 0} reviews)</span></span><span className="text-sm text-[#5b766a]">Verified destination guide</span></div>
            <h2 className="mt-7 text-2xl font-extrabold text-[#12372d]">Why you’ll love {destination.name}</h2><p className="mt-3 text-base leading-8 text-[#4d685f]">{destination.description}</p>
            <h2 className="mt-8 text-2xl font-extrabold text-[#12372d]">Highlights</h2><div className="mt-4 grid gap-3 sm:grid-cols-2">{highlights.map((item) => <div key={item} className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-[#dfeae3]"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e7f4ee] text-[#0b3d2e]"><Check size={16} /></span><span className="text-sm font-semibold text-[#12372d]">{item}</span></div>)}</div>
            <h2 className="mt-8 text-2xl font-extrabold text-[#12372d]">Plan your visit</h2><div className="mt-4 grid gap-3 sm:grid-cols-2">{[['Best time to visit', destination.bestTime ?? 'Oct - Mar', CalendarDays], ['Typical duration', destination.duration ?? '2 - 3 days', Navigation], ['Difficulty', destination.difficulty ?? 'Easy', MapPin], ['How to go', destination.howToGo ?? 'Bus + local transport', Share2]].map(([label, value, Icon]) => <div key={label as string} className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-[#dfeae3]"><Icon size={18} className="text-[#0077be]" /><p className="mt-3 text-[10px] font-bold uppercase tracking-[.15em] text-[#82978e]">{label as string}</p><p className="mt-1 text-sm font-bold text-[#12372d]">{value as string}</p></div>)}</div>
            <h2 className="mt-8 text-2xl font-extrabold text-[#12372d]">Travel tips</h2><ul className="mt-4 space-y-3">{tips.map((tip) => <li key={tip} className="flex gap-3 text-sm leading-6 text-[#4d685f]"><Check size={17} className="mt-1 shrink-0 text-[#0077be]" />{tip}</li>)}</ul>
          </div>
          <aside className="h-fit rounded-[28px] bg-white p-5 shadow-xl shadow-[#12372d]/5 ring-1 ring-[#dfeae3] lg:sticky lg:top-24"><p className="text-[11px] font-bold uppercase tracking-[.16em] text-[#82978e]">Estimated trip from</p><p className="mt-2 text-3xl font-extrabold text-[#12372d]">{destination.price}</p><p className="mt-1 text-xs text-[#5b766a]">per person · mock MVP price</p><div className="my-5 h-px bg-[#e8f0eb]" /><div className="space-y-3 text-sm"><div className="flex justify-between"><span className="text-[#6b8178]">Local guide</span><b>Optional</b></div><div className="flex justify-between"><span className="text-[#6b8178]">Safety support</span><b>24/7</b></div></div><button onClick={onPlan} className="mt-6 w-full rounded-2xl bg-[#0b3d2e] px-4 py-3.5 text-sm font-bold text-white">Plan this trip <ChevronRight size={17} className="inline" /></button><button onClick={save} className="mt-3 w-full rounded-2xl border border-[#cfe0d7] px-4 py-3.5 text-sm font-bold text-[#12372d]">{saved ? 'Saved to your trips' : 'Save destination'}</button></aside>
        </div>
      </div>
      {lightboxOpen && <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#061c16]/90 p-4" onClick={() => setLightboxOpen(false)}><button onClick={() => setLightboxOpen(false)} className="absolute right-5 top-5 rounded-full bg-white/10 p-3 text-white"><X size={22} /></button><button onClick={(event) => { event.stopPropagation(); move(-1) }} className="absolute left-4 rounded-full bg-white/15 p-3 text-white"><ChevronLeft /></button><img onClick={(event) => event.stopPropagation()} src={currentImage} alt={destination.name} className="max-h-[82vh] max-w-[90vw] rounded-2xl object-contain" /><button onClick={(event) => { event.stopPropagation(); move(1) }} className="absolute right-4 rounded-full bg-white/15 p-3 text-white"><ChevronRight /></button><div className="absolute bottom-5 rounded-full bg-black/40 px-4 py-2 text-sm font-bold text-white">{activeImage + 1} / {images.length}</div></div>}
    </section>
  )
}
