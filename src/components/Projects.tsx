import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, Check, GraduationCap, HeartPulse, Trophy ,Utensils} from 'lucide-react'
import WordsPullUpMultiStyle from './WordsPullUpMultiStyle'

const CARD_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const PROJECTS = [
  {
    icon: GraduationCap,
    number: '02',
    title: 'Helwan National University Website',
    url: 'https://www.hnu.edu.eg/en',
    items: [
      'Full admin panel for staff, content & resources',
      'Next.js + TypeScript frontend, Tailwind CSS UI',
      'Node.js / Express APIs and authentication',
      'Prisma ORM for type-safe data modeling',
    ],
  },
  {
    icon: Utensils,
    number: '04',
    title: 'Easy Fast — Food Ordering Platform',
    url: 'https://play.google.com/store/apps/details?id=com.efood.easyfast',
    items: [
      'Full-stack food ordering system with a RESTful backend',
      'Backend handles business logic, data management & service communication',
      'Native mobile app powered by real-time API data',
      'Penetration testing and software testing alongside the platform team',
    ],
  },
  {
    icon: HeartPulse,
    number: '03',
    title: 'Onco Egypt — Cancer Support Platform',
    
    items: [
      'WhatsApp-based breast-cancer awareness assistant',
      'Symptom intake with rule-based risk assessment',
      'Personalized self-care & referral guidance',
      'Built for accessibility, privacy and reliability',
    ],
  },
  
]

export default function Projects() {
  const statRef = useRef<HTMLDivElement>(null)
  const statInView = useInView(statRef, { once: true, margin: '-100px' })

  return (
    <section id="projects" className="min-h-screen bg-black relative py-16 sm:py-24 md:py-32 px-4 sm:px-6">
      <div className="bg-noise absolute inset-0 opacity-[0.15] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto text-center mb-12 sm:mb-16">
        <WordsPullUpMultiStyle
          containerClassName="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal leading-tight"
          segments={[
            { text: 'Systems and products, engineered end to end.', className: 'text-primary' },
            { text: 'From cozy night to production launch.', className: 'text-gray-500' },
          ]}
        />
      </div>

      <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-2 md:gap-1 items-stretch lg:h-[480px]">
        <motion.div
          ref={statRef}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={statInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.7, delay: 0, ease: CARD_EASE }}
          className="relative rounded-2xl overflow-hidden bg-[#101010] p-6 sm:p-7 flex flex-col justify-between h-full"
        >
          <img
            src="night.jpeg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/50" />

          <div className="relative flex items-center justify-between">
            <Trophy className="w-5 h-5 text-signal" />
            <span className="text-gray-500 text-[10px] uppercase tracking-[0.15em]">Track record</span>
          </div>
          <div className="relative">
            <p className="text-4xl sm:text-5xl font-normal" style={{ color: '#E1E0CC' }}>
              5+
            </p>
            <p className="text-gray-400 text-xs sm:text-sm mt-2" style={{ lineHeight: 1.5 }}>
              Freelance web projects shipped, one national-scale hackathon podium, and a
              healthcare product live on WhatsApp.
            </p>
          </div>
        </motion.div>

        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i + 1} />
        ))}
      </div>
    </section>
  )
}

function ProjectCard({ project, index }: { project: (typeof PROJECTS)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const Icon = project.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: CARD_EASE }}
      className="bg-[#212121] rounded-2xl p-6 sm:p-7 flex flex-col h-full"
    >
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-black/40 flex items-center justify-center mb-5 sm:mb-6">
        <Icon className="w-5 h-5 text-primary" />
      </div>

      <p className="text-gray-500 text-[10px] sm:text-xs mb-1">{project.number}</p>
      <h3 className="text-primary text-base sm:text-lg font-normal mb-4 sm:mb-5" style={{ lineHeight: 1.25 }}>
        {project.title}
      </h3>

      <ul className="flex flex-col gap-2.5 sm:gap-3 flex-1">
        {project.items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-gray-400 text-xs sm:text-sm">
            <Check className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-primary" />
            <span style={{ lineHeight: 1.4 }}>{item}</span>
          </li>
        ))}
      </ul>

      
       <a href={project.url || undefined}
        target={project.url ? '_blank' : undefined}
        rel={project.url ? 'noopener noreferrer' : undefined}
        aria-disabled={!project.url}
        className={`mt-5 sm:mt-6 flex items-center gap-1.5 text-xs sm:text-sm w-fit group ${
          project.url ? 'text-primary cursor-pointer' : 'text-gray-600 cursor-default pointer-events-none'
        }`}
      >
        Learn more
        <ArrowRight
          className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"
          style={{ transform: 'rotate(-45deg)' }}
        />
      </a>
    </motion.div>
  )
}