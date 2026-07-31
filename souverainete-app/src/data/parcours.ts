export interface Session {
  id: number;
  title: string;
  tome: string;
  duration: string;
  maths: string;
  lesson: string;
  defenseCase: string;
  exercise: {
    question: string;
    hint?: string;
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
        title: "La Numération Binaire & Puissances de 2",
        tome: "Tome 0",
        duration: "45 min",
        maths: "Tout nombre entier N s'écrit N = Σ (a_k × 2^k). En binaire, les chiffres a_k sont 0 ou 1.",
        lesson: "Les ordinateurs utilisent des transistors à 2 états (0 et 1). Pour convertir 10110101₂ en décimal : (1×128) + (0×64) + (1×32) + (1×16) + (0×8) + (1×4) + (0×2) + (1×1) = 181.",
        defenseCase: "Les capteurs de trappe de missile envoient un octet brut. Bit 7 à 1 = Trappe Ouverte, Bit 0 à 1 = Fusible Armé.",
        exercise: {
          question: "Convertis le nombre binaire 11000001₂ en nombre décimal.",
          hint: "Additionne 128 + 64 + 1",
          correction: "11000001₂ = (1×128) + (1×64) + 1 = 193 en décimal."
        }
      },
      {
        id: 2,
        title: "L'Hexadécimal (Base 16) & Groupement par 4 bits",
        tome: "Tome 0",
        duration: "45 min",
        maths: "1 symbole Hexadécimal (0-9, A-F) réunit exactement 4 bits (quartet). 0xF = 15 = 1111₂.",
        lesson: "Pour convertir 11011010₂ en Hexa, découpe en 2 quartets : 1101₂ (13 = D) et 1010₂ (10 = A). Résultat = 0xDA.",
        defenseCase: "Les adresses mémoire des calculateurs ARM (ex: 0x4000C000) pointent directement sur les cartes accélérométriques.",
        exercise: {
          question: "Convertis 11110011₂ en hexadécimal.",
          correction: "1111₂ = F et 0011₂ = 3. Le résultat est 0xF3."
        }
      },
      {
        id: 3,
        title: "Portes Logiques (AND, OR, NOT, XOR)",
        tome: "Tome 0",
        duration: "50 min",
        maths: "Algèbre de Boole : AND (A·B), OR (A+B), NOT (Ā), XOR (A⊕B).",
        lesson: "AND nécessite 2 entrées VRAI. OR nécessite au moins 1 entrée VRAI. XOR exige des entrées DIFFÉRENTES.",
        defenseCase: "Sécurité de tir d'hélicoptère : Tir = Détente (1) AND Sécurité_Désactivée (1). Si la sécurité est activée (0), le coup ne part pas.",
        exercise: {
          question: "Calcule le résultat de (1 AND 0) OR (NOT 0 AND 1).",
          correction: "(1 AND 0) = 0. NOT 0 = 1, donc (1 AND 1) = 1. Résultat : 0 OR 1 = 1 (VRAI)."
        }
      },
      {
        id: 4,
        title: "Défi Sournois #1 — L'Overflow (Dépassement de Capacité)",
        tome: "Tome 0",
        duration: "60 min",
        maths: "Sur N bits, max = 2^N - 1. Si on ajoute 1 à la valeur max, le bit de poids fort est perdu et la valeur retombe à 0.",
        lesson: "Sur 8 bits, 255 + 1 = 0 ! C'est ce bug qui a fait exploser la fusée Ariane 5 en 1996.",
        defenseCase: "Un capteur de vitesse de turbine codé sur 8 bits qui passe de 250 à 260 RPM sera lu comme 4 RPM, empêchant la mise en sécurité du moteur.",
        exercise: {
          question: "Une variable de 8 bits (max 255) contient 200. On lui ajoute 70. Quelle sera sa valeur finale ?",
          correction: "200 + 70 = 270. Modulo 256 : 270 - 256 = 14."
        }
      },
      {
        id: 5,
        title: "Examen de Maîtrise du Tome 0",
        tome: "Tome 0",
        duration: "30 min",
        maths: "Synthèse : Binaire, Hexadécimal, Logique et Bornes mémoire.",
        lesson: "Évaluation chronométrée sur papier.",
        defenseCase: "Validation des compétences de base avant le passage au C.",
        exercise: {
          question: "Convertis 186 en binaire par divisions successives.",
          correction: "186÷2=93(r0), 93÷2=46(r1), 46÷2=23(r0), 23÷2=11(r1), 11÷2=5(r1), 5÷2=2(r1), 2÷2=1(r0), 1÷2=0(r1). Résultat : 10111010₂."
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
