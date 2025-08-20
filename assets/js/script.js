/* ---------- DOM ---------- */
const $ = (s) => document.querySelector(s);   // Helper: short selector function.
const dealerCardsEl = $("#dealer-cards");     // Container for dealer’s visible cards.
const yourCardsEl = $("#your-cards");         // Container for player’s cards.
const resetBtn = $("#reset");                 // Reset round button element.
const hiddenImg = $("#hidden");               // <img> element for dealer’s face-down card back.

// --- Round state you’ll use here ---
let hidden;           // dealer's hidden card code, e.g. "A-S"

/* ---------- Init ---------- */
window.addEventListener("load", newRound);
resetBtn.addEventListener("click", newRound);