"use strict";

const r1c1 = document.querySelector(".r1c1");
const r1c2 = document.querySelector(".r1c2");
const r1c3 = document.querySelector(".r1c3");
const r2c1 = document.querySelector(".r2c1");
const r2c2 = document.querySelector(".r2c2");
const r2c3 = document.querySelector(".r2c3");
const r3c1 = document.querySelector(".r3c1");
const r3c2 = document.querySelector(".r3c2");
const r3c3 = document.querySelector(".r3c3");

const cells = document.querySelectorAll(".cell");

const grid = document.querySelector(".grid");
const tryAgainInfo = document.querySelector(".try-again-info");

const score = document.querySelector(".score");
let score_val = 0;
// list of cells
const grid_pos = [r1c1, r1c2, r1c3, r2c1, r2c2, r2c3, r3c1, r3c2, r3c3];

const winning_pos = [
  // rows
  ["r1c1", "r1c2", "r1c3"],
  ["r2c1", "r2c2", "r2c3"],
  ["r3c1", "r3c2", "r3c3"],
  // cols
  ["r1c1", "r2c1", "r3c1"],
  ["r1c2", "r2c2", "r3c2"],
  ["r1c3", "r2c3", "r3c3"],
  // diagonals
  ["r1c1", "r2c2", "r3c3"],
  ["r1c3", "r2c2", "r3c1"],
];

// set of possible combinations for a win

let playerMoves = [];
let player2Moves = [];
let playerMoves_subsets;

// add entry
function playGame(marker, playerMoves) {
  let nextPlayer = 0;

  for (let i = 0; i < grid_pos.length; i++) {
    grid_pos[i].addEventListener("click", function () {
      playerMoves.push(grid_pos[i].className.slice(5, 9));

      grid_pos[i].textContent = marker;

      // console.log(playerMoves);
      if (playerMoves.length >= 3) {
        playerMoves = playerMoves.sort();
        console.log(`player moves sorted: ${playerMoves}`);
        playerMoves_subsets = subsets(playerMoves);
        console.log(playerMoves_subsets);

        // loop player moves subsets and see if any wins
        for (let j = 0; j < playerMoves_subsets.length; j++) {
          let isEqual = equal_lists(winning_pos, playerMoves_subsets[j].sort());
          console.log(isEqual);

          if (isEqual === true) {
            showTryAgain();
            playerMoves = [];
            score_val++;
            score.textContent = score_val;
            return (nextPlayer = 1);
          }
        }
      }
    });
  }
}

// switch players
function alternatePlayers() {
  let nextPlayer = playGame("x", playerMoves);
  console.log(nextPlayer);
}

alternatePlayers();

document.querySelector(".try-again").addEventListener("click", function () {
  grid.classList.remove("hidden");
  tryAgainInfo.classList.add("hidden");
  playerMoves = [];
  for (let i = 0; i < grid_pos.length; i++) {
    cells[i].textContent = "";
  }
  playGame();
});

// // function to find all the subsets of a set and filter it
function subsets(moves) {
  let possible_subsets = allSubsets(moves);
  let good_subsets = [];
  for (let i = 0; i < possible_subsets.length; i++) {
    if (possible_subsets[i].length === 3) {
      good_subsets.push(possible_subsets[i]);
    }
  }
  return good_subsets;
}

// function to get subsets
const allSubsets = (mainSet) =>
  mainSet.reduce(
    (subsets, value) => subsets.concat(subsets.map((set) => [value, ...set])),
    [[]]
  );

function equal_lists(win_moves, playerMoves) {
  if (!win_moves || !win_moves[0] || !playerMoves) return false;

  let true_count = 0;

  for (let i = 0; i < win_moves.length; i++) {
    true_count = 0; // let true counr reset for each row check
    // compare each row row of group with group 2
    for (let j = 0; j < win_moves[i].length; j++) {
      if (win_moves[i][j] === playerMoves[j]) {
        console.log(win_moves[i][j], playerMoves[j]);
        true_count++;

        if (true_count === 3) {
          return true;
        }
      }
    }
  }

  console.log(true_count);
  return false;
}

function showTryAgain() {
  grid.classList.add("hidden");
  tryAgainInfo.classList.remove("hidden");
}
