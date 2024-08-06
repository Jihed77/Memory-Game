let cardDeck = [
    { name: 'cheeseburger', image: 'images/cheeseburger.png' },
    { name: 'fries', image: 'images/fries.png' },
    { name: 'hotdog', image: 'images/hotdog.png' },
    { name: 'ice-cream', image: 'images/ice-cream.png' },
    { name: 'milkshake', image: 'images/milkshake.png' },
    { name: 'pizza', image: 'images/pizza.png' },
    { name: 'lemon', image: 'images/lemon.jpg' },
    { name: 'strawberry', image: 'images/strawberry.jpg' },
    { name: 'apple', image: 'images/apple.jpeg' },
    { name: 'juice', image: 'images/juice.jpeg' },
    { name: 'cheeseburger', image: 'images/cheeseburger.png' },
    { name: 'fries', image: 'images/fries.png' },
    { name: 'hotdog', image: 'images/hotdog.png' },
    { name: 'ice-cream', image: 'images/ice-cream.png' },
    { name: 'milkshake', image: 'images/milkshake.png' },
    { name: 'pizza', image: 'images/pizza.png' },
    { name: 'lemon', image: 'images/lemon.jpg' },
    { name: 'strawberry', image: 'images/strawberry.jpg' },
    { name: 'apple', image: 'images/apple.jpeg' },
    { name: 'juice', image: 'images/juice.jpeg' },
];

let gameGrid = document.querySelector('.game');
let scoreDisplay = document.querySelector('#score');
let restartButtonContainer = document.querySelector('.btn');

let selectedCards = [];
let selectedCardIds = [];
let matchedCards = [];
let cardLock = false;

cardDeck.sort(() => 0.5 - Math.random());

function setupGameBoard() {
    gameGrid.innerHTML = '';
    for (let i = 0; i < cardDeck.length; i++) {
        const cardElement = document.createElement('img');
        cardElement.setAttribute('src', 'images/blank.png');
        cardElement.setAttribute('data-id', i);
        cardElement.addEventListener('click', flipCard);
        gameGrid.appendChild(cardElement);
    }
}

function evaluateMatch() {
    const allCardElements = document.querySelectorAll('img');
    const firstCardId = selectedCardIds[0];
    const secondCardId = selectedCardIds[1];

    if (firstCardId === secondCardId) {
        allCardElements[firstCardId].setAttribute('src', 'images/blank.png');
        allCardElements[secondCardId].setAttribute('src', 'images/blank.png');
    } else if (selectedCards[0] === selectedCards[1]) {
        allCardElements[firstCardId].setAttribute('src', 'images/white.png');
        allCardElements[secondCardId].setAttribute('src', 'images/white.png');
        allCardElements[firstCardId].removeEventListener('click', flipCard);
        allCardElements[secondCardId].removeEventListener('click', flipCard);
        matchedCards.push(selectedCards);
    } else {
        allCardElements[firstCardId].setAttribute('src', 'images/blank.png');
        allCardElements[secondCardId].setAttribute('src', 'images/blank.png');
    }

    selectedCards = [];
    selectedCardIds = [];
    scoreDisplay.textContent = matchedCards.length;

    if (matchedCards.length === cardDeck.length / 2) {
        scoreDisplay.textContent = 'Congratulations! You found them all!';
        createRestartButton();
    }

    cardLock = false;
}

function flipCard() {
    if (cardLock) return;
    let cardId = this.getAttribute('data-id');
    if (selectedCardIds.includes(cardId)) return;
    selectedCards.push(cardDeck[cardId].name);
    selectedCardIds.push(cardId);
    this.setAttribute('src', cardDeck[cardId].image);

    if (selectedCards.length === 2) {
        cardLock = true;
        setTimeout(evaluateMatch, 500);
    }
}

function createRestartButton() {
    let restartButton = document.createElement('button');
    restartButton.setAttribute('class', 'restart');
    restartButton.innerText = 'Restart The Game';
    restartButtonContainer.appendChild(restartButton);
    restartButton.addEventListener('click', function () {
        location.reload();
    });
}

setupGameBoard();
