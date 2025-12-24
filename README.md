# Aurelian Epuraș – Official Website

Acest repository conține codul sursă al website-ului oficial al pianistului și compozitorului **Aurelian Epuraș**.

Site-ul funcționează ca platformă de prezentare pentru activitatea artistică, proiecte muzicale, inițiative educaționale, articole, materiale media și informații de contact. A fost conceput ca un spațiu de arhivare și continuitate, gândit să păstreze și să transmită această activitate dincolo de prezent, ca document de referință în timp.

🌐 Website: https://aurelianepuras.ro - (Hosted via GitHub Pages)

---

## Scopul repository-ului

- website personal de prezentare artistică
- arhivă de proiecte muzicale și apariții
- documentarea și susținerea proiectelor educaționale
- blog și secțiune media
- platformă informativă pentru public

Acest repository **nu este un template** și **nu este destinat reutilizării comerciale**.

---

## Tehnologii utilizate

- Astro
- Tailwind CSS
- Decap CMS
- GitHub Pages

---

## Licență și utilizare

Structura, designul și conținutul acestui website sunt protejate prin drepturi de autor.

Vizualizarea codului este permisă în scop informativ sau educațional.  
Copierea, redistribuirea sau utilizarea comercială a acestui material nu sunt permise fără acordul explicit al autorului.

---

© Aurelian Epuraș

*** IMPORTANT!!! ***
###################### Cum se editează conținutul site-ului (varianta sigură, pe termen lung) ######################

Acest website a fost conceput astfel încât informația să rămână accesibilă și editabilă chiar și în lipsa oricărei interfețe de administrare (CMS).

Decizia nu este una întâmplătoare. A apărut în urma unei experiențe reale, întâlnite în timpul dezvoltării site-ului.

---

## De ce NU ne bazăm exclusiv pe pagina de admin (CMS)

Inițial, site-ul a fost configurat cu Decap CMS, o interfață vizuală de administrare accesibilă la /admin/, care permite editarea conținutului direct din browser.

### Ce a funcționat:
- pagina de admin funcționează local (pe calculator)
- autentificarea cu GitHub funcționează în anumite condiții
- articolele, fotografiile, video și muzica pot fi adăugate din interfață

### Problema întâlnită pe live:
Pe versiunea publică a site-ului (GitHub Pages), autentificarea în admin nu mai funcționează fără un serviciu extern (Netlify sau Cloudflare Worker), deoarece:
- GitHub Pages este un hosting static
- nu oferă backend pentru autentificare OAuth
- Decap CMS are nevoie de un intermediar pentru login

Aceasta nu este o eroare de configurare și nu este o problemă locală, ci o limitare a platformei.

---

## Concluzia logică

Pentru ca acest site să poată fi:
- editat de oriunde
- recuperat oricând
- menținut chiar dacă unele servicii dispar

am ales ca baza conținutului să fie GitHub-ul în sine, nu CMS-ul.

CMS-ul este un bonus, nu o dependență critică.  
GitHub este sursa adevărului.

---

## Cum se editează conținutul DIRECT din GitHub

Aceasta este metoda 100% sigură, care funcționează întotdeauna, din orice browser, fără instalări.

### Articole de blog
- locație: src/content/blog/
- format: .md (Markdown)
- fiecare fișier reprezintă un articol
- după salvare, GitHub declanșează automat rebuild-ul site-ului
- articolul apare pe site în câteva secunde

### Fotografii (Galerie foto)
- locație conținut: src/content/photos/
- format: .json
- fiecare fișier descrie o fotografie
- imaginea propriu-zisă se află în: public/uploads/

Fotografiile sunt fișiere .json deoarece sunt tratate ca date, nu ca articole.

### Video (YouTube)
- locație: src/content/videos/
- format: .json
- se folosește YouTube ID, nu linkul complet

Exemplu:
https://www.youtube.com/watch?v=LhhbajLkb4U

YouTube ID:
LhhbajLkb4U

### Muzică
- locație: src/content/music/
- format: .json
- câmpul audioUrl poate fi:
  - fișier audio urcat în public/uploads/
  - sau link extern (temporar)

---

## Scară de dificultate

### Editare direct din GitHub
Dificultate: UȘOR – MEDIU

- funcționează din orice browser
- nu depinde de niciun serviciu extern
- nu se poate „strica” site-ul ușor
- ideal pentru continuitate și arhivare

Necesită:
- atenție la structură
- copierea corectă a câmpurilor

---

### Editare prin Admin (Decap CMS)
Dificultate: FOARTE UȘOR (când funcționează)

- interfață vizuală
- fără editare de fișiere
- rapid și comod

Depinde de:
- autentificare OAuth
- servicii externe
- infrastructură care poate dispărea

---

## De ce această abordare este „pentru eternitate”

Pentru că:
- conținutul este stocat în fișiere simple
- fișierele sunt versionate
- pot fi citite și editate peste 10, 20 sau 50 de ani
- nu depind de un furnizor unic
- nu există blocaje tehnologice

Dacă într-o zi:
- CMS-ul nu mai funcționează
- un serviciu dispare
- calculatorul personal nu mai există

site-ul rămâne  
conținutul rămâne  
orice browser este suficient

---

## Notă finală

Această structură nu a fost aleasă pentru că este cea mai comodă.  
A fost aleasă pentru că este cea mai sigură.

CMS-ul poate veni și pleca.  
Conținutul rămâne.
