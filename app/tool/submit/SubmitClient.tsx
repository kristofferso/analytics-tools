"use client";

import { useActionState } from "react";
import { submitTool } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import TextLink from "../../../components/elements/TextLink";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SubmitClient() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(submitTool, null);

  useEffect(() => {
    if (state?.success) {
      // Redirect to submitted page after a short delay for smooth UX
      const timer = setTimeout(() => {
        router.push("/tool/submitted");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [state?.success, router]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <TextLink href="/">← Back to overview</TextLink>
      
      <div className="mt-8 space-y-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Submit tool</h1>
          <p className="mt-2 text-muted-foreground">
            Are we missing an analytics tool in our overview? Submit it here, and
            we&apos;ll add it as fast as we can!
          </p>
        </div>

        {state?.success && (
          <div className="rounded-lg bg-primary/10 border border-primary/20 p-4 text-primary">
            <p className="font-medium">Tool submitted successfully!</p>
            <p className="text-sm mt-1 text-muted-foreground">Redirecting...</p>
          </div>
        )}

        {state?.error && (
          <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-4 text-destructive">
            <p className="font-medium">{state.error}</p>
          </div>
        )}

        <form action={formAction} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">
              Name of the tool <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="e.g., Google Analytics"
              required
              disabled={isPending}
              aria-invalid={state?.fieldErrors?.name ? "true" : "false"}
              aria-describedby={state?.fieldErrors?.name ? "name-error" : undefined}
              className={state?.fieldErrors?.name ? "border-destructive" : ""}
            />
            {state?.fieldErrors?.name && (
              <p id="name-error" className="text-sm text-destructive">
                {state.fieldErrors.name[0]}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="url">
              Website URL <span className="text-destructive">*</span>
            </Label>
            <Input
              id="url"
              name="url"
              placeholder="https://example.com"
              required
              disabled={isPending}
              aria-invalid={state?.fieldErrors?.url ? "true" : "false"}
              aria-describedby={state?.fieldErrors?.url ? "url-error" : undefined}
              className={state?.fieldErrors?.url ? "border-destructive" : ""}
            />
            {state?.fieldErrors?.url && (
              <p id="url-error" className="text-sm text-destructive">
                {state.fieldErrors.url[0]}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="comment">Comments or feedback (optional)</Label>
            <Textarea
              id="comment"
              name="comment"
              placeholder="Any additional information about the tool..."
              rows={4}
              disabled={isPending}
              aria-invalid={state?.fieldErrors?.comment ? "true" : "false"}
              aria-describedby={state?.fieldErrors?.comment ? "comment-error" : undefined}
              className={state?.fieldErrors?.comment ? "border-destructive" : ""}
            />
            {state?.fieldErrors?.comment && (
              <p id="comment-error" className="text-sm text-destructive">
                {state.fieldErrors.comment[0]}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="w-full sm:w-auto"
          >
            {isPending ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </div>
    </div>
  );
}
