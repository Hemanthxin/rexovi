/**
 * Schema migration for the Rexovi site.
 *
 *   npm run db:migrate
 *
 * Idempotent — safe to run repeatedly. Reads DATABASE_URL from .env.local
 * (or the real environment, which is what CI/production will use).
 */

import { readFileSync, existsSync } from "node:fs";
import { neon } from "@neondatabase/serverless";

function loadEnv() {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL;
  const path = new URL("../.env.local", import.meta.url);
  if (!existsSync(path)) return null;
  const match = readFileSync(path, "utf8").match(/^DATABASE_URL\s*=\s*"?([^"\n]+)"?/m);
  return match ? match[1] : null;
}

const url = loadEnv();
if (!url) {
  console.error("DATABASE_URL not found. Copy .env.example to .env.local first.");
  process.exit(1);
}

const sql = neon(url);

const statements = [
  // Project enquiries submitted through /contact.
  `create table if not exists enquiries (
     id             bigint generated always as identity primary key,
     created_at     timestamptz  not null default now(),
     name           text         not null,
     email          text         not null,
     company        text,
     budget         text,
     project_types  text[]       not null default '{}',
     template_slug  text,
     message        text         not null,
     source_path    text,
     user_agent     text,
     -- Hashed, never the raw address: enough to rate-limit, not enough to track.
     ip_hash        text,
     status         text         not null default 'new'
   )`,

  `alter table enquiries
     add constraint enquiries_status_check
     check (status in ('new', 'read', 'replied', 'archived', 'spam'))
     not valid`,

  `create index if not exists enquiries_created_at_idx on enquiries (created_at desc)`,
  `create index if not exists enquiries_status_idx     on enquiries (status)`,
  `create index if not exists enquiries_ip_hash_idx    on enquiries (ip_hash, created_at desc)`,
];

for (const statement of statements) {
  const label = statement.trim().split("\n")[0].slice(0, 68);
  try {
    await sql.query(statement);
    console.log("  ok  ", label);
  } catch (err) {
    // A re-added constraint is expected on a second run.
    if (String(err.message).includes("already exists")) {
      console.log("  skip", label, "(exists)");
      continue;
    }
    console.error("  FAIL", label, "\n       ", err.message);
    process.exitCode = 1;
  }
}

const [{ count }] = await sql`select count(*)::int as count from enquiries`;
console.log(`\nenquiries table ready — ${count} row(s).`);
