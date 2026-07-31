# 🛡️ PLAN DE MAÎTRISE INDUSTRIELLE — DU CODE AU SYSTÈME DE TIR
## Parcours Souverain Africain · Cursus Avancé sur 20 Mois (560 Sessions de Maîtrise)

> *"Un concept vu une fois est oublié en trois semaines. Un concept pratiqué, piégé, benchmarké et revu trois fois devient une seconde nature."*

---

## 🗺️ STRUCTURE PAR TOMES ET PALIERS DE MAÎTRISE

```
TOME 0 : Prérequis Logiques & Mathématiques (20 Sessions)
TOME I : Le C — Gestion Mémoire, Périphériques & Concurrence (120 Sessions / 4 Mois)
TOME II : Le C++ — Architecture Objet, RAII & Templates (100 Sessions / 3.3 Mois)
TOME III : Ada/SPARK — Systèmes Critiques & Preuve Formelle (80 Sessions / 2.6 Mois)
TOME IV : Rust — Propriété, Concurrence Sûre & FFI (120 Sessions / 4 Mois)
TOME V : IA pour la Défense — Perception, Edge AI & Modèles Déterministes (120 Sessions / 4 Mois)
```

---

## 📐 RÈGLE DES 4 ÉTAPES DE MAÎTRISE (Cycle d'apprentissage)

Chaque grand concept (ex: Pointeurs, RAII, Contrats, Borrow Checker) suit ce cycle obligatoire :
1. **Étape A — Théorie & Logique (Papier/Crayon)** : Comprendre l'abstraction mathématique.
2. **Étape B — Pratique Guidée** : Implémenter le concept dans un cas simple.
3. **Étape C — Le Défi Sournois** : Déboguer un code piégé (bug silencieux, fuite, race condition).
4. **Étape D — Benchmark & Integration** : Mesurer l'impact mémoire/temps CPU et intégrer au projet.

---

# ═══════════════════════════════════════════════
# TOME 0 — PRÉREQUIS MATHÉMATIQUES & LOGIQUE (20 Sessions)
# ═══════════════════════════════════════════════

### Sessions 1 à 5 : Binaire, Hexadécimal et Portes Logiques
- **S1 (Théorie)** : Les puissances de 2, la représentation des entiers signés et non signés.
- **S2 (Pratique)** : Conversions manuelle binaire ↔ hexadécimal ↔ décimal.
- **S3 (Pratique)** : Algèbre de Boole (AND, OR, XOR, NOT) et tables de vérité.
- **S4 (Défi Sournois)** : Identifier les erreurs d'overflow dans des additions binaires manuelles.
- **S5 (Révision/Benchmark)** : Test chronométré de conversion et d'opérations bit à bit sur papier.

### Sessions 6 à 10 : Variables, Fonctions et Inégalités
- **S6 (Théorie)** : Le concept mathématique de variable $x$ et de domaine de définition.
- **S7 (Pratique)** : Modélisation mathématique d'une fonction $f(x) = ax + b$ appliquée à la vitesse d'un moteur.
- **S8 (Pratique)** : Manipulation des inégalités et comparateurs pour définir des seuils de sécurité.
- **S9 (Défi Sournois)** : Piège des divisions par zéro et des cas limites dans des fonctions mathématiques.
- **S10 (Révision)** : Rédaction des spécifications logiques d'un système de sécurité en français pur.

### Sessions 11 à 15 : Géométrie 2D/3D et Vectorielle
- **S11 (Théorie)** : Repères cartésiens, coordonnées $(X, Y, Z)$ d'un mobile dans l'espace.
- **S12 (Pratique)** : Calcul de distance euclidienne $d = \sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}$.
- **S13 (Pratique)** : Les vecteurs vitesse et accélération : addition vectorielle élémentaire.
- **S14 (Benchmark)** : Optimisation mathématique : remplacer le calcul de distance par son carré $d^2$ pour éviter $\sqrt{}$.
- **S15 (Révision)** : Calcul papier des trajectoires de 3 mobiles croisés.

