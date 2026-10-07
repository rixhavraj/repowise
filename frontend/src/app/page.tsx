const features = [
  [
    "01",
    "Git-native publishing",
    "Write in Markdown, commit to GitHub, and let the platform keep your knowledge in sync.",
  ],
  [
    "02",
    "Built for deep work",
    "Beautiful reading experiences with code highlighting, search, categories, and version history.",
  ],
  [
    "03",
    "Your public knowledge graph",
    "Turn scattered notes into a discoverable profile that compounds with every contribution.",
  ],
];
export default function Home() {
  return (
    <main>
      <nav className="nav shell">
        <a className="brand" href="/">
          git<span>puv</span>
        </a>
        <div className="navlinks">
          <a href="#how">How it works</a>
          <a href="#features">Features</a>
          <a href="/explore">Explore</a>
        </div>
        <a className="btn secondary" href={`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000"}/api/auth/github`}>
          Login with GitHub ↗
        </a>
      </nav>
      <section className="hero shell">
        <div>
          <div className="eyebrow">The open knowledge layer</div>
          <h1>Make what you know easy to find.</h1>
          <p>
            RepoWise turns your GitHub repository into a living knowledge
            platform. Write where you already work. Publish when you push.
          </p>
          <div className="actions">
            <a className="btn" href={`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000"}/api/auth/github`}>
              Continue with GitHub ↗
            </a>
            <a className="btn secondary" href="#how">
              See how it works
            </a>
          </div>
        </div>
        <div className="preview">
          <div className="previewbar">github.com / you / knowledge</div>
          <div className="previewcard">
            <small>PYTHON · 8 MIN READ</small>
            <h3>Exception handling, without the mystery</h3>
            <p style={{ color: "#c7ced9", fontSize: 13, lineHeight: 1.6 }}>
              A practical guide to writing resilient Python programs.
            </p>
            <div className="code">
              try:
              <br />
              　result = 10 / 0<br />
              except ZeroDivisionError:
              <br />
              　print('Handle it')
            </div>
          </div>
        </div>
      </section>
      <section className="section shell" id="features">
        <div className="eyebrow">Why RepoWise</div>
        <h2>Your best thinking deserves a home.</h2>
        <p className="sectionlead">
          A publishing workflow that respects the tools developers already
          trust, with an experience readers actually enjoy.
        </p>
        <div className="grid">
          {features.map(([n, t, d]) => (
            <article className="card" key={n}>
              <div className="icon">{n}</div>
              <h3>{t}</h3>
              <p>{d}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section shell" id="how">
        <div
          className="card"
          style={{
            background: "#111827",
            color: "#fff",
            display: "flex",
            justifyContent: "space-between",
            gap: 30,
            alignItems: "center",
          }}
        >
          <div>
            <div className="eyebrow">Three steps</div>
            <h2 style={{ color: "#fff" }}>
              Push once.
              <br />
              Publish everywhere.
            </h2>
          </div>
          <p style={{ color: "#98a2b3", maxWidth: 390, lineHeight: 1.7 }}>
            Connect a repository, choose your /docs directory, and keep writing.
            GitHub remains the source of truth; RepoWise handles the reading
            experience.
          </p>
        </div>
      </section>
      <footer className="footer shell">
        <span>© 2026 RepoWise</span>
        <span>Built for people who share what they learn.</span>
      </footer>
    </main>
  );
}
