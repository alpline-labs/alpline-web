# Email Signup Setup Guide

This guide explains how to set up the email signup form with Supabase.

## Prerequisites

- A Supabase project (free tier is fine) — this repo points at
  `https://kjnuzuagvjkwbsyxmqep.supabase.co`
- A Vercel account (for deployment)

## Setup Steps

### 1. Create the Table

1. Open the [Supabase dashboard](https://supabase.com/dashboard) and select the project
2. Go to **SQL Editor**
3. Paste and run the contents of `schema.sql`:

   ```sql
   CREATE TABLE IF NOT EXISTS email_signups (
     id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
     email VARCHAR(255) UNIQUE NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   CREATE INDEX IF NOT EXISTS idx_email_signups_created_at ON email_signups(created_at DESC);

   ALTER TABLE email_signups ENABLE ROW LEVEL SECURITY;
   ```

   (Alternatively apply it as a CLI migration: `supabase migration new email_signups`,
   paste the SQL into the generated file, then `supabase db push`.)

**Security model**: RLS is enabled with **no policies on purpose**. The API route
uses the secret (service-role) key, which bypasses RLS; anonymous and
authenticated clients get no access to the table at all. Do not add policies
unless you deliberately want client-side access.

### 2. Environment Variables

The route reads two server-only variables (no `NEXT_PUBLIC_` prefix — the secret
key must never reach the browser):

```
SUPABASE_URL=https://kjnuzuagvjkwbsyxmqep.supabase.co
SUPABASE_SECRET_KEY=<secret key>
```

Get the secret key from the Supabase dashboard: **Project Settings → API keys →
secret key**.

On Vercel:

1. Go to **Settings → Environment Variables**
2. Add `SUPABASE_URL` and `SUPABASE_SECRET_KEY`
3. Enable them for **Production**, **Preview**, and **Development**

### 3. Deploy

1. Push your changes to GitHub
2. Vercel deploys automatically
3. The email signup form will be available on the site

## Testing Locally

1. Copy `.env.example` to `.env.local` (or edit the existing `.env.local`)
2. Fill in `SUPABASE_SECRET_KEY`
3. Run `npm run dev`
4. Submit the form on the landing page

## Migrating Existing Rows from Neon

The old Neon database still holds signups collected before the cutover. To move
them, dump from Neon and load into Supabase (both connection strings are
standard Postgres URLs — Supabase's is under **Project Settings → Database →
Connection string**):

```bash
psql "$NEON_DATABASE_URL" -c "\copy (SELECT email, created_at FROM email_signups ORDER BY id) TO '/tmp/signups.csv' CSV" \
  && psql "$SUPABASE_DB_URL" -c "\copy email_signups (email, created_at) FROM '/tmp/signups.csv' CSV"
```

Duplicates will fail the whole `\copy` because of the unique constraint; if the
Supabase table already has rows, load into a temp table and
`INSERT ... SELECT ... ON CONFLICT (email) DO NOTHING` instead.

## Viewing Signups

- **Supabase dashboard** → **Table Editor** → `email_signups`
- Or connect any PostgreSQL client using the Supabase database connection string

## Notes

- The form prevents duplicate emails using a unique constraint (the API returns
  409 for duplicates)
- All emails are stored in lowercase for consistency
- The `created_at` timestamp is automatically set when an email is added
