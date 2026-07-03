/* ==========================================================================
   SUPPORT ENGINE — no-backend fuzzy matching + silent Telegram logging.

   How matching works (no AI model, pure JS):
   1. normalize(): lowercase, strip punctuation, expand common short forms
      ("h" -> "hai", "ky" -> "kya", "wrk" -> "work", etc.)
   2. Every FAQ_DATA entry has a few example "patterns" in both languages.
   3. We compare the user's message against every pattern using a mix of
      whole-string similarity and per-word fuzzy matching (Levenshtein
      distance), so small typos and reordered words still hit.
   4. Highest-scoring entry above the threshold wins; otherwise we return
      the fallback message in the visitor's selected language.

   TELEGRAM CONFIG — replace these two values if you rotate the bot token.
   NOTE: this runs client-side, so the token is visible to anyone who views
   the page source or the GitHub repo. That's expected for a no-backend
   setup — if it's ever abused, regenerate the token with @BotFather, or
   move this call behind a Netlify Function later to keep it server-side.
   ========================================================================== */

const SupportEngine = (() => {
  const TELEGRAM_BOT_TOKEN = "8963698444:AAExQWd71iMnW8tfiGGilZ9p4O5wc1SfV4I";
  const TELEGRAM_CHAT_ID = "8448891128";
  const MATCH_THRESHOLD = 0.62;
  const VISITOR_KEY = "ffpzp_visitor_id";

  // Common Hinglish / chat short-forms -> expanded form, used before matching.
  const SHORTHAND = {
    h: "hai", hu: "hoon", ho: "ho", hota: "hota", hta: "hota", hga: "hoga",
    km: "kaam", kam: "kaam", ky: "kya", kyu: "kyun", kyun: "kyun",
    kse: "kaise", kese: "kaise", kaise: "kaise",
    ni: "nahi", nhi: "nahi", nahi: "nahi",
    pls: "please", plz: "please", pls2: "please",
    u: "you", r: "are", ur: "your",
    wat: "what", wt: "what", wrk: "work", wrking: "working",
    kro: "karo", krna: "karna", krte: "karte", kr: "kar",
    chlta: "chalta", chlega: "chalega",
    dep: "deposit", depst: "deposit", depo: "deposit",
    rvive: "revive", rivive: "revive", revie: "revive", rvv: "revive",
    tim: "time", tme: "time",
    pymnt: "payment", pyment: "payment", pymt: "payment",
    wrking: "working", wrkng: "working",
    m: "mein", se: "se", to: "to",
    gonna: "going to", wanna: "want to",
  };

  function levenshtein(a, b) {
    const m = a.length, n = b.length;
    if (m === 0) return n;
    if (n === 0) return m;
    const dp = new Array(n + 1);
    for (let j = 0; j <= n; j++) dp[j] = j;
    for (let i = 1; i <= m; i++) {
      let prev = dp[0];
      dp[0] = i;
      for (let j = 1; j <= n; j++) {
        const tmp = dp[j];
        dp[j] = a[i - 1] === b[j - 1] ? prev : 1 + Math.min(prev, dp[j], dp[j - 1]);
        prev = tmp;
      }
    }
    return dp[n];
  }

  function tokenSimilarity(a, b) {
    if (a === b) return 1;
    const dist = levenshtein(a, b);
    return 1 - dist / Math.max(a.length, b.length, 1);
  }

  function normalize(text) {
    return text
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s]/gu, " ") // strip punctuation, keep letters/numbers (unicode-safe)
      .split(/\s+/)
      .filter(Boolean)
      .map((w) => SHORTHAND[w] || w)
      .join(" ");
  }

  function wholeStringSimilarity(a, b) {
    return tokenSimilarity(a, b);
  }

  function tokenOverlapScore(inputNorm, patternNorm) {
    const inputTokens = inputNorm.split(" ").filter(Boolean);
    const patternTokens = patternNorm.split(" ").filter(Boolean);
    if (!patternTokens.length || !inputTokens.length) return 0;
    let matched = 0;
    patternTokens.forEach((pt) => {
      let best = 0;
      inputTokens.forEach((it) => {
        const s = tokenSimilarity(it, pt);
        if (s > best) best = s;
      });
      if (best >= 0.72) matched += 1;
    });
    return matched / patternTokens.length;
  }

  function scoreAgainstPattern(inputNorm, pattern) {
    const patternNorm = normalize(pattern);
    const overlap = tokenOverlapScore(inputNorm, patternNorm);
    const whole = wholeStringSimilarity(inputNorm, patternNorm);
    // Weighted blend: token overlap catches reordering/typos, whole-string
    // similarity rewards near-identical short phrases.
    return overlap * 0.75 + whole * 0.25;
  }

  function findBestAnswer(userMessage, lang) {
    const inputNorm = normalize(userMessage);
    let best = { score: 0, entry: null };

    FAQ_DATA.forEach((entry) => {
      const allPatterns = [...(entry.patterns.en || []), ...(entry.patterns.hi || [])];
      allPatterns.forEach((pattern) => {
        const score = scoreAgainstPattern(inputNorm, pattern);
        if (score > best.score) best = { score, entry };
      });
    });

    if (best.entry && best.score >= MATCH_THRESHOLD) {
      return best.entry.answer[lang] || best.entry.answer.en;
    }
    return null; // caller falls back to the localized "didn't understand" message
  }

  function getVisitorId() {
    let id = localStorage.getItem(VISITOR_KEY);
    if (!id) {
      id = "v_" + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
      localStorage.setItem(VISITOR_KEY, id);
    }
    return id;
  }

  /** Fire-and-forget log to Telegram. Never blocks or errors out to the user. */
  function logToTelegram(userMessage, lang) {
    try {
      const now = new Date();
      const text = [
        "\ud83c\udfae *FF Paid Zone Push \u2014 AI Support*",
        `*Question:* ${userMessage}`,
        `*Language:* ${lang === "hi" ? "Hinglish" : "English"}`,
        `*Date:* ${now.toLocaleDateString()}`,
        `*Time:* ${now.toLocaleTimeString()}`,
        `*Browser:* ${navigator.userAgent}`,
        `*Visitor ID:* ${getVisitorId()}`,
        `*Page:* ${location.pathname}`,
      ].join("\n");

      const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text, parse_mode: "Markdown" }),
      }).catch(() => {
        /* silent: a failed log should never interrupt the chat experience */
      });
    } catch (e) {
      /* silent by design */
    }
  }

  /** Public entry point used by the chat widget. */
  function ask(userMessage, lang) {
    logToTelegram(userMessage, lang);
    return findBestAnswer(userMessage, lang);
  }

  return { ask, normalize, tokenSimilarity, findBestAnswer };
})();
