"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Parcours } from "@/data/parcours";
import { isFuzzyMatch } from "@/utils/fuzzySearch";

export default function CourseExplorer({ parcoursList }: { parcoursList: Parcours[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Toutes");

  // Extraire dynamiquement les catégories uniques
  const categories = useMemo(() => {
    const cats = Array.from(new Set(parcoursList.map((p) => p.category)));
    return ["Toutes", ...cats];
  }, [parcoursList]);

  // Filtrer les parcours selon la recherche floue et la catégorie sélectionnée
  const filteredParcours = useMemo(() => {
    return parcoursList.filter((parcours) => {
      // Filtre catégorie
      const categoryMatches = selectedCategory === "Toutes" || parcours.category === selectedCategory;
      if (!categoryMatches) return false;

      // Filtre recherche floue
      if (!searchQuery.trim()) return true;

      const searchableText = `${parcours.title} ${parcours.subtitle} ${parcours.description} ${parcours.category} ${parcours.tags.join(" ")} ${parcours.tomes.join(" ")}`;
      return isFuzzyMatch(searchQuery, searchableText);
    });
  }, [parcoursList, searchQuery, selectedCategory]);

  return (
    <div style={{ marginBottom: "40px" }}>
      {/* Zone Recherche & Filtres */}
      <div
        style={{
          background: "#f8fafc",
          border: "1px solid var(--content-border)",
          borderRadius: "8px",
          padding: "20px 24px",
          marginBottom: "28px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {/* Input Recherche */}
        <div style={{ position: "relative", width: "100%" }}>
          <div
            style={{
              position: "absolute",
              left: "14px",
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: "1.1rem",
              color: "var(--ink-muted)",
              pointerEvents: "none",
            }}
          >
            🔍
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher un métier, une techno (ex: drone, cibersecurite, binaire, c++, rust)..."
            style={{
              width: "100%",
              padding: "12px 16px 12px 44px",
              fontSize: "0.9rem",
              fontFamily: "'IBM Plex Sans', sans-serif",
              border: "1px solid var(--content-border)",
              borderRadius: "6px",
              outline: "none",
              background: "#ffffff",
              color: "var(--ink-dark)",
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              style={{
                position: "absolute",
                right: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                color: "var(--ink-muted)",
                cursor: "pointer",
                fontSize: "0.9rem",
              }}
            >
              ✕
            </button>
          )}
        </div>

        {/* Filtres par Catégorie */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
          <span
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.72rem",
              fontWeight: 700,
              color: "var(--ink-muted)",
              textTransform: "uppercase",
              marginRight: "4px",
            }}
          >
            Catégories :
          </span>

          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: "0.78rem",
                fontWeight: selectedCategory === cat ? 600 : 400,
                padding: "5px 12px",
                borderRadius: "20px",
                border: selectedCategory === cat ? "1px solid var(--accent)" : "1px solid var(--content-border)",
                background: selectedCategory === cat ? "var(--accent)" : "#ffffff",
                color: selectedCategory === cat ? "#ffffff" : "var(--ink-body)",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Résultat du filtrage */}
      {filteredParcours.length === 0 ? (
        <div
          style={{
            padding: "40px",
            textAlign: "center",
            background: "#ffffff",
            border: "1px dashed var(--content-border)",
            borderRadius: "8px",
            color: "var(--ink-muted)",
          }}
        >
          <div style={{ fontSize: "2rem", marginBottom: "8px" }}>🔎</div>
          <div style={{ fontWeight: 600, fontSize: "0.95rem", color: "var(--ink-dark)" }}>
            Aucun métier trouvé pour &quot;{searchQuery}&quot;
          </div>
          <p style={{ fontSize: "0.82rem", marginTop: "4px" }}>
            Essaye d&apos;autres mots-clés ou réinitialise le filtre de catégorie.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("Toutes");
            }}
            style={{
              marginTop: "16px",
              padding: "6px 16px",
              background: "var(--accent)",
              color: "#ffffff",
              border: "none",
              borderRadius: "4px",
              fontSize: "0.8rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Réinitialiser les filtres
          </button>
        </div>
      ) : (
        <div className="career-grid">
          {filteredParcours.map((parcours) => (
            <Link key={parcours.id} href={`/parcours/${parcours.id}`} className="career-card">
              <div className="career-card-icon">{parcours.icon}</div>
              <div className="career-card-body">
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                  <div className="career-card-title">{parcours.title}</div>
                  <span className="badge badge-blue">{parcours.badge}</span>
                </div>
                <div className="career-card-sub">{parcours.subtitle}</div>
                <div className="career-card-desc">{parcours.description}</div>

                <div style={{ marginTop: "12px", marginBottom: "8px" }}>
                  <div
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "0.68rem",
                      color: "var(--ink-muted)",
                      textTransform: "uppercase",
                      marginBottom: "4px",
                    }}
                  >
                    Catégorie : <strong style={{ color: "var(--accent)" }}>{parcours.category}</strong>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {parcours.tomes.map((tome, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontSize: "0.7rem",
                          fontFamily: "'IBM Plex Mono', monospace",
                          background: "#f1f5f9",
                          padding: "2px 6px",
                          borderRadius: "4px",
                          color: "#475569",
                        }}
                      >
                        {tome.split(":")[0]}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="career-card-meta" style={{ marginTop: "16px" }}>
                  <div className="meta-tag">
                    <strong>{parcours.durationMonths}</strong> mois
                  </div>
                  <div className="meta-tag">
                    <strong>{parcours.sessionsCount}</strong> sessions
                  </div>
                  <div className="meta-tag">
                    <strong>{parcours.sessions.length || 0}</strong> prêtes
                  </div>
                </div>
              </div>
              <div className="career-card-arrow">→</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
