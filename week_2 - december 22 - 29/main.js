"use strict";

const joke_text = document.querySelector("#joke");

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

getJoke()
  // .then((joke) => console.log(joke))
  .then((joke) => (joke_text.textContent = joke["joke"]))
  .catch((error) => console.error("failed to get joke", error));
