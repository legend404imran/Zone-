/* ==========================================================================
   FAQ PAGE — accordion + live fuzzy search (reuses SupportEngine.normalize).
   Only loaded on faq.html.
   ========================================================================== */

const FaqPage = {
  init() {
    const list = document.getElementById("faq-list");
    const search = document.getElementById("faq-search-input");
    const empty = document.getElementById("faq-empty");
    if (!list) return;

    const lang = I18N.current() || "en";
    list.innerHTML = "";

    FAQ_DATA.forEach((entry) => {
      const item = document.createElement("div");
      item.className = "faq-item glass bracket-card";
      item.dataset.searchBlob = [
        entry.question.en, entry.question.hi,
        ...(entry.patterns.en || []), ...(entry.patterns.hi || []),
      ].join(" ").toLowerCase();

      const q = document.createElement("button");
      q.className = "faq-q";
      q.type = "button";
      q.innerHTML = `<span>${entry.question[lang] || entry.question.en}</span><span class="plus">+</span>`;

      const a = document.createElement("div");
      a.className = "faq-a";
      const p = document.createElement("p");
      p.textContent = entry.answer[lang] || entry.answer.en;
      a.appendChild(p);

      q.addEventListener("click", () => {
        const isOpen = item.classList.contains("open");
        list.querySelectorAll(".faq-item.open").forEach((el) => {
          el.classList.remove("open");
          el.querySelector(".faq-a").style.maxHeight = null;
        });
        if (!isOpen) {
          item.classList.add("open");
          a.style.maxHeight = a.scrollHeight + "px";
        }
      });

      item.appendChild(q);
      item.appendChild(a);
      list.appendChild(item);
    });

    if (search) {
      search.addEventListener("input", () => {
        const words = SupportEngine.normalize(search.value).split(" ").filter((w) => w.length > 2);
        let visibleCount = 0;
        list.querySelectorAll(".faq-item").forEach((item) => {
          const blob = item.dataset.searchBlob;
          const isVisible = !search.value.trim() || words.length === 0 || words.some((w) => blob.includes(w));
          item.style.display = isVisible ? "" : "none";
          if (isVisible) visibleCount++;
        });
        empty?.classList.toggle("show", visibleCount === 0);
      });
    }
  },
};

document.addEventListener("DOMContentLoaded", () => FaqPage.init());
