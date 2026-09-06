-- Email signups table for Supabase
-- Apply via the Supabase dashboard SQL editor (or `supabase db push` / a CLI migration).

CREATE TABLE IF NOT EXISTS email_signups (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on created_at for sorted listings
-- (the UNIQUE constraint on email already provides an index for email lookups)
CREATE INDEX IF NOT EXISTS idx_email_signups_created_at ON email_signups(created_at DESC);

-- Lock the table down: RLS enabled with NO policies.
-- The API route uses the Supabase secret (service-role) key, which bypasses RLS;
-- anon/authenticated clients must have no access to this table.
ALTER TABLE email_signups ENABLE ROW LEVEL SECURITY;
