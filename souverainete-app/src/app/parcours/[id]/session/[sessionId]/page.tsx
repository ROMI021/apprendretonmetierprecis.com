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

  const [completed, setCompleted] = useState(false);

  // Déclenchement automatique de MathJax pour le rendu exact des formules LaTeX
  useEffect(() => {
    if (typeof window !== "undefined" && window.MathJax?.typesetPromise) {
      window.MathJax.typesetPromise();
    }
  }, [session]);

  if (!parcours || !session) {
    return notFound();
  }

  const nextSessionId = sessionNum < parcours.sessions.length ? sessionNum + 1 : null;
  const prevSessionId = sessionNum > 1 ? sessionNum - 1 : null;

  return (
    <div className="min-h-screen bg-white text-slate-900 font-serif leading-relaxed text-lg">
      {/* Topbar Navigation */}
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur-md sticky top-0 z-50 font-sans print:hidden">
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link href={`/parcours/${parcours.id}`} className="text-xs font-semibold text-blue-700 hover:underline">
            ← Vue du parcours
          </Link>
          <div className="text-xs font-mono text-slate-500">
            {session.tome} · Session {session.id} sur {parcours.sessions.length} ({session.duration})
          </div>
        </div>
      </header>

      {/* Main Book Content Area */}
      <main className="max-w-4xl mx-auto px-6 py-10 space-y-8">
        
        {/* En-tête de Session */}
        <div className="border-b-2 border-slate-900 pb-6 text-center space-y-2">
          <span className="font-sans text-xs font-bold uppercase tracking-widest text-amber-700 block">
            {session.tome} — SESSION {session.id} ({session.duration})
          </span>
          <h1 className="text-3xl font-extrabold text-blue-900 font-serif tracking-tight">
            {session.title}
          </h1>
        </div>

        {/* Injection exacte du HTML du Manuel Scientifique avec MathJax */}
        <div 
          className="prose prose-slate max-w-none font-serif text-slate-900"
          dangerouslySetInnerHTML={{ __html: session.htmlContent }}
        />

        {/* Navigation & Validation */}
        <div className="pt-8 border-t border-slate-300 flex items-center justify-between font-sans print:hidden">
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
