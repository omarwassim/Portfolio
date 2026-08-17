import { useRef } from 'react'
import { useScroll } from 'framer-motion'
import WordsPullUpMultiStyle from './WordsPullUpMultiStyle'
import AnimatedLetter from './AnimatedLetter'

const BODY_TEXT = ''

export default function About() {
  const scrollRef = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start 0.8', 'end 0.2'],
  })

  const chars = BODY_TEXT.split('')
  const totalChars = chars.length

  return (
    <section id="profile" className="bg-black py-16 sm:py-24 md:py-32 px-4 sm:px-6">
      <div className="bg-[#101010] rounded-2xl md:rounded-[2rem] max-w-6xl mx-auto px-5 sm:px-10 md:px-16 py-14 sm:py-20 md:py-28 text-center">
        <p className="text-primary text-[10px] sm:text-xs tracking-[0.2em] uppercase mb-6 sm:mb-8">
          Profile
        </p>

        <WordsPullUpMultiStyle
          containerClassName="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-3xl mx-auto leading-[0.95] sm:leading-[0.9] text-primary"
          segments={[
            { text: 'I\u2019m Omar Wassim,', className: 'font-normal' },
            { text: 'an intelligent systems engineer', className: 'italic font-serif' },
            { text: 'who passionate about building full stack web projects', className: 'font-normal' },
          ]}
        />

        <p
          ref={scrollRef}
          className="text-[#DEDBC8] text-xs sm:text-sm md:text-base max-w-2xl mx-auto mt-8 sm:mt-12"
          style={{ lineHeight: 1.7 }}
        >
          {chars.map((char, i) => (
            <AnimatedLetter
              key={i}
              char={char}
              progress={scrollYProgress}
              charProgress={i / totalChars}
            />
          ))}
        </p>

        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-2xl mx-auto text-left">
          <div className="bg-[#181818] rounded-xl p-5 sm:p-6">
            <p className="text-gray-500 text-[10px] sm:text-xs uppercase tracking-[0.15em] mb-2">
              University
            </p>
            <p className="text-primary text-sm sm:text-base font-normal">Helwan National University</p>
            <p className="text-gray-400 text-xs sm:text-sm mt-1">
              Faculty of Engineering — Intelligent Systems &amp; Electronics
            </p>
            <p className="text-gray-500 text-xs sm:text-sm mt-2">2022 — Present &middot; CGPA 3.42</p>
          </div>
          <div className="bg-[#181818] rounded-xl p-5 sm:p-6">
            <p className="text-gray-500 text-[10px] sm:text-xs uppercase tracking-[0.15em] mb-2">
              School
            </p>
            <p className="text-primary text-sm sm:text-base font-normal">Coll&egrave;ge de la Salle</p>
            <p className="text-gray-400 text-xs sm:text-sm mt-1">French-language curriculum</p>
            <p className="text-gray-500 text-xs sm:text-sm mt-2">2008 — 2022</p>
          </div>
        </div>
      </div>
    </section>
  )
}
