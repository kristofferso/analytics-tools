"use client";

import { useActionState, useEffect, useRef } from "react";
import { subscribeNewsletter, type NewsletterState } from "@/app/newsletter/actions";
import trackEvent from "@/utils/trackEvent";

interface NewsletterSignupProps {
  variant?: "inline" | "card" | "minimal";
  className?: string;
}

export default function NewsletterSignup({
  variant = "card",
  className = "",
}: NewsletterSignupProps) {
  const [state, formAction, isPending] = useActionState<NewsletterState | null, FormData>(
    subscribeNewsletter,
    null
  );
  const formRef = useRef<HTMLFormElement>(null);

  // Track events when state changes
  useEffect(() => {
    if (state?.success) {
      trackEvent({
        name: "newsletter signup success",
        props: { variant },
      });
      // Reset form after successful submission
      if (formRef.current) {
        formRef.current.reset();
      }
    } else if (state?.error) {
      trackEvent({
        name: "newsletter signup error",
        props: { variant, error: state.error },
      });
    }
  }, [state, variant]);

  if (variant === "minimal") {
    return (
      <form ref={formRef} action={formAction} className={`flex gap-2 ${className}`}>
        <input
          type="email"
          name="email"
          placeholder="Your email"
          required
          className="input input-bordered flex-1 min-w-0"
          disabled={isPending}
          aria-invalid={state?.fieldErrors?.email ? true : undefined}
          aria-describedby={state?.fieldErrors?.email ? "email-error" : undefined}
        />
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isPending || state?.success}
        >
          {isPending ? "..." : state?.success ? "✓" : "Subscribe"}
        </button>
        {state?.fieldErrors?.email && (
          <span id="email-error" className="text-sm text-red-600">
            {state.fieldErrors.email[0]}
          </span>
        )}
      </form>
    );
  }

  if (variant === "inline") {
    return (
      <div className={`flex flex-col gap-3 ${className}`}>
        <h3 className="text-lg font-semibold">Stay updated</h3>
        <p className="text-sm text-gray-600">
          Get the latest analytics tools and insights delivered to your inbox.
        </p>
        <form ref={formRef} action={formAction} className="flex flex-col gap-2">
          <div className="flex gap-2">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className={`input input-bordered flex-1 min-w-0 ${
                state?.fieldErrors?.email ? "input-error" : ""
              }`}
              disabled={isPending}
              aria-invalid={state?.fieldErrors?.email ? true : undefined}
              aria-describedby={state?.fieldErrors?.email ? "email-error-inline" : undefined}
            />
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isPending || state?.success}
            >
              {isPending ? "Subscribing..." : state?.success ? "Subscribed!" : "Subscribe"}
            </button>
          </div>
          {state?.fieldErrors?.email && (
            <p id="email-error-inline" className="text-sm text-red-600">
              {state.fieldErrors.email[0]}
            </p>
          )}
          {state?.message && (
            <p className={`text-sm ${state.success ? "text-green-600" : "text-red-600"}`}>
              {state.message}
            </p>
          )}
          {state?.error && (
            <p className="text-sm text-red-600">{state.error}</p>
          )}
        </form>
      </div>
    );
  }

  // Default card variant
  return (
    <div className={`card bg-base-200 shadow-xl ${className}`}>
      <div className="card-body">
        <h2 className="card-title">Stay Updated</h2>
        <p className="text-gray-600">
          Get the latest analytics tools, comparisons, and insights delivered to your inbox.
        </p>
        <form ref={formRef} action={formAction} className="flex flex-col gap-3 mt-4">
          <div className="flex flex-col gap-2">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className={`input input-bordered w-full ${
                state?.fieldErrors?.email ? "input-error" : ""
              }`}
              disabled={isPending}
              aria-invalid={state?.fieldErrors?.email ? true : undefined}
              aria-describedby={state?.fieldErrors?.email ? "email-error-card" : undefined}
            />
            {state?.fieldErrors?.email && (
              <p id="email-error-card" className="text-sm text-red-600">
                {state.fieldErrors.email[0]}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={isPending || state?.success}
          >
            {isPending
              ? "Subscribing..."
              : state?.success
              ? "Subscribed!"
              : "Subscribe to Newsletter"}
          </button>
          {state?.message && (
            <p className={`text-sm mt-2 ${state.success ? "text-green-600" : "text-red-600"}`}>
              {state.message}
            </p>
          )}
          {state?.error && (
            <p className="text-sm mt-2 text-red-600">{state.error}</p>
          )}
        </form>
        <p className="text-xs text-gray-500 mt-2">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </div>
  );
}

