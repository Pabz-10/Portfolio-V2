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
