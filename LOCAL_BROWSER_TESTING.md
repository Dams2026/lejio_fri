# Lokal test (nemmeste måde)

## Windows – gør kun dette
1. Installer Node.js LTS: https://nodejs.org/en/download
2. Dobbeltklik på `start-local-browser.bat` i projektmappen
3. Åbn: http://localhost:4173

Det er alt.

---

## Hvis du hellere vil bruge PowerShell
```powershell
cd "C:\Users\<dit-navn>\Downloads\autofiq"
node -v
npm -v
npm install
npm run local:start:win
```

## Typiske fejl
- `npm is not recognized` → Node.js er ikke installeret korrekt (installer igen og genstart terminal).
- `Cannot find path ...` → du står i forkert mappe; gå til mappen hvor `package.json` ligger.
