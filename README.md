# FF Paid Zone Push

A premium, offline-capable PWA for a Free Fire zone-push booking service. Pure HTML/CSS/JS — no build step, no framework, no backend.

## Structure

```
index.html          Home — hero, features, deposit info, order form
faq.html             Searchable FAQ (accordion)
about.html           About Us
privacy.html         Privacy Policy
terms.html           Terms & Conditions (incl. sample refund policy)
contact.html         WhatsApp / Instagram (coming soon) / AI Support
offline.html         Shown when there's no connection and no cached page
manifest.json        PWA manifest
service-worker.js    Offline caching (app shell + runtime cache)
css/styles.css       Design tokens, reset, base styles
css/components.css   Nav, hero, forms, chat widget, FAQ, footer, etc.
js/i18n.js           English/Hinglish dictionary + language gate
js/faq-data.js       ⭐ THE editable file — all Q&A content + AI Support patterns
js/support-engine.js Fuzzy matching engine + Telegram logging
js/particles.js      Canvas ember background
js/main.js           Loader, nav, ripple, sound toggle, SW registration, install prompt
js/order.js          Order form validation + WhatsApp handoff
js/chat-widget.js    Floating AI Support chat UI
js/faq-page.js       FAQ page accordion + search (faq.html only)
icons/                App icons (original zone-ring mark, not Free Fire's assets)
```

## Editing AI Support / FAQ content

Everything AI Support knows lives in **`js/faq-data.js`**. To add a question:
1. Copy an existing entry.
2. Fill in `question` and `answer` for both `en` and `hi`.
3. Add a few example `patterns` in both languages (typos and short forms are fine — the matcher tolerates those on its own).

No other file needs to change — both the FAQ page and the chat widget read from this one array.

## Two things worth knowing before you deploy

**1. The Telegram bot token is hardcoded in `js/support-engine.js`.** That's what you asked for — this is a no-backend site, so there's no server to hide it behind. In practice that means anyone who views page source (or browses your GitHub repo, if it's public) can read the token and could send messages through that bot. It'll work fine as-is; if it's ever abused, regenerate the token via @BotFather in two minutes, or later move the `sendMessage` call behind a Netlify Function to keep it server-side.

**2. A few placeholder domain URLs.** `ffpaidzonepush.netlify.app` is used in canonical links, Open Graph tags, and `sitemap.xml`/`robots.txt` since your real domain isn't known yet. Find-and-replace it with your actual domain after deploying.

## Deploy (GitHub → Netlify)

1. Push this folder to a new GitHub repo.
2. In Netlify: **Add new site → Import an existing project → GitHub** → select the repo.
3. Build command: none. Publish directory: `/` (repo root).
4. Deploy. Then swap the placeholder domain in the files above for your real Netlify/custom URL.

## Notes

- Legal pages (Privacy, Terms, About) are in English throughout; UI chrome (nav, buttons, forms, FAQ, AI Support) is fully bilingual. Say the word if you want the legal pages translated too.
- Refund policy in `terms.html` is a reasonable default — edit it if your actual policy differs.
