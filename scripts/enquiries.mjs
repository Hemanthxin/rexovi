/**
 * Read project enquiries from the terminal.
 *
 *   npm run db:enquiries              latest 20
 *   npm run db:enquiries -- 50        latest 50
 *   npm run db:enquiries -- 20 new    only unread
 */

import { readFileSync, existsSync } from "node:fs";
import { neon } from "@neondatabase/serverless";

function loadEnv() {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL;
  const path = new URL("../.env.local", import.meta.url);
  if (!existsSync(path)) return null;
  const m = readFileSync(path, "utf8").match(/^DATABASE_URL\s*=\s*"?([^"\n]+)"?/m);
  return m ? m[1] : null;
}

const url = loadEnv();
if (!url) {
  console.error("DATABASE_URL not found. Copy .env.example to .env.local first.");
  process.exit(1);
}

const sql = neon(url);
const limit = Number(process.argv[2]) || 20;
const status = process.argv[3] ?? null;

const rows = status
  ? await sql`select * from enquiries where status = ${status} order by created_at desc limit ${limit}`
  : await sql`select * from enquiries order by created_at desc limit ${limit}`;

if (rows.length === 0) {
  console.log("No enquiries yet.");
  process.exit(0);
}

const dim = (t) => `\x1b[2m${t}\x1b[0m`;
const bold = (t) => `\x1b[1m${t}\x1b[0m`;

for (const r of rows) {
  const when = new Date(r.created_at).toISOString().replace("T", " ").slice(0, 16);
  console.log("\n" + "─".repeat(74));
  console.log(`${bold(r.name)}  ${dim("<" + r.email + ">")}   ${dim(when)}  ${dim("#" + r.id)}`);
  const meta = [
    r.company && `company: ${r.company}`,
    r.budget && `budget: ${r.budget}`,
    r.project_types?.length && `type: ${r.project_types.join(", ")}`,
    r.template_slug && `template: ${r.template_slug}`,
    `status: ${r.status}`,
  ].filter(Boolean);
  console.log(dim(meta.join("  ·  ")));
  console.log("\n" + r.message.split("\n").map((l) => "  " + l).join("\n"));
}

const [{ total }] = await sql`select count(*)::int as total from enquiries`;
console.log("\n" + "─".repeat(74));
console.log(`Showing ${rows.length} of ${total} enquiries.`);
