export interface SessionData {
  id: number;
  title: string;
  tome: string;
  duration: string;
  htmlContent: string;
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
  sessions: SessionData[];
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
                  <div class="exercise-title">✍️ Exercice d'Application 1.1 (À rédiger sur papier)</div>
                  <p>1. Convertis le nombre décimal $N = 214$ en binaire en posant toutes les divisions par 2.</p>
                  <p>2. Convertis le nombre binaire $B = 01101010_2$ en décimal en écrivant la somme détaillée.</p>

                  <details>
                      <summary>Consulter la correction détaillée (Fais l'exercice avant de regarder !)</summary>
                      <div class="solution-details">
                          <strong>Solution 1 :</strong><br>
                          214 ÷ 2 = 107 (reste 0)<br>
                          107 ÷ 2 = 53 (reste 1)<br>
                          53 ÷ 2 = 26 (reste 1)<br>
                          26 ÷ 2 = 13 (reste 0)<br>
                          13 ÷ 2 = 6 (reste 1)<br>
                          6 ÷ 2 = 3 (reste 0)<br>
                          3 ÷ 2 = 1 (reste 1)<br>
                          1 ÷ 2 = 0 (reste 1)<br>
                          Lecture de bas en haut $\\rightarrow$ <strong>11010110₂</strong>.<br><br>

                          <strong>Solution 2 :</strong><br>
                          $01101010_2 = (0 \\times 128) + (1 \\times 64) + (1 \\times 32) + (0 \\times 16) + (1 \\times 8) + (0 \\times 4) + (1 \\times 2) + (0 \\times 1)$<br>
                          $= 64 + 32 + 8 + 2 = \\mathbf{106}_{10}$.
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
                  <div class="exercise-title">✍️ Exercice d'Application 2.1</div>
                  <p>1. Convertis le binaire $10101111_2$ directement en hexadécimal.</p>
                  <p>2. Convertis la valeur hexadécimale $0xB4$ en binaire sur 8 bits.</p>
                  <p>3. Calcule la valeur décimale de $0xA5$.</p>

                  <details>
                      <summary>Consulter la correction détaillée</summary>
                      <div class="solution-details">
                          <strong>Solution 1 :</strong> Groupes : $1010_2 = 10 \\rightarrow \\mathbf{A}$ et $1111_2 = 15 \\rightarrow \\mathbf{F}$. Résultat : <strong>0xAF</strong>.<br>
                          <strong>Solution 2 :</strong> $\\mathbf{B} = 11 \\rightarrow 1011_2$ et $\\mathbf{4} \\rightarrow 0100_2$. Résultat : <strong>10110100₂</strong>.<br>
                          <strong>Solution 3 :</strong> $0xA5 = (A \\times 16) + 5 = (10 \\times 16) + 5 = 160 + 5 = \\mathbf{165}_{10}$.
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
                  <div class="exercise-title">✍️ Exercice d'Application 3.1</div>
                  <p>Soit l'équation de tir d'un drone : $Tir = (Alti\\_OK \\cdot \\bar{Obstacle}) \\cdot Autorisation$.</p>
                  <p>Calcule la valeur de $Tir$ pour les cas suivants :</p>
                  <p>1. $Alti\\_OK = 1$, $Obstacle = 1$, $Autorisation = 1$</p>
                  <p>2. $Alti\\_OK = 1$, $Obstacle = 0$, $Autorisation = 1$</p>

                  <details>
                      <summary>Consulter la correction détaillée</summary>
                      <div class="solution-details">
                          <strong>Solution 1 :</strong> $Obstacle = 1 \\Rightarrow \\bar{Obstacle} = 0$. Donc $Tir = (1 \\cdot 0) \\cdot 1 = 0 \\cdot 1 = \\mathbf{0}$ (Le tir est bloqué car obstacle présent !).<br>
                          <strong>Solution 2 :</strong> $Obstacle = 0 \\Rightarrow \\bar{Obstacle} = 1$. Donc $Tir = (1 \\cdot 1) \\cdot 1 = 1 \\cdot 1 = \\mathbf{1}$ (Tir autorisé !).
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
                  <div class="exercise-title">✍️ Exercice d'Application 4.1</div>
                  <p>Une variable de 8 bits contient la valeur 200. On lui ajoute 70. Quelle sera la valeur finale retenue par le registre ? (Pose le calcul $270 \\text{ mod } 256$).</p>

                  <details>
                      <summary>Consulter la correction détaillée</summary>
                      <div class="solution-details">
                          La valeur réelle est 270. Puisque la capacité maximale est 255, le registre effectue le modulo 256 :<br>
                          $270 - 256 = \\mathbf{14}$.<br>
                          Le registre contiendra la valeur 14.
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
