"use client";

import { useState, useEffect } from "react";

export default function PomodoroTimer() {
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<"work" | "break">("work");
  const [initialTime, setInitialTime] = useState(25 * 60);

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
        setInitialTime(5 * 60);
        alert("⏱️ Session de concentration terminée ! Prenez 5 minutes de pause.");
      } else {
        setMode("work");
        setSecondsLeft(25 * 60);
        setInitialTime(25 * 60);
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

  const resetTimer = () => {
    setIsActive(false);
    setSecondsLeft(mode === "work" ? 25 * 60 : 5 * 60);
  };

  const setPreset = (minutes: number, timerMode: "work" | "break" = "work") => {
    setIsActive(false);
    setMode(timerMode);
    setInitialTime(minutes * 60);
    setSecondsLeft(minutes * 60);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainderSecs = secs % 60;
    return `${String(mins).padStart(2, "0")}:${String(remainderSecs).padStart(2, "0")}`;
  };

  const progressPct = Math.round(((initialTime - secondsLeft) / initialTime) * 100);

  return (
    <div style={{
      background: mode === "work" ? "#f8fafc" : "#f0fdf4",
      border: `1px solid ${mode === "work" ? "#e2e8f0" : "#bbf7d0"}`,
      borderRadius: "8px",
      padding: "16px 20px",
      marginBottom: "28px",
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "16px"
    }}>
      {/* Label Mode & Chrono */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div style={{
          width: "40px",
          height: "40px",
          borderRadius: "6px",
          background: mode === "work" ? "#2563eb" : "#16a34a",
          color: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.2rem",
          fontWeight: 700
        }}>
          {mode === "work" ? "⏱️" : "☕"}
        </div>
        <div>
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.68rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: mode === "work" ? "#1e40af" : "#166534"
          }}>
            Mode Pomodoro · {mode === "work" ? "Concentration" : "Pause Régénératrice"}
          </div>
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "1.8rem",
            fontWeight: 700,
            color: "#0f172a",
            lineHeight: 1.1
          }}>
            {formatTime(secondsLeft)}
          </div>
        </div>
      </div>

      {/* Raccourcis de durée */}
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <button
          onClick={() => setPreset(25, "work")}
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.72rem",
            padding: "4px 8px",
            borderRadius: "4px",
            border: "1px solid #cbd5e1",
            background: initialTime === 25 * 60 && mode === "work" ? "#2563eb" : "#ffffff",
            color: initialTime === 25 * 60 && mode === "work" ? "#ffffff" : "#475569",
            cursor: "pointer"
          }}
        >
          25m
        </button>
        <button
          onClick={() => setPreset(45, "work")}
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.72rem",
            padding: "4px 8px",
            borderRadius: "4px",
            border: "1px solid #cbd5e1",
            background: initialTime === 45 * 60 && mode === "work" ? "#2563eb" : "#ffffff",
            color: initialTime === 45 * 60 && mode === "work" ? "#ffffff" : "#475569",
            cursor: "pointer"
          }}
        >
          45m
        </button>
        <button
          onClick={() => setPreset(5, "break")}
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.72rem",
            padding: "4px 8px",
            borderRadius: "4px",
            border: "1px solid #cbd5e1",
            background: mode === "break" ? "#16a34a" : "#ffffff",
            color: mode === "break" ? "#ffffff" : "#475569",
            cursor: "pointer"
          }}
        >
          5m Pause
        </button>
      </div>

      {/* Controles de Lancement */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <button
          onClick={toggleTimer}
          style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: "0.82rem",
            fontWeight: 600,
            padding: "8px 18px",
            borderRadius: "6px",
            border: "none",
            background: isActive ? "#dc2626" : mode === "work" ? "#2563eb" : "#16a34a",
            color: "#ffffff",
            cursor: "pointer",
            transition: "background 0.15s ease"
          }}
        >
          {isActive ? "Pause" : "Démarrer"}
        </button>
        <button
          onClick={resetTimer}
          style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: "0.82rem",
            fontWeight: 500,
            padding: "8px 14px",
            borderRadius: "6px",
            border: "1px solid #cbd5e1",
            background: "#ffffff",
            color: "#475569",
            cursor: "pointer"
          }}
        >
          Réinitialiser
        </button>
      </div>
    </div>
  );
}
