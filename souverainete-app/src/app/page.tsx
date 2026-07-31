import Link from "next/link";
import { PARCOURS_DATA } from "@/data/parcours";
import NavigationLayout from "@/components/NavigationLayout";
import CourseExplorer from "@/components/CourseExplorer";

export const metadata = {
  title: "Souveraineté — Académie des Métiers Techniques Souverains",
  description: "Plateforme de formation pas-à-pas aux métiers d'ingénierie critique, drones autonomes et cybersécurité.",
};

export default function HomePage() {
  return (
    <NavigationLayout>
      <header className="topbar">
        <div className="topbar-breadcrumb">
          <span>Portail des Métiers Souverains</span>
        </div>
        <div className="topbar-right">
          <span className="badge badge-blue">3 Parcours Métiers</span>
          <span className="badge badge-slate">560 Sessions</span>
        </div>
      </header>

      <div className="home-wrapper">
        {/* Banner Hero Global */}
        <div style={{ marginBottom: "32px" }}>
          <div className="page-eyebrow">Académie des Métiers Souverains</div>
          <h1 className="page-title">
            Choisis ton Métier d&apos;Avenir.<br />
            Bâtis l&apos;Indépendance Technologique.
          </h1>
          <p className="page-subtitle" style={{ maxWidth: "780px", marginBottom: "24px" }}>
            Des parcours d&apos;apprentissage rigoureux conçus pour former les bâtisseurs des systèmes de demain.
            De la théorie mathématique jusqu&apos;au matériel physique, sans survol ni jargon inexpliqué.
          </p>
        </div>

        {/* Chiffres & Piliers Globaux */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "16px",
            marginBottom: "36px",
          }}
        >
          <div
            style={{
              padding: "16px 20px",
              background: "#f8fafc",
              border: "1px solid var(--content-border)",
              borderRadius: "8px",
            }}
          >
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "1.6rem", fontWeight: 700, color: "var(--accent)" }}>
              3
            </div>
            <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--ink-dark)" }}>Parcours Métiers Complémentaires</div>
            <div style={{ fontSize: "0.75rem", color: "var(--ink-muted)", marginTop: "2px" }}>Systèmes, Drones & Cyber</div>
          </div>

          <div
            style={{
              padding: "16px 20px",
              background: "#f8fafc",
              border: "1px solid var(--content-border)",
              borderRadius: "8px",
            }}
          >
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "1.6rem", fontWeight: 700, color: "#16a34a" }}>
              560
            </div>
            <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--ink-dark)" }}>Sessions Quotidiennes</div>
            <div style={{ fontSize: "0.75rem", color: "var(--ink-muted)", marginTop: "2px" }}>45 à 60 minutes par jour</div>
          </div>

          <div
            style={{
              padding: "16px 20px",
              background: "#f8fafc",
              border: "1px solid var(--content-border)",
              borderRadius: "8px",
            }}
          >
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "1.6rem", fontWeight: 700, color: "#92400e" }}>
              100%
            </div>
            <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--ink-dark)" }}>Rigueur Mathématique</div>
            <div style={{ fontSize: "0.75rem", color: "var(--ink-muted)", marginTop: "2px" }}>Maths pures avant le code</div>
          </div>
        </div>

        {/* Explorateur avec Recherche Floue & Filtres de Catégories */}
        <CourseExplorer parcoursList={PARCOURS_DATA} />

        {/* Méthodologie Pédagogique */}
        <div
          style={{
            background: "#ffffff",
            border: "1.5px solid var(--ink-dark)",
            borderRadius: "8px",
            padding: "28px 32px",
            marginBottom: "40px"
          }}
        >
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "var(--accent)", marginBottom: "8px" }}>
            La Méthode d&apos;Apprentissage Souveraine
          </div>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--ink-dark)", marginBottom: "16px" }}>
            Comment fonctionne chaque session ?
          </h3>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
            <div>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.8rem", fontWeight: 700, color: "#2563eb", marginBottom: "4px" }}>
                1. Théorie Mathématique
              </div>
              <p style={{ fontSize: "0.82rem", color: "var(--ink-body)", lineHeight: 1.55 }}>
                Chaque notion commence par les théorèmes, équations et principes logiques fondamentaux.
              </p>
            </div>

            <div>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.8rem", fontWeight: 700, color: "#b45309", marginBottom: "4px" }}>
                2. Décomposition Rédigée
              </div>
              <p style={{ fontSize: "0.82rem", color: "var(--ink-body)", lineHeight: 1.55 }}>
                Des exemples étape par étape expliqués clairement comme dans un manuel de mathématiques pures.
              </p>
            </div>

            <div>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.8rem", fontWeight: 700, color: "#b91c1c", marginBottom: "4px" }}>
                3. Cas Réel Défense
              </div>
              <p style={{ fontSize: "0.82rem", color: "var(--ink-body)", lineHeight: 1.55 }}>
                Mise en situation concrète sur un calculateur de vol, un drone autonome ou un HSM cryptographique.
              </p>
            </div>

            <div>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.8rem", fontWeight: 700, color: "#15803d", marginBottom: "4px" }}>
                4. Exercice sur Papier
              </div>
              <p style={{ fontSize: "0.82rem", color: "var(--ink-body)", lineHeight: 1.55 }}>
                Mise en pratique manuelle obligatoire avec correction rédigée intégrale.
              </p>
            </div>
          </div>
        </div>

      </div>
    </NavigationLayout>
  );
}
