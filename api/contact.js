import { createClient } from "@supabase/supabase-js";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed" });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return response.status(500).json({
      error:
        "Supabase is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in Vercel.",
    });
  }

  const { name = "", email = "", message = "" } = request.body || {};
  const trimmedName = String(name).trim();
  const trimmedEmail = String(email).trim().toLowerCase();
  const trimmedMessage = String(message).trim();

  if (!trimmedName || !trimmedEmail || !trimmedMessage) {
    return response.status(400).json({ error: "Name, email, and message are required." });
  }

  if (!emailPattern.test(trimmedEmail)) {
    return response.status(400).json({ error: "Please enter a valid email address." });
  }

  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
  });

  const { error } = await supabase.from("contact_messages").insert({
    name: trimmedName,
    email: trimmedEmail,
    message: trimmedMessage,
    source: "portfolio",
  });

  if (error) {
    return response.status(500).json({ error: error.message });
  }

  return response.status(200).json({ ok: true });
}
