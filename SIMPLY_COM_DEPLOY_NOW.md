# Simply.com go-live runbook (klar til nu)

Denne runbook er den konkrete “gør det hele”-sekvens til flytning til Simply.com.

## 0) Forbered lokalt

1. Kopiér env-template:
```bash
cp .env.simply.example .env.simply
```
2. Udfyld alle hemmelige nøgler i `.env.simply`.

## 0.5) Nemmeste deploy (interaktiv)

Kør én kommando og svar på spørgsmålene:

```bash
npm run simply:deploy:interactive
```

Den bruger default værdier for jeres setup (`linux189.unoeuro.com`, `autofiq.dk`) og kalder det eksisterende deploy-script.

## 1) Kør preflight lokalt

```bash
npm run simply:preflight
```

Hvis denne fejler, deployes der ikke.

## 2) Sæt deploy-variabler

```bash
export SIMPLY_HOST="din-server-hostname"
export SIMPLY_USER="dit-ssh-brugernavn"
export SIMPLY_APP_DIR="/home/<user>/apps/autofiq"
export SIMPLY_SSH_PORT="22"  # valgfri, default 22
export ENV_FILE=".env.simply"
```

## 2.1) Lav en ZIP-pakke (hvis du vil uploade manuelt)

```bash
bash scripts/create-simply-zip.sh
```

Scriptet skriver stien til den genererede ZIP i `build-artifacts/`.

## 3) Deploy

```bash
npm run simply:deploy
```

## 3.1) (Valgfrit) Kør deploy direkte uden npm wrapper

```bash
ENV_FILE=.env.simply bash scripts/simply-deploy.sh
```

Scriptet gør automatisk:
- preflight
- pakker release
- uploader kode + env
- installerer dependencies
- bygger app
- starter via PM2 (eller fallback `nohup`)

## 4) Verificér efter deploy

Kør fra din lokale maskine (erstat domæne):

```bash
curl -f https://app.ditdomaene.dk/api/health
curl -f "https://app.ditdomaene.dk/api/get-payment-history?lessor_id=<LESSOR_ID>"
```

## 5) DNS cutover

Når smoke tests er grønne:
- opdater DNS til Simply IP
- verificér HTTPS certifikat
- test login, bookings, faktura, betaling

## 6) Rollback (hurtig)

Hvis kritisk fejl opstår:
1. Peg DNS tilbage til gammel host
2. Gendan DB snapshot hvis nødvendigt
3. Bekræft at gamle endpoints svarer igen

---

## Bemærk
- Scriptet kræver SSH-adgang til Simply.com server/VPS.
- Hvis I kører klassisk webhotel uden Node/SSH, skal arkitekturen ændres (fx separat app-host + DB).
