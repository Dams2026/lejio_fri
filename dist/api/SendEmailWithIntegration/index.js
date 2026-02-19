const { createClient } = require('@supabase/supabase-js');
const nodemailer = require('nodemailer');


const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || '';

let supabase = null;

function getSupabase() {
  if (!supabase) {
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase env vars missing');
    }
    supabase = createClient(supabaseUrl, supabaseKey);
  }
  return supabase;
}

/**
 * @typedef {Object} SendEmailRequest
 * @property {string} lessorId - Lessor ID
 * @property {string} recipient - Recipient email
 * @property {string} subject - Email subject
 * @property {string} html - Email HTML content
 * @property {string} [text] - Plain text fallback
 * @property {string} [emailType] - Email type identifier
 * @property {string} [integrationId] - Specific integration to use
 */

async function sendEmailWithIntegration(request) {
  try {
    const body = request.body || {};
    const { lessorId, recipient, subject, html, text, emailType, integrationId } = body;

    if (!lessorId || !recipient || !subject || !html) {
      return {
        status: 400,
        jsonBody: { error: 'Missing required fields' },
      };
    }

    // Fetch email integration (use specified one or find default)
    let integration;

    if (integrationId) {
      const { data, error } = await getSupabase()
        .from('lessor_email_integrations')
        .select('*')
        .eq('id', integrationId)
        .eq('lessor_id', lessorId)
        .single();

      if (error || !data) {
        return {
          status: 404,
          jsonBody: { error: 'Email integration not found' },
        };
      }
      integration = data;
    } else {
      // Get default integration
      const { data, error } = await getSupabase()
        .from('lessor_email_integrations')
        .select('*')
        .eq('lessor_id', lessorId)
        .eq('is_default', true)
        .single();

      if (error || !data) {
        // Fall back to system SMTP if no integration configured
        return await sendWithSystemSMTP(recipient, subject, html, text);
      }
      integration = data;
    }

    // Create transporter based on integration type
    let transporter;
    const metadata = integration.metadata || {};

    if (integration.type === 'gmail') {
      transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: integration.email,
          pass: metadata.passwordHash || '',
        },
      });
    } else if (integration.type === 'outlook') {
      transporter = nodemailer.createTransport({
        host: 'smtp-mail.outlook.com',
        port: 587,
        secure: false,
        auth: {
          user: integration.email,
          pass: metadata.passwordHash || '',
        },
      });
    } else if (integration.type === 'custom_smtp') {
      transporter = nodemailer.createTransport({
        host: metadata.smtpHost || '',
        port: metadata.smtpPort || 587,
        secure: (metadata.smtpPort || 587) === 465,
        auth: {
          user: metadata.smtpUser || '',
          pass: metadata.smtpPassword || '',
        },
      });
    } else {
      return {
        status: 400,
        jsonBody: { error: 'Invalid email integration type' },
      };
    }

    // Send email
    await transporter.sendMail({
      from: `${integration.display_name || 'AUTOFIQ'} <${integration.email}>`,
      to: recipient,
      subject: subject,
      html: html,
      text: text || subject,
    });

    // Log activity
    await getSupabase().from('email_activity_log').insert([
      {
        lessor_id: lessorId,
        integration_id: integration.id,
        recipient: recipient,
        subject: subject,
        email_type: emailType || 'general',
        status: 'sent',
      },
    ]);

    return {
      status: 200,
      jsonBody: {
        success: true,
        message: 'Email sent successfully',
        integrationEmail: integration.email,
      },
    };
  } catch (error) {
    console.error('Error sending email with integration:', error);
    return {
      status: 500,
      jsonBody: {
        error:
          error instanceof Error
            ? error.message
            : 'Failed to send email',
      },
    };
  }
}

// Fallback to system SMTP
async function sendWithSystemSMTP(recipient, subject, html, text) {
  try {
    const smtpHost = process.env.SMTP_HOST || '';
    const smtpUser = process.env.SMTP_USER || '';
    const smtpPassword = process.env.SMTP_PASSWORD || '';
    const smtpFromEmail = process.env.SMTP_FROM_EMAIL || 'noreply@autofiq.dk';

    if (!smtpHost || !smtpUser || !smtpPassword) {
      return {
        status: 500,
        jsonBody: { error: 'No email integration configured and system SMTP not available' },
      };
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: 587,
      secure: false,
      auth: {
        user: smtpUser,
        password: smtpPassword,
      },
    });

    await transporter.sendMail({
      from: smtpFromEmail,
      to: recipient,
      subject: subject,
      html: html,
      text: text || subject,
    });

    return {
      status: 200,
      jsonBody: {
        success: true,
        message: 'Email sent via system SMTP',
      },
    };
  } catch (error) {
    console.error('Error sending with system SMTP:', error);
    return {
      status: 500,
      jsonBody: {
        error:
          error instanceof Error
            ? error.message
            : 'Failed to send email',
      },
    };
  }
}

module.exports = async function (context, request) {
  const result = await sendEmailWithIntegration(request);
  return {
    status: result?.status || 200,
    headers: result?.headers || {},
    body: result?.jsonBody ?? result?.body ?? null,
  };
};
