// Handles cafe suggestion submissions: saves to Supabase + emails kbathmax@gmail.com via Resend.
// Requires RESEND_API_KEY in Vercel env (free at resend.com — sign up with kbathmax@gmail.com).
const SB_URL = "https://admlkeibdjttgslmffmy.supabase.co";
const SB_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkbWxrZWliZGp0dGdzbG1mZm15Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwNDIzNjUsImV4cCI6MjA5MjYxODM2NX0.MEDiE6IrQRJZXwgK5S_xXU6h8hkhxrIlp847nrUrxMs";
const NOTIFY = "kbathmax@gmail.com";

// In-memory IP rate limit: max 3 submissions per IP per hour
const ipMap = new Map();
function isRateLimited(ip) {
  const now = Date.now();
  const times = (ipMap.get(ip) || []).filter(t => now - t < 3_600_000);
  times.push(now);
  ipMap.set(ip, times);
  return times.length > 3;
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const ip = String(req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "").split(",")[0].trim();
  if (isRateLimited(ip)) {
    res.setHeader("Retry-After", "3600");
    return res.status(429).json({ error: "Too many submissions. Please wait an hour." });
  }

  const { name, neighborhood, website, instagram, notes } = req.body || {};
  if (!name?.trim()) return res.status(400).json({ error: "Name is required" });

  const payload = {
    name: name.trim(),
    neighborhood: neighborhood?.trim() || null,
    website: website?.trim() || null,
    instagram: instagram?.trim().replace(/^@/, "") || null,
    notes: notes?.trim() || null,
  };

  // Persist to Supabase (uses anon key — allowed by RLS)
  const sbRes = await fetch(`${SB_URL}/rest/v1/caffein_submissions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SB_ANON,
      Authorization: `Bearer ${SB_ANON}`,
      Prefer: "return=minimal",
    },
    body: JSON.stringify(payload),
  });

  if (!sbRes.ok) {
    const detail = await sbRes.text();
    console.error("Supabase insert failed:", detail);
    return res.status(500).json({ error: "Failed to save suggestion" });
  }

  // Email notification via Resend
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    const lines = [
      "New cafe suggestion submitted to Caffein!",
      "",
      `Name: ${payload.name}`,
      `Neighborhood: ${payload.neighborhood ?? "—"}`,
      `Website: ${payload.website ?? "—"}`,
      `Instagram: ${payload.instagram ? "@" + payload.instagram : "—"}`,
      `Notes: ${payload.notes ?? "—"}`,
    ];
    const emailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Caffein <noreply@tattoosbyjess.com>",
        to: [NOTIFY],
        subject: `New cafe suggestion: ${payload.name}`,
        text: lines.join("\n"),
      }),
    });
    if (!emailRes.ok) {
      console.error("Resend error:", await emailRes.text());
    }
  } else {
    console.warn("RESEND_API_KEY not set — email skipped");
  }

  res.status(200).json({ ok: true });
};
