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

  // Once past the hero, don't let people scroll back up into it. Wheel/touch/key
  // input that would cross the boundary is stopped before it ever moves the
  // page, rather than letting the browser scroll (and rubber-band) and then
  // snapping back — that snap-back is exactly the bounce we don't want.
  useEffect(() => {
    if (!entered) return

    const boundary = () => scrollTargetRef.current?.offsetTop ?? 0
    let armed = false
    let touchStartY = null

    // Fallback for scroll sources wheel/touch/key don't cover (scrollbar drag,
    // middle-click autoscroll, etc). Only arms after the entrance animation has
    // naturally reached the boundary once, so it doesn't fight that animation.
    const handleScroll = () => {
      const b = boundary()
      if (!armed) {
        if (window.scrollY >= b - 1) armed = true
        return
      }
      if (window.scrollY < b) window.scrollTo(0, b)
    }

    const handleWheel = (e) => {
      if (e.deltaY < 0 && window.scrollY <= boundary()) {
        e.preventDefault()
      }
    }

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY
    }

    const handleTouchMove = (e) => {
      if (touchStartY === null) return
      const draggingDown = e.touches[0].clientY - touchStartY > 0
      if (draggingDown && window.scrollY <= boundary()) {
        e.preventDefault()
      }
    }

    const handleKeyDown = (e) => {
      const upKeys = ['ArrowUp', 'PageUp', 'Home']
      if (upKeys.includes(e.key) && window.scrollY <= boundary()) {
        e.preventDefault()
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('keydown', handleKeyDown)
    }
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
