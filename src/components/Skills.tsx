import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Boxes, Code2, Database, Server, Workflow } from 'lucide-react'

const GROUPS = [
  {
    icon: Code2,
    label: 'Front-end',
    tags: ['HTML', 'CSS', 'JavaScript', 'React.js', 'Next.js', 'Three.js'],
  },
  {
    icon: Server,
    label: 'Back-end',
    tags: ['Node.js', 'Express.js', 'REST API', 'GraphQL'],
  },
  {
    icon: Database,
    label: 'Data',
    tags: ['PostgreSQL', 'MongoDB', 'Prisma ORM', 'Entity Framework'],
  },
  {
    icon: Boxes,
    label: 'Deployment',
    tags: ['PM2', 'Nginx', 'Docker'],
  },
  {
    icon: Workflow,
    label: 'Engineering',
    tags: ['C++ (DSA & OOP)', 'Design Patterns', 'SOLID', 'System Design', 'n8n Automation'],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="bg-black py-16 sm:py-24 md:py-32 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <p className="text-primary text-[10px] sm:text-xs tracking-[0.2em] uppercase text-center mb-10 sm:mb-14">
          Capabilities
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
          {GROUPS.map((group, i) => (
            <SkillCard key={group.label} group={group} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function SkillCard({ group, index }: { group: (typeof GROUPS)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const Icon = group.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="bg-[#101010] rounded-xl p-5 sm:p-6"
    >
      <Icon className="w-4 h-4 text-signal mb-4" />
      <p className="text-primary text-sm font-normal mb-3">{group.label}</p>
      <div className="flex flex-wrap gap-1.5">
        {group.tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] sm:text-[11px] text-gray-400 border border-gray-800 rounded-full px-2.5 py-1"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  )
}
