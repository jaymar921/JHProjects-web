# JHProjects

The site behind JayMar921's plugins and libraries: Custom Enchantments 3,
Kumandra's Economy, 2dgraphic-utils and the archived projects.

A React front end built with Vite, and a small Express API that records how each
project page is doing and takes bug reports.

## Layout

```
.
├── index.html               one HTML entry per page, each with its own Open
├── customenchantments3.html   Graph tags, because link preview crawlers do not
├── kumandras-economy.html     run JavaScript
├── ...
│
├── shared/
│   └── projects.js          the project slugs, imported by BOTH the browser and
│                            the server so a typo fails loudly
├── src/                     the browser
│   ├── lib/
│   │   ├── analytics/       view and click tracking, and the visitor id
│   │   ├── api/             the fetch wrapper and the bug report calls
│   │   └── navigation.js    RedirectTo, moved out of components
│   ├── components/
│   │   ├── pages/           one component per route
│   │   ├── page_components/ the shared UI kit and the bug report form
│   │   └── contants/        page copy and data, kept out of the markup
│   └── assets/
│
├── server/                  the API
│   └── src/
│       ├── app.js           the Express app, with CORS and error handling
│       ├── index.js         runs it as a normal Node process
│       ├── config/env.js    every environment value, read in one place
│       ├── db/              the cached Mongo connection and the indexes
│       ├── lib/             UA parsing, rate limiting, input validation
│       ├── routes/          track, stats, bug-report, health
│       └── services/        analytics, mailer, bug reports
│
├── api/
│   └── index.js             the Vercel entry point, which hands Vercel the very
│                            same Express app
│
└── scripts/                 the SVG art generators
```

The API is deliberately not a second deployment. `server/src/app.js` exports an
Express app and never calls `listen`, so the same app runs as a local Node
process in development and as a Vercel function in production. There is one copy
of the routing.

## Running it

```bash
npm install
cp .env.example .env      # then fill in MONGODB_URI and the SMTP details
npm run dev:all           # front end on 5173, API on 4000
```

`npm run dev:all` runs both halves. The Vite dev server proxies `/api` to the
API process, which is exactly what Vercel does in production, so browser code
always calls a relative `/api/...` with no environment specific branch.

| Command | What it does |
|---|---|
| `npm run dev` | Front end only |
| `npm run dev:api` | API only, restarting on change |
| `npm run dev:all` | Both |
| `npm run build` | Production build into `dist/` |
| `npm run lint` | ESLint over the browser and server code |
| `npm start` | The API, for a host that runs a normal Node process |

`GET /api/health` reports what is configured and pings the database, which is
the quickest way to find out whether `.env` is right.

## Environment

Everything is documented in `.env.example`, including how to generate the Gmail
App Password the bug report mailer needs. On Vercel the same keys go in Project
Settings, Environment Variables.

Two worth calling out:

- **`ANALYTICS_HASH_SALT`** salts the one way hash of a visitor's IP. The raw
  address is never stored. Changing the salt resets the unique visitor counts,
  so set it once and leave it.
- **`CORS_ALLOWED_ORIGINS`** is empty in development, which allows any origin
  and covers localhost and preview URLs at once. Set it in production to the
  real site origins so another site cannot post events into your numbers.

## What gets recorded

A view when a project page opens, and a click on any download, buy, donate or
source button. Each one carries the project slug, the device type, the operating
system and the browser, all parsed from the User-Agent on the server rather than
trusted from the body.

Raw events go in `events`; counters are incremented on one document per project
in `project_stats`, so reading the numbers back never scans the events. Bots are
recorded but left out of the counters, so a link preview fetch does not read as a
visit, and `navigator.doNotTrack` is respected.

`GET /api/stats` returns every project plus a rolled up total. Set `STATS_TOKEN`
to put it behind a bearer token.

See `server/README.md` for the endpoints and the document shapes.

## Deploying

Vercel builds `dist/` and serves `api/index.js` for every `/api/*` path, which
`vercel.json` routes. The rest of that file maps each plugin route to its own
HTML entry so the Open Graph tags survive.
