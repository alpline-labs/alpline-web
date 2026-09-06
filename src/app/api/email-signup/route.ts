import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

// Lazily create the Supabase client so the route can be built/imported
// without the env vars present. Server-only: the secret key bypasses RLS
// and must never be exposed to the browser (no NEXT_PUBLIC_ prefix).
function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY;
  if (!url || !secretKey) {
    throw new Error(
      "SUPABASE_URL and SUPABASE_SECRET_KEY environment variables are not set",
    );
  }
  return createClient(url, secretKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export async function POST(req: NextRequest) {
  try {
    const supabase = getSupabase();
    const { email } = await req.json();

    // Validate email
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { success: false, error: "Email is required" },
        { status: 400 },
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email format" },
        { status: 400 },
      );
    }

    // Insert email into database
    const { error } = await supabase
      .from("email_signups")
      .insert({ email: email.toLowerCase() });

    if (error) {
      // Duplicate email: treat as success, matching the previous
      // ON CONFLICT DO NOTHING behavior (no signal to the visitor).
      if (error.code === "23505") {
        return NextResponse.json(
          { success: true, message: "Email added successfully" },
          { status: 200 },
        );
      }
      throw error;
    }

    return NextResponse.json(
      { success: true, message: "Email added successfully" },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Email signup error:", error);

    return NextResponse.json(
      { success: false, error: "Failed to add email. Please try again." },
      { status: 500 },
    );
  }
}
