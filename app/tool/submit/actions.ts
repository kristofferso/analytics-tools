"use server";

import { z } from "zod";
import { getSupabaseServiceInstance } from "@/utils/supabase";
import { revalidatePath } from "next/cache";
import { randomUUID } from "crypto";

const submitToolSchema = z.object({
  name: z
    .string()
    .min(1, "Tool name is required")
    .max(100, "Tool name must be less than 100 characters")
    .trim(),
  url: z
    .string()
    .min(1, "Website URL is required")
    .url("Please enter a valid URL")
    .trim(),
  comment: z
    .string()
    .max(1000, "Comment must be less than 1000 characters")
    .optional()
    .default(""),
});

export type SubmitToolState = {
  success?: boolean;
  error?: string;
  fieldErrors?: {
    name?: string[];
    url?: string[];
    comment?: string[];
  };
};

export async function submitTool(
  prevState: SubmitToolState | null,
  formData: FormData
): Promise<SubmitToolState> {
  try {
    // Parse and validate form data
    const rawData = {
      name: formData.get("name") as string,
      url: formData.get("url") as string,
      comment: (formData.get("comment") as string) || "",
    };

    const validationResult = submitToolSchema.safeParse(rawData);

    if (!validationResult.success) {
      return {
        success: false,
        fieldErrors: validationResult.error.flatten().fieldErrors,
      };
    }

    const { name, url } = validationResult.data;

    // Insert into Supabase with minimal required fields
    // Other fields will be filled in by admin review
    const supabase = getSupabaseServiceInstance();
    const { error } = await supabase.from("tools").insert({
      name,
      url,
      is_published: false,
      // Set default values for required fields that will be updated later
      type: "web analytics", // default, can be updated
      price_starting: 0,
      cookie_based: false,
      hosting: "cloud",
      open_source: false,
      privacy_friendly: false,
      analysis_level: "simple",
      color_tint: "gray",
    });

    if (error) {
      console.error("Supabase error:", error);
      return {
        success: false,
        error: "Failed to submit tool. Please try again later.",
      };
    }

    revalidatePath("/tool/submit");
    return { success: true };
  } catch (error) {
    console.error("Unexpected error:", error);
    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    };
  }
}

