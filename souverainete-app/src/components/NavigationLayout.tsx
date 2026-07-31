"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PARCOURS_DATA } from "@/data/parcours";

export default function NavigationLayout({
  children,
  currentParcoursId,
  currentSessionId,
}: {
  children: React.ReactNode;
  currentParcoursId?: string;
  currentSessionId?: number;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const activeParcours = PARCOURS_DATA.find((p) => p.id === currentParcoursId) || PARCOURS_DATA[0];

  return (
    <div className="app-shell">
      {/* Overlay sombre mobile lorsque le menu est ouvert */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.6)",
            backdropFilter: "blur(2px)",
            zIndex: 49,
          }}
        />
      )}

      {/* Sidebar (Desktop fixe + Mobile tiroir) */}
      <aside
        className={`sidebar ${mobileMenuOpen ? "mobile-open" : ""}`}
        style={{
          transform: mobileMenuOpen ? "translateX(0)" : undefined,
          zIndex: 50,
        }}
      >
        <div className="sidebar-logo">
          <div className="sidebar-logo-mark" style={{ justifyContent: "space-between", width: "100%" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div className="sidebar-logo-icon">🛡️</div>
              <div>
                <div className="sidebar-logo-text">Souveraineté</div>
                <div className="sidebar-logo-sub">Académie Technique</div>
              </div>
            </div>
            {/* Bouton fermeture sur mobile */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="mobile-only-btn"
              style={{
                background: "none",
                border: "none",
                color: "var(--nav-text)",
                fontSize: "1.2rem",
                cursor: "pointer",
                padding: "4px"
              }}
            >
              ✕
            </button>
          </div>
        </div>

        <div className="sidebar-section">
          <div className="sidebar-section-label">Navigation</div>
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`sidebar-nav-item ${pathname === "/" ? "active" : ""}`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            Tous les Parcours
          </Link>
          <Link
            href="/journal"
            onClick={() => setMobileMenuOpen(false)}
            className={`sidebar-nav-item ${pathname === "/journal" ? "active" : ""}`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            Journal de bord
          </Link>
        </div>

        {/* Tree des sessions si on est dans un parcours */}
        <div className="sidebar-section" style={{ flex: 1, overflowY: "auto" }}>
          <div className="sidebar-section-label">
            {activeParcours.title.split(":")[0]}
          </div>

          {activeParcours.tomes.map((tome, ti) => (
            <div key={ti}>
              <div
                style={{
                  padding: "8px 16px 4px",
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "0.62rem",
                  color: "#4a5568",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginTop: ti > 0 ? "4px" : 0,
                }}
              >
                {`T${ti}`} · {tome.split(":")[1]?.trim() ?? tome}
              </div>

              {ti === 0 &&
                activeParcours.sessions.map((session) => (
                  <Link
                    key={session.id}
                    href={`/parcours/${activeParcours.id}/session/${session.id}`}
                    prefetch={true}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`sidebar-nav-item ${
                      currentSessionId === session.id ? "active" : ""
                    }`}
                    style={{ paddingLeft: "24px", fontSize: "0.78rem" }}
                  >
                    <div
                      className={`nav-dot ${
                        currentSessionId === session.id
                          ? "current"
                          : currentSessionId && currentSessionId > session.id
                          ? "done"
                          : ""
                      }`}
                    />
                    <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      S{session.id} · {session.title.split(":")[0].replace("La ", "").replace("Les ", "").replace("Le ", "").substring(0, 22)}
                    </span>
                  </Link>
                ))}

              {ti > 0 && (
                <div
                  className="sidebar-nav-item locked"
                  style={{ paddingLeft: "24px", fontSize: "0.78rem", opacity: 0.4, cursor: "default" }}
                >
                  <div className="nav-dot" style={{ borderStyle: "dashed" }} />
                  Sessions à venir…
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ padding: "16px", borderTop: "1px solid var(--nav-border)" }}>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.65rem", color: "var(--nav-text)", lineHeight: 1.6 }}>
            <span style={{ color: "#22c55e" }}>●</span> {activeParcours.sessions.length} sessions disponibles<br />
            <span style={{ color: "#475569" }}>○</span> {activeParcours.sessionsCount - activeParcours.sessions.length} à venir
          </div>
        </div>
      </aside>

      {/* Content Area */}
      <div className="content-area">
        {/* Topbar mobile avec bouton menu burger */}
        <div className="mobile-header-bar">
          <button
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Ouvrir le menu"
            style={{
              background: "none",
              border: "none",
              color: "var(--ink-dark)",
              fontSize: "1.3rem",
              cursor: "pointer",
              padding: "4px 8px",
              display: "flex",
              alignItems: "center",
              gap: "6px"
            }}
          >
            <span>☰</span>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.75rem", fontWeight: 600 }}>Menu</span>
          </button>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.72rem", fontWeight: 700, color: "var(--accent)" }}>
            SOUVERAINETÉ
          </div>
        </div>

        {children}
      </div>
    </div>
  );
}
