export interface Session {
  id: number;
  title: string;
  tome: string;
  duration: string;
  mathsTheorem: string;
  mathsContent: string;
  lessonTitle: string;
  lessonContent: string;
  defenseTitle: string;
  defenseCase: string;
  exercise: {
    question: string;
    correction: string;
  };
}

export interface Parcours {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  badge: string;
  description: string;
  durationMonths: number;
  sessionsCount: number;
  tomes: string[];
  sessions: Session[];
}

export const PARCOURS_DATA: Parcours[] = [
  {
    id: "systemes-critiques",
    title: "Ingénieur Systèmes Critiques & Défense",
    subtitle: "Maîtrise du métal, de la mémoire et des logiciels de sécurité militaire",
    icon: "🛡️",
    color: "from-blue-600 to-indigo-900",
    badge: "Parcours Principal",
    description: "Forme-toi à concevoir des logiciels de vol, de guidage et de sécurité à fiabilité 100%. Du binaire jusqu'à l'IA embarquée.",
    durationMonths: 20,
    sessionsCount: 560,
    tomes: [
      "Tome 0 : Fondations Mathématiques & Logiques",
      "Tome I : C — Mémoire, Périphériques & Concurrence",
      "Tome II : C++ — Objet, RAII & Temps Réel",
      "Tome III : Ada/SPARK — Preuve Formelle & DO-178C",
      "Tome IV : Rust — Propriété & Concurrence Sûre",
      "Tome V : IA Embarquée pour la Défense"
    ],
    sessions: [
      {
        id: 1,
        title: "La Numération Binaire : Théorie et Méthodes de Conversion",
        tome: "Tome 0",
        duration: "45 min",
        mathsTheorem: "Théorème 1.1 — Décomposition Poids-Position : Tout nombre entier N exprimé dans une base B s'écrit N = ∑ (a_k × B^k). En base 2 (B=2), les coefficients a_k ne peuvent prendre que 0 ou 1.",
        mathsContent: "Pour convertir 10110101₂ en décimal : (1×2⁷) + (0×2⁶) + (1×2⁵) + (1×2⁴) + (0×2³) + (1×2²) + (0×2¹) + (1×2⁰) = 128 + 32 + 16 + 4 + 1 = 181.",
        lessonTitle: "Méthode Rédigée 1.2 — La Division Posée Pas à Pas",
        lessonContent: "Pour convertir N = 157 en binaire, on effectue les divisions euclidiennes par 2 :\n1) 157 ÷ 2 = 78, reste 1 (Bit 0 - LSB)\n2) 78 ÷ 2 = 39, reste 0 (Bit 1)\n3) 39 ÷ 2 = 19, reste 1 (Bit 2)\n4) 19 ÷ 2 = 9, reste 1 (Bit 3)\n5) 9 ÷ 2 = 4, reste 1 (Bit 4)\n6) 4 ÷ 2 = 2, reste 0 (Bit 5)\n7) 2 ÷ 2 = 1, reste 0 (Bit 6)\n8) 1 ÷ 2 = 0, reste 1 (Bit 7 - MSB)\nLecture de BAS en HAUT → 10011101₂.",
        defenseTitle: "Application Concrète — Système d'Armement",
        defenseCase: "Dans le calculateur de guidage d'un drone, un accéléromètre envoie une valeur brute de 157. L'unité de contrôle logique lit directement l'octet 10011101₂. Si le Bit 7 (valeur 128) est à 1, le système active immédiatement la correction de tangage.",
        exercise: {
          question: "1. Convertis le nombre décimal N = 214 en binaire en posant toutes les divisions par 2.\n2. Convertis le nombre binaire B = 01101010₂ en décimal en écrivant la somme détaillée.",
          correction: "1. 214÷2=107(r0), 107÷2=53(r1), 53÷2=26(r1), 26÷2=13(r0), 13÷2=6(r1), 6÷2=3(r0), 3÷2=1(r1), 1÷2=0(r1). Lecture de bas en haut → 11010110₂.\n2. 01101010₂ = (0×128)+(1×64)+(1×32)+(0×16)+(1×8)+(0×4)+(1×2)+(0×1) = 64+32+8+2 = 106."
        }
      },
      {
        id: 2,
        title: "La Numération Hexadécimale (Base 16) et l'Inter-conversion",
        tome: "Tome 0",
        duration: "45 min",
        mathsTheorem: "Théorème 2.1 — La Correspondance des Symboles Hexadécimaux : La base 16 utilise 16 symboles {0..9, A..F}. Exactement 1 chiffre hexadécimal représente un bloc de 4 bits (quartet).",
        mathsContent: "Table : 0000=0 ... 1010=A (10), 1011=B (11), 1100=C (12), 1101=D (13), 1110=E (14), 1111=F (15).",
        lessonTitle: "Méthode Rédigée 2.1 — Conversion Binaire vers Hexadécimal",
        lessonContent: "Soit B = 11010111₂. On découpe en 2 quartets :\nQuartet Gauche = 1101₂ (13 = D)\nQuartet Droit = 0111₂ (7 = 7)\nRésultat : 0xD7. Pour H = 0x3F8 en décimal : (3×16²) + (15×16¹) + (8×16⁰) = 768 + 240 + 8 = 1016.",
        defenseTitle: "Application Concrète — Adresses Mémoire",
        defenseCase: "Dans les documentations techniques d'un microcontrôleur ARM, les adresses des cartes électroniques sont écrites en hexadécimal (ex: 0x4000C000). C'est l'emplacement exact en mémoire où le processeur lit l'accéléromètre.",
        exercise: {
          question: "1. Convertis 10101111₂ directement en hexadécimal.\n2. Convertis 0xB4 en binaire sur 8 bits.\n3. Calcule la valeur décimale de 0xA5.",
          correction: "1. 1010₂ = A, 1111₂ = F → 0xAF.\n2. B = 11 (1011₂), 4 = (0100₂) → 10110100₂.\n3. 0xA5 = (10×16) + 5 = 160 + 5 = 165."
        }
      },
      {
        id: 3,
        title: "Les Portes Logiques et l'Algèbre de Boole",
        tome: "Tome 0",
        duration: "50 min",
        mathsTheorem: "Théorème 3.1 — Les 4 Opérateurs Booléens de Base : AND (A·B), OR (A+B), NOT (Ā), XOR (A⊕B).",
        mathsContent: "AND : Sortie=1 si A=1 ET B=1. OR : Sortie=1 si au moins une entrée=1. NOT : Inverse la valeur. XOR : Sortie=1 si entrées différentes.",
        lessonTitle: "Méthode Rédigée 3.1 — Évaluation d'une Équation Logique Complexe",
        lessonContent: "Évaluer S = (A · B̄) + C pour A=1, B=1, C=1 :\nÉtape 1 : B̄ = 0\nÉtape 2 : A · B̄ = 1 · 0 = 0\nÉtape 3 : S = 0 + C = 0 + 1 = 1.",
        defenseTitle: "Application Concrète — Sécurité de Tir",
        defenseCase: "Sécurité de tir d'hélicoptère : Tir = (Alti_OK · Obstaclē) · Autorisation. Si Obstacle = 1 (Obstaclē = 0), le tir vaut 0 (bloqué) même si le pilote appuie sur la détente.",
        exercise: {
          question: "Soit Tir = (Alti_OK · Obstaclē) · Autorisation. Calcule la valeur de Tir si Alti_OK=1, Obstacle=0, Autorisation=1.",
          correction: "Obstacle = 0 donc Obstaclē = 1. Tir = (1 · 1) · 1 = 1 (Tir autorisé !)."
        }
      },
      {
        id: 4,
        title: "Défi Sournois #1 — Le Phénomène de Dépassement (Overflow)",
        tome: "Tome 0",
        duration: "60 min",
        mathsTheorem: "Théorème 4.1 — Plage de Valeurs d'un Entier Non Signé de N bits : Bornes [0 à 2^N - 1]. Sur 8 bits, max = 255.",
        mathsContent: "Posons 255 (11111111₂) + 1 = 100000000₂. Le 9-ème bit de gauche ne rentre pas dans le registre de 8 bits ! Il est ignoré, le registre retombe à 00000000₂ (0).",
        lessonTitle: "Le Piège de Code — Crash d'Ariane 5",
        lessonContent: "Code : unsigned char vitesse = 250; vitesse = vitesse + 10; (Vraie vitesse = 260). 260 mod 256 = 4. L'ordinateur croit que la turbine tourne à 4 RPM au lieu de 260 RPM et ne coupe pas le moteur !",
        defenseTitle: "Analyse du Crash Historique",
        defenseCase: "Le 4 juin 1996, la fusée Ariane 5 a explosé 37 secondes après son décollage à cause d'un nombre 64 bits converti sans vérification en 16 bits (Overflow).",
        exercise: {
          question: "Une variable de 8 bits contient la valeur 200. On lui ajoute 70. Quelle sera la valeur finale retenue par le registre ?",
          correction: "200 + 70 = 270. Modulo 256 : 270 - 256 = 14."
        }
      },
      {
        id: 5,
        title: "Examen de Maîtrise Rédigé (Tome 0)",
        tome: "Tome 0",
        duration: "30 min",
        mathsTheorem: "Consignes d'Examen — Rédiger l'ensemble des calculs de conversion et d'évaluation logique.",
        mathsContent: "P1 : Division euclidienne de N = 186.\nP2 : Conversion de 10111010₂ en Hexa et Décimal.\nP3 : Évaluation de S = Ā · (B + C) avec A=0, B=1, C=0.",
        lessonTitle: "Grille d'Évaluation",
        lessonContent: "P1 : 186 = 10111010₂ (4 pts)\nP2 : 0xBA = 186 (3 pts)\nP3 : S = 1 (3 pts)",
        defenseTitle: "Validation de Certification",
        defenseCase: "Validation formelle des fondations avant l'accès au Tome I (Langage C et allocation mémoire).",
        exercise: {
          question: "Résous les 3 problèmes ci-dessus sur papier.",
          correction: "P1: 10111010₂. P2: 0xBA (186₁₀). P3: S = 1."
        }
      }
    ]
  },
  {
    id: "robotique-drones",
    title: "Spécialiste Drones & Autonomie Embarquée",
    subtitle: "Conception de pilotes automatiques, navigation inertielle et commande de vol",
    icon: "🛰️",
    color: "from-emerald-600 to-teal-900",
    badge: "Spécialisation",
    description: "Apprends à programmer des ordinateurs de bord pour drones tactiques : Filtres de Kalman, asservissements PID et communication MAVLink.",
    durationMonths: 14,
    sessionsCount: 380,
    tomes: [
      "Tome 0 : Physique du vol & Modélisation",
      "Tome I : C/C++ Embarqué & Microcontrôleurs",
      "Tome II : Filtres d'estimation & Capteurs",
      "Tome III : Autonomie & Vision Embarquée"
    ],
    sessions: []
  },
  {
    id: "cyber-securite-souveraine",
    title: "Architecte Cybersécurité & Cryptographie",
    subtitle: "Sécurisation des communications militaires, cryptographie matérielle & HSM",
    icon: "🔐",
    color: "from-amber-600 to-red-950",
    badge: "Sécurité",
    description: "Protection des réseaux tactiques, implémentation de Rust cryptographique et sécurité des microprocesseurs.",
    durationMonths: 16,
    sessionsCount: 420,
    tomes: [
      "Tome 0 : Mathématiques de la Cryptographie",
      "Tome I : C & Bas Niveau Sécurisé",
      "Tome II : Rust & Cryptographie Moderne",
      "Tome III : SecOps & Réseaux Tactiques"
    ],
    sessions: []
  }
];
