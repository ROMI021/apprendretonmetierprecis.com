"use client";

import { useState, useEffect } from "react";

export default function PomodoroTimer() {
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<"work" | "break">("work");

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0 && isActive) {
      if (mode === "work") {
        setMode("break");
        setSecondsLeft(5 * 60);
        alert("⏱️ Session de concentration terminée ! 5 minutes de pause.");
      } else {
        setMode("work");
        setSecondsLeft(25 * 60);
        alert("🔔 Pause terminée ! Prêt à reprendre l'étude ?");
      }
      setIsActive(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, secondsLeft, mode]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainderSecs = secs % 60;
    return `${String(mins).padStart(2, "0")}:${String(remainderSecs).padStart(2, "0")}`;
  };

  return (
    <div style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      padding: "4px 10px",
      borderRadius: "20px",
      background: mode === "work" ? "#f1f5f9" : "#dcfce7",
      border: `1px solid ${mode === "work" ? "#cbd5e1" : "#86efac"}`,
      fontFamily: "'IBM Plex Mono', monospace",
      fontSize: "0.78rem"
    }}>
      {/* Icone */}
      <span style={{ fontSize: "0.85rem" }}>{mode === "work" ? "⏱️" : "☕"}</span>

      {/* Compteur MM:SS */}
      <span style={{
        fontWeight: 700,
        color: mode === "work" ? "#0f172a" : "#166534",
        letterSpacing: "0.02em"
      }}>
        {formatTime(secondsLeft)}
      </span>

      {/* Bouton Play/Pause unique */}
      <button
        onClick={toggleTimer}
        title={isActive ? "Mettre en pause" : "Démarrer le Pomodoro"}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "22px",
          height: "22px",
          borderRadius: "50%",
          border: "none",
          background: isActive ? "#dc2626" : mode === "work" ? "#2563eb" : "#16a34a",
          color: "#ffffff",
          cursor: "pointer",
          fontSize: "0.65rem",
          lineHeight: 1,
          padding: 0
        }}
      >
        {isActive ? "⏸" : "▶"}
      </button>
    </div>
  );
}
