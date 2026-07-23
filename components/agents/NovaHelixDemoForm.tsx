"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { novaHelixDemoSchema, hiringVolumes, type NovaHelixDemoInput } from "@/lib/validation/demo";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

const fieldBase =
  "w-full rounded-none border border-border bg-background px-4 py-2.5 text-foreground placeholder:text-muted/50 transition-colors focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

/**
 * Nova Helix live-demo request form — distinct from the general discovery form:
 * it captures hiring context (roles, volume, ATS) so we can run the demo against
 * the company's real requisitions. Posts to /api/contact with kind="nova-helix-demo".
 */
export function NovaHelixDemoForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NovaHelixDemoInput>({
    resolver: zodResolver(novaHelixDemoSchema),
    defaultValues: { kind: "nova-helix-demo" },
  });

  async function onSubmit(values: NovaHelixDemoInput) {
    setServerError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, kind: "nova-helix-demo" }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? "Something went wrong.");
      }
      setSubmitted(true);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 px-6 py-12 text-center sm:px-8">
        <CheckCircle2 aria-hidden className="size-12 text-accent" />
        <h3 className="text-h3 font-semibold">Your demo is being scheduled.</h3>
        <p className="max-w-md text-pretty text-muted">
          We&apos;ll reach out shortly to confirm a time and run Nova Helix live against one of your
          real open roles — screening, calling, and interviewing a candidate end to end.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex min-h-0 flex-1 flex-col overflow-hidden"
    >
      <input type="hidden" value="nova-helix-demo" {...register("kind")} />

      {/* Scrollable field area — never chains its scroll to the page behind */}
      <div
        data-lenis-prevent
        className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-6 sm:px-8"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Name" error={errors.name?.message} htmlFor="nh-name">
            <input
              id="nh-name"
              autoComplete="name"
              aria-invalid={!!errors.name}
              className={cn(fieldBase, errors.name && "border-red-500/70")}
              {...register("name")}
            />
          </Field>

          <Field label="Work email" error={errors.email?.message} htmlFor="nh-email">
            <input
              id="nh-email"
              type="email"
              autoComplete="email"
              aria-invalid={!!errors.email}
              className={cn(fieldBase, errors.email && "border-red-500/70")}
              {...register("email")}
            />
          </Field>

          <Field label="Phone number" error={errors.phone?.message} htmlFor="nh-phone">
            <input
              id="nh-phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="+44 20 1234 5678"
              aria-invalid={!!errors.phone}
              className={cn(fieldBase, errors.phone && "border-red-500/70")}
              {...register("phone")}
            />
          </Field>

          <Field label="Company" error={errors.company?.message} htmlFor="nh-company">
            <input
              id="nh-company"
              autoComplete="organization"
              aria-invalid={!!errors.company}
              className={cn(fieldBase, errors.company && "border-red-500/70")}
              {...register("company")}
            />
          </Field>

          <Field label="Your role" error={errors.jobTitle?.message} htmlFor="nh-title" optional>
            <input
              id="nh-title"
              autoComplete="organization-title"
              placeholder="Head of Talent"
              className={cn(fieldBase, errors.jobTitle && "border-red-500/70")}
              {...register("jobTitle")}
            />
          </Field>

          <Field label="Hiring volume" error={errors.hiringVolume?.message} htmlFor="nh-volume">
            <select
              id="nh-volume"
              defaultValue=""
              aria-invalid={!!errors.hiringVolume}
              className={cn(fieldBase, errors.hiringVolume && "border-red-500/70")}
              {...register("hiringVolume")}
            >
              <option value="" disabled>
                Select a range…
              </option>
              {hiringVolumes.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field
            label="Which roles are you hiring for?"
            error={errors.roles?.message}
            htmlFor="nh-roles"
          >
            <input
              id="nh-roles"
              placeholder="e.g. Backend engineers, RNs, field sales"
              aria-invalid={!!errors.roles}
              className={cn(fieldBase, errors.roles && "border-red-500/70")}
              {...register("roles")}
            />
          </Field>

          <Field label="ATS / HR system" error={errors.ats?.message} htmlFor="nh-ats" optional>
            <input
              id="nh-ats"
              placeholder="Workday, Greenhouse, none…"
              className={cn(fieldBase, errors.ats && "border-red-500/70")}
              {...register("ats")}
            />
          </Field>
        </div>

        <div className="mt-4">
          <Field
            label="Anything else we should know?"
            error={errors.message?.message}
            htmlFor="nh-message"
            optional
          >
            <textarea
              id="nh-message"
              rows={3}
              className={cn(fieldBase, "resize-y", errors.message && "border-red-500/70")}
              {...register("message")}
            />
          </Field>
        </div>

        {serverError ? (
          <p role="alert" className="mt-4 text-sm text-red-500">
            {serverError} You can also email{" "}
            <a className="underline" href={`mailto:${site.contact.email}`}>
              {site.contact.email}
            </a>
            .
          </p>
        ) : null}
      </div>

      {/* Pinned action bar — always visible, no hunting for the button */}
      <div className="flex shrink-0 flex-col-reverse items-center gap-3 border-t border-border bg-surface-raised px-6 py-4 sm:flex-row sm:justify-between sm:px-8">
        <p className="text-center text-xs leading-relaxed text-muted/70 sm:text-left">
          30-day money-back guarantee · Founder beta pricing £1,000 one-time
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-none bg-accent px-6 py-3 font-semibold text-snow transition-colors hover:bg-accent-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-raised disabled:opacity-60 sm:w-auto"
        >
          {isSubmitting ? <Loader2 aria-hidden className="size-4 animate-spin" /> : null}
          {isSubmitting ? "Sending…" : "Book My Live Demo"}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  optional,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium">
        {label}
        {optional ? <span className="ml-1 text-muted/60">(optional)</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${htmlFor}-error`} className="mt-1.5 text-sm text-red-500">
          {error}
        </p>
      ) : null}
    </div>
  );
}
