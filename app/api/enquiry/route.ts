import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { db, hasDatabase } from "@/lib/db";
import { templateBySlug } from "@/lib/templates";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Field caps — generous for humans, tight enough to bound a payload. */
const LIMITS = {
  name: 120,
  email: 200,
  company: 160,
  budget: 60,
  message: 5000,
  types: 12,
  typeLen: 60,
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Max enquiries accepted from one client per hour. */
const HOURLY_LIMIT = 4;

type Payload = Record<string, unknown>;

function str(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

/**
 * Hash the caller's address with a per-deployment salt. Enough to rate-limit
 * repeat submissions; not enough to identify anyone or link across services.
 */
function clientHash(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for") ?? "";
  const ip = fwd.split(",")[0].trim() || req.headers.get("x-real-ip") || "unknown";
  const salt = process.env.DATABASE_URL ?? "rexovi";
  return createHash("sha256").update(`${ip}:${salt}`).digest("hex").slice(0, 32);
}

export async function POST(req: Request) {
  if (!hasDatabase()) {
    return NextResponse.json(
      { ok: false, error: "The enquiry service is not configured." },
      { status: 503 },
    );
  }

  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "Malformed request." }, { status: 400 });
  }

  // Honeypot: a real person never fills a hidden field. Report success so the
  // bot has nothing to tune against, but write nothing.
  if (str(body.website, 100) !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = str(body.name, LIMITS.name);
  const email = str(body.email, LIMITS.email);
  const company = str(body.company, LIMITS.company) || null;
  const budget = str(body.budget, LIMITS.budget) || null;
  const message = str(body.message, LIMITS.message);
  const sourcePath = str(body.sourcePath, 200) || null;

  const projectTypes = Array.isArray(body.projectTypes)
    ? body.projectTypes
        .map((t) => str(t, LIMITS.typeLen))
        .filter(Boolean)
        .slice(0, LIMITS.types)
    : [];

  // Only accept a slug we actually publish.
  const rawSlug = str(body.templateSlug, 80);
  const templateSlug = rawSlug && templateBySlug(rawSlug) ? rawSlug : null;

  const errors: Record<string, string> = {};
  if (!name) errors.name = "Please tell us your name.";
  if (!email) errors.email = "We need an email to reply to.";
  else if (!EMAIL_RE.test(email)) errors.email = "That email does not look right.";
  if (message.length < 12) errors.message = "A sentence or two about the project, please.";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const ipHash = clientHash(req);
  const sql = db();

  try {
    const [{ recent }] = (await sql`
      select count(*)::int as recent
      from enquiries
      where ip_hash = ${ipHash}
        and created_at > now() - interval '1 hour'
    `) as { recent: number }[];

    if (recent >= HOURLY_LIMIT) {
      return NextResponse.json(
        { ok: false, error: "That is a lot of briefs in one hour. Email us directly instead." },
        { status: 429 },
      );
    }

    const [row] = (await sql`
      insert into enquiries
        (name, email, company, budget, project_types, template_slug, message, source_path, user_agent, ip_hash)
      values
        (${name}, ${email}, ${company}, ${budget}, ${projectTypes},
         ${templateSlug}, ${message}, ${sourcePath},
         ${str(req.headers.get("user-agent"), 400) || null}, ${ipHash})
      returning id, created_at
    `) as { id: string; created_at: string }[];

    return NextResponse.json({ ok: true, id: String(row.id) }, { status: 201 });
  } catch (err) {
    // Never leak connection details to the browser.
    console.error("[enquiry] insert failed:", err);
    return NextResponse.json(
      { ok: false, error: "We could not save that. Please email us instead." },
      { status: 500 },
    );
  }
}
