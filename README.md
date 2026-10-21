# Osobola

Osobola is a responsive landing page for a practical AI assisted coding course. It is built with Next.js App Router, TypeScript, Tailwind CSS, Motion, and Lucide React.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser. The production build and checks are available with:

```bash
npm run lint
npm run typecheck
npm run build
```

## Configure before launch

- Set `NEXT_PUBLIC_SITE_URL` to the canonical production URL. See `.env.example`.
- Replace the example `hello@osobola.example` contact address in `app/page.tsx`.
- Add the real enrollment destination and any course pricing when those are available.
- Replace the privacy and terms contact links with the published policy pages when they exist.

The page does not collect payments, provide account sign in, or play a video until those integrations are configured.
