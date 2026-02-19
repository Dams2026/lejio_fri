# Email Service Integration Setup

This document describes the SendGrid email integration for AUTOFIQ's automated systems.

## Overview

The following email functions now use **SendGrid** for reliable email delivery:

- `send-admin-email` - System notifications to admins (lead discovery reports, etc.)
- `send-lead-welcome-email` - Personalized welcome emails to new leads
- `send-damage-report` - Damage report notifications to users
- Other existing functions can use SendGrid (see compatibility)

## Setup Instructions

### 1. Get SendGrid API Key

1. Visit [SendGrid Console](https://app.sendgrid.com)
2. Navigate to **Settings → API Keys**
3. Click **Create API Key**
4. Name it: `AUTOFIQ Production` (or similar)
5. Copy the API key (you'll only see it once)

### 2. Configure Environment Variables

Add the following to your Supabase project's environment variables:

```bash
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxx...
ADMIN_EMAIL=admin@autofiq.dk
```

**For Supabase Edge Functions**, add these to your `supabase/config.toml`:

```toml
[env.production]
SENDGRID_API_KEY = "SG.xxxxxxxxxxxxxx..."
ADMIN_EMAIL = "admin@autofiq.dk"
```

Or via Supabase Dashboard:
1. Go to **Project Settings → Edge Functions**
2. Click **Add Environment Variable**
3. Add `SENDGRID_API_KEY` and `ADMIN_EMAIL`

### 3. Sender Emails Configuration

SendGrid requires verified sender email addresses. Add these to your SendGrid account:

**Verification Steps:**
1. Go to **Settings → Sender Authentication**
2. Click **Create new sender**
3. Add each email:

| Email | Purpose | Name |
|-------|---------|------|
| `notifications@autofiq.dk` | System notifications | AUTOFIQ System |
| `sales@autofiq.dk` | Lead welcome emails | AUTOFIQ Sales Team |
| `reports@autofiq.dk` | Damage reports | AUTOFIQ Damage Reports |

Wait for verification emails and click the confirm links.

## Email Functions

### send-admin-email

**Purpose**: Send HTML reports to admin team (lead discovery reports, system alerts)

**Environment Variables:**
- `SENDGRID_API_KEY` (required)
- `ADMIN_EMAIL` (optional, defaults to `admin@autofiq.dk`)

**Request Example:**
```bash
curl -X POST https://your-project.functions.supabase.co/send-admin-email \
  -H "Authorization: Bearer $SUPABASE_SERVICE_ROLE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "subject": "🎯 Daily Lead Discovery - 15 new leads",
    "title": "Lead Discovery Report",
    "content": "<h3>Statistics:</h3><ul><li>Found: 25</li><li>Saved: 15</li></ul>",
    "recipients": ["admin@example.com", "sales@example.com"]
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Email sent successfully",
  "recipients": ["admin@example.com"]
}
```

### send-lead-welcome-email

**Purpose**: Send personalized sales emails to new leads discovered by AI Lead Finder

**Automatically called by:** `ai-find-leads` (when `sendEmails=true`)

**Behavior:**
1. Generates personalized email using AI (Gemini)
2. Saves email record to `lead_emails_sent` table
3. Sends via SendGrid with HTML formatting
4. Updates lead status with `email_sent=true`

### send-damage-report

**Purpose**: Send damage report PDFs to renters

**Example Usage:**
```bash
curl -X POST https://your-project.functions.supabase.co/send-damage-report \
  -H "Authorization: Bearer $SUPABASE_SERVICE_ROLE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "reportId": "uuid",
    "recipientEmail": "renter@example.com",
    "recipientName": "John Doe",
    "pdfUrl": "https://storage.url/damage-report.pdf",
    "vehicleName": "Tesla Model 3 - ABC123"
  }'
```

## Fallback Behavior

All email functions support graceful degradation:

- **If `SENDGRID_API_KEY` is not set**: Functions log email content to console and return success (doesn't block operations)
- **If SendGrid API fails**: Error is logged, but function returns 500 response
- **In development**: Set a dummy key or remove it to test fallback behavior

```javascript
// Fallback example
if (!sendgridApiKey) {
  console.warn('⚠️ SENDGRID_API_KEY not configured - email logged only');
  console.log(`📧 Would send to: ${recipients}`);
  // Still returns success so operations continue
}
```

## Testing

### 1. Test send-admin-email

```bash
# Via Supabase CLI
supabase functions invoke send-admin-email --no-verify \
  --env-file .env.local \
  -- --request-body '{
    "subject": "Test Admin Email",
    "title": "System Test",
    "content": "<p>This is a test email from AUTOFIQ.</p>",
    "recipients": ["your-email@example.com"]
  }'
```

### 2. Test lead discovery with emails

```bash
# Trigger automated lead discovery with email sending
curl -X POST https://your-project.functions.supabase.co/automated-lead-discovery \
  -H "Authorization: Bearer $SUPABASE_SERVICE_ROLE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "batchSize": 5,
    "sendEmails": true,
    "enableNotifications": true
  }'
```

### 3. Verify in SendGrid Dashboard

1. Go to **Mail Send → Activity**
2. You should see:
   - `To:` recipient email
   - `Status:` Delivered/Bounced/Deferred
   - `Subject:` email subject
   - `Time:` when sent

## Email Templates

All emails use consistent branding:

- **Header**: Gradient purple/pink background with emoji icon
- **Body**: Light gray background with white content boxes
- **Footer**: Timestamp and support contact
- **Mobile**: Responsive design for phones/tablets

### Customization

Edit HTML templates in edge functions:

**send-admin-email:**
```typescript
const htmlContent = `
  <!DOCTYPE html>
  <html>
    <head>
      <style>
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
        /* Modify colors/fonts here */
      </style>
    </head>
    <body>
      <!-- Email structure -->
    </body>
  </html>
`;
```

## Troubleshooting

### Issue: "SENDGRID_API_KEY is not configured"

**Solution**: Add the environment variable to Supabase:
```bash
supabase secrets set SENDGRID_API_KEY=SG.xxxxxx --project-ref your-project
```

### Issue: "SendGrid failed: 401"

**Solution**: Check API key is valid and not expired
```bash
# Test the key
curl https://api.sendgrid.com/v3/mail/send \
  -H "Authorization: Bearer SG.xxxxxx" \
  -H "Content-Type: application/json" \
  -d '{"test": true}'
```

### Issue: "Unauthorized sending email from..."

**Solution**: Verify sender email in SendGrid:
1. Go to SendGrid **Settings → Sender Authentication**
2. Ensure `notifications@autofiq.dk`, `sales@autofiq.dk`, etc. are verified
3. Click **Create new sender** if needed

### Issue: Emails going to spam

**Solution**: Configure SPF/DKIM records:
1. In SendGrid, go **Settings → Sender Authentication**
2. Click your domain
3. Follow the DNS record setup for SPF and DKIM
4. Wait 24-48 hours for DNS propagation
5. SendGrid will show ✅ when verified

## Monitoring

### View Email Statistics

**SendGrid Dashboard:**
1. Navigate to **Mail Send → Statistics**
2. Filter by date range
3. View metrics:
   - Delivered, Bounced, Dropped, Clicked, Opened

### Email Logs

**Supabase Function Logs:**
```bash
supabase functions logs send-admin-email --project-ref your-project
```

**Look for patterns:**
- ✅ `Email sent to...` - Successfully sent
- ⚠️ `SENDGRID_API_KEY not configured` - Missing API key
- ❌ `SendGrid error:` - API error

## Rate Limits

SendGrid free tier includes:
- **100 emails/day** (free tier)
- **Paid tier:** Up to 500K emails/month

AUTOFIQ usage:
- Lead discovery: ~20-30 emails/day
- Damage reports: ~5-10/day
- Admin notifications: ~1-2/day
- **Total**: ~50 emails/day (well within free tier)

## Security Notes

- ✅ API key is stored securely in Supabase secrets
- ✅ Never commit API keys to Git
- ✅ Emails are sent over HTTPS only
- ✅ Recipient emails are sanitized to prevent injection
- ⚠️ Rotate API keys periodically
- ⚠️ Set IP whitelist in SendGrid for production

## Next Steps

1. ✅ **Setup SendGrid account** - Get API key and verify senders
2. ✅ **Configure environment variables** - Add to Supabase
3. ✅ **Test email functions** - Use curl examples above
4. ✅ **Monitor delivery** - Check SendGrid dashboard
5. ✅ **Setup DNS records** - SPF/DKIM for deliverability
6. ✅ **Document in runbooks** - Add to team procedures

## References

- [SendGrid API Reference](https://docs.sendgrid.com/api-reference/mail-send/mail-send)
- [SendGrid Setup Guide](https://docs.sendgrid.com/ui/account-and-settings/how-to-set-up-domain-authentication)
- [Supabase Secrets](https://supabase.com/docs/guides/functions/secrets)
