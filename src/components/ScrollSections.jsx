import Helix from './Helix.jsx'
import RefactoredTrajectory from './RefactoredTrajectory.jsx'
import SelectedWorks from './SelectedWorks.jsx'
import Contact from './Contact.jsx'
import './ScrollSections.css'

export default function ScrollSections({ scrollTargetRef }) {
  return (
    <div className="scroll-sections" ref={scrollTargetRef}>
      <div className="scroll-sections-content">
        <RefactoredTrajectory />
        <SelectedWorks />
        <Contact />
      </div>

      <div className="scroll-sections-rail">
        <div className="scroll-sections-rail-sticky">
          <Helix width={280} height={900} amplitude={120} rungCount={40} />
        </div>
      </div>
    </div>
  )
}
