import { useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useDragControls,
  animate as animateValue,
  type PanInfo,
} from 'framer-motion'
import { Camera, ChevronUp, X } from 'lucide-react'
import WordsPullUpMultiStyle from './WordsPullUpMultiStyle'

const CARD_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const GALLERY_ITEMS = [
  {
    file: 'Hackathone.jpg',
    caption: 'Hackathon Cyber Arena — 2nd place',
    description:
      'A 72-hours sprint with the team, way too much thinking & debugging, and a scramble to ship a working demo before the deadline. Walking away with 2nd place made every sleepless hour worth it.',
    extendedDescription:
      'We pivoted our idea twice in the first 12 hours after realizing our original scope was way too ambitious for the timeframe. What actually saved us was splitting into two pairs , one on the core logic, one on the demo/UI , and syncing every 3 hours instead of trying to work in one big group.',
    span: 'sm:row-span-2',
  },
  {
    file: 'Pixels.jpg',
    caption: 'Team problem-solving session',
    description:
      'One of those winter-days whiteboard sessions where I was teaching Competitive Problem Solving Topics. This is what building with Pixels actually looks like behind the scenes.',
    extendedDescription:
      'Most of these sessions started as one topic and turned into three once people started asking "but what if..." questions. Some of my favorite explanations came out of those tangents, not the planned material.',
    span: 'sm:row-span-2',
  },
  {
    file: 'Seminar.JPG',
    caption: 'Seminar day',
    description:
      'Sharing what we had learned with a room full of people who showed up just to listen. Nerve wracking beforehand, genuinely rewarding after.',
    extendedDescription:
      'I rewrote my slides three times the night before. In the end the Q&A afterward taught me more than the talk itself — people asked things I hadn\u2019t thought to prepare for.',
    span: 'sm:row-span-2',
  },
  {
    file: 'ECPC.jpeg',
    caption: 'ECPC Participation',
    description:
      'My first competitive programming contest. It wasn\u2019t my strongest performance, but it taught me more than I expected, pushed me to learn from my mistakes, and gave me the motivation to keep going.',
    extendedDescription:
      'The problem that broke me was a graph question I completely overengineered. I found the simple solution about 20 minutes after the contest ended — that feeling stuck with me and changed how I approach problems now.',
  },
  {
    file: 'Website.jpg',
    caption: 'Launch the university Website',
    description:
      'The day the university website finally went live after weeks of building, testing, and last-minute fixes. Small team, big relief when it shipped.',
    extendedDescription:
      'We found a critical bug about an hour before launch — one of those "how did this ever work in dev" moments. Fixed it live, held our breath, and shipped anyway.',
  },
  {
    file: 'END.JPG',
    caption: 'The end of Pixels Journey',
    description:
      'The closing chapter of this journey with Pixels, a mix of pride in what we built and gratitude for the people who built it alongside me.',
    extendedDescription:
      'Looking back, the technical stuff is not what I remember most. It\u2019s the late-night calls, the arguments over small decisions that felt huge at the time, and the people who stuck around till the end.',
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
          src={`${item.file}`}
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
  const [expanded, setExpanded] = useState(false)

  // motion value drives the drag gesture only; once released we snap it back
  // to 0 and let `expanded` state control the actual layout via `layout` animations
  const y = useMotionValue(0)
  const dragControls = useDragControls()

  const UP_THRESHOLD_OFFSET = -60
  const UP_THRESHOLD_VELOCITY = -450
  const DOWN_COLLAPSE_OFFSET = 70
  const DOWN_COLLAPSE_VELOCITY = 450
  const DOWN_CLOSE_OFFSET = 120
  const DOWN_CLOSE_VELOCITY = 800

  const handleDragEnd = (_: PointerEvent, info: PanInfo) => {
    const { offset, velocity } = info

    if (!expanded) {
      if (offset.y < UP_THRESHOLD_OFFSET || velocity.y < UP_THRESHOLD_VELOCITY) {
        setExpanded(true)
      } else if (offset.y > DOWN_CLOSE_OFFSET || velocity.y > DOWN_CLOSE_VELOCITY) {
        onClose()
        return
      }
    } else {
      if (offset.y > DOWN_COLLAPSE_OFFSET || velocity.y > DOWN_COLLAPSE_VELOCITY) {
        setExpanded(false)
      }
    }

    animateValue(y, 0, { type: 'spring', stiffness: 500, damping: 45 })
  }

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
        drag="y"
        dragControls={dragControls}
        dragListener={false}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0.6, bottom: 0.3 }}
        onDragEnd={handleDragEnd}
        style={{ y }}
        layout
        className="relative w-full sm:w-auto sm:max-w-2xl max-h-[92vh] sm:max-h-[85vh] bg-[#0c0c0c] border border-white/5 rounded-t-3xl sm:rounded-2xl overflow-hidden flex flex-col"
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ duration: 0.4, ease: CARD_EASE }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle — mobile only. Tap toggles, drag lifts/lowers the sheet. */}
        <div
          className="sm:hidden flex flex-col items-center pt-3 pb-1.5 shrink-0 gap-1 cursor-grab active:cursor-grabbing touch-none select-none"
          onPointerDown={(e) => dragControls.start(e)}
          onClick={() => setExpanded((prev) => !prev)}
        >
          <div className="h-1 w-10 rounded-full bg-white/20" />
          <ChevronUp
            className={`w-3.5 h-3.5 text-gray-500 transition-transform duration-300 ${
              expanded ? 'rotate-180' : ''
            }`}
          />
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
          <motion.div
            layout
            className={`relative w-full bg-[#141414] transition-[aspect-ratio] duration-500 ${
              expanded ? 'aspect-[16/10] sm:aspect-[16/10]' : 'aspect-[4/3] sm:aspect-[16/10]'
            }`}
            transition={{ duration: 0.5, ease: CARD_EASE }}
          >
            {!errored && (
              <img
                src={`${item.file}`}
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
          </motion.div>

          <motion.div layout className="px-5 py-5 sm:px-8 sm:py-7">
            <p className="text-sm sm:text-base font-medium text-primary/90 mb-2 sm:mb-3">
              {item.caption}
            </p>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              {item.description}
            </p>

            <AnimatePresence>
              {expanded && item.extendedDescription && (
                <motion.p
                  key="extended"
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  transition={{ duration: 0.4, ease: CARD_EASE }}
                  className="text-xs sm:text-sm text-gray-500 leading-relaxed overflow-hidden"
                >
                  {item.extendedDescription}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}