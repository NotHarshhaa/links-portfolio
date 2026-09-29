/**
 * Minimal client for the Upstash REST protocol (the storage Vercel Marketplace
 * KV provisions). Called with plain fetch so no SDK dependency is needed.
 * When the env vars are absent every helper returns null and callers must
 * degrade gracefully — the site works without analytics configured.
 */
const KV_URL = process.env.KV_REST_API_URL
const KV_TOKEN = process.env.KV_REST_API_TOKEN

export function isKvConfigured(): boolean {
  return Boolean(KV_URL && KV_TOKEN)
}

export async function kvCommand<T = unknown>(
  command: (string | number)[]
): Promise<T | null> {
  if (!isKvConfigured()) return null
  try {
    const res = await fetch(KV_URL as string, {
      method: 'POST',
      headers: { Authorization: `Bearer ${KV_TOKEN}` },
      body: JSON.stringify(command),
      cache: 'no-store'
    })
    if (!res.ok) return null
    const json = (await res.json()) as { result?: T }
    return json.result ?? null
  } catch {
    return null
  }
}
