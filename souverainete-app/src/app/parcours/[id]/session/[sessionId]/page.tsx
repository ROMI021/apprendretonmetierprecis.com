"use client";

import { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PARCOURS_DATA } from "@/data/parcours";

export default function SessionPage({ params }: { params: Promise<{ id: string; sessionId: string }> }) {
  const { id, sessionId } = use(params);
  const parcours = PARCOURS_DATA.find((p) => p.id === id);
  const sessionNum = parseInt(sessionId, 10);
  const session = parcours?.sessions.find((s) => s.id === sessionNum);

  const [showCorrection, setShowCorrection] = useState(false);
  const [completed, setCompleted] = useState(false);

  if (!parcours || !session) {
    return notFound();
  }

  const nextSessionId = sessionNum < parcours.sessions.length ? sessionNum + 1 : null;
  const prevSessionId = sessionNum > 1 ? sessionNum - 1 : null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Top Navbar */}
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href={`/parcours/${parcours.id}`} className="text-xs font-mono text-emerald-400 hover:underline">
            ← Vue du parcours
          </Link>
          <div className="text-xs font-mono text-slate-400">
            {session.tome} · Session {session.id} sur {parcours.sessions.length}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-6 py-10 space-y-10">
        {/* Title Banner */}
        <div className="border-b border-slate-800 pb-6 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
            <span>⏱️ Durée estimée : {session.duration}</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Session {session.id} : {session.title}
          </h1>
        </div>

        {/* 1. SECTION MATHÉMATIQUES & LOGIQUE */}
        <div className="bg-slate-900/80 border-l-4 border-emerald-500 rounded-r-xl p-6 space-y-3">
          <h2 className="text-sm font-mono uppercase font-bold text-emerald-400 tracking-wider">
            📐 1. Théorie Mathématique & Logique
          </h2>
          <div className="font-mono text-sm text-slate-200 bg-slate-950 p-4 rounded-lg border border-slate-800 leading-relaxed">
            {session.maths}
          </div>
        </div>

        {/* 2. SECTION LEÇON PRINCIPALE */}
        <div className="bg-slate-900/80 border-l-4 border-cyan-500 rounded-r-xl p-6 space-y-3">
          <h2 className="text-sm font-mono uppercase font-bold text-cyan-400 tracking-wider">
            📖 2. Leçon Principale & Décomposition
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            {session.lesson}
          </p>
        </div>

        {/* 3. CAS RÉEL DÉFENSE */}
        <div className="bg-slate-900/80 border-l-4 border-amber-500 rounded-r-xl p-6 space-y-3">
          <h2 className="text-sm font-mono uppercase font-bold text-amber-400 tracking-wider">
            🎯 3. Cas Réel — Systèmes de Défense & Armement
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed italic">
            &quot;{session.defenseCase}&quot;
          </p>
        </div>

        {/* 4. EXERCICE PRATIQUE */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <span>✍️ 4. Exercice d&apos;Application Sur Papier</span>
          </h2>

          <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
            <p className="text-sm text-slate-200 font-semibold">{session.exercise.question}</p>
            {session.exercise.hint && (
              <p className="text-xs text-slate-400 font-mono">💡 Indice : {session.exercise.hint}</p>
            )}
          </div>

          <div>
            <button
              onClick={() => setShowCorrection(!showCorrection)}
              className="px-4 py-2 text-xs font-mono bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition"
            >
              {showCorrection ? "Masquer la Correction" : "Afficher la Correction Détaillée"}
            </button>

            {showCorrection && (
              <div className="mt-4 p-4 bg-emerald-950/30 border border-emerald-500/30 rounded-lg text-sm text-emerald-300 font-mono leading-relaxed">
                <strong className="block text-emerald-400 mb-1">Correction Rédigée :</strong>
                {session.exercise.correction}
              </div>
            )}
          </div>
        </div>

        {/* Navigation & Validation */}
        <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
          {prevSessionId ? (
            <Link
              href={`/parcours/${parcours.id}/session/${prevSessionId}`}
              className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-mono transition"
            >
              ← Session Précédente
            </Link>
          ) : <div />}

          <button
            onClick={() => setCompleted(true)}
            className={`px-6 py-2.5 rounded-lg text-xs font-mono font-bold transition ${
              completed
                ? "bg-emerald-500 text-slate-950 cursor-default"
                : "bg-emerald-600 hover:bg-emerald-500 text-slate-950"
            }`}
          >
            {completed ? "✓ Session Validée !" : "Valider cette Session"}
          </button>

          {nextSessionId ? (
            <Link
              href={`/parcours/${parcours.id}/session/${nextSessionId}`}
              className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-mono transition"
            >
              Session Suivante →
            </Link>
          ) : <div />}
        </div>
      </main>
    </div>
  );
}
