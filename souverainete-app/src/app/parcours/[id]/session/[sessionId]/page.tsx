"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PARCOURS_DATA } from "@/data/parcours";

declare global {
  interface Window {
    MathJax?: {
      typesetPromise?: () => Promise<void>;
    };
  }
}

export default function SessionPage({ params }: { params: Promise<{ id: string; sessionId: string }> }) {
  const { id, sessionId } = use(params);
  const parcours = PARCOURS_DATA.find((p) => p.id === id);
  const sessionNum = parseInt(sessionId, 10);
  const session = parcours?.sessions.find((s) => s.id === sessionNum);

  const [showCorrection, setShowCorrection] = useState(false);
  const [completed, setCompleted] = useState(false);

  // Déclencher le rendu MathJax dès que la page ou la correction change
  useEffect(() => {
    if (typeof window !== "undefined" && window.MathJax?.typesetPromise) {
      window.MathJax.typesetPromise();
    }
  }, [session, showCorrection]);

  if (!parcours || !session) {
    return notFound();
  }

  const nextSessionId = sessionNum < parcours.sessions.length ? sessionNum + 1 : null;
  const prevSessionId = sessionNum > 1 ? sessionNum - 1 : null;

  return (
    <div className="min-h-screen bg-white text-slate-900 font-serif leading-relaxed text-lg">
      {/* Navigation Topbar */}
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur-md sticky top-0 z-50 font-sans">
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link href={`/parcours/${parcours.id}`} className="text-xs font-semibold text-blue-700 hover:underline">
            ← Vue du parcours
          </Link>
          <div className="text-xs font-mono text-slate-500">
            {session.tome} · Session {session.id} sur {parcours.sessions.length}
          </div>
        </div>
      </header>

      {/* Main Content Area - Style Grand Livre Scientific Edition */}
      <main className="max-w-4xl mx-auto px-6 py-10 space-y-8">

        {/* Title Header */}
        <div className="border-b-2 border-slate-900 pb-6 text-center space-y-2">
          <span className="font-sans text-xs font-bold uppercase tracking-widest text-amber-700 block">
            {session.tome} — SESSION {session.id} ({session.duration})
          </span>
          <h1 className="text-3xl font-extrabold text-blue-900 font-serif tracking-tight">
            {session.title}
          </h1>
        </div>

        {/* 1. THÉORÈME & MATHS (Encadré Bleu) */}
        <div className="bg-blue-50/60 border-2 border-blue-800 rounded-lg p-6 space-y-3">
          <span className="font-sans font-bold text-xs uppercase tracking-wider text-blue-800 block">
            {session.mathsTheorem}
          </span>
          <div className="text-base text-slate-800 font-serif whitespace-pre-line leading-relaxed">
            {session.mathsContent}
          </div>
        </div>

        {/* 2. LEÇON PRINCIPALE (Encadré Doré) */}
        <div className="bg-amber-50/60 border-2 border-amber-700 rounded-lg p-6 space-y-3">
          <span className="font-sans font-bold text-xs uppercase tracking-wider text-amber-800 block">
            {session.lessonTitle}
          </span>
          <div className="text-base text-slate-900 font-mono bg-stone-100 p-4 rounded border border-amber-200/80 whitespace-pre-line leading-relaxed">
            {session.lessonContent}
          </div>
        </div>

        {/* 3. APPLICATION DÉFENSE (Encadré Bordeaux) */}
        <div className="bg-red-50/60 border-2 border-red-800 rounded-lg p-6 space-y-2">
          <span className="font-sans font-bold text-xs uppercase tracking-wider text-red-800 block">
            {session.defenseTitle}
          </span>
          <p className="text-base text-slate-900 italic font-serif">
            &quot;{session.defenseCase}&quot;
          </p>
        </div>

        {/* 4. EXERCICE SUR PAPIER (Encadré Structuré) */}
        <div className="bg-white border-2 border-slate-900 rounded-lg p-6 space-y-6">
          <div className="font-sans font-bold text-sm text-slate-900 uppercase tracking-wide border-b border-slate-200 pb-2">
            ✍️ Exercice d&apos;Application Rédigé (À faire sur feuille)
          </div>

          <div className="text-base text-slate-900 font-serif whitespace-pre-line leading-relaxed">
            {session.exercise.question}
          </div>

          <div className="pt-2">
            <button
              onClick={() => setShowCorrection(!showCorrection)}
              className="px-4 py-2 font-sans text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white rounded transition"
            >
              {showCorrection ? "Masquer la Correction" : "Consulter la Correction Détaillée"}
            </button>

            {showCorrection && (
              <div className="mt-4 p-5 bg-emerald-50 border-l-4 border-emerald-700 rounded-r text-base text-slate-900 font-serif whitespace-pre-line leading-relaxed">
                <strong className="font-sans text-xs font-bold uppercase tracking-wider text-emerald-800 block mb-2">
                  Corrigé Intégral Rédigé :
                </strong>
                {session.exercise.correction}
              </div>
            )}
          </div>
        </div>

        {/* Navigation & Validation */}
        <div className="pt-8 border-t border-slate-300 flex items-center justify-between font-sans">
          {prevSessionId ? (
            <Link
              href={`/parcours/${parcours.id}/session/${prevSessionId}`}
              className="px-4 py-2 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition"
            >
              ← Session {prevSessionId}
            </Link>
          ) : <div />}

          <button
            onClick={() => setCompleted(true)}
            className={`px-6 py-2.5 rounded text-xs font-bold transition uppercase tracking-wider ${
              completed
                ? "bg-emerald-700 text-white cursor-default"
                : "bg-emerald-600 hover:bg-emerald-700 text-white"
            }`}
          >
            {completed ? "✓ Session Validée" : "Valider la Session"}
          </button>

          {nextSessionId ? (
            <Link
              href={`/parcours/${parcours.id}/session/${nextSessionId}`}
              className="px-4 py-2 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition"
            >
              Session {nextSessionId} →
            </Link>
          ) : <div />}
        </div>
      </main>
    </div>
  );
}
