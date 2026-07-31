import Link from "next/link";
import { notFound } from "next/navigation";
import { PARCOURS_DATA } from "@/data/parcours";

export default async function ParcoursPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const parcours = PARCOURS_DATA.find((p) => p.id === id);
  if (!parcours) notFound();

  const completedCount = 0; // persisté côté client dans la version suivante
  const progressPct = Math.round((completedCount / parcours.sessionsCount) * 100);

  return (
    <div className="app-shell">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="sidebar-logo-mark">
            <div className="sidebar-logo-icon">🛡️</div>
            <div>
              <div className="sidebar-logo-text">Souveraineté</div>
              <div className="sidebar-logo-sub">Académie Technique</div>
            </div>
          </div>
        </div>

        <div className="sidebar-section">
          <div className="sidebar-section-label">Navigation</div>
          <Link href="/" className="sidebar-nav-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            Tous les Parcours
          </Link>
          <Link href="/journal" className="sidebar-nav-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            Journal de bord
          </Link>
        </div>

        {/* Tree des sessions dans la sidebar */}
        <div className="sidebar-section" style={{flex:1,overflowY:"auto"}}>
          <div className="sidebar-section-label">{parcours.title.split(":")[0]}</div>

          {parcours.tomes.map((tome, ti) => (
            <div key={ti}>
              <div style={{
                padding:"8px 16px 4px",
                fontFamily:"'IBM Plex Mono',monospace",
                fontSize:"0.62rem",
                color:"#4a5568",
                textTransform:"uppercase",
                letterSpacing:"0.08em",
                marginTop: ti > 0 ? "4px" : 0
              }}>
                {`T${ti}`} · {tome.split(":")[1]?.trim() ?? tome}
              </div>

              {ti === 0 && parcours.sessions.map((session) => (
                <Link
                  key={session.id}
                  href={`/parcours/${parcours.id}/session/${session.id}`}
                  className="sidebar-nav-item"
                  style={{paddingLeft:"24px", fontSize:"0.78rem"}}
                >
                  <div className="nav-dot current" />
                  S{session.id} · {session.title.split(":")[0].replace("La ","").replace("Les ","").replace("Le ","").substring(0,22)}
                </Link>
              ))}

              {ti > 0 && (
                <div className="sidebar-nav-item locked" style={{paddingLeft:"24px",fontSize:"0.78rem",opacity:0.4,cursor:"default"}}>
                  <div className="nav-dot" style={{borderStyle:"dashed"}} />
                  Sessions à venir…
                </div>
              )}
            </div>
          ))}
        </div>
      </aside>

      {/* Content */}
      <div className="content-area">
        <header className="topbar">
          <div className="topbar-breadcrumb">
            <Link href="/">Parcours</Link>
            <span>/</span>
            <span>{parcours.title}</span>
          </div>
          <div className="topbar-right">
            <span className="badge badge-blue">{parcours.durationMonths} mois</span>
            <span className="badge badge-slate">{parcours.sessionsCount} sessions</span>
          </div>
        </header>

        {/* Progress stripe */}
        <div className="progress-stripe">
          <div className="progress-stripe-fill" style={{width:`${progressPct}%`}} />
        </div>

        {/* Header parcours */}
        <div className="parcours-header">
          <div className="parcours-header-row">
            <div style={{fontSize:"2rem"}}>{parcours.icon}</div>
            <div>
              <h1 style={{fontSize:"1.25rem",fontWeight:700,color:"var(--ink-dark)",letterSpacing:"-0.02em",marginBottom:"2px"}}>
                {parcours.title}
              </h1>
              <div style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:"0.72rem",color:"var(--ink-muted)"}}>
                {parcours.subtitle}
              </div>
            </div>
          </div>

          <div className="parcours-stats-bar">
            <div className="stat-item">
              <strong>{parcours.sessions.length}</strong>
              Sessions disponibles
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <strong>{parcours.sessionsCount}</strong>
              Sessions totales
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <strong>{progressPct}%</strong>
              Complété
              <div className="progress-bar-wrap">
                <div className="progress-bar-fill" style={{width:`${progressPct}%`}} />
              </div>
            </div>
          </div>
        </div>

        {/* Session list */}
        <div className="sessions-wrapper">
          {/* Tome 0 — Disponible */}
          <div className="tome-section">
            <div className="tome-label">
              Tome 0 — Fondations Mathématiques & Logiques
              <span className="badge badge-blue" style={{marginLeft:"10px"}}>Disponible</span>
            </div>

            {parcours.sessions.map((session) => (
              <Link
                key={session.id}
                href={`/parcours/${parcours.id}/session/${session.id}`}
                className="session-row"
              >
                <span className="session-num">S{String(session.id).padStart(2,"0")}</span>
                <div className="session-dot available" />
                <div className="session-info">
                  <div className="session-title">{session.title}</div>
                  <div className="session-duration">⏱ {session.duration}</div>
                </div>
                <span className="session-badge">Disponible</span>
              </Link>
            ))}
          </div>

          {/* Tomes suivants — Verrouillés */}
          {parcours.tomes.slice(1).map((tomeTitle, index) => (
            <div key={index} className="tome-section">
              <div className="tome-label">
                {tomeTitle}
                <span className="badge badge-slate" style={{marginLeft:"10px"}}>En attente</span>
              </div>
              <div className="session-row locked">
                <span className="session-num">—</span>
                <div className="session-dot locked" />
                <div className="session-info">
                  <div className="session-title">Sessions à développer sur demande</div>
                  <div className="session-duration">Non disponible</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
