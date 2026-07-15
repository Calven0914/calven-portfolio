# Trigger Lab

A Vercel-ready static demo with GSAP ScrollTrigger animation and a tiny
serverless endpoint for public Supabase configuration.

## Run locally

Use any static server from the project root:

```bash
npx serve .
```

The Supabase status card expects Vercel-style environment variables:

```bash
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-public-anon-key
```

## Deploy on Vercel

1. Import the GitHub repository into Vercel.
2. Add `SUPABASE_URL` and `SUPABASE_ANON_KEY` in Project Settings.
3. Deploy with the default static settings.

The GSAP scripts are loaded from CDN and the Supabase browser client loads only
after `/api/env` returns public configuration.
