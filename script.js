// <button id="new-quote">
const newQuote = document.getElementById("new-quote");
// <span id="quote">
const quoteHTML = document.getElementById("quote");
// <div id="author"> Obama </div>
const author = document.getElementById("author");
// <div class="quote-container" id="quote-container">
const quoteContainer = document.getElementById("quote-container");
const loader = document.getElementById("loader");


// this var can't be in const beuase initialy, it's an empty array, but it'll be storing JSON data in JS format later
let quoteData = [];

const loading = () => {
    // "hidden" is an HTML attribute
    loader.hidden = false;
    quoteContainer.hidden = true;
}

const showData = () => {
    // "hidden" is an HTML attribute
    loader.hidden = true;
    quoteContainer.hidden = false;
}

/* Randomize the quote */
const randomQuote = () => {
    loading();
    // Math.random() will chooose a random quote number. Math.floor will make it a whole number.
    const quote = quoteData[Math.floor(Math.random() * quoteData.length)];
    quoteHTML.textContent = quote.text; // put the quote.Text's value into quoteHTML id

    if(!quote.author) {
        author.textContent = "Anonymouse";
    } else {
        author.textContent = quote.author; // put the quote.Author's Value into author id
    }

    if(!quote.text.length > 50) {
        quoteHTML.classList.add('long-quote');
    } else {
        quoteHTML.classList.remove("long-quote");

    }
    
    showData();
}

newQuote.addEventListener('click', randomQuote);

// When the browser sees "asyn", it will know that the function will run in background.
async function quoteGenerator() {
    loading();
    const apiUrl = "https://type.fit/api/quotes";
    // "try catch" condition is necessary when writing a "async" function
    try {
        // retrieve data from the api
        const response = await fetch(apiUrl); // Now we have JSON data from the apiUrl | "await" menas wait until it reads all data in "apiUrl". Only after then, store the data in response variable.
        quoteData = await response.json(); // convert JSON data into JS format | "await" tells that wait until all JSON formats are converted into JS, then store them in quoteData array.

        // print a random quote
        randomQuote();
    } catch (error) {
        console.log(error);
    }
}

quoteGenerator();