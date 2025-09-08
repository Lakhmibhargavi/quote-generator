const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


let apiQuotes = [];


function showLoadingSpinner() {
    loader.style.display = 'block';
    quoteContainer.style.display = 'none';
}


function removeLoadingSpinner() {
    quoteContainer.style.display = 'block';
    loader.style.display = 'none';
}

// Get Quotes from API

async function getQuotes() {
    showLoadingSpinner();
    const apiUrl = 'https://thequoteshub.com/api/';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);
        if (!data.author) {
            authorText.textContent = 'Unknown';
        } else {
            authorText.textContent = data.author;
        }

        // checking Quote length to style
        if (data.text.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        // Set Quote, Hide Loader
        quoteText.textContent = data.text;
        removeLoadingSpinner();
    } catch (error) {
        console.log('Error fetching quote:', error);
    }
}


// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuotes);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();
