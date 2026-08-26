"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState, type FormEvent } from "react";
import { ArrowRight } from "@/components/site/Icons";
import { templateBySlug } from "@/lib/templates";
import s from "./contact.module.css";

const PROJECT_TYPES = [
  "Website",
  "Web application",
  "Mobile app",
  "UI/UX design",
  "Digital product",
  "Use a template",
];

const BUDGETS = [
  "Not sure yet",
  "Under ₹1L",
  "₹1L – ₹5L",
  "₹5L – ₹15L",
  "₹15L+",
];

const CONTACT_EMAIL = "hello@rexovi.com";

interface Errors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactForm() {
  const params = useSearchParams();
  const templateSlug = params.get("template");
  const template = templateSlug ? templateBySlug(templateSlug) : undefined;

  const [types, setTypes] = useState<string[]>(() => (template ? ["Use a template"] : []));
  const [budget, setBudget] = useState(BUDGETS[0]);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  const [failure, setFailure] = useState<string | null>(null);
  const [showTemplate, setShowTemplate] = useState(true);

  const activeTemplate = showTemplate ? template : undefined;

  const toggleType = (t: string) =>
    setTypes((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));

  const subject = useMemo(
    () =>
      activeTemplate
        ? `New project enquiry — ${activeTemplate.name} template`
        : "New project enquiry — Rexovi Technologies",
    [activeTemplate],
  );

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const company = String(data.get("company") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const next: Errors = {};
    if (!name) next.name = "Please tell us your name.";
    if (!email) next.email = "We need an email to reply to.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "That email does not look right.";
    if (message.length < 12) next.message = "A sentence or two about the project, please.";

    setErrors(next);
    if (Object.keys(next).length > 0) {
      const firstKey = Object.keys(next)[0];
      document.getElementById(`field-${firstKey}`)?.focus();
      return;
    }

    setStatus("sending");
    setFailure(null);

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company,
          budget,
          message,
          projectTypes: types,
          templateSlug: activeTemplate?.slug ?? null,
          sourcePath: window.location.pathname + window.location.search,
          // Honeypot — must stay empty.
          website: String(data.get("website") ?? ""),
        }),
      });

      const payload = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        errors?: Errors;
      };

      if (res.status === 422 && payload.errors) {
        setErrors(payload.errors);
        setStatus("idle");
        return;
      }
      if (!res.ok || !payload.ok) {
        throw new Error(payload.error ?? "Request failed");
      }

      setStatus("sent");
    } catch (err) {
      setFailure(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("failed");
    }
  }

  /** Fallback used only when the server could not take the brief. */
  function mailtoHref() {
    const form = document.querySelector<HTMLFormElement>("form[data-enquiry]");
    const data = form ? new FormData(form) : new FormData();
    const lines = [
      `Name: ${String(data.get("name") ?? "")}`,
      `Email: ${String(data.get("email") ?? "")}`,
      String(data.get("company") ?? "") ? `Company: ${String(data.get("company"))}` : null,
      types.length ? `Project type: ${types.join(", ")}` : null,
      `Budget: ${budget}`,
      activeTemplate ? `Template of interest: ${activeTemplate.name}` : null,
      "",
      String(data.get("message") ?? ""),
    ].filter(Boolean);
    return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      lines.join("\n"),
    )}`;
  }

  if (status === "sent") {
    return (
      <div className={s.form}>
        <div className={s.formTop}>
          <span className="dot-live" aria-hidden />
          Brief ready
          <b>Step 05 / 05</b>
        </div>
        <div className={s.sent} role="status">
          <span className={s.sentMark} aria-hidden>
            <ArrowRight size={18} />
          </span>
          <h2 className={s.sentTitle}>Brief received.</h2>
          <p className={s.sentBody}>
            It is with us — no email client needed. We read every one and reply within two working
            days, usually sooner. If anything changes in the meantime, write to{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="tlink">
              {CONTACT_EMAIL}
            </a>
            .
          </p>
          <button type="button" className="btn btn--ghost btn--sm" onClick={() => setStatus("idle")}>
            Send another
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className={s.form} onSubmit={handleSubmit} noValidate data-enquiry>
      <div className={s.formTop}>
        <span className="dot-live" aria-hidden />
        New project brief
        <b>Step 01 / 05</b>
      </div>

      <div className={s.formBody}>
        {/* Honeypot: hidden from people, irresistible to bots. */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="sr-only"
        />

        {activeTemplate ? (
          <div className={s.prefill}>
            <span>
              Starting from the <b>{activeTemplate.name}</b> template — {activeTemplate.tagline}.
            </span>
            <button type="button" className={s.prefillClear} onClick={() => setShowTemplate(false)}>
              Remove
            </button>
          </div>
        ) : null}

        <div className={s.fieldRow}>
          <div className={s.field}>
            <label className={s.label} htmlFor="field-name">
              Your name <span className={s.req}>*</span>
            </label>
            <input
              id="field-name"
              name="name"
              className={`${s.input}${errors.name ? ` ${s.error}` : ""}`}
              placeholder="Jane Mathew"
              autoComplete="name"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "err-name" : undefined}
            />
            {errors.name ? (
              <span className={s.errorText} id="err-name">
                {errors.name}
              </span>
            ) : null}
          </div>

          <div className={s.field}>
            <label className={s.label} htmlFor="field-email">
              Email <span className={s.req}>*</span>
            </label>
            <input
              id="field-email"
              name="email"
              type="email"
              inputMode="email"
              className={`${s.input}${errors.email ? ` ${s.error}` : ""}`}
              placeholder="you@company.com"
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "err-email" : undefined}
            />
            {errors.email ? (
              <span className={s.errorText} id="err-email">
                {errors.email}
              </span>
            ) : null}
          </div>
        </div>

        <div className={s.fieldRow}>
          <div className={s.field}>
            <label className={s.label} htmlFor="field-company">
              Company <span className="muted">(optional)</span>
            </label>
            <input
              id="field-company"
              name="company"
              className={s.input}
              placeholder="Company or project name"
              autoComplete="organization"
            />
          </div>

          <div className={s.field}>
            <label className={s.label} htmlFor="field-budget">
              Budget range
            </label>
            <span className={s.selectWrap}>
              <select
                id="field-budget"
                name="budget"
                className={s.select}
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              >
                {BUDGETS.map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>
            </span>
          </div>
        </div>

        <div className={s.field}>
          <span className={s.label} id="types-label">
            What are we building?
          </span>
          <div className={s.chipGroup} role="group" aria-labelledby="types-label">
            {PROJECT_TYPES.map((t, i) => (
              <button
                key={t}
                type="button"
                className={s.typeChip}
                data-on={types.includes(t)}
                aria-pressed={types.includes(t)}
                onClick={() => toggleType(t)}
              >
                <span>{String(i + 1).padStart(2, "0")}</span>
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className={s.field}>
          <label className={s.label} htmlFor="field-message">
            About the project <span className={s.req}>*</span>
          </label>
          <textarea
            id="field-message"
            name="message"
            className={`${s.textarea}${errors.message ? ` ${s.error}` : ""}`}
            placeholder="What are you trying to build, who is it for, and where are you starting from?"
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "err-message" : undefined}
          />
          {errors.message ? (
            <span className={s.errorText} id="err-message">
              {errors.message}
            </span>
          ) : null}
        </div>
      </div>

      <div className={s.formFoot}>
        {status === "failed" ? (
          <p className={s.errorText} role="alert" style={{ flex: 1, minWidth: "16ch" }}>
            {failure} You can{" "}
            <a href={mailtoHref()} className="tlink">
              email it instead
            </a>
            .
          </p>
        ) : (
          <p className={s.footNote}>
            Sent straight to the Rexovi team. We never share your details.
          </p>
        )}
        <button type="submit" className="btn btn--accent" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send the brief"}
          <ArrowRight className="btn__arrow" />
        </button>
      </div>
    </form>
  );
}
