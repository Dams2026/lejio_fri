#!/usr/bin/env python3
import subprocess
import json
import pyodbc

# Get Azure AD token
print("🔑 Getting Azure AD token...")
result = subprocess.run(
    ["az", "account", "get-access-token", "--resource", "https://database.windows.net"],
    capture_output=True,
    text=True
)

if result.returncode != 0:
    print(f"❌ Failed to get token: {result.stderr}")
    exit(1)

token = json.loads(result.stdout)["accessToken"]
print("✅ Token received")

# Connect to master database as admin to create login
print("🔌 Connecting to master database...")

server = "autofiq-db.database.windows.net"
database = "master"
user = "martin_autofiq_admin"
password = "TestPassword123!"

try:
    # Connect as admin to master DB
    conn_str = f"Driver={{ODBC Driver 17 for SQL Server}};Server={server};Database={database};UID={user};PWD={password};Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30"
    conn = pyodbc.connect(conn_str)
    cursor = conn.cursor()
    
    print("✅ Connected to master database")
    
    # Create login
    print("👤 Creating login martin_autofiq_user...")
    try:
        cursor.execute("CREATE LOGIN martin_autofiq_user WITH PASSWORD = 'Temp123456789!'")
        conn.commit()
        print("✅ Login created")
    except pyodbc.Error as e:
        if "already exists" in str(e):
            print("⚠️  Login already exists (skipping)")
        else:
            raise
    
    # Close master connection
    cursor.close()
    conn.close()
    
    # Connect to autofiq database to create user
    print("🔌 Connecting to autofiq database...")
    database = "autofiq"
    conn_str = f"Driver={{ODBC Driver 17 for SQL Server}};Server={server};Database={database};UID={user};PWD={password};Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30"
    conn = pyodbc.connect(conn_str)
    cursor = conn.cursor()
    
    print("✅ Connected to autofiq database")
    
    # Create user
    print("👤 Creating database user...")
    try:
        cursor.execute("CREATE USER martin_autofiq_user FOR LOGIN martin_autofiq_user")
        conn.commit()
        print("✅ User created")
    except pyodbc.Error as e:
        if "already exists" in str(e):
            print("⚠️  User already exists (skipping)")
        else:
            raise
    
    # Grant roles
    print("🔐 Granting permissions...")
    cursor.execute("ALTER ROLE db_datareader ADD MEMBER martin_autofiq_user")
    cursor.execute("ALTER ROLE db_datawriter ADD MEMBER martin_autofiq_user")
    conn.commit()
    print("✅ Permissions granted (db_datareader + db_datawriter)")
    
    cursor.close()
    conn.close()
    
    print("\n✅ SQL User Setup Complete!")
    print("📋 Summary:")
    print(f"  Server: {server}")
    print(f"  Database: autofiq")
    print(f"  Username: martin_autofiq_user")
    print(f"  Password: Temp123456789!")
    print(f"  Roles: db_datareader, db_datawriter")
    
except pyodbc.Error as e:
    print(f"❌ Database error: {e}")
    exit(1)
except Exception as e:
    print(f"❌ Error: {e}")
    exit(1)
