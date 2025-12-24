# Aurelian Epuraș – Official Website

Acest repository conține codul sursă al website-ului oficial al pianistului și compozitorului Aurelian Epuraș.

Site-ul funcționează ca platformă de prezentare pentru activitatea artistică, proiecte muzicale, inițiative educaționale, articole, materiale media și informații de contact. A fost conceput ca un spațiu de arhivare și continuitate, gândit să păstreze și să transmită această activitate dincolo de prezent, ca document de referință în timp.

🌐 Website: https://aurelianepuras-max.github.io  
(Hosted via GitHub Pages)

---

## Scopul repository-ului

- website personal de prezentare artistică
- arhivă de proiecte muzicale și apariții
- documentarea și susținerea proiectelor educaționale
- blog și secțiune media (foto, video, muzică)
- platformă informativă pentru public

Acest repository nu este un template și nu este destinat reutilizării comerciale.

---

## Tehnologii utilizate

- Astro (static site generator)
- Tailwind CSS
- Decap CMS (opțional, local / condiționat)
- GitHub Pages (hosting static)
- GitHub Actions (build & deploy)
- bolt.new (asistență AI în dezvoltarea și structurarea codului)

---

## Licență și utilizare (abordare deschisă și onestă)

Codul acestui website este compus din:
- cod scris manual
- cod generat și ajustat cu ajutorul unor unelte open-source
- integrări existente (Astro, Decap CMS, Tailwind etc.)

### Licență cod
Codul este oferit sub licență MIT.
Poate fi studiat, reutilizat și adaptat liber, cu respectarea licențelor componentelor folosite.

### Conținut
Textele, muzica, imaginile originale și identitatea artistică aparțin lui Aurelian Epuraș.
Pentru reutilizarea conținutului artistic este necesar acordul autorului.

Scopul acestui repository este **transparența**, **continuitatea** și **ajutorul sincer** pentru alți creatori care pot întâmpina aceleași probleme.

---

# IMPORTANT

## Cum se editează conținutul site-ului (varianta sigură, pe termen lung)

Acest website a fost conceput astfel încât **informația să rămână accesibilă și editabilă chiar și în lipsa oricărei interfețe de administrare (CMS)**.

Această decizie nu este teoretică.
A apărut în urma unor probleme reale întâlnite în timpul dezvoltării site-ului.

---

## De ce NU ne bazăm exclusiv pe pagina de admin (Decap CMS)

Inițial, site-ul a fost configurat cu Decap CMS, o interfață vizuală de administrare accesibilă la `/admin/`, care permite editarea conținutului direct din browser.

### Ce a funcționat:
- pagina de admin funcționează local (localhost)
- autentificarea cu GitHub funcționează local
- articolele, fotografiile, video și muzica pot fi adăugate ușor

### Problema apărută pe live (GitHub Pages):
Pe versiunea publică a site-ului, autentificarea în admin **nu funcționează fără un serviciu extern**, deoarece:

- GitHub Pages este un hosting static
- nu oferă backend
- nu poate gestiona OAuth
- Decap CMS are nevoie de un OAuth handler
- Netlify sau Cloudflare Worker devin intermediari obligatorii

Aceasta NU este:
- o eroare de configurare
- o greșeală de implementare
- o problemă locală

Este o **limitare structurală a platformei**.

---

## Concluzia logică

Pentru ca acest site să poată fi:
- editat de oriunde
- recuperat oricând
- menținut chiar dacă servicii externe dispar
- transmis mai departe fără blocaje

**GitHub devine sursa adevărului.**

CMS-ul este un bonus.
Nu este o dependență critică.

---

# REGULA DE AUR

Dacă CMS-ul funcționează → îl folosim.  
Dacă CMS-ul dispare → site-ul rămâne editabil 100% din GitHub.  

Conținutul NU trebuie să depindă de un singur furnizor.

---

## Cum se editează conținutul DIRECT din GitHub (metoda eternă)

Aceasta este metoda care funcționează întotdeauna, din orice browser, fără instalări.

---

### Articole de blog

- locație: `src/content/blog/`
- format: `.md` (Markdown)
- fiecare fișier = un articol

Exemplu:

---
title: "Titlu articol"
description: "Descriere scurtă"
pubDate: "2025-12-24"
tags: ["muzică", "jurnal"]
image: "/uploads/imagine.jpg"
---

Textul articolului începe aici.

După salvare:
- GitHub declanșează automat rebuild-ul
- articolul apare pe site în câteva secunde

---

### Fotografii (Galerie foto)

- locație conținut: `src/content/photos/`
- format: `.json`
- imaginile propriu-zise: `public/uploads/`

Fotografiile sunt fișiere `.json` deoarece sunt tratate ca **date**, nu ca articole.

Exemplu:

{
  "title": "Pianul de sub stele",
  "image": "/uploads/pian-sub-stele.jpg",
  "description": "Concert în aer liber",
  "date": "2025-12-24",
  "category": "Concert"
}

---

### Video (YouTube)

- locație: `src/content/videos/`
- format: `.json`
- se folosește **YouTube ID**, nu linkul complet

Exemplu:
https://www.youtube.com/watch?v=LhhbajLkb4U

YouTube ID:
LhhbajLkb4U

---

### Muzică

- locație: `src/content/music/`
- format: `.json`
- fișiere audio recomandate: MP3
- fișiere WAV sunt posibile, dar mari

Exemplu:

{
  "title": "Ultimul Vals",
  "artist": "Aurelian Epuraș",
  "album": "A13",
  "audioUrl": "/uploads/ultimul-vals.mp3",
  "coverArt": "/uploads/ultimul-vals.jpeg",
  "duration": "5:20",
  "year": 2023
}

---

## Scară de dificultate

### Editare direct din GitHub
Dificultate: UȘOR – MEDIU

- funcționează din orice browser
- nu depinde de servicii externe
- ideal pentru continuitate și arhivare
- necesită atenție la structură

### Editare prin Admin (Decap CMS)
Dificultate: FOARTE UȘOR (când funcționează)

- interfață vizuală
- rapid și comod
- depinde de OAuth și servicii externe

---

## De ce această abordare este „pentru eternitate”

Pentru că:
- conținutul este stocat în fișiere simple
- fișierele sunt versionate
- pot fi citite peste 10, 20 sau 50 de ani
- nu există vendor lock-in
- orice browser este suficient

Dacă într-o zi:
- CMS-ul nu mai funcționează
- un serviciu dispare
- calculatorul personal nu mai există

Site-ul rămâne.
Conținutul rămâne.

---

## Notă personală (manifest)

Acest site nu a fost construit pentru confort maxim.
A fost construit pentru adevăr, memorie și continuitate.

Tehnologiile vin și pleacă.
Platformele se schimbă.
Conținutul rămâne.

Dacă cineva ajunge aici și evită măcar o frustrare,
atunci acest repository și-a îndeplinit scopul.

© Aurelian Epuraș
