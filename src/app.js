import "bootstrap";
import "./style.css";

//Card Container
const cardNumber = document.querySelector("#cardNumber");
//DOM Buttons
const randomCard = document.querySelector("#randomCard");
const differentSuit = document.querySelector("#differentSuit");
const noRepeat = document.querySelector("#noRepeat");

var value = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
var suit = ["suitspades", "suitdiamonds", "suitclubs", "suithearts"];

//Function that creates a new deck using value and suit variables
function createDeck() {
  let newDeck = [];

  for (let i in suit) {
    for (let j in value) {
      let card = { value: `${value[j]}`, suit: `${suit[i]}`, used: false };
      newDeck.push(card);
    }
  }
  return newDeck;
}

let deck = createDeck();

//Function that shows a random card inside the created deck
function randomNumber() {
  return deck[Math.floor(Math.random() * 51)];
}

//Function that removes the class suit from the selected card
function removeClass() {
  cardNumber.classList.remove(
    "suitspades",
    "suithearts",
    "suitclubs",
    "suitdiamonds"
  );
}

//Create a function that show a random card (the suit and the number can be repeated)
randomCard.addEventListener("click", () => {
  let cardToShow = randomNumber();

  removeClass();
  cardNumber.classList.add(cardToShow.suit);
  cardNumber.innerHTML = `<p>${cardToShow.value}</p>`;
});

//Create a function that show a random card without repeating the previous suit
differentSuit.addEventListener("click", () => {
  let cardToShow = randomNumber();

  while (cardToShow.suit == cardNumber.classList[1]) {
    cardToShow = randomNumber();
  }

  removeClass();
  cardNumber.classList.add(cardToShow.suit);
  cardNumber.innerHTML = `<p>${cardToShow.value}</p>`;
});

//Create a function that show a unique random card without repeating
//Variable that counts the number of cards remaining in the deck
let count = 51;

noRepeat.addEventListener("click", () => {
  let newDeck = deck.filter(card => card.used === false);
  let cardToShow = newDeck[Math.floor(Math.random() * count)];

  if (newDeck.length != 0) {
    removeClass();
    cardNumber.classList.add(cardToShow.suit);
    cardNumber.innerHTML = `<p>${cardToShow.value}</p>`;
    cardToShow.used = true;
    console.log(newDeck);
    count--;
  } else {
    alert("There are no more cards in the deck. Accept to start again!");
    window.location.reload();
  }
});
