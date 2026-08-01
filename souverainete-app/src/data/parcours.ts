export interface SessionData {
  id: number;
  title: string;
  tome: string;
  duration: string;
  note: string;   // Objectif pédagogique affiché en haut de chaque session
  htmlContent: string;
}

export interface Parcours {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  tags: string[];
  icon: string;
  color: string;
  badge: string;
  description: string;
  durationMonths: number;
  sessionsCount: number;
  tomes: string[];
  sessions: SessionData[];
}

export const PARCOURS_DATA: Parcours[] = [
  {
    id: "systemes-critiques",
    title: "Ingénieur Systèmes Critiques & Défense",
    subtitle: "Maîtrise du métal, de la mémoire et des logiciels de sécurité militaire",
    category: "Défense & Systèmes Critiques",
    tags: ["c", "c++", "ada", "spark", "rust", "binaire", "memoire", "calculateur", "missile", "armement", "securite"],
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
        note: "Cette session vous apprend la langue fondamentale des processeurs. Sans maîtrise du binaire, il est impossible de comprendre l'allocation mémoire, les registres matériels ou la sécurité bas niveau.",
        htmlContent: `
          <div class="chapter">
              <p>Dans la vie courante, nous exprimons les nombres en <strong>base 10 (numération décimale)</strong>. Cela signifie que nous disposons de dix symboles distincts : {0, 1, 2, 3, 4, 5, 6, 7, 8, 9}. Dans un système électronique numérique (comme un calculateur de vol ou un processeur), les composantes physiques ne possèdent que deux états stables : tension haute (1) ou tension nulle (0). Nous devons donc utiliser la <strong>base 2 (numération binaire)</strong>.</p>

              <div class="theorem-box">
                  <span class="theorem-title">Théorème 1.1 — Décomposition Poids-Position</span>
                  Tout nombre entier $N$ exprimé dans une base $B$ s'écrit comme la somme de ses chiffres multipliés par les puissances successives de la base :
                  $$N = \\sum_{k=0}^{n-1} a_k \\times B^k = (a_{n-1} \\times B^{n-1}) + \\dots + (a_1 \\times B^1) + (a_0 \\times B^0)$$
                  En base 2 ($B = 2$), les coefficients $a_k$ ne peuvent prendre que les valeurs 0 ou 1.
              </div>

              <h3>1.1. Convertir du Binaire vers le Décimal (La Somme des Puissances)</h3>
              <p>Pour convertir un nombre binaire en nombre décimal, on multiplie chaque bit par la puissance de 2 correspondant à sa position (en partant de la droite à l'index 0).</p>

              <div class="method-box">
                  <span class="method-title">Méthode Rédigée 1.1 — Exemple Pas à Pas</span>
                  Soit à convertir le nombre binaire $N_2 = \\mathbf{10110101}_2$ en décimal ($N_{10}$).<br><br>
                  <strong>Étape 1 :</strong> On dresse le tableau des positions et des poids :
                  <div class="table-responsive">
                      <table class="math-table">
                          <tr>
                              <th>Bit (Position $k$)</th>
                              <td>7</td><td>6</td><td>5</td><td>4</td><td>3</td><td>2</td><td>1</td><td>0</td>
                          </tr>
                          <tr>
                              <th>Puissance de 2 ($2^k$)</th>
                              <td>128</td><td>64</td><td>32</td><td>16</td><td>8</td><td>4</td><td>2</td><td>1</td>
                          </tr>
                          <tr>
                              <th>Valeur du Bit ($a_k$)</th>
                              <td><strong>1</strong></td><td><strong>0</strong></td><td><strong>1</strong></td><td><strong>1</strong></td><td><strong>0</strong></td><td><strong>1</strong></td><td><strong>0</strong></td><td><strong>1</strong></td>
                          </tr>
                      </table>
                  </div>

                  <strong>Étape 2 :</strong> On pose le calcul explicite terme par terme :
                  $$N_{10} = (1 \\times 2^7) + (0 \\times 2^6) + (1 \\times 2^5) + (1 \\times 2^4) + (0 \\times 2^3) + (1 \\times 2^2) + (0 \\times 2^1) + (1 \\times 2^0)$$
                  $$N_{10} = (1 \\times 128) + (0 \\times 64) + (1 \\times 32) + (1 \\times 16) + (0 \\times 8) + (1 \\times 4) + (0 \\times 2) + (1 \\times 1)$$
                  $$N_{10} = 128 + 0 + 32 + 16 + 0 + 4 + 0 + 1$$
                  $$N_{10} = \\mathbf{181}$$
                  Conclusion : $\\mathbf{10110101}_2 = \\mathbf{181}_{10}$.
              </div>

              <h3>1.2. Convertir du Décimal vers le Binaire (Méthode des Divisions Successives par 2)</h3>
              <p>C'est l'opération inverse. Pour convertir un nombre décimal en binaire, la méthode universelle consiste à effectuer des <strong>divisions entières successives par 2</strong> jusqu'à obtenir un quotient nul, puis à lire les restes de bas en haut (du dernier au premier).</p>

              <div class="method-box">
                  <span class="method-title">Méthode Rédigée 1.2 — La Division Posée Pas à Pas</span>
                  Soit à convertir le nombre décimal $N_{10} = \\mathbf{157}$ en binaire.<br><br>
                  On effectue les divisions euclidiennes par 2 :
                  <div class="division-step">
                      1) 157 ÷ 2 = <span class="highlight-quotient">78</span>, reste <span class="highlight-rest">1</span>  (Bit 0 - Poids le plus faible / LSB)<br>
                      2)  78 ÷ 2 = <span class="highlight-quotient">39</span>, reste <span class="highlight-rest">0</span>  (Bit 1)<br>
                      3)  39 ÷ 2 = <span class="highlight-quotient">19</span>, reste <span class="highlight-rest">1</span>  (Bit 2)<br>
                      4)  19 ÷ 2 = <span class="highlight-quotient">9</span>,  reste <span class="highlight-rest">1</span>  (Bit 3)<br>
                      5)   9 ÷ 2 = <span class="highlight-quotient">4</span>,  reste <span class="highlight-rest">1</span>  (Bit 4)<br>
                      6)   4 ÷ 2 = <span class="highlight-quotient">2</span>,  reste <span class="highlight-rest">0</span>  (Bit 5)<br>
                      7)   2 ÷ 2 = <span class="highlight-quotient">1</span>,  reste <span class="highlight-rest">0</span>  (Bit 6)<br>
                      8)   1 ÷ 2 = <span class="highlight-quotient">0</span>,  reste <span class="highlight-rest">1</span>  (Bit 7 - Poids le plus fort / MSB)
                  </div>
                  <strong>Étape décisive :</strong> On lit les restes du BAS vers le HAUT (du dernier reste au premier reste) :<br>
                  $\\rightarrow$ Restes : $\\mathbf{1} \\rightarrow \\mathbf{0} \\rightarrow \\mathbf{0} \\rightarrow \\mathbf{1} \\rightarrow \\mathbf{1} \\rightarrow \\mathbf{1} \\rightarrow \\mathbf{0} \\rightarrow \\mathbf{1}$<br><br>
                  Conclusion : $\\mathbf{157}_{10} = \\mathbf{10011101}_2$.
              </div>

              <div class="case-box">
                  <span class="case-title">Application Concrète — Système d'Armement</span>
                  Dans le calculateur de guidage d'un drone, un accéléromètre envoie une valeur brute de 157. L'unité de contrôle logique lit directement l'octet $\\mathbf{10011101}_2$. Si le Bit 7 (valeur 128) est à 1, le système active immédiatement la correction de tangage.
              </div>

              <div class="exercise-section">
                  <div class="exercise-title">✍️ Exercice 1.1 — Direct (À rédiger sur papier)</div>
                  <p>1. Convertis le nombre décimal $N = 214$ en binaire en posant toutes les divisions par 2.</p>
                  <p>2. Convertis le nombre binaire $B = 01101010_2$ en décimal en écrivant la somme des puissances.</p>
                  <details>
                      <summary>Consulter la correction (Fais l'exercice avant !)</summary>
                      <div class="solution-details">
                          <strong>Solution 1 :</strong><br>
                          214 ÷ 2 = 107 r.0 | 107 ÷ 2 = 53 r.1 | 53 ÷ 2 = 26 r.1 | 26 ÷ 2 = 13 r.0<br>
                          13 ÷ 2 = 6 r.1 | 6 ÷ 2 = 3 r.0 | 3 ÷ 2 = 1 r.1 | 1 ÷ 2 = 0 r.1<br>
                          Lecture de bas en haut $\\rightarrow$ <strong>$11010110_2$</strong><br><br>
                          <strong>Solution 2 :</strong><br>
                          $01101010_2 = (1{\\times}64)+(1{\\times}32)+(1{\\times}8)+(1{\\times}2) = 64+32+8+2 = \\mathbf{106}_{10}$
                      </div>
                  </details>
              </div>

              <div class="exercise-section">
                  <div class="exercise-title">🧩 Exercice 1.2 — Intermédiaire (Raisonnement en deux sens)</div>
                  <p>1. Un registre d'état d'un processeur vaut $N = 185_{10}$. Convertis-le en binaire sur 8 bits. Quels bits (Bit 7 à Bit 0) sont à 1 ?</p>
                  <p>2. Un capteur renvoie la valeur binaire $11000011_2$. Quelle est sa valeur décimale ? Est-elle supérieure à 190 ?</p>
                  <details>
                      <summary>Consulter la correction</summary>
                      <div class="solution-details">
                          <strong>Solution 1 :</strong><br>
                          185 ÷ 2 = 92 r.1 | 92 ÷ 2 = 46 r.0 | 46 ÷ 2 = 23 r.0 | 23 ÷ 2 = 11 r.1<br>
                          11 ÷ 2 = 5 r.1 | 5 ÷ 2 = 2 r.1 | 2 ÷ 2 = 1 r.0 | 1 ÷ 2 = 0 r.1<br>
                          $\\rightarrow \\mathbf{10111001_2}$ — Bits à 1 : Bit 7, Bit 5, Bit 4, Bit 3, Bit 0<br><br>
                          <strong>Solution 2 :</strong><br>
                          $11000011_2 = 128+64+2+1 = \\mathbf{195}_{10}$ — Oui, supérieure à 190.
                      </div>
                  </details>
              </div>

              <div class="exercise-section">
                  <div class="exercise-title">🔥 Exercice 1.3 — Défi Défense (Application critique)</div>
                  <p>Un calculateur de vol embarqué utilise un registre de 8 bits pour stocker l'angle de tangage. La valeur $10110100_2$ est lue.</p>
                  <p>1. Détermine la valeur décimale de ce registre.</p>
                  <p>2. Si le Bit 7 (MSB) à 1 signifie «&nbsp;piqué critique&nbsp;», ce drone est-il en situation d'urgence ?</p>
                  <p>3. Quel est le complément à 1 de $10110100_2$ ? (Inverse tous les bits)</p>
                  <details>
                      <summary>Consulter la correction</summary>
                      <div class="solution-details">
                          <strong>Solution 1 :</strong><br>
                          $10110100_2 = 128+32+16+4 = \\mathbf{180}_{10}$<br><br>
                          <strong>Solution 2 :</strong><br>
                          Le Bit 7 vaut 1 $\\rightarrow$ Le drone est en <strong>situation de piqué critique</strong>. Le système doit déclencher la correction d'urgence.<br><br>
                          <strong>Solution 3 :</strong><br>
                          Complément à 1 de $10110100$ : inverser chaque bit $\\rightarrow \\mathbf{01001011_2} = 75_{10}$.
                      </div>
                  </details>
              </div>
          </div>
        `
      },
      {
        id: 2,
        title: "La Numération Hexadécimale (Base 16) et l'Inter-conversion",
        tome: "Tome 0",
        duration: "45 min",
        note: "Cette session vous enseigne l'écriture compacte de la mémoire. L'hexadécimal permet de lire et manipuler des adresses de bus et des dumps d'octets sans vous noyer dans des suites de 0 et de 1.",
        htmlContent: `
          <div class="chapter">
              <p>Travailler directement avec des chaînes de 32 ou 64 bits est extrêmement fastidieux pour les ingénieurs. La <strong>base 16 (hexadécimale)</strong> offre une représentation condensée directe du binaire : <strong>exactement 1 chiffre hexadécimal représente un bloc de 4 bits (un quartet)</strong>.</p>

              <div class="theorem-box">
                  <span class="theorem-title">Théorème 2.1 — La Correspondance des Symboles Hexadécimaux</span>
                  La base 16 utilise 16 symboles : {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, A, B, C, D, E, F}.<br>
                  Les lettres A à F représentent respectivement les valeurs décimales 10 à 15.
                  <div class="table-responsive">
                      <table class="math-table">
                          <tr><th>Hexa</th><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>A</td><td>B</td><td>C</td><td>D</td><td>E</td><td>F</td></tr>
                          <tr><th>Décimal</th><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td><td>15</td></tr>
                          <tr><th>Binaire</th><td>0000</td><td>0001</td><td>0010</td><td>0011</td><td>0100</td><td>0101</td><td>0110</td><td>0111</td><td>1000</td><td>1001</td><td>1010</td><td>1011</td><td>1100</td><td>1101</td><td>1110</td><td>1111</td></tr>
                      </table>
                  </div>
              </div>

              <h3>2.1. Méthode Directe : Binaire $\\longleftrightarrow$ Hexadécimal</h3>

              <div class="method-box">
                  <span class="method-title">Méthode Rédigée 2.1 — Conversion Binaire vers Hexadécimal</span>
                  Soit à convertir le nombre binaire de 8 bits $B = \\mathbf{11010111}_2$ en hexadécimal.<br><br>
                  <strong>Étape 1 :</strong> On sépare le nombre en paquets de 4 bits à partir de la droite (quartets) :<br>
                  Quartet Gauche (Poids fort) = <strong>1101</strong> &nbsp;|&nbsp; Quartet Droit (Poids faible) = <strong>0111</strong><br><br>
                  <strong>Étape 2 :</strong> On convertit chaque quartet séparément en décimal puis en symbole hexa :<br>
                  • Quartet Gauche $\\rightarrow 1101_2 = (1 \\times 8) + (1 \\times 4) + (0 \\times 2) + (1 \\times 1) = 13 \\rightarrow \\mathbf{D}$<br>
                  • Quartet Droit $\\rightarrow 0111_2 = (0 \\times 8) + (1 \\times 4) + (1 \\times 2) + (1 \\times 1) = 7 \\rightarrow \\mathbf{7}$<br><br>
                  <strong>Étape 3 :</strong> On juxtapose les deux symboles :<br>
                  $\\mathbf{11010111}_2 = \\mathbf{0xD7}_{16}$ (Le préfixe <code>0x</code> signale une écriture hexadécimale).
              </div>

              <h3>2.2. Conversion Hexadécimal vers Décimal</h3>

              <div class="method-box">
                  <span class="method-title">Méthode Rédigée 2.2 — Décomposition en Puissances de 16</span>
                  Soit à convertir le nombre hexadécimal $H = \\mathbf{0x3F8}$ en décimal.<br><br>
                  $$H_{10} = (3 \\times 16^2) + (F \\times 16^1) + (8 \\times 16^0)$$
                  Puisque $F = 15$ en décimal :
                  $$H_{10} = (3 \\times 256) + (15 \\times 16) + (8 \\times 1)$$
                  $$H_{10} = 768 + 240 + 8 = \\mathbf{1016}_{10}$$
              </div>

              <div class="exercise-section">
                  <div class="exercise-title">✍️ Exercice 2.1 — Direct (Conversions Hex ↔ Binaire)</div>
                  <p>1. Convertis le binaire $10101111_2$ directement en hexadécimal par blocs de 4 bits.</p>
                  <p>2. Convertis la valeur hexadécimale $0xB4$ en binaire sur 8 bits.</p>
                  <p>3. Calcule la valeur décimale de $0xA5$.</p>
                  <details>
                      <summary>Consulter la correction</summary>
                      <div class="solution-details">
                          <strong>Solution 1 :</strong> $1010_2 \\rightarrow A$, $1111_2 \\rightarrow F$ $\\Rightarrow$ <strong>0xAF</strong><br>
                          <strong>Solution 2 :</strong> $B = 11 \\rightarrow 1011_2$, $4 \\rightarrow 0100_2$ $\\Rightarrow$ <strong>$10110100_2$</strong><br>
                          <strong>Solution 3 :</strong> $0xA5 = (10{\\times}16) + 5 = 160 + 5 = \\mathbf{165}_{10}$
                      </div>
                  </details>
              </div>

              <div class="exercise-section">
                  <div class="exercise-title">🧩 Exercice 2.2 — Intermédiaire (Adresses mémoire)</div>
                  <p>Un débogueur affiche l'adresse mémoire suivante : <code>0x1F4A</code></p>
                  <p>1. Convertis $0x1F4A$ en binaire complet (16 bits).</p>
                  <p>2. Donne la valeur décimale de $0x1F4A$.</p>
                  <details>
                      <summary>Consulter la correction</summary>
                      <div class="solution-details">
                          <strong>Solution 1 :</strong><br>
                          $1 \\rightarrow 0001$, $F \\rightarrow 1111$, $4 \\rightarrow 0100$, $A \\rightarrow 1010$<br>
                          $\\Rightarrow \\mathbf{0001\ 1111\ 0100\ 1010_2}$<br><br>
                          <strong>Solution 2 :</strong><br>
                          $0x1F4A = (1{\\times}16^3)+(F{\\times}16^2)+(4{\\times}16^1)+(A{\\times}16^0)$<br>
                          $= 4096 + 3840 + 64 + 10 = \\mathbf{8010}_{10}$
                      </div>
                  </details>
              </div>

              <div class="exercise-section">
                  <div class="exercise-title">🔥 Exercice 2.3 — Défi Défense (Dump mémoire)</div>
                  <p>Un dump de mémoire d'un bus CAN embarqué (défense) affiche 4 octets consécutifs :</p>
                  <p><code>0xDE 0xAD 0xBE 0xEF</code></p>
                  <p>1. Donne la valeur décimale de chaque octet.</p>
                  <p>2. Quel est l'octet de plus grande valeur décimale ?</p>
                  <p>3. En quel binaire s'écrit l'octet <code>0xBE</code> ?</p>
                  <details>
                      <summary>Consulter la correction</summary>
                      <div class="solution-details">
                          <strong>Solution 1 :</strong><br>
                          $0xDE = (13{\\times}16)+14 = 208+14 = \\mathbf{222}_{10}$<br>
                          $0xAD = (10{\\times}16)+13 = 160+13 = \\mathbf{173}_{10}$<br>
                          $0xBE = (11{\\times}16)+14 = 176+14 = \\mathbf{190}_{10}$<br>
                          $0xEF = (14{\\times}16)+15 = 224+15 = \\mathbf{239}_{10}$<br><br>
                          <strong>Solution 2 :</strong> L'octet de plus grande valeur est <strong>0xEF = 239</strong><br><br>
                          <strong>Solution 3 :</strong> $0xBE : B=1011, E=1110 \\Rightarrow \\mathbf{10111110_2}$
                      </div>
                  </details>
              </div>
          </div>
        `
      },
      {
        id: 3,
        title: "Les Portes Logiques et l'Algèbre de Boole",
        tome: "Tome 0",
        duration: "50 min",
        note: "Cette session introduit les briques de décision de l'informatique. Chaque instruction conditionnelle dans vos programmes s'appuie directement sur les portes logiques et l'algèbre booléenne.",
        htmlContent: `
          <div class="chapter">
              <p>L'algèbre de Boole traite de variables logiques qui ne peuvent prendre que deux valeurs : 0 (Faux) ou 1 (Vrai). Les opérations fondamentales sont réalisées physiquement par des <strong>portes logiques</strong>.</p>

              <div class="theorem-box">
                  <span class="theorem-title">Théorème 3.1 — Les 4 Opérateurs Booléens de Base</span>
                  <div class="table-responsive">
                      <table class="math-table">
                          <tr>
                              <th>Opérateur</th>
                              <th>Notation Mathématique</th>
                              <th>Règle de Fonctionnement</th>
                          </tr>
                          <tr>
                              <td><strong>ET (AND)</strong></td>
                              <td>$A \\cdot B$ ou $A \\land B$</td>
                              <td>Sortie vaut 1 <strong>uniquement si $A=1$ ET $B=1$</strong>.</td>
                          </tr>
                          <tr>
                              <td><strong>OU (OR)</strong></td>
                              <td>$A + B$ ou $A \\lor B$</td>
                              <td>Sortie vaut 1 si <strong>au moins une des entrées vaut 1</strong>.</td>
                          </tr>
                          <tr>
                              <td><strong>NON (NOT)</strong></td>
                              <td>$\\bar{A}$ ou $\\neg A$</td>
                              <td>Inverse la valeur : si $A=0 \\rightarrow 1$, si $A=1 \\rightarrow 0$.</td>
                          </tr>
                          <tr>
                              <td><strong>OU Exclusif (XOR)</strong></td>
                              <td>$A \\oplus B$</td>
                              <td>Sortie vaut 1 si <strong>les entrées sont différentes</strong>.</td>
                          </tr>
                      </table>
                  </div>
              </div>

              <h3>3.1. Tables de Vérité Détaillées</h3>
              <p>Une table de vérité liste tous les états possibles des entrées et donne le résultat de la sortie correspondante.</p>

              <div class="table-responsive">
                  <table class="math-table">
                      <tr>
                          <th>Entrée A</th><th>Entrée B</th>
                          <th>AND ($A \\cdot B$)</th>
                          <th>OR ($A + B$)</th>
                          <th>XOR ($A \\oplus B$)</th>
                      </tr>
                      <tr><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td></tr>
                      <tr><td>0</td><td>1</td><td>0</td><td>1</td><td>1</td></tr>
                      <tr><td>1</td><td>0</td><td>0</td><td>1</td><td>1</td></tr>
                      <tr><td>1</td><td>1</td><td><strong>1</strong></td><td>1</td><td>0</td></tr>
                  </table>
              </div>

              <div class="method-box">
                  <span class="method-title">Méthode Rédigée 3.1 — Évaluation d'une Équation Logique Complexe</span>
                  Évaluer la fonction $S = (A \\cdot \\bar{B}) + C$ pour la combinaison d'entrées : $A=1, B=1, C=1$.<br><br>
                  <strong>Étape 1 :</strong> Calculer la négation de B :<br>
                  $$\\bar{B} = \\overline{1} = 0$$
                  <strong>Étape 2 :</strong> Calculer le terme du ET ($A \\cdot \\bar{B}$) :<br>
                  $$A \\cdot \\bar{B} = 1 \\cdot 0 = 0$$
                  <strong>Étape 3 :</strong> Calculer le résultat final avec le OU ($+ C$) :<br>
                  $$S = 0 + C = 0 + 1 = \\mathbf{1}$$
                  La sortie globale $S$ vaut donc 1.
              </div>

              <div class="exercise-section">
                  <div class="exercise-title">✍️ Exercice 3.1 — Direct (Évaluation Booléenne)</div>
                  <p>Soit l'équation de tir d'un drone : $Tir = (Alti\\_OK \\cdot \\bar{Obstacle}) \\cdot Autorisation$</p>
                  <p>1. $Alti\\_OK = 1$, $Obstacle = 1$, $Autorisation = 1$ — Le tir a-t-il lieu ?</p>
                  <p>2. $Alti\\_OK = 1$, $Obstacle = 0$, $Autorisation = 1$ — Le tir a-t-il lieu ?</p>
                  <details>
                      <summary>Consulter la correction</summary>
                      <div class="solution-details">
                          <strong>Solution 1 :</strong> $\\bar{Obstacle}=\\bar{1}=0 \\Rightarrow Tir=(1{\\cdot}0){\\cdot}1=\\mathbf{0}$ — Tir bloqué (obstacle présent).<br>
                          <strong>Solution 2 :</strong> $\\bar{Obstacle}=\\bar{0}=1 \\Rightarrow Tir=(1{\\cdot}1){\\cdot}1=\\mathbf{1}$ — Tir autorisé.
                      </div>
                  </details>
              </div>

              <div class="exercise-section">
                  <div class="exercise-title">🧩 Exercice 3.2 — Intermédiaire (Tables de vérité)</div>
                  <p>Construis la table de vérité complète de la fonction : $F = (A + B) \\cdot \\bar{C}$</p>
                  <p>Donne les 8 combinaisons possibles (A, B, C) et calcule $F$ pour chacune.</p>
                  <details>
                      <summary>Consulter la correction</summary>
                      <div class="solution-details">
                          <table class="math-table"><tr><th>A</th><th>B</th><th>C</th><th>A+B</th><th>$\\bar{C}$</th><th>F</th></tr>
                          <tr><td>0</td><td>0</td><td>0</td><td>0</td><td>1</td><td><strong>0</strong></td></tr>
                          <tr><td>0</td><td>0</td><td>1</td><td>0</td><td>0</td><td><strong>0</strong></td></tr>
                          <tr><td>0</td><td>1</td><td>0</td><td>1</td><td>1</td><td><strong>1</strong></td></tr>
                          <tr><td>0</td><td>1</td><td>1</td><td>1</td><td>0</td><td><strong>0</strong></td></tr>
                          <tr><td>1</td><td>0</td><td>0</td><td>1</td><td>1</td><td><strong>1</strong></td></tr>
                          <tr><td>1</td><td>0</td><td>1</td><td>1</td><td>0</td><td><strong>0</strong></td></tr>
                          <tr><td>1</td><td>1</td><td>0</td><td>1</td><td>1</td><td><strong>1</strong></td></tr>
                          <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>0</td><td><strong>0</strong></td></tr></table>
                      </div>
                  </details>
              </div>

              <div class="exercise-section">
                  <div class="exercise-title">🔥 Exercice 3.3 — Défi Défense (Circuit d'autorisation de tir)</div>
                  <p>Un système d'arme ne doit tirer <strong>que si</strong> : la cible est détectée ET la distance est correcte ET la sécurité est désactivée ET (le commandant OU l'IA) autorise.</p>
                  <p>Écris l'équation booléenne $Tir$ correspondant à ces contraintes en utilisant les variables :<br>
                  $D$ = Cible détectée, $Dist$ = Distance OK, $S$ = Sécurité désactivée, $Cmd$ = Commandant, $IA$ = Intelligence artificielle.</p>
                  <p>Évalue ensuite $Tir$ pour $D=1, Dist=1, S=0, Cmd=1, IA=0.</p>
                  <details>
                      <summary>Consulter la correction</summary>
                      <div class="solution-details">
                          <strong>Équation :</strong> $Tir = D \\cdot Dist \\cdot S \\cdot (Cmd + IA)$<br><br>
                          <strong>Évaluation :</strong><br>
                          $Cmd + IA = 1 + 0 = 1$<br>
                          $Tir = 1 \\cdot 1 \\cdot 0 \\cdot 1 = \\mathbf{0}$<br>
                          Le tir est bloqué : la sécurité ($S=0$) n'est pas désactivée.
                      </div>
                  </details>
              </div>
          </div>
        `
      },
      {
        id: 4,
        title: "Défi Sournois #1 — Le Phénomène de Dépassement (Overflow)",
        tome: "Tome 0",
        duration: "60 min",
        note: "Cette session vous fait découvrir un piège mortel en ingénierie informatique : l'overflow mémoire. Vous comprendrez pourquoi un calcul mathématiquement correct peut faire crasher un missile ou une fusée.",
        htmlContent: `
          <div class="chapter">
              <p>Les registres physiques d'un processeur ont une taille fixe (8 bits, 16 bits, 32 bits). Contrairement aux mathématiques pures où les nombres sont infinis, la mémoire d'un ordinateur est <strong>bornée</strong>.</p>

              <div class="theorem-box">
                  <span class="theorem-title">Théorème 4.1 — Plage de Valeurs d'un Entier Non Signé de $N$ bits</span>
                  Pour un registre de $N$ bits non signé, la valeur minimale est 0 et la valeur maximale est $2^N - 1$.<br>
                  • Pour 8 bits (1 octet) : Plage de $[0 \\text{ à } 255]$.<br>
                  • Pour 16 bits (short) : Plage de $[0 \\text{ à } 65\\,535]$.
              </div>

              <h3>4.1. Démonstration du Mécanisme de l'Overflow</h3>
              <p>Lorsque le résultat d'un calcul dépasse la valeur maximale représentable, les bits de poids fort qui ne rentrent pas dans le registre sont simplement <strong>perdus (tronqués)</strong>.</p>

              <div class="method-box">
                  <span class="method-title">Démonstration Pas à Pas sur 8 Bits</span>
                  Soit la variable $V$ codée sur 8 bits. Initialement $V = 255_{10} = 11111111_2$.<br>
                  On effectue l'opération $V = V + 1$. Posons l'addition binaire :<br><br>
                  <div class="division-step">
                      &nbsp;&nbsp; 11111111 &nbsp;(255 en décimal)<br>
                    + 00000001 &nbsp;(1 en décimal)<br>
                    ───────────<br>
                    <span class="highlight-rest">1</span>00000000 &nbsp;(256 en théorie sur 9 bits !)
                  </div>
                  Le 9-ème bit de gauche (en rouge) ne rentre pas dans le registre de 8 bits ! Le processeur l'ignore. Le registre ne conserve que les 8 bits de droite : <code>00000000</code>.<br><br>
                  Résultat perçu par le programme : $255 + 1 = \\mathbf{0}$ !
              </div>

              <div class="case-box">
                  <span class="case-title">Le Piège de Code — Analyse du Bug</span>
                  Voici le code d'un pilote automatique surveillant la vitesse d'une turbine en RPM (sur un octet 8 bits) :
                  <pre style="font-family:'Fira Code', monospace; font-size:0.9rem; margin-top:10px;">
unsigned char vitesse = 250; // Max 255
vitesse = vitesse + 10;      // Vraie vitesse = 260 !
if (vitesse > 200) {
    Couper_Moteur();
}
                  </pre>
                  <strong>Analyse :</strong> $260 \\text{ mod } 256 = \\mathbf{4}$. La variable <code>vitesse</code> contient la valeur 4. La condition $4 > 200$ est FAUSSE ! Le moteur tourne à une vitesse explosive (260), mais l'ordinateur croit qu'il tourne à 4 RPM et ne coupe pas le moteur !
              </div>

              <div class="exercise-section">
                  <div class="exercise-title">✍️ Exercice 4.1 — Direct (Calcul d'Overflow)</div>
                  <p>Une variable de 8 bits contient la valeur 200. On lui ajoute 70. Quelle sera la valeur finale retenue par le registre ? (Pose le calcul $270 \\text{ mod } 256$).</p>
                  <details>
                      <summary>Consulter la correction</summary>
                      <div class="solution-details">
                          $200 + 70 = 270$. La plage maximale est $[0, 255]$.<br>
                          $270 \\text{ mod } 256 = 270 - 256 = \\mathbf{14}$<br>
                          Le registre contiendra <strong>14</strong> au lieu de 270.
                      </div>
                  </details>
              </div>

              <div class="exercise-section">
                  <div class="exercise-title">🧩 Exercice 4.2 — Intermédiaire (Overflow sur 16 bits)</div>
                  <p>Un registre 16 bits non signé contient la valeur maximale $65\ 535$. On effectue l'addition $+1$.</p>
                  <p>1. Quelle valeur le registre affiche-t-il après l'opération ?</p>
                  <p>2. Exprime $65\ 535$ en hexadécimal.</p>
                  <details>
                      <summary>Consulter la correction</summary>
                      <div class="solution-details">
                          <strong>Solution 1 :</strong><br>
                          $65\ 535 + 1 = 65\ 536$. Mais $65\ 536 \\text{ mod } 65\ 536 = \\mathbf{0}$<br>
                          Le registre revient à <strong>0</strong> — overflow total.<br><br>
                          <strong>Solution 2 :</strong><br>
                          $65\ 535 = 2^{16}-1 = 16 \\times 4096 - 1 \\Rightarrow \\mathbf{0xFFFF}$
                      </div>
                  </details>
              </div>

              <div class="exercise-section">
                  <div class="exercise-title">🔥 Exercice 4.3 — Défi Défense (Bug de compteur de missile)</div>
                  <p>Un compteur de trajectoire sur 8 bits non signé part de la valeur 250 et est incrémenté de 1 à chaque milliseconde.</p>
                  <p>1. Après combien de millisecondes le compteur déborde-t-il ?</p>
                  <p>2. Quelle valeur affiche-t-il après le débordement ?</p>
                  <p>3. Si le système déclenche l'autodestruction uniquement quand le compteur <strong>dépasse 240</strong>, combien de cycles de faux-positifs le bug génère-t-il avant que le compteur repasse sous 240 ?</p>
                  <details>
                      <summary>Consulter la correction</summary>
                      <div class="solution-details">
                          <strong>Solution 1 :</strong> $255 - 250 + 1 = \\mathbf{6}$ ms avant débordement.<br><br>
                          <strong>Solution 2 :</strong> Après le débordement, le compteur vaut $\\mathbf{0}$.<br><br>
                          <strong>Solution 3 :</strong> Le compteur repart de 0 et dépasse 240 à nouveau après 241 ms. Il génère donc <strong>0 faux-positif</strong> puisqu'entre 0 et 240 la condition est fausse — mais le système a raté les valeurs critiques 241→255 du cycle suivant sans vérification.
                      </div>
                  </details>
              </div>
          </div>
        `
      },
      {
        id: 5,
        title: "Examen de Maîtrise Rédigé (Tome 0)",
        tome: "Tome 0",
        duration: "30 min",
        note: "Cette session est une évaluation de rigueur. Elle garantit que les notions fondamentales de calcul binaire, hexadécimal et logique sont ancrées de manière infaillible avant d'aborder le C.",
        htmlContent: `
          <div class="chapter">
              <div class="theorem-box">
                  <span class="theorem-title">Consignes d'Examen</span>
                  Réponds à chaque question sur une feuille séparée en détaillant l'ensemble de tes calculs et raisonnements (pas de résultat brut sans justification).
              </div>

              <div class="exercise-section">
                  <p><strong>Problème 1 (4 points) :</strong> Poser la division euclidienne successive par 2 pour convertir $N = 186_{10}$ en binaire.</p>
                  <p><strong>Problème 2 (3 points) :</strong> Convertir le nombre binaire $10111010_2$ directement en hexadécimal puis en décimal.</p>
                  <p><strong>Problème 3 (3 points) :</strong> Évaluer la fonction logique $S = \\bar{A} \\cdot (B + C)$ avec $A=0, B=1, C=0$.</p>

                  <details>
                      <summary>Consulter le Corrigé Intégral du Professeur</summary>
                      <div class="solution-details">
                          <strong>Corrigé Problème 1 :</strong><br>
                          186 ÷ 2 = 93, reste 0<br>
                          93 ÷ 2 = 46, reste 1<br>
                          46 ÷ 2 = 23, reste 0<br>
                          23 ÷ 2 = 11, reste 1<br>
                          11 ÷ 2 = 5, reste 1<br>
                          5 ÷ 2 = 2, reste 1<br>
                          2 ÷ 2 = 1, reste 0<br>
                          1 ÷ 2 = 0, reste 1<br>
                          Lecture de bas en haut $\\rightarrow$ <strong>10111010₂</strong>.<br><br>

                          <strong>Corrigé Problème 2 :</strong><br>
                          • Hexa : Quartet $1011_2 = 11 \\rightarrow \\mathbf{B}$, Quartet $1010_2 = 10 \\rightarrow \\mathbf{A}$. Résultat : <strong>0xBA</strong>.<br>
                          • Décimal : $(1 \\times 128) + (0 \\times 64) + (1 \\times 32) + (1 \\times 16) + (1 \\times 8) + (0 \\times 4) + (1 \\times 2) + (0 \\times 1) = 128 + 32 + 16 + 8 + 2 = \\mathbf{186}_{10}$.<br><br>

                          <strong>Corrigé Problème 3 :</strong><br>
                          $A=0 \\Rightarrow \\bar{A} = 1$.<br>
                          $(B+C) = 1 + 0 = 1$.<br>
                          $S = 1 \\cdot 1 = \\mathbf{1}$.
                      </div>
                  </details>

              <div class="exercise-section">
                  <div class="exercise-title">🧩 Exercice 5.2 — Approfondissement (Calcul Combiné)</div>
                  <p><strong>Problème 4 (5 points) :</strong> Un système de navigation d'un missile lit deux registres 8 bits :</p>
                  <p>Registre X = $0xC3$ &nbsp; Registre Y = $01101001_2$</p>
                  <p>1. Convertis les deux en décimal.</p>
                  <p>2. Additionne-les. Y a-t-il overflow sur 8 bits ?</p>
                  <p>3. Quelle valeur le registre de résultat contient-il si codé sur 8 bits ?</p>
                  <details>
                      <summary>Consulter le Corrigé</summary>
                      <div class="solution-details">
                          <strong>Solution 1 :</strong><br>
                          $0xC3 = (12{\\times}16)+3 = 192+3 = \\mathbf{195}_{10}$<br>
                          $01101001_2 = 64+32+8+1 = \\mathbf{105}_{10}$<br><br>
                          <strong>Solution 2 :</strong><br>
                          $195 + 105 = 300 > 255$ donc <strong>overflow</strong> sur 8 bits.<br><br>
                          <strong>Solution 3 :</strong><br>
                          $300 \\text{ mod } 256 = 300 - 256 = \\mathbf{44}$ — Le registre contient 44.
                      </div>
                  </details>
              </div>

              <div class="exercise-section">
                  <div class="exercise-title">🔥 Exercice 5.3 — Défi Final (Système complet)</div>
                  <p><strong>Problème 5 (8 points) :</strong> $Feu = (Cible \\cdot \\bar{Brouillard}) + (LaserActif \\cdot Distance\\_OK)$</p>
                  <p>Capteurs : Cible=$0x01$, Brouillard=$0x00$, Laser=$0x01$, Distance=$0xA0$</p>
                  <p>1. Convertis chaque valeur en booléen ($0x00=0$, tout autre = 1).</p>
                  <p>2. Convertis $0xA0$ en décimal. La distance est-elle OK si le seuil minimal est $128_{10}$ ?</p>
                  <p>3. Calcule la valeur finale de $Feu$.</p>
                  <details>
                      <summary>Consulter le Corrigé Intégral</summary>
                      <div class="solution-details">
                          <strong>Solution 1 :</strong> $0x01 \\rightarrow 1$, $0x00 \\rightarrow 0$, $0x01 \\rightarrow 1$<br><br>
                          <strong>Solution 2 :</strong> $0xA0 = 10 \\times 16 = \\mathbf{160}_{10} > 128$ donc $Distance\\_OK = 1$<br><br>
                          <strong>Solution 3 :</strong><br>
                          $\\bar{Brouillard} = \\bar{0} = 1$<br>
                          $(Cible \\cdot \\bar{Brouillard}) = 1 \\cdot 1 = 1$<br>
                          $(Laser \\cdot Distance\\_OK) = 1 \\cdot 1 = 1$<br>
                          $Feu = 1 + 1 = \\mathbf{1}$ — Tir autorisé.
                      </div>
                  </details>
              </div>
              </div>
          </div>
        `
      }
    ]
  },
  {
    id: "robotique-drones",
    title: "Spécialiste Drones & Autonomie Embarquée",
    subtitle: "Conception de pilotes automatiques, navigation inertielle et commande de vol",
    category: "Aérospatial & Autonomie",
    tags: ["drone", "pilote", "vol", "kalman", "pid", "mavlink", "autonomie", "capteur", "aero"],
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
    category: "Cybersécurité & Réseaux",
    tags: ["crypto", "cryptographie", "hsm", "rust", "reseau", "cyber", "securite", "pki", "clef"],
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
