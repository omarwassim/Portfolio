import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface WordsPullUpProps {
  text: string
  className?: string
  showAsterisk?: boolean
  delayStart?: number
}

export default function WordsPullUp({ text, className = '', showAsterisk = false, delayStart = 0 }: WordsPullUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px -10% 0px' })
  const words = text.split(' ')

  return (
    <span ref={ref} className={`inline-flex flex-wrap ${className}`}>
      {words.map((word, i) => {
        const isLast = i === words.length - 1
        return (
          <span key={i} className="overflow-hidden inline-block mr-[0.22em] last:mr-0">
            <motion.span
              className="inline-block relative"
              initial={{ y: '110%' }}
              animate={isInView ? { y: 0 } : { y: '110%' }}
              transition={{
                duration: 0.7,
                delay: delayStart + i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {word}
              {isLast && showAsterisk && (
                <span className="absolute top-[0.65em] -right-[0.3em] text-[0.31em]">*</span>
              )}
            </motion.span>
          </span>
        )
      })}
    </span>
  )
}
