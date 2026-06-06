import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const PRICE_ID_ANNUAL = "pri_01ktagvsjaqeqk2sqaar85p5ps";

// ✅ Vérification signature Paddle
async function verifyPaddleSignature(req: Request, body: string): Promise<boolean> {
  const signature = req.headers.get("paddle-signature");
  if (!signature) return false;

  const secret = Deno.env.get("PADDLE_WEBHOOK_SECRET");
  if (!secret) return false;

  // Extraire ts et h1 depuis le header
  const parts = Object.fromEntries(
    signature.split(";").map((part) => part.split("=") as [string, string])
  );
  const ts = parts["ts"];
  const h1 = parts["h1"];
  if (!ts || !h1) return false;

  // Construire le payload signé
  const signedPayload = `${ts}:${body}`;

  // HMAC-SHA256
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  const msgData = encoder.encode(signedPayload);

  const cryptoKey = await crypto.subtle.importKey(
    "raw", keyData, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]
  );
  const signatureBuffer = await crypto.subtle.sign("HMAC", cryptoKey, msgData);
  const computedHash = Array.from(new Uint8Array(signatureBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return computedHash === h1;
}

serve(async (req) => {
  const rawBody = await req.text();

  // ✅ Vérifier la signature avant tout
  const isValid = await verifyPaddleSignature(req, rawBody);
  if (!isValid) {
    console.error("Invalid Paddle signature");
    return new Response("Unauthorized", { status: 401 });
  }

  const body = JSON.parse(rawBody);
  const eventType = body?.event_type;

  if (!eventType) {
    return new Response("No event type", { status: 400 });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  // ✅ Activation + mise à jour abonnement
  if (
    eventType === "subscription.activated" ||
    eventType === "subscription.created" ||
    eventType === "subscription.updated"
  ) {
    const customData = body?.data?.custom_data;
    const userId = customData?.user_id;
    const priceId = body?.data?.items?.[0]?.price?.id;

    if (!userId) {
      console.error("Missing user_id in custom_data", JSON.stringify(body));
      return new Response("No user_id in custom_data", { status: 400 });
    }

    const plan = priceId === PRICE_ID_ANNUAL ? "pro_annual" : "pro_monthly";

    // ✅ Lire la vraie date d'expiration depuis Paddle
    const expiresAt =
      body?.data?.current_billing_period?.ends_at ??
      (plan === "pro_annual"
        ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
        : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString());

    const { error } = await supabase
      .from("profiles")
      .update({
        plan,
        paddle_subscription_id: body?.data?.id,
        plan_expires_at: expiresAt,
      })
      .eq("id", userId);

    if (error) {
      console.error("Supabase update error:", error);
      return new Response("DB error", { status: 500 });
    }
  }

  // ✅ Annulation → retour free
  if (eventType === "subscription.canceled") {
    const userId = body?.data?.custom_data?.user_id;
    if (userId) {
      const { error } = await supabase
        .from("profiles")
        .update({
          plan: "free",
          paddle_subscription_id: null,
          plan_expires_at: null,
        })
        .eq("id", userId);

      if (error) {
        console.error("Cancel update error:", error);
        return new Response("DB error", { status: 500 });
      }
    }
  }

  return new Response("OK", { status: 200 });
});
