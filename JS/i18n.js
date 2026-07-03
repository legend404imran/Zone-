/* ==========================================================================
   I18N — language dictionary + first-visit language gate
   Add new UI text here, give it a key, then use data-i18n="key" in HTML.
   To add a third language later: add a new top-level key to I18N.dict and
   a matching option button inside #lang-gate .lang-options in each page.
   ========================================================================== */

const I18N = {
  STORAGE_KEY: "ffpzp_lang",

  dict: {
    en: {
      nav_home: "Home",
      nav_faq: "FAQ",
      nav_about: "About Us",
      nav_contact: "Contact",
      nav_privacy: "Privacy Policy",
      nav_terms: "Terms & Conditions",

      hero_eyebrow: "Indian Server \u2022 Fast AI Support",
      hero_title_1: "FF PAID",
      hero_title_2: "ZONE PUSH",
      hero_lede: "Book a slot, drop with a pro, push the zone. Fast support, fair pricing, and a booking system that actually respects your time.",
      hero_tag_server: "Indian Server Only",
      hero_tag_other: "Other Servers: Coming Soon \u2014 We're Working On It",
      btn_buy_now: "Buy Now",
      btn_faq: "FAQ",
      btn_ai_support: "AI Support",
      btn_about: "About Us",
      scroll_cue: "Scroll",

      features_eyebrow: "Why Us",
      features_title: "Built for players, not paperwork",
      f1_title: "Premium Gaming UI",
      f1_desc: "A dark, glass-panelled interface designed to feel like part of the game, not a form.",
      f2_title: "Installable PWA",
      f2_desc: "Add it to your home screen and open it like a real app \u2014 no app store needed.",
      f3_title: "Responsive",
      f3_desc: "Built mobile-first. Looks and works the same on your phone, tablet, or desktop.",
      f4_title: "Offline Support",
      f4_desc: "Core pages stay readable even with a weak or dropped connection.",
      f5_title: "Loading Screen",
      f5_desc: "A clean loading sequence so the first open never feels broken.",
      f6_title: "Smooth Transitions",
      f6_desc: "Pages fade between each other instead of hard-cutting.",
      f7_title: "Animated Buttons",
      f7_desc: "Every tap gives you feedback \u2014 ripples, glows, and micro-motion.",
      f8_title: "Fast Performance",
      f8_desc: "No bloated frameworks. Just fast, lightweight code.",

      deposit_eyebrow: "Booking Deposit",
      deposit_amount_label: "Deposit",
      deposit_title: "Why we ask for \u20b910 upfront",
      deposit_desc: "A \u20b910 booking deposit is mandatory before the first match because fake bookings and time-pass orders are common. It keeps slots real for players who are serious about pushing.",
      deposit_rule_1: "\u20b910 booking deposit, once per booking",
      deposit_rule_2: "Each revive costs \u20b95",
      deposit_rule_3: "Deposit is confirmed over WhatsApp after you submit the form",

      order_eyebrow: "Book a Slot",
      order_title: "Order Form",
      order_desc: "Fill this in and we'll confirm your slot on WhatsApp.",
      label_uid: "Free Fire UID",
      ph_uid: "e.g. 123456789",
      label_name: "Player Name",
      ph_name: "Your in-game name",
      label_matches: "Number of Matches",
      ph_matches: "e.g. 3",
      label_date: "Select Date",
      label_time: "Select Time",
      label_notes: "Notes (Optional)",
      ph_notes: "Anything we should know?",
      err_uid: "Enter a valid Free Fire UID (numbers only).",
      err_name: "Enter your player name.",
      err_matches: "Enter how many matches you want (1 or more).",
      err_date: "Please enter a valid date.",
      err_time: "Selected time is outside our working hours.",
      hours_note_label: "Working hours:",
      submit_success: "Opening WhatsApp to confirm your booking\u2026",

      faq_eyebrow: "Need Answers?",
      faq_title: "Frequently Asked Questions",
      faq_desc: "Search below, or open AI Support for an instant answer in your language.",
      faq_search_ph: "Search a question\u2026",
      faq_empty: "No matching question found. Try AI Support for a direct answer.",

      chat_status: "Usually replies instantly",
      chat_welcome: "Hey! I'm FF Paid Zone Push's AI Support. Ask me anything about bookings, deposits, or working hours.",
      chat_input_ph: "Type your question\u2026",
      chat_fallback: "Sorry, I couldn't understand your question. Please contact WhatsApp Support.",

      about_eyebrow: "About Us",
      about_title: "A booking service built by players, for players",
      about_p1: "FF Paid Zone Push exists for one reason: getting a reliable push without the back-and-forth. You tell us when and how many matches, we confirm it, and you play.",
      about_p2: "We keep the operation small and direct on purpose. No hidden fees, no ticket queues \u2014 just a booking form, an AI support desk that actually understands typos, and a real person on WhatsApp when you need one.",
      about_v1_title: "Fast AI Support",
      about_v1_desc: "Instant answers in English or Hinglish, day or night.",
      about_v2_title: "Trusted Service",
      about_v2_desc: "Clear pricing and a deposit system that keeps bookings honest.",
      about_v3_title: "Affordable Pricing",
      about_v3_desc: "\u20b910 to book, \u20b95 per revive. No surprise charges.",
      about_v4_title: "Indian Server Only",
      about_v4_desc: "We currently support the Indian Free Fire server exclusively.",
      about_v5_title: "Other Servers",
      about_v5_desc: "Coming soon \u2014 we're working on it.",
      about_v6_title: "Reach Us",
      about_v6_desc: "WhatsApp is live now. Instagram is coming soon.",

      contact_eyebrow: "Get in Touch",
      contact_title: "Contact",
      contact_desc: "WhatsApp is the fastest way to reach us for bookings and support.",
      contact_wa_title: "WhatsApp",
      contact_wa_desc: "Message us directly to book or ask a quick question.",
      contact_wa_btn: "Chat on WhatsApp",
      contact_ig_title: "Instagram",
      contact_ig_desc: "Coming soon \u2014 we're setting this up.",
      contact_ai_title: "AI Support",
      contact_ai_desc: "Get an instant answer to common questions, any time.",
      contact_ai_btn: "Open AI Support",

      footer_tagline: "Fast bookings, fair pricing, real support \u2014 for Free Fire players on the Indian server.",
      footer_links: "Quick Links",
      footer_hours: "Working Hours",
      footer_hours_1: "10:00 AM \u2013 2:00 PM",
      footer_hours_2: "3:00 PM \u2013 10:00 PM",
      footer_hours_3: "11:30 PM \u2013 1:00 AM",
      footer_made: "Made with \u2764\ufe0f for the FF community",
      footer_version: "Version 1.0.0",

      install_title: "Install the app",
      install_desc: "Add to your home screen for faster access.",
      install_btn: "Install",

      offline_code: "OFFLINE",
      offline_title: "No connection right now",
      offline_desc: "You've lost signal, but pages you've already visited should still open. Reconnect to book a new slot.",
      offline_btn: "Try Again",
    },

    hi: {
      nav_home: "Home",
      nav_faq: "FAQ",
      nav_about: "Hamare Baare Mein",
      nav_contact: "Contact",
      nav_privacy: "Privacy Policy",
      nav_terms: "Terms & Conditions",

      hero_eyebrow: "Indian Server \u2022 Fast AI Support",
      hero_title_1: "FF PAID",
      hero_title_2: "ZONE PUSH",
      hero_lede: "Slot book karo, pro ke saath drop karo, zone push karo. Fast support, fair pricing, aur ek booking system jo tumhara time waste nahi karta.",
      hero_tag_server: "Sirf Indian Server",
      hero_tag_other: "Dusre Servers: Jald Aa Raha Hai \u2014 Hum Kaam Kar Rahe Hain",
      btn_buy_now: "Abhi Book Karo",
      btn_faq: "FAQ",
      btn_ai_support: "AI Support",
      btn_about: "Hamare Baare Mein",
      scroll_cue: "Scroll",

      features_eyebrow: "Kyun Hum",
      features_title: "Players ke liye bana, kaagzi kaam ke liye nahi",
      f1_title: "Premium Gaming UI",
      f1_desc: "Ek dark, glass jaisa interface jo form nahi, game ka hissa lagta hai.",
      f2_title: "Installable PWA",
      f2_desc: "Home screen pe add karo aur ek real app jaisa kholo \u2014 app store ki zaroorat nahi.",
      f3_title: "Responsive",
      f3_desc: "Mobile-first bana hai. Phone, tablet ya desktop \u2014 har jagah same chalta hai.",
      f4_title: "Offline Support",
      f4_desc: "Weak ya cut network pe bhi core pages padhne layak rehte hain.",
      f5_title: "Loading Screen",
      f5_desc: "Ek clean loading sequence jisse pehli baar khulte waqt kabhi broken nahi lagta.",
      f6_title: "Smooth Transitions",
      f6_desc: "Pages hard-cut nahi, smoothly fade hote hain.",
      f7_title: "Animated Buttons",
      f7_desc: "Har tap pe feedback milta hai \u2014 ripples, glow, aur micro-motion.",
      f8_title: "Fast Performance",
      f8_desc: "Koi bhari framework nahi. Bas fast, lightweight code.",

      deposit_eyebrow: "Booking Deposit",
      deposit_amount_label: "Deposit",
      deposit_title: "\u20b910 advance kyun mangte hain",
      deposit_desc: "Pehle match se pehle \u20b910 booking deposit zaroori hai kyunki fake bookings aur time-pass orders bohot common hain. Isse slots un players ke liye real rehte hain jo push karne mein serious hain.",
      deposit_rule_1: "\u20b910 booking deposit, ek booking mein ek baar",
      deposit_rule_2: "Har revive ka \u20b95 lagta hai",
      deposit_rule_3: "Form submit karne ke baad deposit WhatsApp pe confirm hota hai",

      order_eyebrow: "Slot Book Karo",
      order_title: "Order Form",
      order_desc: "Ye fill karo, hum WhatsApp pe tumhara slot confirm kar denge.",
      label_uid: "Free Fire UID",
      ph_uid: "jaise 123456789",
      label_name: "Player Name",
      ph_name: "Tumhara in-game naam",
      label_matches: "Matches Ki Sankhya",
      ph_matches: "jaise 3",
      label_date: "Date Chuno",
      label_time: "Time Chuno",
      label_notes: "Notes (Optional)",
      ph_notes: "Kuch bataana ho toh yahan likho",
      err_uid: "Sahi Free Fire UID daalo (sirf numbers).",
      err_name: "Apna player name daalo.",
      err_matches: "Kitne matches chahiye batao (1 ya usse zyada).",
      err_date: "Kripya sahi date darj karein.",
      err_time: "Chuna gaya samay hamare working hours ke bahar hai.",
      hours_note_label: "Working hours:",
      submit_success: "Booking confirm karne ke liye WhatsApp khul raha hai\u2026",

      faq_eyebrow: "Sawal Hai?",
      faq_title: "Frequently Asked Questions",
      faq_desc: "Neeche search karo, ya turant jawab ke liye AI Support kholo.",
      faq_search_ph: "Sawal search karo\u2026",
      faq_empty: "Koi matching sawal nahi mila. Seedha jawab ke liye AI Support try karo.",

      chat_status: "Aam taur pe turant reply karta hai",
      chat_welcome: "Hey! Main FF Paid Zone Push ka AI Support hoon. Booking, deposit, ya working hours ke baare mein kuch bhi pucho.",
      chat_input_ph: "Apna sawal type karo\u2026",
      chat_fallback: "Sorry, mujhe aapka question samajh nahi aaya. Please WhatsApp Support se contact kare.",

      about_eyebrow: "Hamare Baare Mein",
      about_title: "Ek booking service, players dwara players ke liye",
      about_p1: "FF Paid Zone Push ek hi wajah se bana hai: bina back-and-forth ke ek reliable push dena. Tum batao kab aur kitne matches, hum confirm karte hain, tum khelo.",
      about_p2: "Hum operation ko jaan-boojh kar chota aur direct rakhte hain. Koi hidden fees nahi, koi ticket queue nahi \u2014 bas ek booking form, ek AI support desk jo typos bhi samajhta hai, aur zaroorat padne pe WhatsApp pe ek real insaan.",
      about_v1_title: "Fast AI Support",
      about_v1_desc: "English ya Hinglish mein, din ho ya raat, turant jawab.",
      about_v2_title: "Trusted Service",
      about_v2_desc: "Clear pricing aur ek deposit system jo bookings ko honest rakhta hai.",
      about_v3_title: "Affordable Pricing",
      about_v3_desc: "Book karne ke \u20b910, har revive ka \u20b95. Koi surprise charge nahi.",
      about_v4_title: "Sirf Indian Server",
      about_v4_desc: "Abhi hum sirf Indian Free Fire server support karte hain.",
      about_v5_title: "Dusre Servers",
      about_v5_desc: "Jald aa raha hai \u2014 hum kaam kar rahe hain.",
      about_v6_title: "Humse Judo",
      about_v6_desc: "WhatsApp abhi live hai. Instagram jald aayega.",

      contact_eyebrow: "Contact Karo",
      contact_title: "Contact",
      contact_desc: "Booking aur support ke liye WhatsApp sabse fast tarika hai.",
      contact_wa_title: "WhatsApp",
      contact_wa_desc: "Book karne ya jaldi sawal poochne ke liye direct message karo.",
      contact_wa_btn: "WhatsApp Pe Chat Karo",
      contact_ig_title: "Instagram",
      contact_ig_desc: "Jald aa raha hai \u2014 hum ise set up kar rahe hain.",
      contact_ai_title: "AI Support",
      contact_ai_desc: "Common sawaalon ka turant jawab, kabhi bhi.",
      contact_ai_btn: "AI Support Kholo",

      footer_tagline: "Fast bookings, fair pricing, real support \u2014 Indian server ke Free Fire players ke liye.",
      footer_links: "Quick Links",
      footer_hours: "Working Hours",
      footer_hours_1: "10:00 AM \u2013 2:00 PM",
      footer_hours_2: "3:00 PM \u2013 10:00 PM",
      footer_hours_3: "11:30 PM \u2013 1:00 AM",
      footer_made: "Made with \u2764\ufe0f FF community ke liye",
      footer_version: "Version 1.0.0",

      install_title: "App install karo",
      install_desc: "Faster access ke liye home screen pe add karo.",
      install_btn: "Install",

      offline_code: "OFFLINE",
      offline_title: "Abhi connection nahi hai",
      offline_desc: "Signal chala gaya hai, par jo pages tumne pehle khole the wo abhi bhi khulne chahiye. Naya slot book karne ke liye reconnect karo.",
      offline_btn: "Dobara Try Karo",
    },
  },

  current() {
    return localStorage.getItem(this.STORAGE_KEY);
  },

  set(lang) {
    localStorage.setItem(this.STORAGE_KEY, lang);
    this.apply(lang);
  },

  t(key) {
    const lang = this.current() || "en";
    return (this.dict[lang] && this.dict[lang][key]) || this.dict.en[key] || key;
  },

  /** Apply translations to every element with data-i18n / data-i18n-placeholder on the current page. */
  apply(lang) {
    document.documentElement.lang = lang === "hi" ? "hi-Latn" : "en";
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const val = this.dict[lang]?.[key];
      if (val !== undefined) el.textContent = val;
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      const val = this.dict[lang]?.[key];
      if (val !== undefined) el.setAttribute("placeholder", val);
    });
    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      const key = el.getAttribute("data-i18n-aria");
      const val = this.dict[lang]?.[key];
      if (val !== undefined) el.setAttribute("aria-label", val);
    });
  },

  /** Show the full-screen language gate only if no language has ever been chosen. */
  initGate() {
    const gate = document.getElementById("lang-gate");
    const saved = this.current();

    if (saved) {
      this.apply(saved);
      if (gate) gate.classList.add("hidden");
      return;
    }

    if (gate) {
      gate.classList.remove("hidden");
      gate.querySelectorAll("[data-lang-choice]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const lang = btn.getAttribute("data-lang-choice");
          this.set(lang);
          gate.classList.add("hidden");
        });
      });
    } else {
      // No gate markup on this page (shouldn't happen) — default to English.
      this.apply("en");
    }
  },
};
