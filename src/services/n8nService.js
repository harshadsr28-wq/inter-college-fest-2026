/**
 * ============================================================================
 * INTER-COLLEGE FEST 2026 - n8n PRODUCTION WEBHOOK INTEGRATION SERVICE
 * ============================================================================
 * 
 * This module connects the frontend registration form directly to the existing
 * production n8n automation workflow.
 * 
 * - Production Webhook Endpoint:
 *   Configured via Vite environment variable `VITE_N8N_WEBHOOK_URL`.
 *   Default: https://harshad03.app.n8n.cloud/webhook/fest-registration
 * 
 * - HTTP Method: POST
 * - Content-Type: application/json
 * 
 * - Exact Expected JSON Payload:
 *   {
 *     "college_name": string,
 *     "college_code": string,
 *     "team_name": string,
 *     "captain_name": string,
 *     "captain_email": string,
 *     "member_count": number,
 *     "participants": [
 *       { "name": string, "email": string, "phone": string },
 *       ...
 *     ],
 *     "events": string[]
 *   }
 * 
 * - Expected n8n Response Properties:
 *   - success: boolean
 *   - message: string
 *   - registration_id: string
 *   - college: string (or college_name)
 *   - team: string (or team_name)
 *   - events: string[]
 *   - confirmation_email: boolean | string
 *   - organizer_notification: boolean | string
 * ============================================================================
 */

// Retrieve webhook URL from Vite environment variable with production fallback
const N8N_WEBHOOK_URL = 
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_N8N_WEBHOOK_URL) || 
  'https://harshad03.app.n8n.cloud/webhook/fest-registration';

/**
 * Validates and formats the registration payload to guarantee exact compatibility with n8n.
 * 
 * @param {Object} rawFormData
 * @returns {Object} Cleaned and typed payload matching n8n contract
 */
export function buildRegistrationPayload(rawFormData) {
  const memberCount = parseInt(rawFormData.member_count, 10) || rawFormData.participants.length;

  // Clean participants array according to member_count
  const formattedParticipants = (rawFormData.participants || [])
    .slice(0, memberCount)
    .map((p, index) => ({
      name: (p.name || '').trim(),
      email: (p.email || '').trim().toLowerCase(),
      phone: (p.phone || '').trim().replace(/[^0-9+]/g, '')
    }));

  // Ensure captain details match participant #1
  const captainName = (rawFormData.captain_name || formattedParticipants[0]?.name || '').trim();
  const captainEmail = (rawFormData.captain_email || formattedParticipants[0]?.email || '').trim().toLowerCase();

  return {
    college_name: (rawFormData.college_name || '').trim(),
    college_code: (rawFormData.college_code || '').trim().toUpperCase(),
    team_name: (rawFormData.team_name || '').trim(),
    captain_name: captainName,
    captain_email: captainEmail,
    member_count: memberCount,
    participants: formattedParticipants,
    events: Array.isArray(rawFormData.events) ? rawFormData.events : []
  };
}

/**
 * Submits the registration payload to the n8n production webhook.
 * 
 * @param {Object} formData Raw registration data
 * @returns {Promise<{success: boolean, data?: Object, message: string, isDuplicate?: boolean}>}
 */
export async function submitRegistration(formData) {
  const payload = buildRegistrationPayload(formData);

  console.group('🚀 [Fest 2026] Submitting Registration to n8n Webhook');
  console.log('Target Endpoint:', N8N_WEBHOOK_URL);
  console.log('Payload:', JSON.stringify(payload, null, 2));
  console.groupEnd();

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 25000); // 25s timeout for cloud webhook

    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    // Try parsing JSON response; if empty, handle text fallback
    let responseData = {};
    const responseText = await response.text();

    if (responseText) {
      try {
        responseData = JSON.parse(responseText);
      } catch (parseErr) {
        console.warn('⚠️ Webhook returned non-JSON text response:', responseText);
        responseData = { message: responseText };
      }
    }

    console.log('📥 [Fest 2026] n8n Webhook Response:', {
      status: response.status,
      ok: response.ok,
      data: responseData
    });

    // Check for HTTP error status
    if (!response.ok) {
      const errorMsg = 
        responseData.message || 
        responseData.error || 
        `Server responded with status ${response.status} (${response.statusText})`;

      const isDuplicate = 
        response.status === 409 || 
        /already exists|duplicate|already registered/i.test(errorMsg);

      return {
        success: false,
        message: errorMsg,
        isDuplicate,
        raw: responseData
      };
    }

    // Check if n8n returned an explicit success: false flag in payload
    if (responseData.success === false) {
      const errorMsg = responseData.message || responseData.error || 'Registration was rejected by the fest system.';
      const isDuplicate = /already exists|duplicate|already registered/i.test(errorMsg);
      return {
        success: false,
        message: errorMsg,
        isDuplicate,
        raw: responseData
      };
    }

    // Success response: normalize expected fields
    return {
      success: true,
      message: responseData.message || 'Registration completed successfully!',
      data: {
        registration_id: responseData.registration_id || responseData.id || responseData.reg_id || null,
        college: responseData.college || responseData.college_name || payload.college_name,
        team: responseData.team || responseData.team_name || payload.team_name,
        events: responseData.events || payload.events,
        confirmation_email: responseData.confirmation_email ?? true,
        organizer_notification: responseData.organizer_notification ?? true,
        captain_email: responseData.captain_email || payload.captain_email,
        captain_name: responseData.captain_name || payload.captain_name,
        member_count: responseData.member_count || payload.member_count,
        raw: responseData
      }
    };

  } catch (error) {
    console.error('❌ [Fest 2026] n8n Webhook Connection Error:', error);

    if (error.name === 'AbortError') {
      return {
        success: false,
        message: 'The registration request timed out. Please check your internet connection or try again shortly.',
        isDuplicate: false
      };
    }

    // Check for potential browser CORS issues or network failures
    const isCorsOrNetwork = error instanceof TypeError && error.message.includes('Failed to fetch');
    const helpfulMessage = isCorsOrNetwork
      ? 'Unable to reach the registration server. This could be due to network connectivity or CORS policy on the webhook endpoint. Please verify the endpoint is online.'
      : (error.message || 'An unexpected network error occurred while submitting your registration.');

    return {
      success: false,
      message: helpfulMessage,
      isDuplicate: false,
      error
    };
  }
}

/**
 * Returns the configured webhook URL for diagnostics and user information.
 */
export function getWebhookUrl() {
  return N8N_WEBHOOK_URL;
}
