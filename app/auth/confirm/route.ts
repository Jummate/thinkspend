import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

    console.log("AUTH_CONFIRM_DEBUG", {
    fullUrl: request.url,
    origin,
    code: code ? "present" : "missing",
    allParams: Object.fromEntries(searchParams.entries()),
  });

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(`${origin}/reset-password`);
    }
  }

  return NextResponse.redirect(`${origin}/reset-password?error=link_expired`);
}
