# Aaliyan Ahmad Portfolio

A personal brand and engineering portfolio for Aaliyan Ahmad (Ibn Ishfaq), built on the custom **Carbon Editorial** visual system.

## Stack

Next.js 16, React, TypeScript, Tailwind CSS, ESLint, and `next/font`.
The hero progressively enhances with Three.js and React Three Fiber.

## Development

```bash
npm install
npm run dev
```

## Environment

The GitHub integration uses the optional `GITHUB_TOKEN` environment variable to
load contribution-calendar data through GitHub's GraphQL API. The token is read
only on the server; never prefix it with `NEXT_PUBLIC_`.

For local development, copy `.env.example` to `.env.local` and add your token.
Keep `.env.local` uncommitted. For production, add `GITHUB_TOKEN` in **Vercel
Project Settings → Environment Variables**.

Without a token, the site still builds and uses GitHub's public REST API for
profile and repository information when available.

## SEO and production URL

The verified canonical origin is centralized as `https://www.aaliyanahmad.tech` in
`src/data/site.ts`. `NEXT_PUBLIC_SITE_URL` can override it with another HTTPS
origin (without a path) from `.env.local` or Vercel Environment Variables.
If the override is configured in Vercel, keep it set to
`https://www.aaliyanahmad.tech` so it agrees with the production redirect.
Canonical URLs, absolute Open Graph image URLs, `robots.txt`, and `sitemap.xml`
are generated through the same URL helper.

Preview deployments are marked `noindex`; production remains crawlable. The
sitemap includes the homepage and every project route from
`src/data/projects.ts`, while project metadata and CreativeWork structured data
are generated from that same source. No external service is required to build
the metadata.

Search-engine favicon links use the stable `/favicon.ico` and
`/favicon-96x96.png` paths. After a production deployment, submit
`https://www.aaliyanahmad.tech/sitemap.xml` in Google Search Console and request
reindexing for the homepage. Search-result favicon updates depend on Google's
next crawl and are not immediate or guaranteed.

## EmailJS

The project-inquiry form uses the official `@emailjs/browser` package and remains
buildable when EmailJS is not configured. To enable delivery:

1. Create or connect an EmailJS email service.
2. Configure the service/template destination inbox as
   `aaliyanahmad146@gmail.com` in the EmailJS dashboard.
3. Create a contact template using `{{name}}`, `{{email}}`, `{{company}}`,
   `{{service}}`, `{{budget}}`, `{{message}}`, and `{{time}}`.
4. Configure the template's **Reply-To** value as `{{email}}`.
5. Add the Service ID, Template ID, and Public Key to `.env.local`:

   ```bash
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=
   ```

6. Add the same variables in Vercel Project Settings for production.
7. Restrict allowed origins to the local development origin when needed and the
   final Vercel/custom production domain.

Only the EmailJS public key belongs in browser configuration. Never add a private
or access key. If spam becomes a problem, EmailJS reCAPTCHA v2 can be enabled in
the template later without adding it to the site now.

## Generative hero grid

`HeroVisual` keeps a complete server-rendered `GridFallback` visible while
checking viewport size, reduced motion and WebGL2. Only eligible desktops at
1280px+ dynamically import `GenerativeGridCanvas`; mobile and tablet retain the
SVG terrain. Reduced-motion changes, failed imports, shader failures and lost
WebGL contexts return to the same fallback. No environment values are needed.

`grid-surface.ts` holds the art direction: a broad diagonal Gaussian ridge,
an offset valley, a smaller distant ridge and two low-amplitude trigonometric
terms. Only those last terms drift, over roughly two to three minutes. The
JavaScript height formula and GLSL equivalent live together; update both if
changing the shape. The SVG uses the same 38-degree perspective projection.

An 80×50 subdivided plane renders a 36×24 anti-aliased rectangular grid in a
custom shader. Three terrain-following copper routes are batched in one draw;
only the primary route carries a nine-second signal. Six surface nodes use one
additional draw. There are three draw calls, no lights, textures, postprocessing,
external models, particle field or per-frame geometry allocations.

Fine-pointer input is captured on the hero and projected through the actual
camera. A bounded height-field intersection finds the front surface crossing
and refines it with bisection, avoiding hits behind the ridge. An exponentially damped
Gaussian influence has radius 2.2 and maximum height 0.4, compared with the
primary ridge's 1.65 amplitude. Touch receives no pointer deformation. Shader
uniforms are updated directly in `useFrame`; React state is not updated per frame.

Rendering runs only while the hero is visible and the document is active,
switching to `frameloop="never"` otherwise. DPR is capped at 1.5 and elapsed-time
increments are clamped after pauses. Scroll gently fades and offsets the field.
The decorative layers have no pointer or keyboard targets and never change
the server-rendered heading, controls or reserved layout space.

Check 375, 430, 768, 1024, 1280, 1440 and 1920px widths, plus 1366×650 and
1440×700. In fresh reduced-motion/mobile/WebGL-disabled sessions, verify the
heavy 3D chunk is not requested. Test live preference changes, context loss,
pointer entry/exit, offscreen/hidden-tab pausing, and the no-JavaScript fallback.
The optional secondary terrain and annotations are deliberately omitted.

## Production build

```bash
npm run build
```
