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


function newRound() {
  // 1) Clear UI
  dealerCardsEl.innerHTML = "";     // remove dealer’s previous open cards
  yourCardsEl.innerHTML = "";       // remove player cards

  // 2) Reinsert the hidden back-of-card image
  dealerCardsEl.appendChild(hiddenImg);
  hiddenImg.src = "assets/cards/BACK.png"; // back image path
  hiddenImg.alt = "Face-down card";
  
  // 3) Reset round state (example)
  dealerSum = 0;
  yourSum = 0;
  dealerAceCount = 0;
  yourAceCount = 0;

  // 4) Ensure deck exists (example)
  if (!deck || deck.length < 15) {
    buildDeck();
    shuffleDeck();
  }
