import './SelectedWorks.css'

const PROJECTS = [
  {
    time: 'FILE_01',
    name: 'Running Analytics API',
    description:
      "Full stack ingestion and query service for Strava's run activity data, deployed on AWS.",
    stack: ['TYPESCRIPT / EXPRESS', 'POSTGRESQL', 'AWS EC2 DEPLOYMENT'],
  },
  {
    time: 'FILE_02',
    name: 'Discoverify',
    description:
      "Collaborative filtering recommendation engine trained on Spotify's Million Playlist Dataset.",
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
          WORK
          <br />
          V. 1.0
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
