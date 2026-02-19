import mssql from 'mssql';

const config = {
  server: 'sql-vqiibdafjcmnc-dev.database.windows.net',
  database: 'autofiq',
  user: 'sqladmin',
  password: 'SqlAdmin@2026!AUTOFIQSecure456',
  port: 1433,
  options: {
    encrypt: true,
    trustServerCertificate: false,
    connectionTimeout: 30000,
    requestTimeout: 30000
  }
};

async function testAdminConnection() {
  try {
    console.log('🔌 Testing ADMIN database connection...');
    const pool = new mssql.ConnectionPool(config);
    
    await pool.connect();
    console.log('✅ ADMIN Connection successful!');
    
    const result = await pool.request().query('SELECT @@version as version');
    console.log('✅ Query executed - SQL Server connected!');
    console.log('   Version:', result.recordset[0].version.substring(0, 50));
    
    await pool.close();
    console.log('✅ Connection closed');
    process.exit(0);
    
  } catch (err) {
    console.error('❌ ADMIN Connection failed:', err.message);
    process.exit(1);
  }
}

testAdminConnection();
