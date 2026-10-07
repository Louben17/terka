# Úklidová Guru

Web [uklidovaguru.cz](https://uklidovaguru.cz) – denní úklidové výzvy, články o vědomém úklidu a odkazy na Instagram [@uklidovaguru](https://www.instagram.com/uklidovaguru/).

**Stack:** Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · motion · Supabase (REST API)

## Spuštění

```bash
cp .env.example .env.local   # doplnit klíče
npm install
npm run dev
```

Bez Supabase klíčů web funguje taky – použije záložní výzvy ze [src/data/fallback-vyzvy.ts](src/data/fallback-vyzvy.ts).

## Jak to funguje

- **Výzvy** se načítají na serveru z tabulky `terka` (sloupce `text`, `autor`) a cachují se na 5 minut. Po změně v administraci se cache obnoví hned.
- **Výzva dne** je pro všechny stejná a mění se o půlnoci (pražský čas). Tlačítko „Další výzva“ míchá zbytek bez opakování, šipky ← → listují, ▶ zapne automatické střídání. Splněné výzvy se ukládají v prohlížeči (localStorage).
- **Články** jsou v [src/data/clanky.ts](src/data/clanky.ts) – nový článek = nový objekt v poli, stránka i sitemap se vygenerují samy.
- **Administrace** výzev je na `/login` → `/admin`. Session je podepsaná cookie (HMAC), platí 24 hodin.

## Proměnné prostředí

| Proměnná | Účel |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | URL Supabase projektu |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | veřejný klíč pro čtení výzev |
| `SUPABASE_SERVICE_ROLE_KEY` | zápis výzev z administrace |
| `ADMIN_USERNAME` | přihlašovací jméno (výchozí `uklidovaguru`) |
| `ADMIN_PASSWORD` | heslo do administrace (**povinné**) |
| `ADMIN_SESSION_SECRET` | tajný klíč pro podpis session (když chybí, použije se service role klíč) |
| `NEXT_PUBLIC_SITE_URL` | kanonická adresa webu (výchozí `https://www.uklidovaguru.cz`) |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | ověření v Google Search Console |

## SEO

- Kanonická doména je **www**. Canonical, sitemap i strukturovaná data se odvozují z `NEXT_PUBLIC_SITE_URL`.
- `*.vercel.app` dostává hlavičku `X-Robots-Tag: noindex` (viz [next.config.ts](next.config.ts)), aby nevznikal duplicitní obsah.
- Strukturovaná data: WebSite + Organization + Person (layout), FAQPage (homepage), BlogPosting + BreadcrumbList (články), CollectionPage (výpisy).
- Nový článek: doplnit `seoTitulek` (do ~60 znaků), `seoPopis` (do ~155 znaků), `shrnuti` a `vyzvyFiltr`. Slug bez diakritiky s hlavním klíčovým slovem. Při změně slugu přidat 301 přesměrování do `next.config.ts`.

## Struktura

```
src/
  app/(site)/        veřejný web – homepage, /uklidove-vyzvy, /clanky, /clanky/[slug]
  app/admin, login   administrace výzev
  app/api/           auth + CRUD výzev
  components/        sekce a UI (ChallengeHero, Marquee, Bubbles…)
  data/              články, záložní výzvy, nastavení webu
  lib/               Supabase REST klient, session, načítání výzev
  proxy.ts           ochrana /admin a /api/admin
```
