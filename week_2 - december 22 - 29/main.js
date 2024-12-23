"use strict";

const joke_text = document.querySelector("#joke");
const counter = document.querySelector(".counter");
let count = 0;

async function getJoke() {
  const response = await fetch("https://icanhazdadjoke.com/", {
    headers: {
      Accept: "application/json",
    },
  });
  const joke = await response.json();
  // console.log(joke);
  return joke;
}

document.addEventListener("click", function () {
  console.log("click");
  getJoke()
    // .then((joke) => console.log(joke))
    .then((joke) => (joke_text.textContent = joke["joke"]))
    .catch((error) => console.error("failed to get joke", error));
  count++;
  counter.textContent = `${count} / ∞`;
  console.log(count);
});
