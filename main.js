let KANYE_QUOTE = 'https://api.kanye.rest';
let QUOTE_FROM_FILE = 'http://localhost:3000/quotes';

let displayQuote = document.getElementById('displayQuote');
let yesButton = document.getElementById('yesBtn');
let noButton = document.getElementById('noBtn');
let guess = document.getElementById('guessField');

let kanye;

let author;

function getRandomQuote() {
  let randomNumberOneOrTwo = Math.round(Math.random(2)); // Laver et 0 eller 1.

  let kanyeText = document.getElementById('kanyeText');
  kanyeText.removeAttribute('class');
  yesButton.removeAttribute('class');
  noButton.removeAttribute('class');
  guess.innerHTML = '';

  if (randomNumberOneOrTwo == 1) {
    kanye = false;
    fetch(QUOTE_FROM_FILE)
      .then((res) => res.json())
      .then(function (data) {
        let randomQuote = getRandomInt(data.length);
        console.log(randomQuote);
        displayQuote.innerHTML = data[randomQuote].text;
        author = data[randomQuote].author;
      });
  } else {
    kanye = true;
    fetch(KANYE_QUOTE)
      .then((res) => res.json())
      .then(function (data) {
        displayQuote.innerHTML = data.quote;
      });
  }
}

yesButton.addEventListener('click', checkAnswer);
noButton.addEventListener('click', checkAnswer);

function checkAnswer(e) {
  console.log(e.target.value);
  if (kanye == false && e.target.value == 'n') {
    guess.innerHTML = "Correct. This isn't Kanye... This is " + author;
  } else if (kanye == false && e.target.value == 'y') {
    guess.innerHTML = "No. This isn't Kanye... This is " + author;
  } else if (kanye == true && e.target.value == 'y') {
    guess.innerHTML = "Correct. It's Kanye!!!";
  } else {
    guess.innerHTML = "No. It's actually Kanye";
  }
}

let quoteGenerator = document.getElementById('generateRandomQuote');

quoteGenerator.addEventListener('click', getRandomQuote);

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
