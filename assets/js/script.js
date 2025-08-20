/* ---------- State ---------- */
let hidden;           // dealer's hidden card code, e.g. "A-S"

/* ---------- DOM ---------- */
const $ = (s) => document.querySelector(s);   // Helper: short selector function.

const dealerSumEl = $("#dealer-sum");         // <span> that shows dealer’s total (revealed at round end).
const yourSumEl = $("#your-sum");             // <span> that shows player’s total (updates live).

const dealerCardsEl = $("#dealer-cards");     // Container for dealer’s visible cards.
const yourCardsEl = $("#your-cards");         // Container for player’s cards.

const resultsEl = $("#results");              // <p> that displays outcome text (aria-live polite).
const winsEl = $("#wins");                    // <span> wins counter in tally line.
const lossesEl = $("#losses");                // <span> losses counter in tally line.
const tiesEl = $("#ties");                    // <span> ties counter in tally line.

const hitBtn = $("#hit");                     // Hit button element.
const stayBtn = $("#stay");                   // Stay button element.
const resetBtn = $("#reset");                 // Reset round button element.
const resetScoreBtn = $("#resetScore");       // Reset scoreboard button element.

const hiddenImg = $("#hidden");               // <img> element for dealer’s face-down card back.


/* ---------- Init ---------- */
window.addEventListener("load", newRound);
resetBtn.addEventListener("click", newRound);


/* ---------- Round flow ---------- */
function newRound() {                           // Prepare and deal a brand-new round.
  // Reset UI
  resultsEl.textContent = "";                   // Clear last round’s outcome text.
  dealerCardsEl.innerHTML = "";                 // Remove dealer’s visible cards.
  yourCardsEl.innerHTML = "";                   // Remove player cards.
  dealerCardsEl.appendChild(hiddenImg);         // Put the face-down placeholder back into dealer area.
  hiddenImg.src = "assets/cards/BACK.png";      // Show the card back image.
  hiddenImg.alt = "Face-down card";             // Accessible description for the hidden card.

  // Reset state
  dealerSum = yourSum = 0;                      // Zero both totals.
  dealerAceCount = yourAceCount = 0;            // Zero ace counts.
  canHit = true; gameOver = false;              // Allow hits; mark round as active.
  playerNatural21 = false;                      // Reset natural blackjack flag.
  dealerCardCount = 0; playerCardCount = 0;     // Reset card counters.

  // Ensure deck
  if (deck.length < 15) {                       // If the deck is running low…
    buildDeck();                                // …create a fresh 52-card deck.
    shuffleDeck();                              // …shuffle it with Fisher–Yates.
  }
    // Dealer hidden
  hidden = deck.pop();                          // Take one card for the dealer (kept hidden).
  dealerSum += getValue(hidden);                // Add its nominal value (Ace=11 for now).
  dealerAceCount += checkAce(hidden);           // Track if the card is an Ace.
  dealerCardCount++;                            // Count a dealer card dealt.

  // Dealer draws face-up to 17+
  while (reduceAce(dealerSum, dealerAceCount) < 17) { // While best total is below 17…
    const card = deck.pop();                    // Draw a face-up card.
    dealerSum += getValue(card);                // Add its nominal value.
    dealerAceCount += checkAce(card);           // Track aces for later reduction.
    dealerCardCount++;                          // Count another dealer card.
    dealerCardsEl.appendChild(                   // Render the face-up card in the dealer’s area.
      makeCardImg(card, "Dealer card")
    );
  }
