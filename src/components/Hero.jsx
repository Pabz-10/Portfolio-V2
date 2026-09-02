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
          PABIL'S
          <br />
          CENTRAL
          <br />
          DOGMA
        </h1>
        <p>
          Molecular Biology &rarr; Computer Science &rarr; Software Engineering.
        </p>
      </div>

      <div className="hero-helix">
        <Helix width={340} height={780} amplitude={140} rungCount={42} />
      </div>

      <span className="hero-access">ACCESS TERMINAL</span>

      <button className="hero-enter" onClick={onEnter}>
        RUN BUILD &mdash;
      </button>
    </section>
  )
}
