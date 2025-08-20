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

  // Player initial two
  for (let i = 0; i < 2; i++) drawToPlayer();   // Deal two cards to the player (rendered).

  
}


/* ---------- Helpers ---------- */
function drawToPlayer() {                         // Draw a single card for the player and render it.
  const card = deck.pop();                        // Take the top card from the deck.
  yourSum += getValue(card);                      // Add its nominal value to player total.
  yourAceCount += checkAce(card);                 // Track aces for later reduction.
  playerCardCount++;                              // Increment player’s card count.
  yourCardsEl.appendChild(                        // Render a card image into the player area.
    makeCardImg(card, "Your card")
  );
}

/* ---------- Deck & Cards ---------- */
function buildDeck() {                             // Create a standard 52-card deck of codes.
  const values = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"]; // Card ranks.
  const suits  = ["C","D","H","S"];               // Suits: Clubs, Diamonds, Hearts, Spades.
  deck = [];                                      // Reset the deck array.
  for (const s of suits)                          // For each suit…
    for (const v of values)                       // …for each rank…
      deck.push(`${v}-${s}`);                     // …push a code like "Q-H".
}

function shuffleDeck() {                           // Shuffle deck in place using Fisher–Yates.
  for (let i = deck.length - 1; i > 0; i--) {     // Walk from end to start…
    const j = Math.floor(Math.random() * (i + 1)); // Pick a random index ≤ i.
    [deck[i], deck[j]] = [deck[j], deck[i]];      // Swap elements at i and j.
  }
}

function makeCardImg(card, labelPrefix = "Card") { // Create an <img> element for a card.
  const img = document.createElement("img");      // Make an image element.
  img.src = getCardImageSrc(card);                // Point to the correct PNG file.
  img.alt = `${labelPrefix}: ${cardAlt(card)}`;   // Accessible alt text (e.g., “Your card: Ace of Spades”).
  img.decoding = "async";                         // Hint: decode asynchronously for performance.
  img.loading = "eager";                          // Load immediately so cards appear promptly.
  return img;                                     // Return the ready image element.
}

function cardAlt(card) {
  const [v, s] = card.split("-");
  const suitName  = { C:"Clubs", D:"Diamonds", H:"Hearts", S:"Spades" }[s] || s;
  const valueName = isNaN(v) ? (v==="A"?"Ace":v==="K"?"King":v==="Q"?"Queen":"Jack") : v;
  return `${valueName} of ${suitName}`;
}
function getValue(card) {                          // Nominal numeric value (Ace=11, face=10).
  const value = card.split("-")[0];                // Extract rank part.
  if (isNaN(value)) return value === "A" ? 11 : 10; // A=11; J/Q/K=10.
  return parseInt(value, 10);                      // Number cards 2–10 parse to their int value.
}

function checkAce(card) { return card.startsWith("A") ? 1 : 0; }

function reduceAce(sum, aceCount) {                // Reduce some Aces 11→1 to avoid busting.
  while (sum > 21 && aceCount > 0) {               // While we’re busting and have Aces to downgrade…
    sum -= 10;                                     // Subtract 10 (turn 11 into 1).
    aceCount--;                                    // Consume one available Ace reduction.
  }
  return sum;                                      // Return the best (highest non-busting) total.
}
