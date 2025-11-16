import { createHmac } from "crypto";
import getSalt from "../../../utils/getSalt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "0.0.0.0";
  const flatIp = ip?.split(".") || ["0", "0", "0", "0"];

  const ua = request.headers.get("user-agent") || "";
  const userId = ip + ua;

  const salt = await getSalt();
  if (!salt) {
    return NextResponse.json("Error", { status: 500 });
  }

  const secret = flatIp[2] + flatIp[3] + salt;

  const hash = createHmac("sha256", secret).update(userId).digest("hex");

  if (hash) return NextResponse.json({ hash });
  return NextResponse.json("Error", { status: 500 });
}

