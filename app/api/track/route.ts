import { getSupabaseServiceInstance } from "../../../utils/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const userHash = request.cookies.get("hash")?.value;
  const { name, props } = await request.json();

  if (userHash && name) {
    const supabase = getSupabaseServiceInstance();

    const { data, error } = await supabase.from("events").insert({
      visitor_id: userHash,
      name,
      props,
    });

    if (error) {
      console.error(error);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    } else {
      return NextResponse.json({ data: "track" });
    }
  }

  return NextResponse.json({ error: "Request error" }, { status: 500 });
}

