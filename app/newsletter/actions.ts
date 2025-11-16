"use server";

import { z } from "zod";
import { getSupabaseServiceInstance } from "@/utils/supabase";

const newsletterSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .trim()
    .toLowerCase(),
});

export type NewsletterState = {
  success?: boolean;
  message?: string;
  error?: string;
  fieldErrors?: {
    email?: string[];
  };
};

export async function subscribeNewsletter(
  prevState: NewsletterState | null,
  formData: FormData
): Promise<NewsletterState> {
  try {
    // Parse and validate form data
    const rawData = {
      email: formData.get("email") as string,
    };

    const validationResult = newsletterSchema.safeParse(rawData);

    if (!validationResult.success) {
      return {
        success: false,
        fieldErrors: validationResult.error.flatten().fieldErrors,
        error: "Please enter a valid email address",
      };
    }

    const { email } = validationResult.data;

    // Store newsletter subscription in Supabase
    // You can also integrate with ConvertKit, Mailchimp, Substack, etc.
    const supabase = getSupabaseServiceInstance();

    // Check if email already exists
    const { data: existing } = await supabase
      .from("newsletter_subscriptions")
      .select("id")
      .eq("email", email)
      .single();

    if (existing) {
      return {
        success: true,
        message: "You're already subscribed! Thanks for your interest.",
      };
    }

    // Insert new subscription
    const { error } = await supabase
      .from("newsletter_subscriptions")
      .insert({
        email,
        subscribed_at: new Date().toISOString(),
        status: "pending", // or "confirmed" if you skip double opt-in
      });

    if (error) {
      console.error("Newsletter subscription error:", error);
      return {
        success: false,
        error: "Failed to subscribe. Please try again later.",
      };
    }

    // TODO: Send confirmation email or integrate with your email service
    // Examples:
    // - ConvertKit: https://developers.convertkit.com/
    // - Mailchimp: https://mailchimp.com/developer/
    // - Substack: Use their API
    // - Resend: https://resend.com/docs

    return {
      success: true,
      message: "Thanks for subscribing!",
    };
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    };
  }
}

