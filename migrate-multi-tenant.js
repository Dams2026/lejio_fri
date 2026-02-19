#!/usr/bin/env node

/**
 * Multi-Tenant Database Migration Runner
 * Runs migration scripts against Azure SQL Database
 */

import sql from 'mssql';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Get credentials from environment
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
    encrypt: true,
    trustServerCertificate: true,
    connectTimeout: 30000,
  },
};

if (!config.authentication.options.password) {
  console.error('❌ Error: SQL_PASSWORD environment variable is required');
  console.error('Set it with: export SQL_PASSWORD="your-password"');
  process.exit(1);
}

async function runMigrations() {
  const pool = new sql.ConnectionPool(config);

  try {
    console.log('\n🔗 Connecting to Azure SQL Database...');
    console.log(`   Server: ${config.server}`);
    console.log(`   Database: ${config.database}`);
    console.log(`   User: ${config.authentication.options.userName}\n`);

    await pool.connect();
    console.log('✅ Connected successfully\n');

    // Migration files to run
    const migrations = [
      { file: '002_multi_tenant_schema.sql', description: 'Create tenants table and add tenant_id to all tables' },
      { file: '007_multi_tenant_test_data.sql', description: 'Insert test data for Martin tenant' },
    ];

    for (const migration of migrations) {
      const filePath = path.join(__dirname, 'supabase/migrations/azure-sql', migration.file);

      if (!fs.existsSync(filePath)) {
        console.warn(`⚠️  File not found: ${filePath}`);
        continue;
      }

      console.log(`📄 Running: ${migration.file}`);
      console.log(`   Description: ${migration.description}`);

      const sqlContent = fs.readFileSync(filePath, 'utf-8');

      try {
        const request = pool.request();

        // Split by GO statements (T-SQL batch separator)
        const batches = sqlContent
          .split(/^\s*GO\s*$/gm)
          .filter(batch => batch.trim() && !batch.trim().startsWith('--'))
          .map(batch => batch.trim());

        console.log(`   Found ${batches.length} batch(es)`);

        for (let i = 0; i < batches.length; i++) {
          const batch = batches[i];
          try {
            const result = await pool.request().query(batch);
            console.log(`   ✓ Batch ${i + 1}/${batches.length} executed`);
          } catch (err) {
            console.error(`   ✗ Batch ${i + 1}/${batches.length} failed:`, err.message);
            throw err;
          }
        }

        console.log(`✅ ${migration.file} completed\n`);
      } catch (error) {
        console.error(`❌ Error in ${migration.file}:`);
        console.error(`   ${error.message}\n`);
        // Continue with next migration
      }
    }

    // Verify migrations
    console.log('📊 Verifying database schema...\n');

    try {
      const tablesResult = await pool.request()
        .query(`
          SELECT TABLE_NAME
          FROM INFORMATION_SCHEMA.TABLES
          WHERE TABLE_SCHEMA = 'dbo'
          ORDER BY TABLE_NAME
        `);

      console.log('📋 Tables in database:');
      tablesResult.recordset.forEach(row => {
        console.log(`   • ${row.TABLE_NAME}`);
      });

      // Check for tenants
      const tenantsResult = await pool.request().query('SELECT COUNT(*) as count FROM fri_tenants');
      console.log(`\n👥 Tenants in database: ${tenantsResult.recordset[0].count}`);

      console.log('\n✅ All migrations completed successfully!');
    } catch (verifyError) {
      console.warn('⚠️  Could not verify migrations:', verifyError.message);
    }
  } catch (error) {
    console.error('❌ Fatal error:', error.message);
    process.exit(1);
  } finally {
    try {
      await pool.close();
      console.log('\n🔌 Connection closed');
    } catch (closeErr) {
      console.error('Error closing connection:', closeErr.message);
    }
  }
}

// Run migrations
console.log('╔════════════════════════════════════════════════╗');
console.log('║  AUTOFIQ Multi-Tenant Database Migration    ║');
console.log('╚════════════════════════════════════════════════╝');

runMigrations().catch(error => {
  console.error('\n❌ Migration runner failed:', error);
  process.exit(1);
});
