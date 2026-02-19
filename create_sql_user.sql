-- Create SQL login at server level (master database)
USE master;

IF NOT EXISTS (SELECT * FROM sys.server_principals WHERE name = 'martin_autofiq_user')
BEGIN
    CREATE LOGIN martin_autofiq_user WITH PASSWORD = 'TestPassword123!';
    PRINT 'Login martin_autofiq_user created in master database';
END
ELSE
BEGIN
    PRINT 'Login martin_autofiq_user already exists';
END

GO

-- Create database user and grant permissions (autofiq database)
USE autofiq;

IF NOT EXISTS (SELECT * FROM sys.database_principals WHERE name = 'martin_autofiq_user' AND type = 'U')
BEGIN
    CREATE USER martin_autofiq_user FOR LOGIN martin_autofiq_user;
    ALTER ROLE db_datareader ADD MEMBER martin_autofiq_user;
    ALTER ROLE db_datawriter ADD MEMBER martin_autofiq_user;
    PRINT 'Database user martin_autofiq_user created with read/write permissions in autofiq';
END
ELSE
BEGIN
    PRINT 'Database user martin_autofiq_user already exists in autofiq';
END

GO

PRINT '';
PRINT '✅ SQL User Setup Complete!';
PRINT 'Username: martin_autofiq_user';
PRINT 'Password: TestPassword123!';
PRINT 'Server: autofiq-db.database.windows.net';
PRINT 'Database: autofiq';
