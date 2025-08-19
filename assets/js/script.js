/* ---------- DOM ---------- */
const $ = (s) => document.querySelector(s);   // Helper: short selector function.
const dealerCardsEl = $("#dealer-cards");     // Container for dealer’s visible cards.
const yourCardsEl = $("#your-cards");         // Container for player’s cards.
const resetBtn = $("#reset");                 // Reset round button element.
const hiddenImg = $("#hidden");               // <img> element for dealer’s face-down card back.

/* ---------- Init ---------- */
//resetBtn.addEventListener("click", newRound); // Clicking Reset starts a fresh round.
const resetButton = document.getElementById('reset');
const hitButton = document.getElementById('hit');


resetButton.addEventListener("click", newRound);

hitButton.addEventListener("click", onHit);


// Keyboard shortcuts: H / S / R
  document.addEventListener("keydown", (e) => { // Global key handler for accessibility/speed.
    const k = e.key.toLowerCase();              // Normalize key to lowercase.
    if (k === "h" && !hit.disabled) onHit(); // H acts like clicking Hit (if enabled).
    if (k === "s" && !stay.disabled) onStay(); // S acts like clicking Stay (if enabled).
    if (k === "r") newRound();                  // R always starts a new round.    
  });


function newRound() {
    // alert("New round started!"); // Placeholder for new round logic.
}

function onHit() {
    // alert("Hit me baby"); // Placeholder for hit button logic.
} 
