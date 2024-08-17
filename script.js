"use strict";

// selecting elements
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

// Starting conditions
let playing, scores, currentScore, activePlayer;

const start = function () {
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  scores = [0, 0];

  current0El.textContent = 0;
  current1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;

  diceEl.classList.add("hidden");

  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");

  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
};

start();

const switchPlayer = function () {
  //Current Score
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;

  //Active Player
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

// Rolling Dice Functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    // 1. Generating Random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    // 3. Check rolled is 1? if true, switch..
    if (dice !== 1) {
      //Current score updation
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    //Main Score
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    //Finish
    if (scores[activePlayer] >= 100) {
      document.querySelector(".player--active").classList.add("player--winner");
      document
        .querySelector(".player--active")
        .classList.remove("player--active");
      playing = false;
      diceEl.classList.add("hidden");
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", start);
