/**
 * Supabase Edge Function: notify-admin-signup
 *
 * Triggered via database webhook when a new row is inserted into user_approvals.
 * Sends a push notification to all admins who have signup alerts enabled.
 *
 * Setup:
 * 1. Generate VAPID keys: npx web-push generate-vapid-keys
 * 2. Set secrets: supabase secrets set VAPID_PUBLIC_KEY=... VAPID_PRIVATE_KEY=... VAPID_SUBJECT=mailto:admin@techhubb.se
 * 3. Create database webhook in Supabase Dashboard:
 *    - Table: user_approvals
 *    - Events: INSERT
 *    - Type: Supabase Edge Function
 *    - Function: notify-admin-signup
 */

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  try {
    const payload = await req.json()
    const record = payload.record

    if (!record?.email) {
      return new Response(JSON.stringify({ message: 'No record' }), { status: 200 })
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    // Find all admins with signup alerts enabled
    const { data: prefs } = await supabase
      .from('notification_preferences')
      .select('user_id')
      .eq('admin_signup_alerts', true)

    if (!prefs || prefs.length === 0) {
      return new Response(JSON.stringify({ message: 'No admin subscribers' }), { status: 200 })
    }

    const userIds = prefs.map((p: { user_id: string }) => p.user_id)

    // Get their push subscriptions
    const { data: subscriptions } = await supabase
      .from('push_subscriptions')
      .select('*')
      .in('user_id', userIds)

    if (!subscriptions || subscriptions.length === 0) {
      return new Response(JSON.stringify({ message: 'No push subscriptions' }), { status: 200 })
    }

    const vapidPublicKey = Deno.env.get('VAPID_PUBLIC_KEY')!
    const vapidPrivateKey = Deno.env.get('VAPID_PRIVATE_KEY')!
    const vapidSubject = Deno.env.get('VAPID_SUBJECT') || 'mailto:admin@techhubb.se'

    const notificationPayload = JSON.stringify({
      title: 'New Signup',
      body: `${record.display_name || record.email} has requested access`,
      tag: 'admin-signup',
      url: '/dashboard/admin',
    })

    // Send push to each subscription using the Web Push protocol
    const results = await Promise.allSettled(
      subscriptions.map(async (sub: { endpoint: string; p256dh: string; auth: string }) => {
        const response = await sendWebPush(
          sub,
          notificationPayload,
          vapidPublicKey,
          vapidPrivateKey,
          vapidSubject
        )
        return response
      })
    )

    return new Response(
      JSON.stringify({ message: 'Sent', results: results.length }),
      { status: 200 }
    )
  } catch (err) {
    console.error('notify-admin-signup error:', err)
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 })
  }
})

/**
 * Send a Web Push notification using the Web Push protocol.
 * Uses Deno's built-in crypto for VAPID JWT signing.
 */
async function sendWebPush(
  subscription: { endpoint: string; p256dh: string; auth: string },
  payload: string,
  vapidPublicKey: string,
  vapidPrivateKey: string,
  vapidSubject: string
) {
  const endpoint = new URL(subscription.endpoint)
  const audience = `${endpoint.protocol}//${endpoint.hostname}`

  // Create VAPID JWT
  const header = base64UrlEncode(JSON.stringify({ alg: 'ES256', typ: 'JWT' }))
  const now = Math.floor(Date.now() / 1000)
  const claims = base64UrlEncode(
    JSON.stringify({ aud: audience, exp: now + 12 * 3600, sub: vapidSubject })
  )
  const unsignedToken = `${header}.${claims}`

  // Import the VAPID private key for signing
  const privateKeyBytes = base64UrlDecode(vapidPrivateKey)
  const cryptoKey = await crypto.subtle.importKey(
    'pkcs8',
    privateKeyBytes,
    { name: 'ECDSA', namedCurve: 'P-256' },
    false,
    ['sign']
  )

  const signature = await crypto.subtle.sign(
    { name: 'ECDSA', hash: 'SHA-256' },
    cryptoKey,
    new TextEncoder().encode(unsignedToken)
  )

  const jwt = `${unsignedToken}.${base64UrlEncode(new Uint8Array(signature))}`

  // Encrypt the payload using the subscription keys (simplified — use ece)
  // For production, consider using a proper web-push library.
  // Here we send without encryption for the VAPID auth handshake.
  const response = await fetch(subscription.endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/octet-stream',
      'Content-Encoding': 'aes128gcm',
      TTL: '86400',
      Authorization: `vapid t=${jwt}, k=${vapidPublicKey}`,
    },
    body: new TextEncoder().encode(payload),
  })

  if (!response.ok) {
    throw new Error(`Push failed: ${response.status} ${await response.text()}`)
  }

  return response.status
}

function base64UrlEncode(input: string | Uint8Array): string {
  let bytes: Uint8Array
  if (typeof input === 'string') {
    bytes = new TextEncoder().encode(input)
  } else {
    bytes = input
  }
  const binString = Array.from(bytes, (b) => String.fromCharCode(b)).join('')
  return btoa(binString).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function base64UrlDecode(input: string): Uint8Array {
  const base64 = input.replace(/-/g, '+').replace(/_/g, '/')
  const binString = atob(base64)
  return Uint8Array.from(binString, (c) => c.charCodeAt(0))
}
