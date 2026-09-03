import { useEffect, useRef, useState } from 'react'
import Hero from './components/Hero.jsx'
import ScrollSections from './components/ScrollSections.jsx'

const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2)

function smoothScrollTo(targetY, duration) {
  const startY = window.scrollY
  const distance = targetY - startY
  if (distance === 0) return

  let startTime = null

  function step(timestamp) {
    if (startTime === null) startTime = timestamp
    const progress = Math.min((timestamp - startTime) / duration, 1)
    window.scrollTo(0, startY + distance * easeInOutCubic(progress))
    if (progress < 1) requestAnimationFrame(step)
  }

  requestAnimationFrame(step)
}

export default function App() {
  const [entered, setEntered] = useState(false)
  const scrollTargetRef = useRef(null)

  // Lock scroll on the hero until the person clicks "Enter lab".
  useEffect(() => {
    if (entered) {
      document.body.classList.remove('scroll-locked')
    } else {
      document.body.classList.add('scroll-locked')
    }
    return () => document.body.classList.remove('scroll-locked')
  }, [entered])

  const handleEnter = () => {
    setEntered(true)
    // Wait a tick for the scroll-lock class to be removed before scrolling.
    requestAnimationFrame(() => {
      const boundary = scrollTargetRef.current?.offsetTop ?? 0
      smoothScrollTo(boundary, 1100)
    })
  }

  return (
    <>
      <Hero onEnter={handleEnter} />
      <ScrollSections scrollTargetRef={scrollTargetRef} />
    </>
  )
}
