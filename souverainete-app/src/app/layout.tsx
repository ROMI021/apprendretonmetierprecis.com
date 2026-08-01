import type { Metadata, Viewport } from "next";
import Script from "next/script";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";
import "./globals.css";

export const metadata: Metadata = {
  title: "Souveraineté — Académie des Systèmes Critiques",
  description:
    "Plateforme d'apprentissage souveraine pour la maîtrise des systèmes critiques et de la défense.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Souveraineté",
  },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/icon-192.png" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#0f172a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        {/* MathJax config */}
        <Script id="mathjax-config" strategy="beforeInteractive">
          {`
            MathJax = {
              tex: {
                inlineMath: [['$', '$'], ['\\\\(', '\\\\)']],
                displayMath: [['$$', '$$'], ['\\\\[', '\\\\]']]
              },
              svg: {
                fontCache: 'global'
              }
            };
          `}
        </Script>
        {/* MathJax — le Service Worker mettra en cache cette ressource CDN */}
        <Script
          id="mathjax-script"
          src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js"
          strategy="afterInteractive"
        />
      </head>
      <body className="antialiased bg-white text-slate-900">
        {children}
        {/* Enregistrement du Service Worker pour le mode hors ligne */}
        <ServiceWorkerRegistration />
      </body>
    </html>
  );
}
