import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Navbar from './Navbar'
import WordsPullUp from './WordsPullUp'
import CircuitBackground from './CircuitBackground'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

export default function Hero() {
  return (
    <section className="h-screen p-4 md:p-6">
      <div className="relative w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden">
        <CircuitBackground />

        <img
          src="../../public/Hero.png"
          alt="Omar Wassim Mohamed"
          className="absolute inset-0 w-full h-full object-cover object-top"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />

        <div className="noise-overlay absolute inset-0 opacity-[0.7] mix-blend-overlay pointer-events-none" />

        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 pointer-events-none" />

        <Navbar />

        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 md:p-12 lg:p-16">
          <div className="grid grid-cols-12 gap-4 items-end">
            <div className="col-span-12 lg:col-span-8">
              <h1
                className="font-medium leading-[0.85] tracking-[-0.05em] text-[15vw] sm:text-[13vw] md:text-[11vw] lg:text-[9.5vw] xl:text-[9vw]"
                style={{ color: '#E1E0CC' }}
              >
                <WordsPullUp text="Omar Wassim" showAsterisk />
              </h1>
            </div>
            <div className="col-span-12 lg:col-span-4 flex flex-col gap-4 sm:gap-6">
              <motion.p
                className="text-primary/70 text-xs sm:text-sm md:text-base"
                style={{ lineHeight: 1.4 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
              >
                Intelligent Systems Engineering student in Cairo — building full-stack
                products, competitive-programming brains, and leading teams through
                scouting and problem solving.
              </motion.p>

              <motion.a
                href="#projects"
                className="group inline-flex items-center justify-between bg-primary rounded-full pl-5 sm:pl-6 pr-1.5 py-1.5 w-fit gap-2 transition-all hover:gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
              >
                <span className="text-black font-medium text-sm sm:text-base whitespace-nowrap">
                  View my work
                </span>
                <span className="bg-black rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center transition-transform group-hover:scale-110">
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: '#E1E0CC' }} />
                </span>
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
