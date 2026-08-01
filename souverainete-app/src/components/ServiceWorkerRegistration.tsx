"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ServiceWorkerRegistration() {
  const pathname = usePathname();

  // Enregistrement du Service Worker au premier chargement
  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;

    navigator.serviceWorker
      .register("/sw.js", { scope: "/" })
      .then((registration) => {
        console.log("[PWA] Service Worker actif — scope:", registration.scope);

        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener("statechange", () => {
              if (
                newWorker.state === "installed" &&
                navigator.serviceWorker.controller
              ) {
                console.log("[PWA] Nouvelle version du SW disponible.");
              }
            });
          }
        });
      })
      .catch((err) =>
        console.warn("[PWA] Échec d'enregistrement du SW:", err)
      );
  }, []);

  // À chaque changement de page : demande au SW de mettre en cache cette URL
  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;

    navigator.serviceWorker.ready.then((registration) => {
      if (registration.active) {
        registration.active.postMessage({
          type: "CACHE_URL",
          url: window.location.href,
        });
      }
    });
  }, [pathname]);

  return null;
}
