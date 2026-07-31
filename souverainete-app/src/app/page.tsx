import Link from "next/link";
import { PARCOURS_DATA } from "@/data/parcours";

export const metadata = {
  title: "Souveraineté — Académie des Systèmes Critiques",
  description: "Parcours d'apprentissage pas-à-pas pour la maîtrise des systèmes embarqués, défense et cybersécurité.",
};

export default function HomePage() {
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
          <Link href="/" className="sidebar-nav-item active">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            Parcours disponibles
          </Link>
          <Link href="/journal" className="sidebar-nav-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            Journal de bord
          </Link>
        </div>

        <div className="sidebar-section" style={{flex:1}}>
          <div className="sidebar-section-label">Métiers</div>
          {PARCOURS_DATA.map((p) => (
            <Link key={p.id} href={`/parcours/${p.id}`} className="sidebar-nav-item">
              <span style={{fontSize:"13px"}}>{p.icon}</span>
              <span style={{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{p.title.split(" ").slice(0,3).join(" ")}…</span>
            </Link>
          ))}
        </div>

        <div style={{padding:"16px",borderTop:"1px solid var(--nav-border)"}}>
          <div style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:"0.65rem",color:"var(--nav-text)",lineHeight:1.6}}>
            <span style={{color:"#22c55e"}}>●</span> 5 sessions disponibles<br/>
            <span style={{color:"#475569"}}>○</span> 555 sessions à venir
          </div>
        </div>
      </aside>

      {/* Content */}
      <div className="content-area">
        <header className="topbar">
          <div className="topbar-breadcrumb">
            <span>Choisir un Parcours</span>
          </div>
          <div className="topbar-right">
            <span className="badge badge-blue">Beta</span>
          </div>
        </header>

        <div style={{padding:"48px 48px 80px",maxWidth:"820px"}}>
          <div className="page-eyebrow">Parcours de Formation</div>
          <h1 className="page-title">Choisis ton Métier.<br/>Commence à apprendre.</h1>
          <p className="page-subtitle">
            Chaque parcours est structuré en sessions quotidiennes de 45 à 60 minutes. 
            Les mathématiques viennent en premier. Le code vient après. Aucun raccourci.
          </p>

          <div className="career-grid">
            {PARCOURS_DATA.map((parcours) => (
              <Link
                key={parcours.id}
                href={`/parcours/${parcours.id}`}
                className="career-card"
              >
                <div className="career-card-icon">{parcours.icon}</div>
                <div className="career-card-body">
                  <div className="career-card-title">{parcours.title}</div>
                  <div className="career-card-sub">{parcours.subtitle}</div>
                  <div className="career-card-desc">{parcours.description}</div>
                  <div className="career-card-meta">
                    <div className="meta-tag"><strong>{parcours.durationMonths}</strong> mois</div>
                    <div className="meta-tag"><strong>{parcours.sessionsCount}</strong> sessions</div>
                    <div className="meta-tag"><strong>{parcours.sessions.length || "—"}</strong> disponibles</div>
                  </div>
                </div>
                <div className="career-card-arrow">→</div>
              </Link>
            ))}
          </div>

          <div style={{
            marginTop:"48px",
            padding:"20px 24px",
            background:"#f8fafc",
            border:"1px solid var(--content-border)",
            borderRadius:"6px",
            fontFamily:"'IBM Plex Mono',monospace",
            fontSize:"0.78rem",
            color:"var(--ink-muted)",
            lineHeight:1.6
          }}>
            <strong style={{color:"var(--ink-dark)",fontFamily:"'IBM Plex Sans',sans-serif"}}>Philosophie pédagogique</strong><br/>
            Chaque session suit une structure immuable : Théorie mathématique → Méthode rédigée → Application en défense → Exercice sur papier.
            Aucune session suivante n'est débloquée sans demande explicite.
          </div>
        </div>
      </div>
    </div>
  );
}
