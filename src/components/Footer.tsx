import { motion } from 'framer-motion'
import { ArrowRight, Github, Globe, Linkedin, Mail, MapPin, Phone } from 'lucide-react'

const LINKS = [
  { label: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/omar-wassim-b34b192ba' },
  { label: 'Email', icon: Mail, url: 'mailto:omarwassim05@gmail.com' },
  { label: 'GitHub', icon: Github, url: 'https://github.com/omarwassim' },
  { label: 'Portfolio / CV', icon: Globe, url: 'https://993jw432iw.ufs.sh/f/51exUUinK6w3uu46p0rpzPVegOBmR1H78WlKDQxAf0bojwMN' },
]

export default function Footer() {
  return (
    <section id="contact" className="bg-black px-4 sm:px-6 pb-4 sm:pb-6">
      <div className="bg-[#101010] rounded-2xl md:rounded-[2rem] max-w-6xl mx-auto px-6 sm:px-12 md:px-16 py-14 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6">
          <div className="lg:col-span-7">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-2xl sm:text-3xl md:text-4xl font-normal text-primary leading-tight"
            >
              Let&rsquo;s build something intelligent together.
            </motion.h2>

            <motion.a
              href="mailto:omarwassim05@gmail.com"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="group inline-flex items-center gap-2 mt-6 sm:mt-8 bg-primary rounded-full pl-5 pr-1.5 py-1.5 w-fit transition-all hover:gap-3"
            >
              <span className="text-black font-medium text-sm sm:text-base">Say hello</span>
              <span className="bg-black rounded-full w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center transition-transform group-hover:scale-110">
                <ArrowRight className="w-4 h-4" style={{ color: '#E1E0CC' }} />
              </span>
            </motion.a>

            <div className="mt-10 sm:mt-14 flex flex-col gap-3 text-xs sm:text-sm text-gray-400">
              <a href="mailto:omarwassim05@gmail.com" className="flex items-center gap-3 hover:text-primary transition-colors w-fit">
                <Mail className="w-4 h-4 text-signal" /> omarwassim05@gmail.com
              </a>
              <a href="https://www.linkedin.com/in/omar-wassim-b34b192ba" className="flex items-center gap-3 hover:text-primary transition-colors w-fit">
                <Linkedin className="w-4 h-4 text-signal" /> OmarWassim
              </a>
              <span className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-signal" /> Cairo, Egypt
              </span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <p className="text-gray-500 text-[10px] sm:text-xs uppercase tracking-[0.15em] mb-4 sm:mb-5">
              Links
            </p>
            <div className="flex flex-col gap-1">
              {LINKS.map((link) => {
                const Icon = link.icon
                const active = Boolean(link.url)
                return (
                  <a
                    key={link.label}
                    href={link.url || undefined}
                    target={active ? '_blank' : undefined}
                    rel={active ? 'noopener noreferrer' : undefined}
                    aria-disabled={!active}
                    className={`group flex items-center justify-between border-b border-gray-800 py-3 transition-colors ${
                      active ? 'cursor-pointer' : 'cursor-default pointer-events-none'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${active ? 'text-signal' : 'text-gray-700'}`} />
                      <span className={`text-sm sm:text-base font-normal ${active ? 'text-primary' : 'text-gray-600'}`}>
                        {link.label}
                      </span>
                    </span>
                    <ArrowRight
                      className={`w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 ${
                        active ? 'text-primary' : 'text-gray-700'
                      }`}
                      style={{ transform: 'rotate(-45deg)' }}
                    />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        <p className="text-gray-600 text-[10px] sm:text-xs mt-12 sm:mt-16">
          Omar Wassim Mohamed &middot; Born 19/02/2004 &middot; {new Date().getFullYear()}
        </p>
      </div>
    </section>
  )
}
