import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { Camera, X } from 'lucide-react'
import WordsPullUpMultiStyle from './WordsPullUpMultiStyle'

const CARD_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const GALLERY_ITEMS = [
  {
    file: 'Hackathone.jpg',
    caption: 'Hackathon Cyber Arena — 2nd place',
    description:
      'A 72-hours sprint with the team, way too much thinking & debugging, and a scramble to ship a working demo before the deadline. Walking away with 2nd place made every sleepless hour worth it.',
    span: 'sm:row-span-2',
  },
  {
    file: 'Pixels.jpg',
    caption: 'Team problem-solving session',
    description:
      'One of those winter-days whiteboard sessions where I was teaching Competitive Problem Solving Topics. This is what building with Pixels actually looks like behind the scenes.',
    span: 'sm:row-span-2',
  },
  {
    file: 'Seminar.JPG',
    caption: 'Seminar day',
    description:
      'Sharing what we had learned with a room full of people who showed up just to listen. Nerve wracking beforehand, genuinely rewarding after.',
    span: 'sm:row-span-2',
  },
  {
    file: 'ECPC.jpeg',
    caption: 'ECPC Participation',
    description:
      'My first competitive programming contest. It wasn’t my strongest performance, but it taught me more than I expected, pushed me to learn from my mistakes, and gave me the motivation to keep going.',
  },
  {
    file: 'Website.jpg',
    caption: 'Launch the university Website',
    description:
      'The day the university website finally went live after weeks of building, testing, and last-minute fixes. Small team, big relief when it shipped.',
  },
  {
    file: 'END.JPG',
    caption: 'The end of Pixels Journey',
    description:
      'The closing chapter of this journey with Pixels ,  a mix of pride in what we built and gratitude for the people who built it alongside me.',
  },
]

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const activeItem = activeIndex !== null ? GALLERY_ITEMS[activeIndex] : null

  useEffect(() => {
    if (activeItem) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = prev
      }
    }
  }, [activeItem])

  useEffect(() => {
    if (!activeItem) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveIndex(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [activeItem])

  return (
    <section id="gallery" className="min-h-screen bg-black relative py-16 sm:py-24 md:py-32 px-4 sm:px-6">
      <div className="bg-noise absolute inset-0 opacity-[0.15] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto text-center mb-12 sm:mb-16">
        <WordsPullUpMultiStyle
          containerClassName="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal leading-tight"
          segments={[
            { text: 'Some of my favorite moments.', className: 'text-primary' },
            { text: 'On stage, at hackathons, and out with the scouts.', className: 'text-gray-500' },
          ]}
        />
      </div>

      <div className="relative max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 auto-rows-[140px] sm:auto-rows-[160px] md:auto-rows-[180px] gap-3 sm:gap-2">
        {GALLERY_ITEMS.map((item, i) => (
          <GalleryCard key={item.file} item={item} index={i} onOpen={() => setActiveIndex(i)} />
        ))}
      </div>

      <AnimatePresence>
        {activeItem && (
          <GalleryModal item={activeItem} onClose={() => setActiveIndex(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}

function GalleryCard({
  item,
  index,
  onOpen,
}: {
  item: (typeof GALLERY_ITEMS)[number]
  index: number
  onOpen: () => void
}) {
  const ref = useRef<HTMLButtonElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [loaded, setLoaded] = useState(false)
  const [errored, setErrored] = useState(false)

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={onOpen}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: CARD_EASE }}
      className={`relative rounded-2xl overflow-hidden bg-[#141414] text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 ${
        item.span ?? ''
      }`}
    >
      {!errored && (
        <img
          src={`../../public/${item.file}`}
          alt={item.caption}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
        />
      )}

      {(errored || !loaded) && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#1c1c1c] to-[#0c0c0c]">
          <Camera className="w-5 h-5 text-gray-600" />
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/5 to-transparent" />

      <p
        className="absolute bottom-3 left-3 right-3 text-[10px] sm:text-xs text-primary/90"
        style={{ lineHeight: 1.3 }}
      >
        {item.caption}
      </p>
    </motion.button>
  )
}

function GalleryModal({
  item,
  onClose,
}: {
  item: (typeof GALLERY_ITEMS)[number]
  onClose: () => void
}) {
  const [loaded, setLoaded] = useState(false)
  const [errored, setErrored] = useState(false)

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: CARD_EASE }}
    >
      <motion.div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <div className="bg-noise absolute inset-0 opacity-[0.15] pointer-events-none" />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={item.caption}
        className="relative w-full sm:w-auto sm:max-w-2xl max-h-[92vh] sm:max-h-[85vh] bg-[#0c0c0c] border border-white/5 rounded-t-3xl sm:rounded-2xl overflow-hidden flex flex-col"
        initial={{ y: '100%', opacity: 0, scale: 1 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ duration: 0.4, ease: CARD_EASE }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sm:hidden flex justify-center pt-3 pb-1 shrink-0">
          <div className="h-1 w-10 rounded-full bg-white/20" />
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/60 border border-white/10 backdrop-blur-sm flex items-center justify-center text-gray-300 hover:text-primary hover:border-primary/40 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="overflow-y-auto">
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-[#141414]">
            {!errored && (
              <img
                src={`../../public/${item.file}`}
                alt={item.caption}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                  loaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setLoaded(true)}
                onError={() => setErrored(true)}
              />
            )}

            {(errored || !loaded) && (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#1c1c1c] to-[#0c0c0c]">
                <Camera className="w-8 h-8 text-gray-600" />
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-transparent to-transparent" />
          </div>

          <div className="px-5 py-5 sm:px-8 sm:py-7">
            <p className="text-sm sm:text-base font-medium text-primary/90 mb-2 sm:mb-3">
              {item.caption}
            </p>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              {item.description}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}