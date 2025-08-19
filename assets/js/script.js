/* ---------- DOM ---------- */
const $ = (s) => document.querySelector(s);   // Helper: short selector function.
const dealerCardsEl = $("#dealer-cards");     // Container for dealer’s visible cards.
const yourCardsEl = $("#your-cards");         // Container for player’s cards.
const resetBtn = $("#reset");                 // Reset round button element.
const hiddenImg = $("#hidden");               // <img> element for dealer’s face-down card back.

/* ---------- Init ---------- */
window.addEventListener("load", () => {        // Run after the page finishes loading.
  newRound();                                   // Deal the first round.

resetBtn.addEventListener("click", newRound); // Clicking Reset starts a fresh round.
