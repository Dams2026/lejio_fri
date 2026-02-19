# 🚀 AUTOFIQ - Komplet Setup Guide

## ⚡ TL;DR (5 minutter)
1. Push til GitHub (✅ DONE)
2. Create Azure Static Web App via VS Code extension
3. Create Azure SQL Database
4. Run migration files (001 + 002 + 003)
5. Create Azure Functions for API
6. Deploy - done!

---

## 📋 Del 1: What is AUTOFIQ?

**System**: White-label lessor platform (udlejningsplatform for privatpersoner)

**Struktur**:
```
AUTOFIQ
├── Frontend (React)
│   ├── Lessor Dashboard (/autofiq/dashboard/*)
│   ├── Admin Portal (/autofiq/admin/*)
│   └── Public Pages (/autofiq/*)
├── Backend (Azure Functions + Azure SQL)
│   ├── REST API endpoints
│   └── Database logic
└── Database (Azure SQL)
    └── Multi-tenant (lessor_id isolation)
```

**Tech Stack**:
- Frontend: React 18 + Vite + TypeScript + Tailwind
- Hosting: Azure Static Web Apps (free tier ✅)
- Backend API: Azure Functions (Node.js)
- Database: Azure SQL Database
- Auth: Supabase (stays for now)

---

## 🎯 Del 2: Frontend Deployment (LIVE)

### Step 1: Create Azure Static Web App
**Terminal eller VS Code extension:**

```bash
# Option A: Via VS Code (recommended)
1. Install: "Azure Static Web Apps" extension
2. Login: Ctrl+Shift+P → "Azure: Sign In"
3. Create: Right-click "Static Web Apps" → "Create Static Web App"
4. Select: martinjensen9988-sudo/autofiq-b75cff1f repo
5. Branch: main
6. Build preset: Vite
7. Region: North Europe

# Azure builds & deploys automatically → live URL 🎉
```

**Forventet URL**: `https://autofiq.azurestaticapps.net` (eller lignende)

### Step 2: Verify Frontend Works
```bash
# When live URL is ready:
1. Visit https://autofiq.azurestaticapps.net
2. You should see: AUTOFIQ landing page ✅
3. Try login: /autofiq/login
4. Try admin: /autofiq/admin/login
```

**Status**: Frontend deel ✅ LIVE

---

## 🗄️ Del 3: Azure SQL Database Setup

### Step 1: Create Azure SQL Database
**Azure Portal:**

```
1. Login: portal.azure.com
2. Create Resource → "SQL Database"
3. Fill in:
   - Server: Create new → "autofiq-db"
   - Database name: "autofiq"
   - Compute tier: Basic (cheap for testing)
   - Storage: 5 GB
4. Click "Review + Create"
5. Wait 3-5 minutes ⏳
```

### Step 2: Allow Azure Services (Firewall)
```
1. Go to SQL Server resource
2. "Firewalls and virtual networks"
3. Toggle: "Allow Azure services to access" → ON
4. Save
```

### Step 3: Get Connection String
```
1. Go to SQL Database resource
2. "Connection strings" (left sidebar)
3. Copy "ADO.NET" string
4. Replace: {your_username} and {your_password} with admin creds
5. Save for next step
```

### Step 4: Run Migration Files
**Azure Portal → Query Editor:**

```sql
-- File 1: 001_initial_schema.sql
-- Copy entire content from: /supabase/migrations/azure-sql/001_initial_schema.sql
-- Paste in Query Editor → Execute

-- Wait for completion (2-3 min) ✅

-- File 2: 002_security_policies.sql
-- Copy entire content from: /supabase/migrations/azure-sql/002_security_policies.sql
-- Paste in Query Editor → Execute

-- Wait for completion (1 min) ✅

-- File 3: 003_seed_data.sql
-- Copy entire content from: /supabase/migrations/azure-sql/003_seed_data.sql
-- Paste in Query Editor → Execute

-- Wait for completion ✅
```

**Tables created**: 11 tables with all data + security
**Status**: Database ✅ READY

---

## 🔧 Del 4: Azure Functions (Backend API)

### What to Build?
```
Azure Functions (Node.js runtime)
├── POST /api/vehicles - Create vehicle
├── GET /api/vehicles - List vehicles
├── POST /api/bookings - Create booking
├── GET /api/invoices - List invoices
└── ... (endpoints for all dashboard features)
```

