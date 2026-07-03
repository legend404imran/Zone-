/* ==========================================================================
   MAIN — global app behaviour shared by every page.
   ========================================================================== */

const App = {
  SOUND_KEY: "ffpzp_sound",

  init() {
    I18N.initGate();
    this.initLoader();
    this.initNav();
    this.initRipple();
    this.initSound();
    this.initPageTransitions();
    this.initServiceWorker();
    this.initInstallPrompt();
    Particles.init("particle-canvas");
    this.markActiveNavLink();
  },

  initLoader() {
    const loader = document.getElementById("loader");
    if (!loader) return;
    const hide = () => loader.classList.add("hidden");
    if (document.readyState === "complete") {
      setTimeout(hide, 350);
    } else {
      window.addEventListener("load", () => setTimeout(hide, 350));
    }
  },

  initNav() {
    const nav = document.getElementById("navbar");
    const hamburger = document.getElementById("hamburger");
    const mobileMenu = document.getElementById("mobile-menu");

    if (nav) {
      const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 12);
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    if (hamburger && mobileMenu) {
      hamburger.addEventListener("click", () => {
        const open = mobileMenu.classList.toggle("open");
        hamburger.classList.toggle("open", open);
        hamburger.setAttribute("aria-expanded", String(open));
      });
      mobileMenu.querySelectorAll("a").forEach((a) =>
        a.addEventListener("click", () => {
          mobileMenu.classList.remove("open");
          hamburger.classList.remove("open");
        })
      );
    }
  },

  markActiveNavLink() {
    const path = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll("a[data-nav-link]").forEach((a) => {
      const href = a.getAttribute("href");
      if (href === path || (path === "" && href === "index.html")) {
        a.classList.add("active");
      }
    });
  },

  initRipple() {
    document.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn");
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement("span");
      const size = Math.max(rect.width, rect.height);
      ripple.className = "ripple";
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
      if (App.soundOn()) App.blip(btn.classList.contains("btn-primary") ? 660 : 440);
    });
  },

  // ---- Gaming sound toggle (synthesized via Web Audio API, no audio files) ----
  audioCtx: null,

  soundOn() {
    return localStorage.getItem(this.SOUND_KEY) === "on";
  },

  getCtx() {
    if (!this.audioCtx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (AC) this.audioCtx = new AC();
    }
    return this.audioCtx;
  },

  blip(freq = 520, duration = 0.06) {
    const ctx = this.getCtx();
    if (!ctx) return;
    if (ctx.state === "suspended") ctx.resume();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  },

  initSound() {
    const toggle = document.getElementById("sound-toggle");
    if (!toggle) return;
    const setIcon = (on) => toggle.setAttribute("data-on", String(on));
    setIcon(this.soundOn());
    toggle.addEventListener("click", () => {
      const next = !this.soundOn();
      localStorage.setItem(this.SOUND_KEY, next ? "on" : "off");
      setIcon(next);
      if (next) this.blip(700);
    });

    document.addEventListener(
      "mouseover",
      (e) => {
        if (e.target.closest(".btn") && this.soundOn()) this.blip(380, 0.03);
      },
      { passive: true }
    );
  },

  // ---- Smooth same-page fade before internal navigation ----
  initPageTransitions() {
    document.addEventListener("click", (e) => {
      const a = e.target.closest("a[data-nav-link], a.internal-link");
      if (!a) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return; // let new-tab opens through
      const href = a.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("http")) return;
      e.preventDefault();
      document.body.style.transition = "opacity 200ms ease";
      document.body.style.opacity = "0";
      setTimeout(() => (window.location.href = href), 180);
    });
    window.addEventListener("pageshow", () => {
      document.body.style.opacity = "1";
    });
  },

  initServiceWorker() {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/service-worker.js").catch(() => {
          /* offline support degrades gracefully if registration fails */
        });
      });
    }
  },

  // ---- Custom "Install app" prompt (Android/Chrome). iOS has no beforeinstallprompt. ----
  deferredInstallPrompt: null,

  initInstallPrompt() {
    const toast = document.getElementById("install-toast");
    const btn = document.getElementById("install-btn");
    const dismiss = document.getElementById("install-dismiss");
    if (!toast || !btn) return;

    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      this.deferredInstallPrompt = e;
      if (!sessionStorage.getItem("ffpzp_install_dismissed")) {
        toast.classList.add("show");
      }
    });

    btn.addEventListener("click", async () => {
      if (!this.deferredInstallPrompt) return;
      this.deferredInstallPrompt.prompt();
      await this.deferredInstallPrompt.userChoice;
      this.deferredInstallPrompt = null;
      toast.classList.remove("show");
    });

    dismiss?.addEventListener("click", () => {
      toast.classList.remove("show");
      sessionStorage.setItem("ffpzp_install_dismissed", "1");
    });
  },
};

document.addEventListener("DOMContentLoaded", () => App.init());
