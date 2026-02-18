# Meme Generator (Next.js 16 + InstantDB)

A minimal meme creator with a signed-in gallery and upvotes. Built with Next.js 16, InstantDB (auth with magic-link 6-digit code, database, and storage), and a clean, minimal UI.

## Features

- **Auth**: Sign in with email; receive a 6-digit code to verify (InstantDB magic code).
- **Create**: Meme editor (upload image or use templates), add/move/resize text, colors, download PNG, or post to gallery.
- **Gallery**: Feed of posted memes; upvote (requires sign-in). Only signed-in users can post or upvote.

## Setup

1. **Install and run**

   ```bash
   npm install
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

2. **InstantDB schema and permissions**

   The app uses InstantDB app ID `9c63eab6-a43a-42ae-b6a0-d401cc2082ba`. Push the schema and permissions from this repo:

   ```bash
   npx instant-cli@latest init   # if you need to log in / link the app
   npx instant-cli@latest push  # push instant.schema.ts and instant.perms.ts
   ```

   If the CLI asks for an app, ensure it uses the same app ID (or set `NEXT_PUBLIC_INSTANT_APP_ID` in `.env.local` to match).

3. **Environment**

   `.env.local` is set with `NEXT_PUBLIC_INSTANT_APP_ID=9c63eab6-a43a-42ae-b6a0-d401cc2082ba`. Change it if you use a different Instant app.

## Project layout

- `app/page.tsx` – Home: sign-in or meme creator.
- `app/gallery/page.tsx` – Gallery feed and upvotes (sign-in required).
- `app/components/Login.tsx` – Magic-link (email + 6-digit code) sign-in.
- `app/components/AppShell.tsx` – Header with Create / Gallery nav and sign out.
- `app/components/MemeGenerator.tsx` – Canvas meme editor and “Post to gallery”.
- `instant.schema.ts` – InstantDB schema (memes, upvotes, `$files`, `$users`).
- `instant.perms.ts` – Permissions (create memes/upvotes and `$files` only when signed in).

## Templates

To use template images in the sidebar, add files under `public/assets/` (e.g. `public/assets/1.jpg`). The Create page will list images from that folder if you add their names to the `TEMPLATES` array in `app/components/MemeGenerator.tsx`.
