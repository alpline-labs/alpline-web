import { neon } from "@neondatabase/serverless";
import { NextRequest, NextResponse } from "next/server";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const sql = neon(process.env.DATABASE_URL);

export async function POST(req: NextRequest) {
  try {
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
    // Using ON CONFLICT to prevent duplicate emails
    await sql`
      INSERT INTO email_signups (email, created_at)
      VALUES (${email.toLowerCase()}, NOW())
      ON CONFLICT (email) DO NOTHING
    `;

    return NextResponse.json(
      { success: true, message: "Email added successfully" },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Email signup error:", error);

    // Handle unique constraint violation (duplicate email)
    if (error.code === "23505") {
      return NextResponse.json(
        { success: false, error: "This email is already registered" },
        { status: 409 },
      );
    }

    return NextResponse.json(
      { success: false, error: "Failed to add email. Please try again." },
      { status: 500 },
    );
  }
}