### Sessions 16 à 20 : Trigonométrie de Base & Ratio
- **S16 (Théorie)** : Sinus, Cosinus, Tangente et cercle trigonométrique.
- **S17 (Pratique)** : Projection d'une vitesse radiale/angulaire en composantes $V_x, V_y$.
- **S18 (Pratique)** : Ratios, pourcentages et normalisation de données entre $0.0$ et $1.0$.
- **S19 (Défi Sournois)** : Erreur de conversion Degrés ↔ Radians (le piège classique de l'embarqué).
- **S20 (BILAN TOME 0)** : Évaluation complète papier/crayon sans ordinateur.

---

# ═══════════════════════════════════════════════
# TOME I — LE C : MAÎTRISE DU MÉTAL & DE LA MÉMOIRE (120 Sessions)
# ═══════════════════════════════════════════════

## BLOC 1 : Fondations du C & Compilation (Sessions 21-35)
- **S21-S22 (Concepts)** : Le compilateur GCC, préprocesseur, main, types primitifs (`int`, `float`, `char`).
- **S23-S24 (Pratique)** : Écriture de structures de contrôle (`if`, `switch`, `for`, `while`).
- **S25 (Défi Sournois #1)** : Trouver le bug dans une boucle infinie provoquée par un dépassement de type (`unsigned char i` de 0 à 256).
- **S26-S28 (Compilation)** : Décomposition complète : Préprocesseur (`.i`), Compilateur (`.s`), Assembleur (`.o`), Linker.
- **S29-S30 (Bitwise)** : Masques de bits, registres matériels virtuels (`&`, `|`, `^`, `~`, `<<`, `>>`).
- **S31 (Défi Sournois #2)** : Effacer un bit précis dans un registre sans altérer les autres bits.
- **S32-S35 (Révision & Benchmark)** : Mesure du temps d'exécution des opérations bit à bit vs opérations arithmétiques.

## BLOC 2 : Maîtrise Absolue des Pointeurs (Sessions 36-55) [CONCET NORT-]
- **S36-S37 (Théorie)** : La RAM vue comme un tableau d'adresses. L'opérateur `&` et la déclaration `int *p`.
- **S38-S40 (Pratique)** : Déréférencement `*p`, passage de paramètres par adresse aux fonctions.
- **S41 (Défi Sournois #3)** : Piège du pointeur non initialisé (Wild Pointer) causant un SegFault.
- **S42-S44 (Tableaux)** : Arithmétique des pointeurs (`*(p + i)` vs `tab[i]`), équivalence pointeur/tableau.
- **S45-S47 (Pointeurs avancés)** : Pointeurs de pointeurs (`int **p`), pointeurs vers fonctions (callbacks).
- **S48 (Défi Sournois #4)** : Pointeur dangling : retourner l'adresse d'une variable locale d'une fonction.
- **S49-S52 (Pratique intensive)** : Réécriture complète de la bibliothèque `string.h` (`strlen`, `strcpy`, `strcmp`, `strcat`) en pointeurs purs.
- **S53-S55 (Audit & Révision)** : Revue de code croisée des fonctions réécrites. Validation sous GCC avec `-Wall -Wextra -Werror`.

## BLOC 3 : Allocation Dynamique & Structures (Sessions 56-75)
- **S56-S58 (Structures)** : `struct`, alignement mémoire (padding), packing, unions et énumérations.
- **S59 (Défi Sournois #5)** : Calculer la vraie taille en mémoire d'une `struct` mal ordonnée (problème d'alignement sur 64-bit).
- **S60-S63 (Heap vs Stack)** : `malloc`, `calloc`, `realloc`, `free`. La gestion du Tas.
- **S64-S66 (Valgrind)** : Détection automatisée des fuites mémoire (Memory Leaks) et accès invalides.
- **S67 (Défi Sournois #6)** : Déboguer un code contenant une double libération (`double free`) et une fuite lente.
- **S68-S72 (Structures Dynamiques)** : Implémentation d'une Liste Chaînée complète pour pistes radar (insertion, suppression, recherche).
- **S73-S75 (Benchmark)** : Comparatif de performance : Temps d'accès Tableau statique vs Liste chaînée dynamique.

## BLOC 4 : Entrées/Sorties, Processus & Threads (Sessions 76-100)
- **S76-S79 (Fichiers)** : E/S textuelles et binaires (`fopen`, `fread`, `fwrite`, `fclose`). Création d'un data logger CSV.
- **S80-S83 (Système Unix)** : Descripteurs de fichiers, appels système (`open`, `read`, `write`), `fork`, `exec`, `wait`.
- **S84-S87 (Communication)** : Communication inter-processus par pipes anonymes et nommés.
- **S88-S92 (Multithreading)** : POSIX Threads (`pthread_create`, `pthread_join`), sections critiques et Mutex (`pthread_mutex`).
- **S93 (Défi Sournois #7)** : Déboguer une Race Condition intermittente entre 3 threads mis à jour sans mutex.
- **S94-S96 (Deadlocks)** : Comprendre et provoquer un Deadlock, puis l'éliminer par hiérarchie des verrous.
- **S97-S100 (Filtrage)** : Implémentation du Filtre de Kalman 1D en C pour le nettoyage de signaux capteurs.

## BLOC 5 : Projet de Fin de Tome I (Sessions 101-140)
- **S101-S105 (Architecture)** : Conception sur papier d'un **Simulateur de Guidage Inertiel** multi-threaded.
- **S106-L120 (Développement)** : Code des modules capteur (`capteur.c`), filtrage (`kalman.c`), guidage (`guidage.c`), et journal (`logger.c`).
- **S121-S130 (Tests & Audit)** : Exécution sous Valgrind (0 fuite tolérée), vérification des cas limites.
- **S131-S140 (Bilan & Revue)** : Rédaction du rapport d'audit et passage du Tome I.

---

# ═══════════════════════════════════════════════
# TOME II — LE C++ : ARCHITECTURE & COMPLEXITÉ (100 Sessions)
# ═══════════════════════════════════════════════

## BLOC 6 : De C à C++ & Orienté Objet (Sessions 141-165)
- **S141-S145 (Transition)** : `namespace`, `std::cout`/`cin`, références `&`, surcharges de fonctions, arguments par défaut.
- **S146-S150 (Encapsulation)** : Classes, constructeurs, destructeurs, `private`, `public`, `protected`, membres `const` et `static`.
- **S151 (Défi Sournois #8)** : Violation d'encapsulation par retour de référence non-const vers un membre privé.
- **S152-S157 (Héritage)** : Classes dérivées, modes d'héritage, masquage de nom, appel des constructeurs parents.
- **S158-S165 (Polymorphisme)** : Méthodes virtuelles (`virtual`), table des fonctions virtuelles (`vtable`), destructeur virtuel obligatoire, classes abstraites (`= 0`).

## BLOC 7 : RAII & Gestion Avancée des Ressources (Sessions 166-190)
- **S166-S170 (Rule of Three/Five)** : Constructeur de copie, opérateur d'affectation `=`, constructeur de déplacement (Move semantics `&&`), `std::move`.
- **S171 (Défi Sournois #9)** : Auto-affectation (`a = a`) causant la destruction prématurée de la ressource interne.
- **S172-L177 (Smart Pointers)** : `std::unique_ptr`, `std::shared_ptr`, `std::weak_ptr`. Élimination totale de `new`/`delete` manuels.
- **S178-S183 (La STL)** : `std::vector`, `std::array`, `std::map`, `std::unordered_map`, algorithmes STL (`std::sort`, `std::find_if`).
- **S184-S190 (Templates)** : Polymorphisme statique, fonctions et classes templates, spécialisation.

## BLOC 8 : C++ Temps Réel & Projet Drone (Sessions 191-240)
- **S191-S195 (Concurrence moderne)** : `std::thread`, `std::mutex`, `std::lock_guard`, `std::unique_lock`, `std::atomic`.
- **S196-S200 (Contraintes Embarquées)** : Standards JSF++ (Joint Strike Fighter), désactivation des exceptions (`-fno-exceptions`) et du RTTI.
- **S201-S230 (Projet Tome II)** : Développement du **Simulateur de Drone de Reconnaissance** avec State Machine et capteurs polymorphes.
- **S231-S240 (Benchmark & Audit)** : Mesure des latences de commutation d'état et optimisation mémoire.

---

# ═══════════════════════════════════════════════
# TOME III — ADA / SPARK : INFAILLIBILITÉ & PREUVE (80 Sessions)
# ═══════════════════════════════════════════════

## BLOC 9 : Philosophie Ada & Rigorisme de Typage (Sessions 241-265)
- **S241-L245 (Fondations)** : Philosophie des systèmes critiques, normes DO-178C / EN 50128, installation GNAT.
- **S246-S252 (Typage Fort)** : Déclaration de sous-types bornés, types distincts (`type Metres is new Float; type Secondes is new Float;`).
- **S253 (Défi Sournois #10)** : Tenter de mélanger deux unités physiques et analyser le refus catégorique du compilateur Ada.
- **S254-S260 (Packages)** : Séparation stricte Spécification (`.ads`) et Implémentation (`.adb`), encapsulation privée (`private type`).
- **S261-S265 (Contrats)** : Préconditions (`Pre`), Postconditions (`Post`), Invariants de type.

## BLOC 10 : Concurrence Ada & Preuve SPARK (Sessions 266-320)
- **S266-S275 (Tâches & Objets Protégés)** : Tâches Ada (`task`), rendez-vous (`entry`), objets protégés (`protected`), ordonnancement temps réel.
- **S276-S285 (SPARK - Preuve Formelle)** : Sous-ensemble SPARK, installation de GNATprove, mode `SPARK_Mode (On)`.
- **S286-S295 (Invariants & Flux)** : Invariants de boucle (`Loop_Invariant`), analyse de flux de données (`Global`, `Depends`).
- **S296-S315 (Projet Tome III)** : **Système de Contrôle d'Accès Sécurisé** avec preuve formelle à 100% de non-dépassement d'indice.
- **S316-S320 (Audit de Preuve)** : Génération du rapport de vérification formelle SPARK.

---

# ═══════════════════════════════════════════════
# TOME IV — RUST : FIABILITÉ ULTIME & SÉCURITÉ (120 Sessions)
# ═══════════════════════════════════════════════

## BLOC 11 : Le Modèle de Propriété & Emprunts (Sessions 321-355)
- **S321-S330 (Ownership)** : Règles de propriété unique, Move semantics, copie vs déplacement, trait `Drop`.
- **S331-S342 (Borrow Checker)** : Emprunts immuables (`&T`), emprunts mutables (`&mut T`), règles de non-aliasing.
- **S343 (Défi Sournois #11)** : Tenter de lire une donnée empruntée de manière mutable et analyser l'erreur du Borrow Checker.
- **S344-S355 (Lifetimes)** : Durées de vie explicites (`'a`), élision de lifetime, structures avec références.

## BLOC 12 : Robustesse, Traits & Concurrence Sûre (Sessions 356-395)
- **S356-S365 (Erreurs)** : Élimination du NULL avec `Option<T>`, gestion explicite des échecs avec `Result<T, E>`, opérateur `?`.
- **S366-S375 (Traits)** : Définition de traits, polymorphisme statique (`impl Trait`) vs dynamique (`dyn Trait`).
- **S376-S385 (Concurrence)** : `Send` et `Sync`, canaux (`mpsc::channel`), pointeurs atomiques (`Arc<Mutex<T>>`).
- **S386-S395 (FFI & Bare Metal)** : Interfaçage avec C (`extern "C"`, `unsafe`), Rust sans système d'exploitation (`#![no_std]`).

## BLOC 13 : Projet de Synthèse Globale — Fire Control System (Sessions 396-440)
- **S396-S405 (Architecture globale)** : Modélisation du **Fire Control System (FCS)** multi-langage.
- **S406-S425 (Intégration)** : Capteurs en C, Calcul balistique en C++, Sûreté prouvée en Ada/SPARK, Orchestrateur et communications en Rust.
- **S426-S440 (Sécurité & Audit)** : Chiffrement des communications HMAC-SHA256, tests d'intégration, audit complet.

---

# ═══════════════════════════════════════════════
# TOME V — IA POUR LA DÉFENSE (120 Sessions)
# ═══════════════════════════════════════════════

## BLOC 14 : Fondations & Machine Learning (Sessions 441-480)
- **S441-S455 (Maths IA)** : Algèbre linéaire avancée (matrices, valeurs propres), calcul différentiel, probabilités.
- **S456-S470 (Python & Scikit-Learn)** : NumPy, Pandas, prétraitement de données radar, classification (Random Forest, SVM).
- **S471-S480 (Évaluation)** : Matrice de confusion, précision, rappel, courbe ROC appliquée à la détection de cibles.

## BLOC 15 : Deep Learning & Edge AI Embarqué (Sessions 481-520)
- **S481-S500 (PyTorch)** : Réseaux de neurones (MLP, CNN), rétropropagation du gradient, optimisation (Adam).
- **S501-S510 (Edge AI)** : Quantification des poids (Float32 → Int8), Pruning (élagage du réseau).
- **S511-S520 (Déploiement C++)** : Export ONNX, exécution du modèle d'IA en C++ avec ONNX Runtime sur carte embarquée.

## BLOC 16 : Projet Final Souverain — FCS Augmenté par l'IA (Sessions 521-560)
- **S521-S550 (Intégration Systèmes)** : Raccordement du réseau de neurones de classification radar au FCS écrit en Rust/Ada/C++.
- **S551-S560 (Démonstration & Validation)** : Simulation complète de mission autonome, rédaction du dossier technique final de la formation.

---

# ═══════════════════════════════════════════════
# GLOSSAIRE DE MAÎTRISE INDUSTRIELLE
# ═══════════════════════════════════════════════

| Terme | Session de découverte | Définition technique |
| :--- | :--- | :--- |
| **Race Condition** | S93 | Concurrence d'accès non synchronisée à la mémoire entraînant un état indéterminé. |
| **Padding Mémoire** | S59 | Octets de bourrage insérés par le compilateur pour aligner les variables sur les mots mémoire du processeur. |
| **RAII** | S166 | *Resource Acquisition Is Initialization* : liaison du cycle de vie d'une ressource à l'existence d'un objet C++. |
| **Invariant de boucle** | S286 | Propriété logique démontrée vraie avant et après chaque itération d'une boucle en preuve formelle SPARK. |
| **Borrow Checker** | S331 | Analyseur statique de Rust vérifiant la validité de l'aliasing et des durées de vie à la compilation. |
| **Quantification INT8** | S501 | Conversion des poids d'un réseau de neurones de 32 bits flottants vers 8 bits entiers pour execution Edge. |