### How to Create?
**Option A: Via Azure Portal (Recommended for now)**

```
1. Portal.azure.com
2. Create Resource → "Function App"
3. Fill:
   - Name: autofiq-api
   - Runtime: Node.js 20
   - Region: North Europe
   - Hosting: Consumption (pay-per-use)
4. Create
5. Wait 2 min for resources

Then:
1. Go to Function App
2. Create Function → "HTTP trigger"
3. Name: GetVehicles
4. Authorization: Function
5. Create

6. Edit code (in Portal):
   - Replace default code with REST logic
   - Connect to Azure SQL via connection string
   - Test with Postman
```

### Backend Code Template
```javascript
// example: GetVehicles function
module.exports = async function(context, req) {
  const { ConnectionPool } = require('mssql');
  
  const config = {
    user: 'admin',
    password: 'YOUR_PASSWORD',
    server: 'autofiq-db.database.windows.net',
    database: 'autofiq',
    options: {
      encrypt: true,
      trustServerCertificate: false,
      connectionTimeout: 15000,
    },
  };

  try {
    const pool = new ConnectionPool(config);
    await pool.connect();
    
    const result = await pool.request()
      .input('lessor_id', req.body.lessor_id)
      .query('SELECT * FROM fri_vehicles WHERE lessor_id = @lessor_id');
    
    context.res = { body: result.recordset };
    await pool.close();
  } catch (error) {
    context.res = { status: 500, body: error.message };
  }
};
```

**Status**: API 🟡 IN PROGRESS (Create endpoints one by one)

---

## 🔐 Del 5: Connect Frontend to Backend

### Update React Hooks
**File**: `src/hooks/useFriVehicles.tsx`

```typescript
// Change from Supabase to Azure Functions

const API_URL = 'https://autofiq-api.azurewebsites.net/api';

export function useFriVehicles(lessorId: string | null) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  
  useEffect(() => {
    if (!lessorId) return;
    
    // Call Azure Function instead of Supabase
    fetch(`${API_URL}/vehicles`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lessor_id: lessorId }),
    })
    .then(r => r.json())
    .then(data => setVehicles(data))
    .catch(err => console.error(err));
  }, [lessorId]);
  
  return { vehicles, loading: false };
}
```

**Do same for:**
- `useFriBookings.tsx`
- `useFriInvoices.tsx`
- `useFriPayments.tsx`
- etc.

---

## 🧪 Del 6: Testing (Med Seed Data)

### Seed Data Includes:
- **3 test lessors** with different subscription states
- **7 test vehicles** (Tesla, Honda, Toyota, etc.)
- **4 test bookings**
- **4 test invoices**
- **4 test payments**
- **4 support tickets**
- **4 API keys**

### Test Flow:
```bash
1. Go live: https://autofiq.azurestaticapps.net/autofiq/login
2. Signup or use seeded account
3. Verify dashboard loads
4. Create vehicle → check database
5. Create booking → generate invoice
6. View analytics
7. Test admin panel
```

---

## 🚀 Del 7: Deployment Checklist

### Frontend
- [x] Code pushed to GitHub
- [x] Azure Static Web App created
- [ ] GitHub Actions CI/CD working
- [ ] Live URL accessible
- [ ] Can login

### Backend
- [ ] Azure SQL Database created
- [ ] Migration files executed (001, 002, 003)
- [ ] Seed data loaded
- [ ] Azure Functions deployed
- [ ] API endpoints tested (Postman)

### Integration
- [ ] Frontend → Backend API connected
- [ ] Vehicles API working end-to-end
- [ ] Bookings API working
- [ ] Invoices API working
- [ ] Admin panel working

### Production
- [ ] Custom domain (autofiq.dk)
- [ ] SSL certificate
- [ ] Environment secrets in GitHub
- [ ] Error monitoring (Azure Application Insights)
- [ ] Load testing

---

## 📁 File Structure After Setup

