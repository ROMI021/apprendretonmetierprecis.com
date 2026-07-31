"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PARCOURS_DATA } from "@/data/parcours";
import PomodoroTimer from "@/components/PomodoroTimer";
import NavigationLayout from "@/components/NavigationLayout";

declare global {
  interface Window {
    MathJax?: {
      typesetPromise?: (elements?: Element[]) => Promise<void>;
    };
  }
}

export default function SessionPage({ params }: { params: Promise<{ id: string; sessionId: string }> }) {
  const { id, sessionId } = use(params);
  const parcours = PARCOURS_DATA.find((p) => p.id === id);
  const sessionNum = parseInt(sessionId, 10);
  const session = parcours?.sessions.find((s) => s.id === sessionNum);
  const [completed, setCompleted] = useState(false);

  // Déclenchement optimisé de MathJax uniquement sur le conteneur de cours
  useEffect(() => {
    if (typeof window !== "undefined" && window.MathJax?.typesetPromise) {
      const container = document.getElementById("course-content-container");
      if (container) {
        window.MathJax.typesetPromise([container]);
      }
    }
  }, [sessionId, session]);

  if (!parcours || !session) return notFound();

  const nextId = sessionNum < parcours.sessions.length ? sessionNum + 1 : null;
  const prevId = sessionNum > 1 ? sessionNum - 1 : null;
  const progressPct = Math.round((sessionNum / parcours.sessions.length) * 100);

  return (
    <NavigationLayout currentParcoursId={parcours.id} currentSessionId={session.id}>
      <header className="topbar">
        <div className="topbar-breadcrumb">
          <Link href="/">Parcours</Link>
          <span>/</span>
          <Link href={`/parcours/${parcours.id}`}>{parcours.icon} {parcours.title.split(" ").slice(0,3).join(" ")}</Link>
          <span>/</span>
          <span>Session {session.id}</span>
        </div>
        <div className="topbar-right" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <PomodoroTimer />
          <span className="reader-topbar-info">⏱ {session.duration}</span>
        </div>
      </header>

        {/* Thin session progress stripe */}
        <div className="progress-stripe">
          <div className="progress-stripe-fill" style={{width:`${progressPct}%`}} />
        </div>

        <div className="reader-wrapper">
          <div className="reader-eyebrow">{session.tome} · Session {session.id} sur {parcours.sessions.length}</div>
          <h1 className="reader-title">{session.title}</h1>

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

          {/* Exact HTML content avec rendu MathJax ciblé */}
          <div
            id="course-content-container"
            dangerouslySetInnerHTML={{ __html: session.htmlContent }}
          />

          {/* Validation & Navigation ultra-rapide */}
          <div className="reader-nav">
            {prevId ? (
              <Link href={`/parcours/${parcours.id}/session/${prevId}`} prefetch={true} className="btn-nav">
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
              <Link href={`/parcours/${parcours.id}/session/${nextId}`} prefetch={true} className="btn-nav">
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
    </NavigationLayout>
