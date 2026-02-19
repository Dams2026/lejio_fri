-- Master database: Create login
USE master
GO

IF NOT EXISTS (SELECT 1 FROM sys.sql_logins WHERE name = 'martin_autofiq_user')
BEGIN
    CREATE LOGIN martin_autofiq_user WITH PASSWORD = 'Temp123456789!';
    PRINT 'Login created: martin_autofiq_user'
END
ELSE
BEGIN
    PRINT 'Login already exists: martin_autofiq_user'
END
GO

-- Use autofiq database: Create user
USE autofiq
GO

IF NOT EXISTS (SELECT 1 FROM sys.database_principals WHERE name = 'martin_autofiq_user')
BEGIN
    CREATE USER martin_autofiq_user FOR LOGIN martin_autofiq_user;
    PRINT 'User created: martin_autofiq_user'
END
ELSE
BEGIN
    PRINT 'User already exists: martin_autofiq_user'
END
GO

-- Grant roles
ALTER ROLE db_datareader ADD MEMBER martin_autofiq_user;
ALTER ROLE db_datawriter ADD MEMBER martin_autofiq_user;
PRINT 'Roles assigned: db_datareader, db_datawriter'
GO

-- Verify
SELECT 'martin_autofiq_user' as Username, 'autofiq' as Database, 'Created' as Status
GO
