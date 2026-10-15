# The Reset Show — PAY MORE. GET LESS.

Version 4.0.0. Canonical publication: https://arisconstantinou.github.io/funny/

The USERS are the hosts and ask questions in the large cloud. The player controls
Tibo, the contestant, and picks the answer that serves Tibo/Sam rather than the
users. A self-serving choice triggers animated laughter, a cheering Sam, then a
large Shhhhhhh bubble. A helpful answer loses a chance and gets a comic veto;
it never opens sources or explains an actual solution. Background information
is only on the separate about.html page linked in the footer.

All character dialogue is invented parody, not a real quotation or a claim
about either person's beliefs. Generated cartoon sprites have animated layers;
there is no recorded or cloned voice. Sound is synthesized and optional.

## Editing
- index.html: roles, headings, stage, dialogue clouds and controls.
- questions-v4.js: 15 fictional questions, options, laughter and Sam's lines.
- game-v4.js: progression, life/checkpoint saves, audio and reactions.
- studio-v4.css: responsive layout and motion (respects reduced motion).
- assets/tibo.webp, assets/sam.webp: isolated generated cartoon art.
- about.html: optional background, separate from gameplay.

Static files; no build, external service or API key. Serve this directory, or
open index.html in a modern browser. Browser privacy settings may disable saves.
The save key is reset-show-v4 so the previous game's incompatible save is not
loaded. The old save is not deleted. Checkpoints at 5 and 10. 3 chances per run.

Keyboard: A–D or 1–4, Enter to lock/continue. Touch buttons on mobile. Desktop and
mobile viewport tests run with Playwright in qa-v4.py. Mobile tests are emulated,
not a claim of testing on a physical iPhone. No tracking, ads, or remote AI calls.
