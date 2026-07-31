"use client";

import { useState } from "react";
import Link from "next/link";

export default function JournalPage() {
  const [streak, setStreak] = useState(1);
  const [letterWritten, setLetterWritten] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Top Navbar */}
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xs font-mono text-emerald-400 hover:underline">
            ← Retour à l'accueil
          </Link>
          <span className="font-mono text-xs text-slate-400">Journal de l'Architecte</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10 space-y-10">
        {/* Banner Streak */}
        <div className="bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-500/30 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-mono text-emerald-400 tracking-widest uppercase">Discipline & Ancrage</span>
            <h1 className="text-3xl font-extrabold text-white">Mon Journal de Bord</h1>
            <p className="text-sm text-slate-400">
              &quot;Je ne me forme pas pour un emploi. Je me forme pour que l'Afrique n'ait plus jamais à mendier sa sécurité.&quot;
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-emerald-500/30 text-center min-w-[200px]">
            <span className="text-xs font-mono text-slate-400">CHAÎNE ACTUELLE</span>
            <div className="text-4xl font-extrabold font-mono text-emerald-400 my-1">
              🔥 {streak} {streak > 1 ? "jours" : "jour"}
            </div>
            <span className="text-[10px] font-mono text-slate-500">Record : 560 sessions</span>
          </div>
        </div>

        {/* Rituel Quotidien */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            ⚡ Mon Rituel du Matin (5 minutes)
          </h2>
          <div className="space-y-3 text-sm text-slate-300">
            <label className="flex items-center gap-3 p-3 bg-slate-950/60 rounded-lg border border-slate-800/80 cursor-pointer hover:border-slate-700">
              <input type="checkbox" className="w-4 h-4 accent-emerald-500 rounded" />
              <span>1. Fermer toutes les applications inutiles (réseaux sociaux, notifications)</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-slate-950/60 rounded-lg border border-slate-800/80 cursor-pointer hover:border-slate-700">
              <input type="checkbox" className="w-4 h-4 accent-emerald-500 rounded" />
              <span>2. Lire la déclaration de souveraineté à voix haute</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-slate-950/60 rounded-lg border border-slate-800/80 cursor-pointer hover:border-slate-700">
              <input type="checkbox" className="w-4 h-4 accent-emerald-500 rounded" />
              <span>3. Relire la dernière session validée</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-slate-950/60 rounded-lg border border-slate-800/80 cursor-pointer hover:border-slate-700">
              <input type="checkbox" className="w-4 h-4 accent-emerald-500 rounded" />
              <span>4. Lancer le timer de 45 minutes d'étude sans interruption</span>
            </label>
          </div>
        </div>

        {/* Lettre d'Engagement */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            🌍 Lettre à l'Afrique de 2036
          </h2>
          <textarea
            rows={5}
            placeholder="Écris ton engagement personnel pour l'Afrique de 2036..."
            className="w-full bg-slate-950 text-slate-200 border border-slate-800 rounded-lg p-4 text-sm font-mono focus:border-emerald-500 focus:outline-none"
          />
          <button
            onClick={() => setLetterWritten(true)}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-mono text-xs font-bold rounded-lg transition"
          >
            {letterWritten ? "✓ Lettre Sauvegardée" : "Sauvegarder ma Lettre"}
          </button>
        </div>
      </main>
    </div>
  );
}
