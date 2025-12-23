# Configurare Admin Panel Decap CMS

## Acces la Admin Panel

Pentru a accesa panoul admin Decap CMS, urmează acești pași:

### 1. Rulează serverul de dezvoltare

În primul terminal:
```bash
npm run dev
```

### 2. Rulează Decap Server (pentru backend local)

În al doilea terminal (în paralel cu serverul Astro):
```bash
npm run dev:cms
```

Acest server proxy este necesar pentru ca Decap CMS să poată scrie fișiere local în timpul dezvoltării.

### 3. Accesează Admin Panel

După ce ambele servere rulează, deschide în browser:
```
http://localhost:4321/admin/
```

**Important:** Asigură-te că URL-ul se termină cu `/` (slash final).

## Rezolvarea Problemelor

### Problema: 404 Not Found la /admin/

**Soluții:**

1. **Verifică că fișierele există:**
   - `public/admin/index.html` trebuie să existe
   - `public/admin/config.yml` trebuie să existe

2. **Asigură-te că ambele servere rulează:**
   - Serverul Astro pe portul 4321
   - Decap Server pe portul 8081 (implicit)

3. **Încearcă variante de URL:**
   - `http://localhost:4321/admin/` (cu slash final)
   - `http://localhost:4321/admin/index.html`

4. **Restart complet:**
   ```bash
   # Oprește ambele servere (Ctrl+C)
   # Șterge cache-ul
   rm -rf node_modules/.vite
   # Repornește
   npm run dev          # Terminal 1
   npm run dev:cms      # Terminal 2
   ```

5. **Verifică că nu există rute conflictuale:**
   - Nu trebuie să existe `src/pages/admin.astro`
   - Astro servește automat fișierele din `public/` la root

### Problema: "Error loading config.yml"

Asigură-te că Decap Server rulează:
```bash
npm run dev:cms
```

Verifică că în `public/admin/config.yml` ai setat:
```yaml
local_backend: true
```

## Structura Proiectului

```
public/
  admin/
    index.html      # Interfața Decap CMS
    config.yml      # Configurarea CMS-ului

src/
  content/
    blog/          # Articole blog (Markdown)
    photos/        # Date fotografii (JSON)
    videos/        # Date video (JSON)
    music/         # Date muzică (JSON)
```

## Colecții Configurate

1. **Blog** - Articole în format Markdown
2. **Foto** - Imagini cu metadate în format JSON
3. **Video** - Video-uri YouTube cu metadate
4. **Muzică** - Piese audio cu metadate

## Notă

După ce salvezi modificări în CMS, fișierele vor fi actualizate direct în directoarele corespunzătoare din `src/content/`.
