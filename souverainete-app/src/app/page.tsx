import Link from "next/link";
import { PARCOURS_DATA } from "@/data/parcours";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-black">
      {/* Header / Banner */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">🛡️</span>
            <div>
              <h1 className="font-bold text-xl tracking-tight text-white">SOUVERAINETÉ</h1>
              <p className="text-xs text-emerald-400 font-mono uppercase tracking-widest">Académie des Systèmes Critiques</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              href="/journal" 
              className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition"
            >
              📓 Mon Journal (Streak)
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
            <span>⚡ Formation Continue Souveraine</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Choisis ton Métier. <br />
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">
              Construis l'Indépendance Technologique.
            </span>
          </h2>
          <p className="text-lg text-slate-400">
            Un parcours pas-à-pas découpé en sessions quotidiennes. Des mathématiques pures jusqu'au métal, sans jargon inutile.
          </p>
        </div>

        {/* Grille des Parcours */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PARCOURS_DATA.map((parcours) => (
            <div 
              key={parcours.id}
              className="group relative bg-slate-900/60 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/5"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-4xl p-3 bg-slate-800/80 rounded-xl">{parcours.icon}</span>
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-slate-800 text-emerald-400 border border-slate-700">
                    {parcours.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {parcours.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 font-mono">{parcours.subtitle}</p>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {parcours.description}
                </p>

                <div className="pt-4 border-t border-slate-800/80 space-y-2">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Durée recommandée :</span>
                    <span className="font-mono text-white">{parcours.durationMonths} mois</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Sessions programmées :</span>
                    <span className="font-mono text-emerald-400">{parcours.sessionsCount} sessions</span>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  href={`/parcours/${parcours.id}`}
                  className="block w-full text-center py-3 px-4 rounded-xl font-medium bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all font-mono font-semibold"
                >
                  Rejoindre ce Parcours →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 mt-20 py-8 text-center text-xs text-slate-500 font-mono">
        <p>SOUVERAINETÉ TECH · Conçu pour la maîtrise absolue des systèmes critiques</p>
      </footer>
    </div>
  );
}
