-- Email signups table for Vercel Postgres
-- Run this SQL in your Vercel Postgres database to create the table

CREATE TABLE IF NOT EXISTS email_signups (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_email_signups_email ON email_signups(email);
CREATE INDEX IF NOT EXISTS idx_email_signups_created_at ON email_signups(created_at DESC);
