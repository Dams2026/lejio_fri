-- Create database user for Martin account
-- Email: martin@autofiq.dk
-- Password: TestPassword123!

-- Create SQL login at server level (run as server admin)
-- Note: This should be run by server admin in master database first:
-- USE master;
-- IF NOT EXISTS (SELECT * FROM sys.server_principals WHERE name = 'martin_autofiq_user')
-- BEGIN
--   CREATE LOGIN martin_autofiq_user WITH PASSWORD = 'TestPassword123!';
-- END

-- Create database user mapped to login
IF NOT EXISTS (SELECT * FROM sys.database_principals WHERE name = 'martin_autofiq_user' AND type = 'U')
BEGIN
    CREATE USER martin_autofiq_user FOR LOGIN martin_autofiq_user
    PRINT 'Database user martin_autofiq_user created'
END
ELSE
    PRINT 'Database user martin_autofiq_user already exists'

-- Grant permissions to read/write their own lessor data
-- Grant SELECT on fri_lessors for their lessor
IF NOT EXISTS (SELECT * FROM sys.database_role_members WHERE member_principal_id = DATABASE_PRINCIPAL_ID('martin_autofiq_user'))
BEGIN
    ALTER ROLE db_datareader ADD MEMBER martin_autofiq_user
    ALTER ROLE db_datawriter ADD MEMBER martin_autofiq_user
    PRINT 'Permissions granted to martin_autofiq_user'
END

PRINT 'Database user setup complete!'
PRINT 'Username: martin_autofiq_user'
PRINT 'Password: TestPassword123!'
PRINT 'Database: autofiq'
PRINT ''
PRINT 'Connection string:'
PRINT 'Server=tcp:autofiq.database.windows.net,1433;Initial Catalog=autofiq;Persist Security Info=False;User ID=martin_autofiq_user;Password=TestPassword123!;Encrypt=True;Connection Timeout=30;'
