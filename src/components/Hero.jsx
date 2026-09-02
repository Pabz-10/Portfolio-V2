import Helix from './Helix.jsx'
import './Hero.css'

export default function Hero({ onEnter }) {
  return (
    <section className="hero">
      <div className="hero-topbar">
        <span>PB // PROTOCOL 0.1</span>
        <span>STATUS: COMPILING&hellip;</span>
        <span>EST. 2026</span>
      </div>

      <div className="hero-copy">
        <h1>
          REWRITING
          <br />
          THE CODE
          <br />
          OF BIOLOGY
        </h1>
        <p>
          A molecular biology background, rebuilt as software &mdash; an MSCS at CU
          Boulder and a search for a Winter 2027 engineering internship.
        </p>
      </div>

      <div className="hero-helix">
        <Helix width={260} height={780} amplitude={108} rungCount={42} />
      </div>

      <span className="hero-access">ACCESS TERMINAL</span>

      <button className="hero-enter" onClick={onEnter}>
        ENTER LAB &mdash;
      </button>
    </section>
  )
}
