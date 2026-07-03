/* ==========================================================================
   ORDER FORM — validation + WhatsApp handoff. No backend, no payment
   processing here: the deposit itself is confirmed manually over WhatsApp.
   ========================================================================== */

const OrderForm = {
  WHATSAPP_NUMBER: "6282298431688", // digits only, no "+" (wa.me format)

  // Working windows in minutes-since-midnight. The third window crosses
  // midnight (23:30 -> 01:00), so it's checked as "after 23:30 OR before 01:00".
  WINDOWS: [
    { start: 600, end: 840 },   // 10:00 AM - 2:00 PM
    { start: 900, end: 1320 },  // 3:00 PM - 10:00 PM
  ],
  OVERNIGHT: { start: 1410, end: 60 }, // 11:30 PM - 1:00 AM

  init() {
    const form = document.getElementById("order-form");
    if (!form) return;

    const dateInput = form.querySelector("#f-date");
    if (dateInput) {
      const today = new Date();
      dateInput.min = this.toDateInputValue(today);
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleSubmit(form);
    });
  },

  toDateInputValue(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  },

  timeToMinutes(timeStr) {
    const [h, m] = timeStr.split(":").map(Number);
    return h * 60 + m;
  },

  isDateValid(dateStr) {
    if (!dateStr) return false;
    const selected = new Date(dateStr + "T00:00:00");
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selected >= today;
  },

  isTimeValid(timeStr) {
    if (!timeStr) return false;
    const mins = this.timeToMinutes(timeStr);
    const inRegularWindow = this.WINDOWS.some((w) => mins >= w.start && mins <= w.end);
    const inOvernightWindow = mins >= this.OVERNIGHT.start || mins <= this.OVERNIGHT.end;
    return inRegularWindow || inOvernightWindow;
  },

  setFieldError(field, show) {
    field.classList.toggle("invalid", show);
  },

  handleSubmit(form) {
    const uid = form.querySelector("#f-uid");
    const name = form.querySelector("#f-name");
    const matches = form.querySelector("#f-matches");
    const date = form.querySelector("#f-date");
    const time = form.querySelector("#f-time");
    const notes = form.querySelector("#f-notes");
    const toast = form.querySelector(".form-toast");

    let valid = true;

    const uidValid = /^[0-9]{6,12}$/.test(uid.value.trim());
    this.setFieldError(uid.closest(".field"), !uidValid);
    if (!uidValid) valid = false;

    const nameValid = name.value.trim().length > 1;
    this.setFieldError(name.closest(".field"), !nameValid);
    if (!nameValid) valid = false;

    const matchesValid = Number(matches.value) >= 1;
    this.setFieldError(matches.closest(".field"), !matchesValid);
    if (!matchesValid) valid = false;

    const dateValid = this.isDateValid(date.value);
    this.setFieldError(date.closest(".field"), !dateValid);
    if (!dateValid) valid = false;

    const timeValid = dateValid && this.isTimeValid(time.value);
    this.setFieldError(time.closest(".field"), !timeValid);
    if (!timeValid) valid = false;

    if (!valid) {
      if (toast) {
        toast.textContent = "";
        toast.className = "form-toast error show";
        toast.textContent = I18N.t(!dateValid ? "err_date" : !timeValid ? "err_time" : "err_uid");
      }
      return;
    }

    if (toast) {
      toast.className = "form-toast success show";
      toast.textContent = I18N.t("submit_success");
    }

    const message =
      `Hello!\n` +
      `I want to book FF Paid Zone Push.\n` +
      `UID: ${uid.value.trim()}\n` +
      `Player Name: ${name.value.trim()}\n` +
      `Matches: ${matches.value}\n` +
      `Selected Date: ${date.value}\n` +
      `Selected Time: ${time.value}` +
      (notes.value.trim() ? `\nNotes: ${notes.value.trim()}` : "") +
      `\nPlease confirm my booking.`;

    const waUrl = `https://wa.me/${this.WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    setTimeout(() => window.open(waUrl, "_blank"), 500);
  },
};

document.addEventListener("DOMContentLoaded", () => OrderForm.init());
