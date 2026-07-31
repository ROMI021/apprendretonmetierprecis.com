"use client";

import { useState, useEffect } from "react";

const STORAGE_KEYS = {
  END_TIME: "pomodoro_end_timestamp",
  IS_ACTIVE: "pomodoro_is_active",
  MODE: "pomodoro_mode",
  REMAINING_PAUSED: "pomodoro_remaining_paused",
  DURATION: "pomodoro_duration",
};

export default function PomodoroTimer() {
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<"work" | "break">("work");
  const [duration, setDuration] = useState(25 * 60);

  // Restauration de l'état du Pomodoro depuis localStorage au chargement
  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedIsActive = localStorage.getItem(STORAGE_KEYS.IS_ACTIVE) === "true";
    const savedMode = (localStorage.getItem(STORAGE_KEYS.MODE) as "work" | "break") || "work";
    const savedDuration = parseInt(localStorage.getItem(STORAGE_KEYS.DURATION) || "1500", 10);
    const savedEndTime = parseInt(localStorage.getItem(STORAGE_KEYS.END_TIME) || "0", 10);
    const savedPausedRemaining = parseInt(localStorage.getItem(STORAGE_KEYS.REMAINING_PAUSED) || "1500", 10);

    setMode(savedMode);
    setDuration(savedDuration);

    if (savedIsActive && savedEndTime > 0) {
      const now = Date.now();
      const remainingSecs = Math.max(0, Math.round((savedEndTime - now) / 1000));
      if (remainingSecs > 0) {
        setSecondsLeft(remainingSecs);
        setIsActive(true);
      } else {
        // Le temps était écoulé pendant l'absence
        setSecondsLeft(0);
        setIsActive(false);
      }
    } else {
      setIsActive(false);
      setSecondsLeft(savedPausedRemaining);
    }
  }, []);

  // Décompte temps réel et sauvegarde continue
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive) {
      interval = setInterval(() => {
        const savedEndTime = parseInt(localStorage.getItem(STORAGE_KEYS.END_TIME) || "0", 10);
        if (savedEndTime > 0) {
          const now = Date.now();
          const remainingSecs = Math.max(0, Math.round((savedEndTime - now) / 1000));

          if (remainingSecs > 0) {
            setSecondsLeft(remainingSecs);
          } else {
            // Fin du chrono
            setSecondsLeft(0);
            setIsActive(false);
            localStorage.setItem(STORAGE_KEYS.IS_ACTIVE, "false");

            if (mode === "work") {
              alert("⏱️ Session de concentration terminée ! Prenez 5 minutes de pause.");
              startPreset(5, "break");
            } else {
              alert("🔔 Pause terminée ! Prêt à reprendre l'étude ?");
              startPreset(25, "work");
            }
          }
        }
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, mode]);

  const toggleTimer = () => {
    if (typeof window === "undefined") return;

    if (!isActive) {
      // Démarrage : calculer le timestamp de fin absolu
      const endTime = Date.now() + secondsLeft * 1000;
      localStorage.setItem(STORAGE_KEYS.END_TIME, endTime.toString());
      localStorage.setItem(STORAGE_KEYS.IS_ACTIVE, "true");
      localStorage.setItem(STORAGE_KEYS.MODE, mode);
      localStorage.setItem(STORAGE_KEYS.DURATION, duration.toString());
      setIsActive(true);
    } else {
      // Pause manuelle par l'utilisateur
      localStorage.setItem(STORAGE_KEYS.IS_ACTIVE, "false");
      localStorage.setItem(STORAGE_KEYS.REMAINING_PAUSED, secondsLeft.toString());
      setIsActive(false);
    }
  };

  const startPreset = (minutes: number, timerMode: "work" | "break" = "work") => {
    const totalSecs = minutes * 60;
    const endTime = Date.now() + totalSecs * 1000;

    setMode(timerMode);
    setDuration(totalSecs);
    setSecondsLeft(totalSecs);
    setIsActive(true);

    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.END_TIME, endTime.toString());
      localStorage.setItem(STORAGE_KEYS.IS_ACTIVE, "true");
      localStorage.setItem(STORAGE_KEYS.MODE, timerMode);
      localStorage.setItem(STORAGE_KEYS.DURATION, totalSecs.toString());
    }
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
      {/* Icone Mode */}
      <span style={{ fontSize: "0.85rem" }}>{mode === "work" ? "⏱️" : "☕"}</span>

      {/* Compteur MM:SS */}
      <span style={{
        fontWeight: 700,
        color: mode === "work" ? "#0f172a" : "#166534",
        letterSpacing: "0.02em"
      }}>
        {formatTime(secondsLeft)}
      </span>

      {/* Bouton Play/Pause unique commandé par l'apprenant */}
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
