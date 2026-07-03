/* ==========================================================================
   FAQ_DATA — the ONE file to edit to change what AI Support knows.
   Powers both the FAQ page and the AI Support chat widget.

   HOW TO ADD A NEW QUESTION:
   1. Copy an entry block below.
   2. Give it a unique id.
   3. Fill in question.en / question.hi (shown on the FAQ page).
   4. Fill in answer.en / answer.hi (shown on the FAQ page AND spoken by AI Support).
   5. Add 3-6 short example phrasings under patterns.en and patterns.hi —
      include typos, short forms, and both languages. The more variety you
      give it, the better AI Support gets at recognising messy real typing.
      You do NOT need to cover every spelling — the matcher already tolerates
      small typos and common short forms on its own (see support-engine.js).
   ========================================================================== */

const FAQ_DATA = [
  {
    id: "what-is",
    question: { en: "What is FF Paid Zone Push?", hi: "FF Paid Zone Push kya hai?" },
    answer: {
      en: "FF Paid Zone Push is a booking service \u2014 you tell us your UID, name, and how many matches you want, we confirm a slot, and a skilled player pushes the zone with you on the Indian Free Fire server.",
      hi: "FF Paid Zone Push ek booking service hai \u2014 tum apna UID, naam, aur kitne matches chahiye batao, hum ek slot confirm karte hain, aur ek skilled player Indian Free Fire server pe tumhare saath zone push karta hai.",
    },
    patterns: {
      en: ["what is ff paid zone push", "what is this website", "what do you do", "what is this service", "explain this site"],
      hi: ["ye website kya hai", "ye service kya hai", "ye kya hai", "kya karte ho tum log"],
    },
  },
  {
    id: "is-it-real",
    question: { en: "Is this service genuine and does it actually work?", hi: "Kya ye service genuine hai aur kaam karta hai?" },
    answer: {
      en: "Yes \u2014 it's a real booking service run over WhatsApp. Slots are confirmed manually and a small deposit keeps bookings honest on both sides.",
      hi: "Haan \u2014 ye ek real booking service hai jo WhatsApp pe chalti hai. Slots manually confirm hote hain aur ek chhota deposit dono taraf se booking ko honest rakhta hai.",
    },
    patterns: {
      en: ["is it working", "does it work", "is this real", "is this genuine", "is this legit", "does this actually work"],
      hi: ["kya is se kaam hota hai", "ky is m se km hta h", "work karta hai", "kaam karta hai kya", "genuine hai kya", "real hai kya"],
    },
  },
  {
    id: "revive-cost",
    question: { en: "How much does one revive cost?", hi: "Ek revive ka kitna cost hai?" },
    answer: {
      en: "Each revive costs \u20b95. This is separate from the \u20b910 booking deposit and is settled directly with your player over WhatsApp.",
      hi: "Har revive ka \u20b95 lagta hai. Ye \u20b910 booking deposit se alag hai aur WhatsApp pe tumhare player ke saath directly settle hota hai.",
    },
    patterns: {
      en: ["how much does one revive cost", "revive price", "revive cost", "how much is a revive", "revive charge"],
      hi: ["revive ka price kya hai", "revive ka rate", "ek revive ka kitna paisa", "revive kitne ka hai"],
    },
  },
  {
    id: "why-deposit",
    question: { en: "Why is a \u20b910 booking deposit required?", hi: "\u20b910 booking deposit kyun zaroori hai?" },
    answer: {
      en: "Because fake bookings and time-pass orders are common. The \u20b910 deposit is mandatory before the first match so slots stay real for players who are serious.",
      hi: "Kyunki fake bookings aur time-pass orders bohot common hain. Pehle match se pehle \u20b910 deposit mandatory hai taaki slots un players ke liye real rahein jo serious hain.",
    },
    patterns: {
      en: ["why is deposit required", "why 10 rupees deposit", "why do i need to pay deposit", "deposit kyu"],
      hi: ["deposit kyun chahiye", "10 rupay kyun dena", "deposit kyu jaruri hai", "advance kyun lete ho"],
    },
  },
  {
    id: "how-to-pay",
    question: { en: "How do I pay?", hi: "Payment kaise karu?" },
    answer: {
      en: "Fill out the order form and tap Buy Now \u2014 it opens WhatsApp with your booking details prefilled. We confirm the deposit and payment method with you there.",
      hi: "Order form fill karo aur Buy Now dabao \u2014 isse WhatsApp khulega jisme tumhari booking details already bhari hongi. Wahi hum deposit aur payment method confirm karte hain.",
    },
    patterns: {
      en: ["how do i pay", "payment method", "how to pay", "where do i pay", "payment kaise kare"],
      hi: ["payment kaise kare", "paise kaise de", "kaise pay karu", "payment kaise hoga"],
    },
  },
  {
    id: "contact-support",
    question: { en: "How do I contact support?", hi: "Support se contact kaise karu?" },
    answer: {
      en: "Use this AI Support chat for instant answers, or message us directly on WhatsApp for anything else.",
      hi: "Turant jawab ke liye ye AI Support chat use karo, ya kuch aur chahiye toh directly WhatsApp pe message karo.",
    },
    patterns: {
      en: ["how do i contact support", "contact support", "talk to a human", "real person", "customer support"],
      hi: ["support se kaise baat kare", "contact kaise kare", "insaan se baat karni hai", "help chahiye"],
    },
  },
  {
    id: "working-hours",
    question: { en: "What are your working hours?", hi: "Working hours kya hain?" },
    answer: {
      en: "We take bookings 10:00 AM\u20132:00 PM, 3:00 PM\u201310:00 PM, and 11:30 PM\u20131:00 AM. Any time outside these windows can't be booked.",
      hi: "Booking ke liye working hours hain: 10:00 AM\u20132:00 PM, 3:00 PM\u201310:00 PM, aur 11:30 PM\u20131:00 AM. Inke bahar koi time book nahi ho sakta.",
    },
    patterns: {
      en: ["what are your working hours", "working hours", "when are you open", "what time do you work", "timing"],
      hi: ["working hours kya hai", "kab kab open ho", "timing kya hai", "kab available ho"],
    },
  },
  {
    id: "servers",
    question: { en: "Which servers are supported?", hi: "Kaunse servers support karte ho?" },
    answer: {
      en: "Indian server only, right now. Other servers are coming soon \u2014 we're working on it.",
      hi: "Abhi sirf Indian server. Dusre servers jald aayenge \u2014 hum kaam kar rahe hain.",
    },
    patterns: {
      en: ["which servers are supported", "which server", "do you support other servers", "international server"],
      hi: ["kaunsa server support karte ho", "dusra server hai kya", "sirf india server", "other server kab aayega"],
    },
  },
  {
    id: "cancel-order",
    question: { en: "Can I cancel my order?", hi: "Kya main apna order cancel kar sakta hoon?" },
    answer: {
      en: "Yes, message us on WhatsApp before your slot starts. See our Refund Policy on the Terms & Conditions page for how the deposit is handled.",
      hi: "Haan, apne slot se pehle WhatsApp pe message karo. Deposit kaise handle hota hai iske liye Terms & Conditions page pe Refund Policy dekho.",
    },
    patterns: {
      en: ["can i cancel my order", "cancel booking", "cancel my slot", "refund my deposit"],
      hi: ["order cancel kar sakte hai", "booking cancel karni hai", "slot cancel karna hai", "refund milega kya"],
    },
  },
  {
    id: "how-many-matches",
    question: { en: "How many matches can I book at once?", hi: "Ek baar mein kitne matches book kar sakta hoon?" },
    answer: {
      en: "As many as you want \u2014 just enter the number in the order form. More matches means a longer session, so pick a time window that fits.",
      hi: "Jitne chahiye utne \u2014 bas order form mein number daalo. Zyada matches ka matlab lamba session, isliye aisa time window chuno jo fit ho.",
    },
    patterns: {
      en: ["how many matches can i book", "max matches", "number of matches limit"],
      hi: ["kitne matches book kar sakte hai", "max kitne matches", "matches ki limit"],
    },
  },
  {
    id: "missed-slot",
    question: { en: "What happens if I miss my booked slot?", hi: "Agar main apna booked slot miss kar doon toh?" },
    answer: {
      en: "Message us on WhatsApp as early as possible \u2014 we'll try to reschedule. Repeated no-shows may affect your deposit, see Terms & Conditions.",
      hi: "Jitni jaldi ho WhatsApp pe message karo \u2014 hum reschedule karne ki koshish karenge. Baar baar no-show hone se deposit pe asar pad sakta hai, Terms & Conditions dekho.",
    },
    patterns: {
      en: ["what happens if i miss my slot", "i cant make it to my slot", "reschedule my booking", "not available at booked time"],
      hi: ["slot miss ho gaya toh", "time pe nahi aa paunga", "booking reschedule karni hai", "late ho gaya"],
    },
  },
];
