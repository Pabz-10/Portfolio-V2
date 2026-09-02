import './SelectedWorks.css'

const PROJECTS = [
  {
    time: '01:00',
    name: 'Running Analytics API',
    description:
      'Full-stack ingestion and query service for run activity data, deployed on AWS.',
    stack: ['TYPESCRIPT / EXPRESS', 'POSTGRESQL', 'AWS EC2 DEPLOYMENT'],
  },
  {
    time: '02:45',
    name: 'Discoverify',
    description:
      "Collaborative-filtering recommendation engine trained on Spotify's Million Playlist Dataset.",
    stack: ['PYTHON', 'SVD / KNN'],
  },
]

export default function SelectedWorks() {
  return (
    <section className="works">
      <div className="works-grid">
        <h2 className="works-title">
          SELECTED
          <br />
          WORKS V.1
        </h2>

        <div className="works-list">
          {PROJECTS.map((p) => (
            <div className="works-item" key={p.name}>
              <span className="works-time">{p.time}</span>
              <div>
                <div className="works-name">{p.name}</div>
                <p className="works-description">{p.description}</p>
                <div className="works-stack">
                  {p.stack.map((s) => (
                    <div key={s}>+ &nbsp;{s}</div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
