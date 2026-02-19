# Simply.com migration guide (AUTOFIQ)

Denne guide flytter appen fra Azure/Render-setup til et Simply.com miljø (VPS eller Node-kompatibelt hostingmiljø med SSH adgang).

## 1) Forudsætninger

- Simply.com miljø med SSH adgang.
- Node.js 20+ installeret.
- Adgang til samme database (Supabase/Postgres/Azure SQL), eller en ny database med migreret data.
- DNS-adgang til dit domæne/subdomæne.

## 2) Upload kode

```bash
git clone <repo-url> autofiq
cd autofiq
npm ci
```

## 3) Environment variables

Opret en produktions `.env` på Simply.com baseret på eksisterende env-filer i repoet:

- `.env.simply.example`
- `.env.example.fri`
- `.env.database`
- `.env.sentry.example`

Vigtige variabler:

- `NODE_ENV=production`
- `PORT` (hvis platformen kræver en bestemt port)
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_KEY`
- DB connection strings (`DATABASE_URL` eller tilsvarende)
- evt. Stripe/Sentry nøgler

## 4) Build og opstart

```bash
npm run build:simply
npm run start:simply
```

`start:simply` bruger `simply-start.sh`, som:
- installerer dependencies hvis de mangler
- bygger frontend hvis `dist/` mangler
- starter API/server via `node api/server.js`

## 5) Reverse proxy (Nginx eksempel)

Proxy trafik til app-porten (fx 3000):

```nginx
server {
  listen 80;
  server_name app.ditdomaene.dk;

  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}
```

## 6) Process manager (PM2 anbefalet)

```bash
npm i -g pm2
pm2 start simply-start.sh --name autofiq --interpreter bash
pm2 save
pm2 startup
```

## 7) Data migration checkliste

1. Tag fuld backup af nuværende database.
2. Kør schema-migrationer i målmiljø.
3. Verificér kerne-tabeller (brugere, bookings, invoices, payments).
4. Verificér auth/session flows mod Supabase.
5. Test kritiske endpoints:
   - `/api/health`
   - `/api/get-payment-history?lessor_id=<id>`
   - `/api/auth-session`

## 8) Go-live checkliste

- [ ] HTTPS aktiv via Let's Encrypt eller Simply certifikat.
- [ ] DNS peger på nyt miljø.
- [ ] CORS tillader nyt domæne.
- [ ] Sentry/monitorering aktiv.
- [ ] Logrotation sat op.
- [ ] Rollback-plan klar (DNS rollback + DB snapshot).

---

Hvis du vil, kan næste skridt være at jeg også laver en **konkret flytteplan med præcis din Simply.com løsning** (Webhotel vs VPS), så vi undgår nedetid ved cutover.
