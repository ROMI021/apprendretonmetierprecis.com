"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PARCOURS_DATA } from "@/data/parcours";
import PomodoroTimer from "@/components/PomodoroTimer";

declare global {
  interface Window {
    MathJax?: { typesetPromise?: () => Promise<void> };
  }
}

export default function SessionPage({ params }: { params: Promise<{ id: string; sessionId: string }> }) {
  const { id, sessionId } = use(params);
  const parcours = PARCOURS_DATA.find((p) => p.id === id);
  const sessionNum = parseInt(sessionId, 10);
  const session = parcours?.sessions.find((s) => s.id === sessionNum);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.MathJax?.typesetPromise) {
      window.MathJax.typesetPromise();
    }
  }, [session]);

  if (!parcours || !session) return notFound();

  const nextId = sessionNum < parcours.sessions.length ? sessionNum + 1 : null;
  const prevId = sessionNum > 1 ? sessionNum - 1 : null;
  const progressPct = Math.round((sessionNum / parcours.sessions.length) * 100);

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
          <Link href={`/parcours/${parcours.id}`} className="sidebar-nav-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
            Vue d&apos;ensemble
          </Link>
          <Link href="/journal" className="sidebar-nav-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            Journal de bord
          </Link>
        </div>

        {/* Sessions list in sidebar */}
        <div className="sidebar-section" style={{flex:1}}>
          <div className="sidebar-section-label">Tome 0 — Sessions</div>
          {parcours.sessions.map((s) => (
            <Link
              key={s.id}
              href={`/parcours/${parcours.id}/session/${s.id}`}
              className={`sidebar-nav-item ${s.id === sessionNum ? "active" : ""}`}
              style={{paddingLeft:"16px", fontSize:"0.78rem"}}
            >
              <div className={`nav-dot ${s.id === sessionNum ? "current" : s.id < sessionNum ? "done" : ""}`} />
              <span>S{s.id} · {s.title.split(" ").slice(0, 4).join(" ")}…</span>
            </Link>
          ))}
        </div>

        {/* Progress */}
        <div style={{padding:"16px",borderTop:"1px solid var(--nav-border)"}}>
          <div style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:"0.65rem",color:"var(--nav-text)",marginBottom:"8px"}}>
            Progression du Tome 0
          </div>
          <div style={{height:"3px",background:"#21262d",borderRadius:"2px"}}>
            <div style={{height:"100%",background:"var(--nav-accent)",borderRadius:"2px",width:`${progressPct}%`}} />
          </div>
          <div style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:"0.62rem",color:"var(--nav-text)",marginTop:"5px"}}>
            {sessionNum}/{parcours.sessions.length} sessions
          </div>
        </div>
      </aside>

      {/* Content */}
      <div className="content-area">
        <header className="topbar">
          <div className="topbar-breadcrumb">
            <Link href="/">Parcours</Link>
            <span>/</span>
            <Link href={`/parcours/${parcours.id}`}>{parcours.icon} {parcours.title.split(" ").slice(0,3).join(" ")}</Link>
            <span>/</span>
            <span>Session {session.id}</span>
          </div>
          <div className="topbar-right reader-topbar-info">
            ⏱ {session.duration}
          </div>
        </header>

        {/* Thin session progress stripe */}
        <div className="progress-stripe">
          <div className="progress-stripe-fill" style={{width:`${progressPct}%`}} />
        </div>

        <div className="reader-wrapper">
          <div className="reader-eyebrow">{session.tome} · Session {session.id} sur {parcours.sessions.length}</div>
          <h1 className="reader-title">{session.title}</h1>

          {/* Minuteur Pomodoro d'étude */}
          <PomodoroTimer />

          {/* Encadré Note : À quoi sert cette session ? */}
          {session.note && (
            <div style={{
              background: "#f0fdf4",
              borderLeft: "4px solid #16a34a",
              padding: "16px 20px",
              marginBottom: "32px",
              borderRadius: "0 6px 6px 0"
            }}>
              <div style={{
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: "0.75rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "#15803d",
                marginBottom: "4px",
                display: "flex",
                alignItems: "center",
                gap: "6px"
              }}>
                <span>💡</span> À quoi sert cette session ?
              </div>
              <p style={{
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: "0.9rem",
                color: "#166534",
                lineHeight: "1.5",
                margin: 0
              }}>
                {session.note}
              </p>
            </div>
          )}

          {/* Exact HTML content with MathJax rendering */}
          <div
            dangerouslySetInnerHTML={{ __html: session.htmlContent }}
          />

          {/* Validation & Navigation */}
          <div className="reader-nav">
            {prevId ? (
              <Link href={`/parcours/${parcours.id}/session/${prevId}`} className="btn-nav">
                ← Session {prevId}
              </Link>
            ) : <div />}

            <button
              onClick={() => setCompleted(true)}
              className={`btn-validate ${completed ? "done" : ""}`}
            >
              {completed ? "✓ Session validée" : "Marquer comme terminée"}
            </button>

            {nextId ? (
              <Link href={`/parcours/${parcours.id}/session/${nextId}`} className="btn-nav">
                Session {nextId} →
              </Link>
            ) : (
              <div style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:"0.72rem",color:"var(--ink-muted)"}}>
                Fin du Tome 0
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
