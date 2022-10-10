let namePlayer = false;
let chips = 20;
let cards = [];
let cardsHouse = [];
let sumPlayer = 0;
let sumHouse = 0;
let hasBlackJack = false;
let isAlive = false;
let message = "";
let balance = true;
let messageEl = document.getElementById("message-el");
let sumEl = document.getElementById("sum-el");
let houseCards = document.getElementById("house-cards-el");
let cardsEl = document.getElementById("cards-el");
let playerEl = document.getElementById("player-el");
let inputField = document.getElementById("input");

let player = {
    name: namePlayer,
    chips: function(amount){
        chips += amount;
        return playerEl.textContent = this.name + ": $" + chips
    }
}

//Initialize starting text


function getRandomCard() {
    let randomNumber = Math.floor( Math.random()*13 ) + 1
    if (randomNumber > 10) {
        return 10;
    } else if (randomNumber === 1) {
        return 11;
    } else {
        return randomNumber
    }
}

function startGame() {
    checkBalance();
    checkName();
    if(balance === true && namePlayer === true) {
        resetGame();
        isAlive = true;
        let firstCard = getRandomCard();
        let secondCard = getRandomCard();
        let houseFirstCard = getRandomCard();
        let houseSecondCard = getRandomCard();
        cards.push(firstCard, secondCard);
        cardsHouse.push(houseFirstCard, houseSecondCard);
        sumPlayer = firstCard + secondCard;
        sumHouse = houseFirstCard + houseSecondCard;
        renderGame();
    } 
}

function renderGame() {
    cardsEl.textContent = "Your cards: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " ";
    }
    houseCards.textContent = "Card(s) of the house: HIDDEN CARD "
    for (let i = 1; i < cardsHouse.length; i++) {
        houseCards.textContent += cardsHouse[i] + " ";
    }
    sumEl.textContent = "Sum: " + sumPlayer;
    if (sumPlayer <= 20) {
        message = "Do you want to draw a new card?";
    } else if (sumPlayer === 21) {
        message = "You've got Blackjack! You won $50!";
        hasBlackJack = true;
        player.chips(50);
    } else {
        message = "You're out of the game and lost $10!";
        isAlive = false;
        player.chips(-10);
    }
    messageEl.textContent = message;
}


function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard();
        sumPlayer += card;
        cards.push(card);
        renderGame();
    }
}

function stand(){
    if(isAlive === true) {
        houseCards.textContent = "Card(s) of the house: " 
        for (let i = 0; i < cardsHouse.length; i++) {
            houseCards.textContent += cardsHouse[i] + " ";
        }
    
        while(sumHouse < sumPlayer){
            let card = getRandomCard();
            sumHouse += card;
            cardsHouse.push(card);
            houseCards.textContent = "Card(s) of the house: "
            for (let i = 0; i < cardsHouse.length; i++) {
                houseCards.textContent += cardsHouse[i] + " ";
            }
        }
    
    
        if(sumHouse > sumPlayer && sumHouse <= 20) {
            // HOUSE WON! You lost $10
            message = "HOUSE WON! You lost $10";
            player.chips(-10);
            isAlive = false;
        } else if(sumHouse > 21){
            message = "You won! $10 is added to your balance";
            player.chips(10);
            isAlive = false;
        } else if (sumHouse === sumPlayer){
            message = "It's a tie. Balance remains the same.";
            isAlive = false;
        } else {
            message = "House has BLACKJACK! You lost $10";
            player.chips(-10);
            isAlive = false;
        }
        messageEl.textContent = message;
    
        checkBalance();
    }
}

function resetGame(){
    cards = [];
    cardsHouse = [];
    sumPlayer = 0;
    sumHouse = 0;
    hasBlackJack = false;
    isAlive = false;
    message = "";
}

function checkBalance(){
    if(chips <= 0){
        message = "YOU LOST. YOU HAVE NO BALANCE LEFT. REFRESH THE PAGE FOR A NEW GAME!"
        balance = false;
    } 
    messageEl.textContent = message;
}

function changeName(name){
    player.name = name;
    inputField.value = ""
    playerEl.textContent = player.name + ": $" + chips;
    namePlayer = true;
    messageEl.textContent = "Click on START GAME to start playing";
}

function checkName() {
    if(namePlayer === false) {
        messageEl.textContent = "Please enter your name to start playing";
     } 
}