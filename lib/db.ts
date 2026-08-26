import { neon } from "@neondatabase/serverless";

/**
 * Neon Postgres client.
 *
 * Uses the HTTP driver rather than a TCP pool: serverless invocations are
 * short-lived and would otherwise exhaust connections. Point DATABASE_URL at
 * the **pooled** endpoint (host contains `-pooler`).
 *
 * The client is created lazily so importing this module never throws at build
 * time — only a request that actually needs the database does.
 */

type Sql = ReturnType<typeof neon>;

let client: Sql | null = null;

export function db(): Sql {
  if (client) return client;

  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. Copy .env.example to .env.local and add your Neon connection string.",
    );
  }
  client = neon(url);
  return client;
}

/** True when a connection string is configured at all. */
export function hasDatabase(): boolean {
  return Boolean(process.env.DATABASE_URL);
}
