export default function Dashboard() {
  return (
    <main>
      <nav className="nav shell">
        <a className="brand" href="/">
          git<span>puv</span>
        </a>
        <a className="btn secondary" href="/">
          Sign out
        </a>
      </nav>
      <section className="section shell">
        <div className="eyebrow">Workspace</div>
        <h1 style={{ fontSize: 48, letterSpacing: "-.06em" }}>Welcome back.</h1>
        <p className="sectionlead">
          Connect a repository to start publishing your knowledge.
        </p>
        <div className="grid">
          <div className="card">
            <div className="eyebrow">Repositories</div>
            <h2>0</h2>
            <p>No repositories connected yet.</p>
            <a className="btn" href={`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000"}/api/auth/github`}>
              Connect GitHub ↗
            </a>
          </div>
          <div className="card">
            <div className="eyebrow">Published articles</div>
            <h2>0</h2>
            <p>Your public library will appear here.</p>
          </div>
          <div className="card">
            <div className="eyebrow">Sync status</div>
            <h2>Ready</h2>
            <p>Waiting for your first repository.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
