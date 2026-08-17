import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface Segment {
  text: string
  className?: string
}

interface WordsPullUpMultiStyleProps {
  segments: Segment[]
  containerClassName?: string
}

export default function WordsPullUpMultiStyle({ segments, containerClassName = '' }: WordsPullUpMultiStyleProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px -10% 0px' })

  let wordIndex = 0

  return (
    <div ref={ref} className={`inline-flex flex-wrap justify-center ${containerClassName}`}>
      {segments.map((segment, segIdx) =>
        segment.text.split(' ').map((word, i) => {
          const delay = wordIndex * 0.08
          wordIndex += 1
          return (
            <span key={`${segIdx}-${i}`} className={`overflow-hidden inline-block mr-[0.22em] ${segment.className ?? ''}`}>
              <motion.span
                className="inline-block"
                initial={{ y: '110%' }}
                animate={isInView ? { y: 0 } : { y: '110%' }}
                transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
              >
                {word}
              </motion.span>
            </span>
          )
        }),
      )}
    </div>
  )
}
