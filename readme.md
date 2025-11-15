# MineX — Advanced Starter (Next.js + Supabase)

Follow these steps (phone-friendly):

1. Create a Supabase project at https://app.supabase.com
2. In Supabase → SQL Editor → New query → paste `supabase/schema.sql` (file in repo) and Run.
3. In Supabase → Storage → create bucket `public` (public for testing).
4. Create a GitHub repo and upload these files (or paste them via "Create new file").
5. In Vercel → Import Project from GitHub → Deploy.
6. Add env vars in Vercel (Project → Settings → Environment Variables):
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
   - SUPABASE_SERVICE_ROLE_KEY (server-only)
   - ONESIGNAL_APP_ID (optional)
   - ONESIGNAL_API_KEY (optional, server-only)
7. Visit: /signup, /login, /create-post, /chat to test.

If you need step-by-step tapping help, say "help deploy".