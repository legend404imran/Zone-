/* ==========================================================================
   CHAT WIDGET — floating AI Support button + panel, present on every page.
   ========================================================================== */

const ChatWidget = {
  init() {
    const toggle = document.getElementById("chat-toggle");
    const panel = document.getElementById("chat-panel");
    const closeBtn = document.getElementById("chat-close");
    const body = document.getElementById("chat-body");
    const input = document.getElementById("chat-input");
    const sendBtn = document.getElementById("chat-send");
    const suggestWrap = document.getElementById("chat-suggest");
    if (!toggle || !panel || !body || !input) return;

    let welcomed = false;

    const open = () => {
      panel.classList.add("open");
      toggle.querySelector(".ping")?.remove();
      if (!welcomed) {
        this.addMessage(body, I18N.t("chat_welcome"), "bot");
        this.renderSuggestions(suggestWrap, body);
        welcomed = true;
      }
      setTimeout(() => input.focus(), 260);
    };
    const close = () => panel.classList.remove("open");

    toggle.addEventListener("click", () => {
      panel.classList.contains("open") ? close() : open();
    });
    closeBtn?.addEventListener("click", close);

    // The hero "AI Support" button opens the widget directly.
    document.querySelectorAll("[data-open-chat]").forEach((el) =>
      el.addEventListener("click", (e) => {
        e.preventDefault();
        open();
      })
    );

    const send = () => {
      const value = input.value.trim();
      if (!value) return;
      this.addMessage(body, value, "user");
      input.value = "";
      suggestWrap && (suggestWrap.innerHTML = "");
      this.showTyping(body);

      const lang = I18N.current() || "en";
      setTimeout(() => {
        this.hideTyping(body);
        const answer = SupportEngine.ask(value, lang);
        this.addMessage(body, answer || I18N.t("chat_fallback"), "bot");
      }, 500 + Math.random() * 400);
    };

    sendBtn?.addEventListener("click", send);
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") send();
    });
  },

  addMessage(body, text, who) {
    const el = document.createElement("div");
    el.className = `msg msg-${who}`;
    el.textContent = text;
    body.appendChild(el);
    body.scrollTop = body.scrollHeight;
  },

  showTyping(body) {
    const el = document.createElement("div");
    el.className = "msg-typing";
    el.id = "chat-typing-indicator";
    el.innerHTML = "<span></span><span></span><span></span>";
    body.appendChild(el);
    body.scrollTop = body.scrollHeight;
  },

  hideTyping(body) {
    document.getElementById("chat-typing-indicator")?.remove();
  },

  renderSuggestions(wrap, body) {
    if (!wrap) return;
    const lang = I18N.current() || "en";
    const picks = FAQ_DATA.slice(0, 3);
    wrap.innerHTML = "";
    picks.forEach((entry) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = entry.question[lang] || entry.question.en;
      btn.addEventListener("click", () => {
        this.addMessage(body, btn.textContent, "user");
        wrap.innerHTML = "";
        this.showTyping(body);
        setTimeout(() => {
          this.hideTyping(body);
          const answer = SupportEngine.ask(btn.textContent, lang);
          this.addMessage(body, answer || I18N.t("chat_fallback"), "bot");
        }, 450);
      });
      wrap.appendChild(btn);
    });
  },
};

document.addEventListener("DOMContentLoaded", () => ChatWidget.init());
