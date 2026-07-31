import Link from "next/link";
import Image from "next/image";
import { PARCOURS_DATA } from "@/data/parcours";
import NavigationLayout from "@/components/NavigationLayout";
import CourseExplorer from "@/components/CourseExplorer";

export const metadata = {
  title: "Souveraineté — Apprendre ton Métier Précis",
  description: "Plateforme d'apprentissage technique et d'ingénierie.",
};

export default function HomePage() {
  return (
    <NavigationLayout>
      <header className="topbar">
        <div className="topbar-breadcrumb">
          <span>Accueil</span>
        </div>
        <div className="topbar-right">
          <span className="badge badge-blue">Formations Techniques</span>
        </div>
      </header>

      <div className="home-wrapper">
        {/* HERO SECTION INSPIRÉE DU DESIGN RECHERCHÉ (2 COLONNES ÉPURÉES) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "40px",
            alignItems: "center",
            marginBottom: "56px",
            paddingBottom: "32px",
            borderBottom: "1px solid var(--content-border)",
          }}
        >
          {/* Colonne Gauche : Titre percutant, sous-titre court et CTA */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "var(--accent)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                display: "block",
                marginBottom: "12px",
              }}
            >
              Formation à distance
            </span>

            <h1
              style={{
                fontSize: "2.2rem",
                fontWeight: 800,
                color: "var(--ink-dark)",
                lineHeight: 1.15,
                letterSpacing: "-0.03em",
                marginBottom: "16px",
              }}
            >
              Maîtrise Ton Métier Précis. Pas-à-Pas.
            </h1>

            <p
              style={{
                fontSize: "0.95rem",
                color: "var(--ink-muted)",
                lineHeight: 1.6,
                marginBottom: "28px",
              }}
            >
              Apprends des compétences techniques et d&apos;ingénierie réelles grâce à des cours découpés en sessions quotidiennes concrètes.
            </p>

            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <a
                href="#courses-section"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "12px 24px",
                  background: "var(--accent)",
                  color: "#ffffff",
                  borderRadius: "6px",
                  fontWeight: 600,
                  fontSize: "0.88rem",
                  textDecoration: "none",
                  transition: "background 0.15s ease",
                }}
              >
                Explorer les Métiers →
              </a>
            </div>
          </div>

          {/* Colonne Droite : Illustration Épurée */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: "460px",
                borderRadius: "12px",
                overflow: "hidden",
                border: "1px solid var(--content-border)",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
                background: "#ffffff",
              }}
            >
              <Image
                src="/hero-illustration.png"
                alt="Formation à distance"
                width={500}
                height={350}
                style={{ width: "100%", height: "auto", display: "block" }}
                priority
              />
            </div>
          </div>
        </div>

        {/* SECTION MÉTIERS ET RECHERCHE */}
        <div id="courses-section">
          <div style={{ marginBottom: "20px" }}>
            <h2
              style={{
                fontSize: "1.1rem",
                fontWeight: 700,
                color: "var(--ink-dark)",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
              }}
            >
              Tous les Métiers Disponibles
            </h2>
          </div>

          {/* Composant de Recherche & Filtres */}
          <CourseExplorer parcoursList={PARCOURS_DATA} />
        </div>
      </div>
    </NavigationLayout>
  );
}
