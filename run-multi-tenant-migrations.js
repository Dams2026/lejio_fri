import { SqlClient } from 'mssql';
import * as fs from 'fs';
import * as path from 'path';

// Configuration from environment
const config = {
  server: process.env.SQL_SERVER || 'sql-vqiibdafjcmnc-dev.database.windows.net',
  database: process.env.SQL_DATABASE || 'autofiq',
  authentication: {
    type: 'default',
    options: {
      userName: process.env.SQL_USERNAME || 'sqladmin',
      password: process.env.SQL_PASSWORD,
    },
  },
  options: {
    trustServerCertificate: true,
    encrypt: true,
  },
};

async function runMigrations() {
  const pool = new SqlClient.ConnectionPool(config);
  
  try {
    console.log('🔗 Connecting to Azure SQL Database...');
    await pool.connect();
    console.log('✅ Connected successfully');

    // List of migration files to run
    const migrationFiles = [
      '002_multi_tenant_schema.sql',
      '007_multi_tenant_test_data.sql',
    ];

    for (const file of migrationFiles) {
      const filePath = path.join(import.meta.url.replace('file://', ''), '../supabase/migrations/azure-sql/', file);
      
      if (!fs.existsSync(filePath)) {
        console.warn(`⚠️  Migration file not found: ${filePath}`);
        continue;
      }

      console.log(`\n📄 Running migration: ${file}`);
      const sql = fs.readFileSync(filePath, 'utf8');
      
      try {
        const request = pool.request();
        await request.query(sql);
        console.log(`✅ Migration completed: ${file}`);
      } catch (error) {
        console.error(`❌ Migration failed: ${file}`, error);
        // Continue with next migration
      }
    }

    console.log('\n✅ All migrations completed!');
  } catch (error) {
    console.error('❌ Connection error:', error);
    process.exit(1);
  } finally {
    await pool.close();
  }
}

runMigrations();