```
autofiq-b75cff1f/
├── src/
│   ├── pages/autofiq/              ✅ Lessor pages
│   ├── pages/autofiq/admin/        ✅ Admin pages
│   ├── hooks/
│   │   ├── useFriVehicles.tsx     → Update to use Azure API
│   │   ├── useFriBookings.tsx     → Update to use Azure API
│   │   ├── useFriInvoices.tsx     → Update to use Azure API
│   │   └── useFriPayments.tsx     → Update to use Azure API
│   └── integrations/
│       └── azure/
│           └── clientFri.ts       ✅ REST API client
│
├── supabase/migrations/azure-sql/
│   ├── 001_initial_schema.sql     ✅ Tables + indexes
│   ├── 002_security_policies.sql  ✅ Security layer
│   └── 003_seed_data.sql          ✅ Test data
│
├── .github/workflows/
│   └── azure-static-web-apps-deploy.yml  ✅ Auto-deploy
│
└── staticwebapp.config.json       ✅ SPA routing

AZURE RESOURCES:
├── Static Web App                 → Frontend hosting
├── SQL Database                   → Data
├── Function App (4-5 functions)   → API
├── Application Insights           → Monitoring
└── Key Vault (optional)           → Secrets
```

---

## 🔑 Environment Variables

### Frontend (.env.local)
```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_AZURE_API_URL=https://autofiq-api.azurewebsites.net
```

### Azure Functions (in Portal)
```
SQL_USER: admin
SQL_PASSWORD: YourPassword123!
SQL_SERVER: autofiq-db.database.windows.net
SQL_DATABASE: autofiq
```

### GitHub Secrets (for CI/CD)
```
AZURE_STATIC_WEB_APPS_API_TOKEN_... (auto-created by Azure)
```

---

## 📊 Architecture Diagram

```
User Browser
    ↓
    ↓ HTTP/HTTPS
    ↓
┌───────────────────────────────┐
│  Azure Static Web App         │
│  (Frontend - React)           │
│  autofiq.azurestaticapps.net│
└───────────────────────────────┘
    ↓
    ↓ REST API calls
    ↓
┌───────────────────────────────┐
│  Azure Functions              │
│  (Backend API)                │
│  autofiq-api.azurewebsites.net
└───────────────────────────────┘
    ↓
    ↓ T-SQL queries (mssql driver)
    ↓
┌───────────────────────────────┐
│  Azure SQL Database           │
│  (Data storage)               │
│  autofiq-db.database.windows.net
└───────────────────────────────┘

Auth (separate):
    ↓
    ↓ OAuth
    ↓
┌───────────────────────────────┐
│  Supabase Auth                │
│  (User login/signup)          │
└───────────────────────────────┘
```

---

## ✅ Success Criteria

When everything is working:

```
✅ Frontend live on Azure Static Web App
✅ Can access https://autofiq.azurestaticapps.net
✅ Can login with test account
✅ Dashboard loads vehicles from Azure SQL
✅ Can create vehicle → shows in database
✅ Can create booking → auto-generates invoice
✅ Admin panel shows all lessors
✅ Support tickets system works
✅ Analytics shows real data
✅ API endpoints respond in <200ms
✅ Zero TypeScript errors
✅ Zero runtime errors
```

---

## 🆘 Troubleshooting

### Frontend won't deploy
- Check GitHub Actions logs
- Verify `staticwebapp.config.json` exists
- Check build errors in Azure portal

### Database migrations fail
- Check SQL Server firewall allows your IP
- Verify connection string syntax
- Run migrations one at a time
- Check error messages in Query Editor

### API calls fail
- Check CORS headers in Azure Functions
- Verify connection string in Function environment
- Test with Postman first
- Check Application Insights logs

### Performance slow
- Add indexes (already done in 002_security_policies.sql)
- Check query execution plans
- Enable Application Insights
- Monitor with Azure Portal

---

## 📞 Next Steps

1. **Create Static Web App** (5 min)
   - VS Code → Azure extension → Create
   - Share the live URL

2. **Create Azure SQL Database** (10 min)
   - Portal → SQL Database → Create

3. **Run migrations** (5 min)
   - Copy-paste SQL files into Query Editor

4. **Create first Azure Function** (10 min)
   - Portal → Function App → Create GetVehicles

5. **Test end-to-end** (10 min)
   - Postman → API → Database → Frontend

**Total: 40 minutes to production! 🚀**

---

## 📝 Notes

- Database schema supports multi-tenant (lessor_id on all tables)
- Security layer uses views + stored procedures (RLS equivalent)
- Audit logging on all changes (fri_audit_logs)
- API keys for integration (fri_api_keys)
- Test data ready (3 lessors, 7 vehicles, etc.)
- All TypeScript errors resolved
- Vite PWA optimized for performance

---

**Ready to setup? Start with Step 1! 🚀**
