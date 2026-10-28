# Automatic updates on GitHub Pages

`public/update.js` checks the ordinary `index.html` with `cache: no-store` at
startup, on focus/visibility/online events, and every 60 seconds while visible.
It compares the version plus module and stylesheet URLs, so a new hashed bundle
with the same displayed version is also detected. Before reloading it checks
that the new entry assets exist and persists an active round. Failed saves,
offline requests and incomplete deployments retain the current game. Retries
are bounded to avoid reload loops. The address stays `/frog/`.

`public/update-worker.js`, scoped to `/frog/`, fetches navigations from the
network instead of serving the browser's cached HTML. It stores no cache and
does not change localStorage, game assets, or other applications on this origin.
It also restores the updater hook in a later HTML response if it was omitted.

Future source builds must retain these two public files and the
`data-frog-updater` script in `source/index.html`. Vite copies the public files
into its output. `npm run build` checks these required hooks before building.
For static releases retain `frog/update.js`,
`frog/update-worker.js` and the same hook in `frog/index.html`; do not publish
only an entry file or remove the update infrastructure. The browser smoke test
also checks these source/production hooks.

The first installation cannot change a page already running an older release
that contains no updater. Once a browser has loaded this release, subsequent
published releases are detected automatically. Network access and a completed
Pages deployment are required; background tabs check when visible again.

Browser regression test: `node qa/update-smoke.mjs` with Playwright available.
For a bundled runtime set `FROG_PLAYWRIGHT` to its Playwright module directory.
The test uses the fixed project port in `qa/update-runtime.json`, simulated
releases and its own browser profile, never a player's saves.
