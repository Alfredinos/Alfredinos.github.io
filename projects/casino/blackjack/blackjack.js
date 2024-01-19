


let dealercards = document.getElementById("dealercards");
let mycards = document.getElementById("mycards");
let mycardssum = 0;
let winE = document.getElementById("win");
let betAmount = document.getElementById("sats");
let gameOver = false;
let mycardssumE = document.getElementById("mycardssum");
let dealercardssumE = document.getElementById("dealercardssum");
let rulesShown = false;
let rulesE = document.getElementById("rulesE");
let buttonsPressed = 1;
let transactionsE = document.getElementById("transactions")


function getCardSum(cards){
    let cardsLength = cards.children.length;
    let cardssum = 0;
    for (let i = 0; i<cardsLength; i++){
        cardssum += parseInt(cards.children[i].children[0].textContent);
    }
    if(cardssum < 21){
        for (let i = 0; i<cardsLength; i++){
            if (cards.children[i].children[0].textContent == 1 && cards.children[i].children[1].textContent == "A" && cardssum+10<=21){
                cards.children[i].children[0].textContent = 11;
                console.log("changed to 11")
            }
        }
    }
    if(cardssum>21){
        for (let i = 0; i<cardsLength; i++){
            if(cards.children[i].children[0].textContent == 11 && cards.children[i].children[1].textContent == "A" && cardssum-10<=21){
                cards.children[i].children[0].textContent = 1;
                console.log("changed to 1")
            }
        
        }
    }
    cardssum = 0;
    for (let i = 0; i<cardsLength; i++){
        cardssum += parseInt(cards.children[i].children[0].textContent);
    }
    console.log(cardssum);
    return cardssum;
}
function updateSum(){
    mycardssumE.textContent = "My Cards - " + getCardSum(mycards);
    dealercardssumE.textContent = "Dealer - " + getCardSum(dealercards);
}

function generateCard(cards){
    newcard = Math.ceil(Math.random() * 13);
    let newcardName = newcard;
    if(newcard == 11){
        newcardName = "J";
    } else if(newcard == 12){
        newcardName = "Q";
    } else if (newcard == 13){
        newcardName = "K";
    } else if(newcard == 1){
        newcardName = "A";
    }
    if(newcard > 10){
        newcard = 10;
    }
    typeofCard = Math.ceil(Math.random() * 4);
    cardsLength = cards.children.length;
    cards.innerHTML += 
    '<div><h1>' + newcard + '</h1><h1>' + newcardName + '</h1><img src="../bilder/korttyper/' + typeofCard + '.png"></div>';

    return newcard;
}
function generateFakeCard(cards){
    cards.innerHTML += '<div id="fakeCard"><h1>0</h1><h1>0</h1></div>'
}




function hit(){
    mycardssum = getCardSum(mycards);
    
    if( betAmount.value <= 0 || gameOver){
        return false;
    }
    if(mycardssum > 21){
        youLose();
        return false;
    }
    
    buttonsPressed++;
    generateCard(mycards);
    mycardssum = getCardSum(mycards);
    if(mycardssum>21){
        youLose();
        return false;
    }
    updateSum();
}

function stand(){
    if (gameOver || betAmount.value <= 0){
        return false;
    }
    dealercards.children[1].remove();

    while (getCardSum(dealercards)<17 /* && getCardSum(mycards)>getCardSum(dealercards) */){
        generateCard(dealercards);
    }
    buttonsPressed++;
    updateSum();
    evaluateWin();
}


function reset(){
    if(buttonsPressed == 0){
        return false;
    }
    dealercardsLength = dealercards.children.length;
    mycardsLength = mycards.children.length;
    for (let i = 0; i<dealercardsLength; i++){
        dealercards.removeChild(dealercards.children[0])
    }
    for (let i = 0; i<mycardsLength; i++){
        mycards.removeChild(mycards.children[0])
    }
    generateCard(dealercards);
    generateFakeCard(dealercards);
    generateCard(mycards);
    generateCard(mycards);
    mycardssum = getCardSum(mycards);
    winE.textContent = "";
    gameOver = false;
    buttonsPressed = 0;
    updateSum();
}


function evaluateWin(){
    
    if(getCardSum(dealercards) == getCardSum(mycards)){
        draw();
        return false;
    }
    if((getCardSum(dealercards)>21 && (getCardSum(mycards)<=21)) || (getCardSum(mycards)>getCardSum(dealercards) && getCardSum(mycards)<=21)){
        youWin();
        return true;
    }
    if(getCardSum(dealercards)>=getCardSum(mycards) && getCardSum(dealercards)<=21){
        youLose();
        return false;
    }
}


function youWin(){
    winE.textContent = "You win $" + betAmount.value*2;
    winE.style.color = "#38bf00";
    transactionsE.innerHTML += '<p style="color: #38bf00;">+ $' + (betAmount.value) + '</p>';
    gameOver = true;
}
function youLose(){
    winE.textContent = "Dealer wins $" + betAmount.value;
    winE.style.color = "#ed3339";
    transactionsE.innerHTML += '<p style="color: #ed3339;">- $' + (betAmount.value) + '</p>';
    gameOver = true;
}
function draw(){
    winE.textContent = "It's a draw";
    winE.style.color = "#ddd";
    transactionsE.innerHTML += '<p style="color: #ddd;">+ $0</p>'

}


function flipRules(){
    rulesShown = !rulesShown;
    if(rulesShown){
        rulesE.style.display = "flex";
        return true;
    } else {
    rulesE.style.display = "none";
    return false;
    }
}

reset()