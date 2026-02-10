# Email Signup Setup Guide

This guide explains how to set up the email signup form with Neon database on Vercel.

## Prerequisites

- A Vercel account
- A Neon database (free tier available)

## Setup Steps

### 1. Create a Neon Database

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to your project's **Storage** tab
3. Click **Create Database** and select **Neon**
4. Follow the prompts to create your database
5. Copy the connection string (it will be automatically added as `DATABASE_URL` environment variable)

Alternatively, you can create a Neon database directly at [neon.tech](https://neon.tech) and add the connection string manually.

### 2. Run the Database Schema

1. In your Vercel project dashboard, go to **Storage** → **Neon** → **Data**
2. Open the SQL Editor
3. Copy and paste the contents of `schema.sql`:
   ```sql
   CREATE TABLE IF NOT EXISTS email_signups (
     id SERIAL PRIMARY KEY,
     email VARCHAR(255) UNIQUE NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   CREATE INDEX IF NOT EXISTS idx_email_signups_email ON email_signups(email);
   CREATE INDEX IF NOT EXISTS idx_email_signups_created_at ON email_signups(created_at DESC);
   ```
4. Execute the SQL to create the table

### 3. Environment Variables

The `DATABASE_URL` environment variable should be automatically set by Vercel when you create the Neon database through the Vercel dashboard.

**Important**: Use the **pooled connection string** (`DATABASE_URL`) - this is the one that ends with `-pooler` in the hostname. This is recommended for serverless functions and handles connection pooling automatically.

If you created the database manually:
1. Go to **Settings** → **Environment Variables**
2. Add `DATABASE_URL` with your Neon pooled connection string (the one with `-pooler` in the hostname)
3. Make sure to add it for all environments (Production, Preview, Development)

Example format:
```
DATABASE_URL=postgresql://neondb_owner:password@ep-xxx-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require
```

### 4. Deploy

After setting up the database and environment variables:
1. Push your changes to GitHub
2. Vercel will automatically deploy
3. The email signup form will be available on your site

## Testing Locally

For local development:

1. Copy `.env.example` to `.env.local`
2. Add your `DATABASE_URL` to `.env.local`
3. Run `npm run dev`
4. The form should work with your Neon database

## Viewing Signups

You can view collected emails in:
- **Vercel Dashboard** → **Storage** → **Neon** → **Data** → `email_signups` table
- Or connect any PostgreSQL client using your `DATABASE_URL`

## Notes

- The form prevents duplicate emails using a unique constraint
- All emails are stored in lowercase for consistency
- The `created_at` timestamp is automatically set when an email is added
