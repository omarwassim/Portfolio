import { motion, MotionValue, useTransform } from 'framer-motion'

interface AnimatedLetterProps {
  char: string
  progress: MotionValue<number>
  charProgress: number
}

export default function AnimatedLetter({ char, progress, charProgress }: AnimatedLetterProps) {
  const opacity = useTransform(progress, [charProgress - 0.1, charProgress + 0.05], [0.2, 1])

  return (
    <motion.span style={{ opacity }}>
      {char === ' ' ? '\u00A0' : char}
    </motion.span>
  )
}
