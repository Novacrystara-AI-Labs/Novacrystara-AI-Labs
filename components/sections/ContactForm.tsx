"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { contactSchema, type ContactInput } from "@/lib/validation/contact";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

const fieldBase =
  "w-full rounded-none border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted/70 transition-colors focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

/** Discovery-session capture form (arch §2). RHF + Zod; posts to /api/contact.
 *  `bare` drops the outer card frame (used inside the CTA modal). */
export function ContactForm({ bare = false }: { bare?: boolean }) {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  async function onSubmit(values: ContactInput) {
    setServerError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
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
      <div
        className={cn(
          "flex flex-col items-center gap-4 text-center",
          !bare && "rounded-none border border-border bg-surface p-10",
        )}
      >
        <CheckCircle2 aria-hidden className="size-12 text-accent" />
        <h3 className="text-h3 font-semibold">Thanks — we&apos;ll be in touch.</h3>
        <p className="max-w-md text-pretty text-muted">
          We&apos;ve received your request and a NovaCrystara strategist will reach out shortly to
          schedule your discovery session.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className={cn(!bare && "rounded-none border border-border bg-surface p-6 sm:p-8")}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" error={errors.name?.message} htmlFor="name">
          <input
            id="name"
            autoComplete="name"
            aria-invalid={!!errors.name}
            className={cn(fieldBase, errors.name && "border-red-500/70")}
            {...register("name")}
          />
        </Field>

        <Field label="Work email" error={errors.email?.message} htmlFor="email">
          <input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            className={cn(fieldBase, errors.email && "border-red-500/70")}
            {...register("email")}
          />
        </Field>

        <Field label="Phone number" error={errors.phone?.message} htmlFor="phone">
          <input
            id="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+1 555 123 4567"
            aria-invalid={!!errors.phone}
            className={cn(fieldBase, errors.phone && "border-red-500/70")}
            {...register("phone")}
          />
        </Field>

        <Field label="Company" error={errors.company?.message} htmlFor="company" optional>
          <input
            id="company"
            autoComplete="organization"
            className={cn(fieldBase, errors.company && "border-red-500/70")}
            {...register("company")}
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field label="What are you trying to achieve?" error={errors.message?.message} htmlFor="message">
          <textarea
            id="message"
            rows={4}
            aria-invalid={!!errors.message}
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

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-none bg-accent px-6 py-3 font-medium text-snow transition-colors hover:bg-accent-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-60 sm:w-auto"
      >
        {isSubmitting ? <Loader2 aria-hidden className="size-4 animate-spin" /> : null}
        {isSubmitting ? "Sending…" : "Book a Discovery Session"}
      </button>
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
      <label htmlFor={htmlFor} className="mb-2 block text-sm font-medium">
        {label}
        {optional ? <span className="ml-1 text-muted">(optional)</span> : null}
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
