/* ---------- DOM ---------- */
const $ = (s) => document.querySelector(s);   // Helper: short selector function.
const dealerCardsEl = $("#dealer-cards");     // Container for dealer’s visible cards.
const yourCardsEl = $("#your-cards");         // Container for player’s cards.
const resetBtn = $("#reset");                 // Reset round button element.
const hiddenImg = $("#hidden");               // <img> element for dealer’s face-down card back.

/* ---------- Init ---------- */
resetBtn.addEventListener("click", newRound); // Clicking Reset starts a fresh round.




// Keyboard shortcuts: H / S / R
  document.addEventListener("keydown", (e) => { // Global key handler for accessibility/speed.
    const k = e.key.toLowerCase();              // Normalize key to lowercase.
    if (k === "h" && !hitBtn.disabled) onHit(); // H acts like clicking Hit (if enabled).
    if (k === "s" && !stayBtn.disabled) onStay(); // S acts like clicking Stay (if enabled).
    if (k === "r") newRound();                  // R always starts a new round.
    
  });

