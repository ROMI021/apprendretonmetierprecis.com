import Link from "next/link";
import { notFound } from "next/navigation";
import { PARCOURS_DATA } from "@/data/parcours";

export default async function ParcoursPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const parcours = PARCOURS_DATA.find((p) => p.id === id);

  if (!parcours) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Navigation Topbar */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-sm font-mono text-emerald-400 hover:underline">
            ← Retour aux métiers
          </Link>
          <span className="font-mono text-xs text-slate-400">{parcours.title}</span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10 space-y-12">
        {/* Banner Parcours */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-4">
          <div className="flex items-center space-x-3">
            <span className="text-4xl">{parcours.icon}</span>
            <div>
              <h1 className="text-3xl font-extrabold text-white">{parcours.title}</h1>
              <p className="text-slate-400 text-sm">{parcours.subtitle}</p>
            </div>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed max-w-3xl">
            {parcours.description}
          </p>

          <div className="flex flex-wrap gap-6 pt-4 border-t border-slate-800 text-xs font-mono">
            <div>
              <span className="text-slate-500">Durée : </span>
              <span className="text-white font-bold">{parcours.durationMonths} mois</span>
            </div>
            <div>
              <span className="text-slate-500">Volume : </span>
              <span className="text-emerald-400 font-bold">{parcours.sessionsCount} sessions</span>
            </div>
            <div>
              <span className="text-slate-500">Sessions prêtes : </span>
              <span className="text-amber-400 font-bold">{parcours.sessions.length} sessions (Sessions 1 à 5)</span>
            </div>
          </div>
        </div>

        {/* Structure des Tomes */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-white tracking-tight border-b border-slate-800 pb-3">
            Programme du Métier par Tomes
          </h2>

          {/* Tome 0 (Disponible avec les sessions 1 à 5) */}
          <div className="bg-slate-900/60 border border-emerald-500/30 rounded-xl p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-emerald-400">
                Tome 0 : Fondations Mathématiques & Logiques
              </h3>
              <span className="px-2.5 py-1 text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md">
                Disponible (Sessions 1 à 5)
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3 pt-2">
              {parcours.sessions.map((session) => (
                <Link
                  key={session.id}
                  href={`/parcours/${parcours.id}/session/${session.id}`}
                  className="flex items-center justify-between p-4 bg-slate-950/80 hover:bg-slate-800/80 border border-slate-800 rounded-lg transition group"
                >
                  <div className="flex items-center space-x-4">
                    <span className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-mono font-bold text-xs">
                      {session.id}
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors">
                        Session {session.id} : {session.title}
                      </h4>
                      <p className="text-xs text-slate-400 font-mono mt-0.5">{session.duration}</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 group-hover:translate-x-1 transition-transform">
                    Ouvrir la session →
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Tomes suivants (En attente de demande) */}
          <div className="space-y-4">
            {parcours.tomes.slice(1).map((tomeTitle, index) => (
              <div key={index} className="bg-slate-900/30 border border-slate-800/60 rounded-xl p-5 opacity-60">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-semibold text-slate-300">{tomeTitle}</h4>
                  <span className="text-xs font-mono text-slate-500">En attente de développement</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
