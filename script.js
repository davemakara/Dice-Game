"use strict";

// Selecting elements
const player0El = document.querySelector(".player0Box");
const player1El = document.querySelector(".player1Box");
const score0EL = document.querySelector("#totalScore0");
const score1El = document.getElementById("totalScore1");
const current0El = document.getElementById("currentScore0");
const current1El = document.getElementById("currentScore1");
const diceEl = document.querySelector(".dicePic");
const rollBtn = document.querySelector(".dice");
const newGameBtn = document.querySelector(".newGame");
const holdBtn = document.querySelector(".hold");

let curScore;
let activePlayer;
let scores;
let playing;

const startingPoint = () => {
  curScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true;

  score0EL.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};
startingPoint();

const switchPlayer = () => {
  document.getElementById(`currentScore${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  curScore = 0;

  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

//rolling dice function

rollBtn.addEventListener("click", () => {
  if (playing) {
    let randomDiceNum = Math.floor(Math.random() * 6) + 1;

    diceEl.classList.remove("hidden");
    diceEl.src = `./img/dice-${randomDiceNum}.png`;
    if (randomDiceNum !== 1) {
      curScore += randomDiceNum;

      document.getElementById(`currentScore${activePlayer}`).textContent =
        curScore;
    } else {
      switchPlayer();
    }
  }
});

holdBtn.addEventListener("click", () => {
  if (playing) {
    scores[activePlayer] += curScore;
    document.getElementById(`totalScore${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player${activePlayer}Box`)
        .classList.add("player--winner");
      document
        .querySelector(`.player${activePlayer}Box`)
        .classList.remove("player--active");
    } else {
      switchPlayer();
    }
  }
});

newGameBtn.addEventListener("click", startingPoint);
