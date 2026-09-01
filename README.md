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
│   │   ├── pages/           one component per route, plus the admin dashboard
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
│       ├── lib/             UA parsing, rate limiting, validation, the admin guard
│       ├── routes/          track, stats, bug-report, health, admin
│       └── services/        analytics, mailer, bug reports, admin auth
│
├── api/
│   └── index.js             the Vercel entry point, which hands Vercel the very
│                            same Express app
│
└── scripts/                 the SVG art generators, and admin-account.mjs,
                             which is the only way an admin account is made
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

`GET /api/stats` returns every project plus a rolled up total. It is not public:
it wants the admin session cookie, or a bearer token if `STATS_TOKEN` is set for
something that cannot hold a cookie.

See `server/README.md` for the endpoints and the document shapes.

## The admin dashboard

The numbers are read at **`/admin`**. It is not linked from anywhere on the
site, it is disallowed for every crawler in `robots.txt`, and it is served with
a `noindex` header and meta tag. None of that is the security; the security is
that `GET /api/stats` refuses every request without a session.

There is no sign up form and no password reset by email. An account is created
from a terminal that already holds the database credentials:

```bash
npm run admin -- create            # username defaults to "admin"
npm run admin -- create jaymar     # or pick one
```

That prints a temporary password once. It expires after
`ADMIN_TEMP_PASSWORD_HOURS`, and it only opens the change password screen: the
dashboard stays shut until a real password has been set. The other commands:

```bash
npm run admin -- reset  <username>   # issue a fresh temporary password
npm run admin -- list                # accounts and their state
npm run admin -- revoke <username>   # sign every browser out of that account
npm run admin -- delete <username>
```

What is holding the door:

- Passwords are stored as salted **scrypt** hashes and nothing else. A wrong
  username costs the same time as a wrong password, so a fast `401` cannot be
  used to find out which accounts exist.
- The session is a random token in an **HttpOnly, SameSite=Strict** cookie; the
  database only ever holds a hash of it. No script on the page can read it, and
  a leaked dump of the collection is not a set of usable sessions.
- Sessions go stale after `ADMIN_SESSION_IDLE_MINUTES` of silence and end after
  `ADMIN_SESSION_MAX_HOURS` however busy they were. Changing the password ends
  every other one immediately.
- Five wrong passwords stand the account down for fifteen minutes, and a single
  address only gets ten login attempts a quarter of an hour whatever username
  it tries.
- The dashboard is a lazily loaded route, so a visitor who never opens `/admin`
  never downloads any of it.

The page itself is one call to `GET /api/stats` on load and a quiet refresh a
minute while the tab is visible: headline totals, views by project, breakdowns
by device, OS and browser, a sortable table of every project, and the raw
events behind whichever row you open.

## Deploying

Vercel builds `dist/` and serves `api/index.js` for every `/api/*` path, which
`vercel.json` routes. The rest of that file maps each plugin route to its own
HTML entry so the Open Graph tags survive.
