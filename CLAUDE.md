# Tamaszték Web Agent

Te vagy a web-agent. A `tamasztek-web/` mappából futsz.
Ez a projekt a **publikus weboldal** – bárki eléri, nincs bejelentkezés.

## Tech stack

- **Framework:** React 18+
- **Build tool:** Vite
- **Package manager:** pnpm
- **Nyelv:** TypeScript (preferált) vagy JavaScript

## Projekt inicializálás (ha még nem létezik)

```bash
pnpm create vite tamasztek-web --template react-ts
cd tamasztek-web
pnpm install
```

## Hasznos parancsok

```bash
pnpm dev          # lokális dev szerver (alapból: http://localhost:5173)
pnpm build        # production build → dist/ mappába
pnpm preview      # build előnézet lokálisan
pnpm lint         # kód ellenőrzés
```

## Környezeti változók

A `.env` fájlokat **sosem commitolod**. A sablonfájlt igen:

```
# .env.example – ezt commitolod
VITE_API_BASE_URL=http://localhost:8080/api
```

```
# .env.development – lokális fejlesztéshez, NEM kerül repóba
VITE_API_BASE_URL=http://localhost:8080/api
```

```
# .env.production – a VM-en van, NEM kerül repóba
VITE_API_BASE_URL=https://api.tamasztek.dev.huncoder.hu/api
```

A Vite csak a `VITE_` prefixű változókat adja át a böngészőnek.

## API hívások

Mielőtt bármilyen API hívást írsz, olvasd el a `../docs/api-contract.md` fájlt.
Az API base URL mindig a `VITE_API_BASE_URL` env változóból jön, soha nem hardcodeolva.

## Mappastruktúra konvenció

```
tamasztek-web/
├── public/               ← statikus fájlok (favicon, képek)
├── src/
│   ├── assets/           ← képek, fontok, amiket Vite feldolgoz
│   ├── components/       ← újrahasználható UI komponensek
│   │   └── ui/           ← alap UI elemek (gomb, kártya, stb.)
│   ├── pages/            ← oldalak (route-onként 1 fájl)
│   ├── hooks/            ← custom React hook-ok
│   ├── services/         ← API hívások (fetch/axios)
│   ├── types/            ← TypeScript típusok
│   ├── utils/            ← segédfüggvények
│   ├── App.tsx
│   └── main.tsx
├── .env.example
├── index.html
├── vite.config.ts
└── package.json
```

## Docker build

A production build Docker konténerben fut. A Dockerfile az nginx-et használja a `dist/` mappa kiszolgálásához:

```dockerfile
# Dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
```

```nginx
# nginx.conf (SPA routing miatt szükséges)
server {
    listen 80;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## Design elvek

- Mesés, illusztrált stílus – összhangban a projekt arculatával
- Reszponzív: mobile-first megközelítés
- Akadálymentesség: szemantikus HTML elemek használata

## Amit SOHA nem csinálsz

- Nem módosítasz fájlokat a `../tamasztek-connect/` vagy `../tamasztek-admintool/` mappákban
- Nem commitolsz `.env` fájlt (csak `.env.example`-t)
- Nem hardcodeolsz URL-t, portot vagy titkos értéket a kódba
- Nem git push-olsz – az orchestrator feladata
