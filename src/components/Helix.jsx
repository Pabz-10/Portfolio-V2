import { useEffect, useRef } from 'react'

/**
 * Animated DNA double helix.
 * - Real Watson-Crick base pairing (A<->T, G<->C), generated per rung.
 * - Single crossing point at a time; continuous phase shift (no reset/snap)
 *   so a new crossing grows in from the bottom as the old one exits the top.
 * - Small vertical "loop" offset at the crossing so it reads as a twist-through
 *   rather than a flat pinch.
 * - Color/size on each letter is a continuous function of position (no hard
 *   swap), tied to the same cycle as the crossing itself so each side reads
 *   as one long dark pass and one long light pass per twist.
 *
 * Props:
 *  - width, height: viewBox dimensions (px)
 *  - amplitude: how far the strands swing from center
 *  - rungCount: number of base pairs rendered
 *  - className / style: applied to the wrapping <svg>
 */
export default function Helix({
  width = 220,
  height = 780,
  amplitude = 92,
  rungCount = 46,
  className = '',
  style = {},
}) {
  const svgRef = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return
    while (svg.firstChild) svg.removeChild(svg.firstChild)

    const top = 10
    const cx = width / 2
    const period = height
    const loopMag = Math.max(6, amplitude * 0.1)
    const colorCycles = 1
    const bases = ['A', 'T', 'C', 'G']
    const comp = { A: 'T', T: 'A', C: 'G', G: 'C' }
    const lineColor = '#D9D7CC'
    const frontRGB = [14, 14, 12]
    const backRGB = [201, 199, 190]

    const lerp = (a, b, t) => Math.round(a + (b - a) * t)
    const blend = (t) =>
      `rgb(${lerp(backRGB[0], frontRGB[0], t)},${lerp(backRGB[1], frontRGB[1], t)},${lerp(backRGB[2], frontRGB[2], t)})`

    const rungs = []
    for (let i = 0; i < rungCount; i++) {
      const y = top + (i / (rungCount - 1)) * (height - 20)

      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
      line.setAttribute('stroke', lineColor)
      line.setAttribute('stroke-width', '0.5')
      line.setAttribute('opacity', '0.7')
      svg.appendChild(line)

      const baseA = bases[i % 4]
      const baseB = comp[baseA]

      const tA = document.createElementNS('http://www.w3.org/2000/svg', 'text')
      tA.setAttribute('text-anchor', 'middle')
      tA.setAttribute('font-family', 'var(--font-display)')
      tA.textContent = baseA
      svg.appendChild(tA)

      const tB = document.createElementNS('http://www.w3.org/2000/svg', 'text')
      tB.setAttribute('text-anchor', 'middle')
      tB.setAttribute('font-family', 'var(--font-display)')
      tB.textContent = baseB
      svg.appendChild(tB)

      rungs.push({ y, line, tA, tB })
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const speed = (period / 6) * 1.4 * 1.3
    let start = null

    function frame(now) {
      if (start === null) start = now
      const elapsed = reduceMotion ? 0 : (now - start) / 1000
      const phase = (elapsed * speed) % (2 * period)

      for (let k = 0; k < rungs.length; k++) {
        const r = rungs[k]
        const angle = ((r.y + phase) / period) * Math.PI
        const s = Math.sin(angle)
        const ax = cx + amplitude * s
        const bx = cx - amplitude * s

        const loop = loopMag * Math.cos(angle)
        const ay = r.y + loop
        const by = r.y - loop

        const colorS = Math.sin(angle * colorCycles)
        const factorA = (colorS + 1) / 2
        const factorB = 1 - factorA
        const sizeA = 9 + factorA * 2
        const sizeB = 9 + factorB * 2

        r.line.setAttribute('x1', ax)
        r.line.setAttribute('y1', ay)
        r.line.setAttribute('x2', bx)
        r.line.setAttribute('y2', by)

        r.tA.setAttribute('x', ax)
        r.tA.setAttribute('y', ay + 3)
        r.tA.setAttribute('font-size', sizeA.toFixed(1))
        r.tA.setAttribute('fill', blend(factorA))
        r.tA.setAttribute('font-weight', factorA > 0.5 ? '600' : '400')

        r.tB.setAttribute('x', bx)
        r.tB.setAttribute('y', by + 3)
        r.tB.setAttribute('font-size', sizeB.toFixed(1))
        r.tB.setAttribute('fill', blend(factorB))
        r.tB.setAttribute('font-weight', factorB > 0.5 ? '600' : '400')
      }

      if (!reduceMotion) rafRef.current = requestAnimationFrame(frame)
    }

    rafRef.current = requestAnimationFrame(frame)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [width, height, amplitude, rungCount])

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      style={style}
      role="img"
      aria-label="Animated DNA double helix"
    />
  )
}
