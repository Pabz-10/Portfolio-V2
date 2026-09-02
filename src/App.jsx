import { useEffect, useRef, useState } from 'react'
import Hero from './components/Hero.jsx'
import ScrollSections from './components/ScrollSections.jsx'

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

  // Once past the hero, don't let people scroll back up into it. The lock only
  // arms after the enter transition has naturally reached the boundary once,
  // so it doesn't fight the initial smooth-scroll-down animation.
  useEffect(() => {
    if (!entered) return

    let armed = false

    const handleScroll = () => {
      const boundary = scrollTargetRef.current?.offsetTop ?? 0
      if (!armed) {
        if (window.scrollY >= boundary - 1) {
          armed = true
        }
        return
      }
      if (window.scrollY < boundary) {
        window.scrollTo(0, boundary)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [entered])

  const handleEnter = () => {
    setEntered(true)
    // Wait a tick for the scroll-lock class to be removed before scrolling.
    requestAnimationFrame(() => {
      scrollTargetRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  return (
    <>
      <Hero onEnter={handleEnter} />
      <ScrollSections scrollTargetRef={scrollTargetRef} />
    </>
  )
}
