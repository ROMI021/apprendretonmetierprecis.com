"use client";

import { useState } from "react";
import Link from "next/link";

export default function JournalPage() {
  const [streak] = useState(1);
  const [checks, setChecks] = useState([false, false, false, false]);
  const [saved, setSaved] = useState(false);

  const toggle = (i: number) => setChecks(c => c.map((v, idx) => idx === i ? !v : v));

  const rituals = [
    "Fermer tous les réseaux sociaux et notifications",
    "Lire la déclaration de souveraineté à voix haute",
    "Relire les notes de la dernière session validée",
    "Lancer le timer — 45 minutes sans interruption",
  ];

  return (
    <div className="app-shell">
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
          <Link href="/journal" className="sidebar-nav-item active">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            Journal de bord
          </Link>
        </div>
      </aside>

      <div className="content-area">
        <header className="topbar">
          <div className="topbar-breadcrumb">
            <Link href="/">Parcours</Link>
            <span>/</span>
            <span>Journal de Bord</span>
          </div>
        </header>

        <div className="journal-wrapper">
          <div className="page-eyebrow">Discipline & Ancrage</div>
          <h1 className="page-title">Journal de Bord</h1>
          <p className="page-subtitle">Ton rituel de 5 minutes avant chaque session.</p>

          {/* Streak */}
          <div className="streak-card">
            <div>
              <div style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:"0.72rem",color:"var(--ink-muted)",marginBottom:"4px",textTransform:"uppercase",letterSpacing:"0.08em"}}>
                Chaîne de sessions
              </div>
              <div className="streak-number">{streak} <span style={{fontSize:"1.5rem"}}>🔥</span></div>
              <div className="streak-label">{streak > 1 ? "jours consécutifs" : "jour — C'est le début"}</div>
            </div>
            <div style={{textAlign:"right"}}>
              <div style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:"0.7rem",color:"var(--ink-muted)"}}>Objectif</div>
              <div style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:"1.4rem",fontWeight:700,color:"var(--ink-dark)"}}>560</div>
              <div style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:"0.7rem",color:"var(--ink-muted)"}}>sessions totales</div>
            </div>
          </div>

          {/* Rituel */}
          <div className="ritual-card">
            <div className="ritual-header">Rituel du Matin (5 min)</div>
            {rituals.map((r, i) => (
              <label key={i} className="ritual-item" style={{cursor:"pointer"}}>
                <input type="checkbox" checked={checks[i]} onChange={() => toggle(i)} />
                <span style={{textDecoration: checks[i] ? "line-through" : "none", color: checks[i] ? "var(--ink-muted)" : "inherit"}}>
                  {r}
                </span>
              </label>
            ))}
          </div>

          {/* Lettre engagement */}
          <div className="ritual-card">
            <div className="ritual-header">Lettre à l&apos;Afrique de 2036</div>
            <div style={{padding:"20px"}}>
              <p style={{fontSize:"0.82rem",color:"var(--ink-muted)",marginBottom:"12px",fontStyle:"italic"}}>
                Pourquoi fais-tu cela ? Écris-le. Relis-le tous les matins.
              </p>
              <textarea
                rows={6}
                placeholder="Dans dix ans, l'Afrique doit concevoir ses propres systèmes de défense. Je m'y engage parce que…"
                style={{
                  width:"100%",
                  padding:"12px 14px",
                  border:"1px solid var(--content-border)",
                  borderRadius:"4px",
                  fontSize:"0.88rem",
                  fontFamily:"'IBM Plex Sans',sans-serif",
                  color:"var(--ink-dark)",
                  background:"#fafafa",
                  resize:"vertical",
                  outline:"none",
                  lineHeight:1.65
                }}
                onFocus={e => (e.target.style.borderColor = "var(--accent)")}
                onBlur={e => (e.target.style.borderColor = "var(--content-border)")}
              />
              <div style={{marginTop:"12px"}}>
                <button
                  onClick={() => setSaved(true)}
                  style={{
                    padding:"8px 20px",
                    background: saved ? "#15803d" : "var(--accent)",
                    color:"white",
                    border:"none",
                    borderRadius:"4px",
                    fontSize:"0.82rem",
                    fontWeight:600,
                    cursor:"pointer",
                    fontFamily:"'IBM Plex Sans',sans-serif"
                  }}
                >
                  {saved ? "✓ Sauvegardé" : "Sauvegarder"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
