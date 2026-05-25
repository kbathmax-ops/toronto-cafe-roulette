// Proxy for Google Street View Static API — keeps the key server-side.
// Rate limited to 60 requests/IP/minute to prevent abuse.
const ipCounts = new Map();

function checkRateLimit(ip) {
  const now = Date.now();
  const times = (ipCounts.get(ip) || []).filter(t => now - t < 60_000);
  times.push(now);
  ipCounts.set(ip, times);
  return times.length > 60;
}

module.exports = async function handler(req, res) {
  const ip = String(req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "")
    .split(",")[0]
    .trim();

  if (checkRateLimit(ip)) {
    res.setHeader("Retry-After", "60");
    return res.status(429).end("Rate limited");
  }

  const { location } = req.query;
  const key = process.env.GOOGLE_MAPS_KEY;
  if (!key) return res.status(500).end();
  if (!location || location.length > 500) return res.status(400).end();

  const size = String(req.query.size || "600x350").replace(/[^0-9x]/g, "");
  const url =
    `https://maps.googleapis.com/maps/api/streetview` +
    `?size=${size}` +
    `&location=${encodeURIComponent(location)}` +
    `&fov=90&source=outdoor&return_error_code=true` +
    `&key=${key}`;

  const upstream = await fetch(url);
  const buf = Buffer.from(await upstream.arrayBuffer());

  res.setHeader("Content-Type", upstream.headers.get("content-type") || "image/jpeg");
  res.setHeader("Cache-Control", "public, max-age=86400, immutable");
  res.status(upstream.status).send(buf);
};
