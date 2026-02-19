import mssql from 'mssql';

const config = {
  server: 'sql-vqiibdafjcmnc-dev.database.windows.net',
  database: 'autofiq',
  user: 'sqladmin',
  password: 'Dit40102010?',
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
    console.log('🔌 Testing connection with password: Dit40102010?');
    const pool = new mssql.ConnectionPool(config);
    
    await pool.connect();
    console.log('✅ CONNECTION SUCCESSFUL!');
    
    const result = await pool.request().query('SELECT @@version as version');
    console.log('✅ Database is accessible!');
    console.log('   SQL Server Version:', result.recordset[0].version.substring(0, 60));
    
    await pool.close();
    process.exit(0);
    
  } catch (err) {
    console.error('❌ Connection failed:', err.message);
    process.exit(1);
  }
}

testAdminConnection();
