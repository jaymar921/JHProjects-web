# The API

Express, MongoDB and Nodemailer. Two jobs: record what people do on the project
pages, and get bug reports to the developer.

`src/app.js` exports the app and never calls `listen`. `src/index.js` runs it as
a Node process; `../api/index.js` hands the same app to Vercel. Nothing is
duplicated between the two.

## Endpoints

| Method | Path | What it does |
|---|---|---|
| `GET` | `/api/health` | What is configured, plus a real database ping |
| `POST` | `/api/track/view` | A project page was opened |
| `POST` | `/api/track/click` | A download, buy, donate or source button was hit |
| `POST` | `/api/track/batch` | Several events in one request |
| `GET` | `/api/stats` | Every project, plus a rolled up total. Signed in only |
| `GET` | `/api/stats/:project` | One project's counters. Signed in only |
| `GET` | `/api/stats/:project/events` | The raw rows behind one project. Signed in only |
| `GET` | `/api/bug-report/status` | Whether email delivery is switched on |
| `POST` | `/api/bug-report` | File a bug report |
| `GET` | `/api/admin/session` | Who, if anyone, this browser is signed in as |
| `POST` | `/api/admin/login` | Username and password in, session cookie out |
| `POST` | `/api/admin/logout` | Drops the session on both ends |
| `POST` | `/api/admin/password` | Replaces the password and rotates the session. Signed in only |

The tracking endpoints answer `202`, not `200`. The browser sends them with
`sendBeacon`, which cannot read a response and does not wait for one, so
"accepted, will be recorded" is the honest status.

The stats endpoints are not public. They take either the admin session cookie
that `/admin` holds, or, when `STATS_TOKEN` is set, an
`Authorization: Bearer <token>` header for something that cannot hold a cookie.
With no token configured the session is the only way in.

## The admin gateway

`/api/admin/*` is what `/admin` in the site talks to. Accounts are made from a
terminal with `npm run admin -- create`, which prints a temporary password once;
until it has been replaced, `requireAdmin` refuses every route except
`/api/admin/password`.

Passwords are salted scrypt hashes (`src/lib/password.js`). A session is 32
random bytes in an HttpOnly, SameSite=Strict cookie, stored as a SHA-256 hash so
a dump of `admin_sessions` cannot be replayed. `expiresAt` slides forward while
the session is used and is capped by `absoluteExpiresAt`, which never moves.
Changing a password bumps `passwordChangedAt`, which invalidates every session
opened before it.

The state changing routes also check the `Origin` header against the host, which
is a second lock behind the SameSite cookie rather than a replacement for it.

```bash
# Sign in and keep the cookie, then read the numbers with it
curl -c jar.txt -X POST http://localhost:4000/api/admin/login \
  -H 'Content-Type: application/json' \
  -d '{"username":"admin","password":"..."}'

curl -b jar.txt http://localhost:4000/api/stats
```


### Posting an event

```bash
curl -X POST http://localhost:4000/api/track/click \
  -H 'Content-Type: application/json' \
  -d '{
        "project": "kumandras-economy",
        "action": "download",
        "label": "DOWNLOAD FREE",
        "target": "https://www.spigotmc.org/resources/96466/",
        "path": "/kumandras-economy",
        "visitorId": "9f2c41ba7d6e4f18a3c05b7e12d84f60"
      }'
```

`project` has to be one of the slugs in `../shared/projects.js`; anything else is
a `400`. `action` falls back to `external` rather than failing, because a click
that was recorded under the wrong label is still worth more than no click.

## Collections

**`events`** — one document per view or click. Carries the project, the action
and label for clicks, the parsed device, the referrer host, the language, a
salted hash of the IP and the visitor and session ids. Expires after
`ANALYTICS_EVENT_TTL_DAYS`, which defaults to 180. Set it to `0` to keep them.

**`project_stats`** — one document per project, holding counters bumped with
`$inc`: `views`, `uniqueViews`, `clicks.total` and one per action, plus
breakdowns by device, OS and browser, and `clickActionDevices` so "how many buy
clicks came from a phone" is answerable without touching the raw rows. Never
expired, so the totals outlive the events they came from.

**`bug_reports`** — one document per report, with an `emailStatus` of `sent`,
`failed` or `skipped`. The report is written before the email is attempted, so a
report is never lost to an SMTP outage, and the failed ones can be found with
`db.bug_reports.find({ emailStatus: "failed" })`.

**`admin_users`** — one document per admin account: the username, a salted
scrypt hash, whether the password is a temporary one and when it expires, the
failed attempt counter and any lock. Never a password.

**`admin_sessions`** — one document per signed in session, keyed by a SHA-256
hash of the cookie value. Carries both clocks, `expiresAt` and
`absoluteExpiresAt`, and expires itself through a TTL index on the first of
them.

Indexes are built once per process, on first use.

## What is not recorded

No raw IP addresses. The address is hashed with `ANALYTICS_HASH_SALT` and
truncated, and the hash is only used for rate limiting and unique counting.

No full referrer URLs, only the host, because a search query or a private link
in the path is not something this site needs.

No traffic from bots in the counters. Crawlers and link preview fetchers are
recognised by their User-Agent, recorded with `counted: false`, and left out of
the totals. `navigator.doNotTrack` and Global Privacy Control are respected in
the browser, so those visits never reach here at all.

## Mail

Gmail over SMTP, which needs an App Password rather than the account password.
`.env.example` walks through generating one.

A report that saves but fails to send still comes back as a success, with
`emailed: false`. The report is safe, and telling the reporter it failed only
gets the same report filed three more times.

## Rate limiting

Fixed window, in memory, keyed on the hashed address: 120 tracking requests a
minute and 5 bug reports an hour by default.

On a serverless deploy each instance keeps its own counters, so a flood spread
across cold starts gets more through than those numbers suggest. That is
accepted. The limiter is here to stop an accidental loop and casual spam, not to
survive a real attack, and it costs nothing to run.
