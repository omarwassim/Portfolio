import { motion } from 'framer-motion'
import { useMemo } from 'react'

export default function CircuitBackground() {
  const nodes = useMemo(() => {
    const pts: { x: number; y: number; r: number; delay: number }[] = []
    const cols = 9
    const rows = 6
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        if (Math.random() > 0.55) continue
        pts.push({
          x: (i / (cols - 1)) * 100 + (Math.random() - 0.5) * 6,
          y: (j / (rows - 1)) * 100 + (Math.random() - 0.5) * 6,
          r: Math.random() * 1.4 + 0.6,
          delay: Math.random() * 4,
        })
      }
    }
    return pts
  }, [])

  const edges = useMemo(() => {
    const es: { a: number; b: number; delay: number }[] = []
    nodes.forEach((n, i) => {
      nodes.forEach((m, j) => {
        if (j <= i) return
        const d = Math.hypot(n.x - m.x, n.y - m.y)
        if (d < 16 && Math.random() > 0.55) {
          es.push({ a: i, b: j, delay: Math.random() * 5 })
        }
      })
    })
    return es
  }, [nodes])

  return (
    <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-black to-[#0a0a0a]">
      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" className="w-full h-full opacity-[0.55]">
        {edges.map((e, i) => (
          <motion.line
            key={i}
            x1={nodes[e.a].x}
            y1={nodes[e.a].y}
            x2={nodes[e.b].x}
            y2={nodes[e.b].y}
            stroke="#7FE0D2"
            strokeWidth={0.08}
            initial={{ opacity: 0.05 }}
            animate={{ opacity: [0.05, 0.35, 0.05] }}
            transition={{ duration: 6, repeat: Infinity, delay: e.delay, ease: 'easeInOut' }}
          />
        ))}
        {nodes.map((n, i) => (
          <motion.circle
            key={i}
            cx={n.x}
            cy={n.y}
            r={n.r * 0.35}
            fill="#DEDBC8"
            initial={{ opacity: 0.15 }}
            animate={{ opacity: [0.15, 0.9, 0.15] }}
            transition={{ duration: 4.5, repeat: Infinity, delay: n.delay, ease: 'easeInOut' }}
          />
        ))}
      </svg>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/40" />
    </div>
  )
}
