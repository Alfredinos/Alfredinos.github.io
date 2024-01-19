

const wheel = document.querySelector("#roulette");
const wheelE = document.getElementById("#roulette");
const wheelHidden = document.querySelector("#rouletteHidden");
const wheelHiddenE = document.getElementById("#rouletteHidden");
let betAmount = document.getElementById("betAmount");
let betsE = document.getElementById("bets");
let bettedOnE = document.getElementById("bettedOn").children[0];
let winE = document.getElementById("win");
let historyE = document.getElementById("historyE");
let numbers = ["0","2","14","35","23","4","16","33","21","6","18","31","19","8","12","29","25","10","27","00","1","13","36","24","3","15","34","22","5","17","32","20","7","11","30","26","9","28",];
let bettedOn = "";


const sleep = ms => new Promise(r => setTimeout(r, ms));


for (let i = 0; i<betsE.children.length; i++){
    for (let j = 0; j<betsE.children[i].children.length; j++){
        betsE.children[i].children[j].addEventListener(
            "click", 
            function() {
                bet(betsE.children[i].children[j].children[0].textContent)
            });
    }
}

function getRandomNumber(){
    let slot = Math.floor(Math.random() * 38)
    return slot;
}

function bet(number){
    bettedOnE.innerHTML = number;
    bettedOn = number;
}
const wheelTiming = {
    duration: 7000,
    iterations: 1,
    fill: "forwards",
    easing: "ease-in-out",
};


function findWheelSpinning(randomNumber, randomNumber2){
    const wheelSpin = [
        { transform: "rotate(0)" },
        { transform: "rotate(" +  (-(360*12) - randomNumber * (-9.4737) - randomNumber2 * (-9.4737)) + "deg)" },
    ];
    return wheelSpin;
}
  


function spinHidden(randomNumber2){
    const wheelHiddenSpin = [
        { transform: "rotate(0)" },
        { transform: "rotate(" + ((360*12) + (randomNumber2*(9.4737))) + "deg)" },
    ];
    wheelHidden.animate(wheelHiddenSpin, wheelTiming);
}


async function spin(){
    if(betAmount.value <= 0 || bettedOn === ""){
        return false;
    }
    
    winE.textContent = "";
    let randomNumber = getRandomNumber();
    let randomNumber2 = getRandomNumber();
    let wheelSpin = findWheelSpinning(randomNumber, randomNumber2);
    console.log(randomNumber)
    let color = "";
    if(randomNumber%2==0){
        color = "red";
    } else {
        color = "black";
    }
    if((randomNumber == 0 || randomNumber == 19)){
        color = "green";
    }
    console.log(numbers[randomNumber])
    console.log(color)
    spinHidden(randomNumber2);
    wheel.animate(wheelSpin, wheelTiming);
    let win = evaluateWin(bettedOn, numbers[randomNumber], color);

    await sleep(8000);

    if(win[0]){
        winE.innerHTML = "You Win! $" + betAmount.value*win[1];
        historyE.innerHTML += "<p style='color: " + color +"'>" +numbers[randomNumber] + " " + color + " - Win</p>";
    } else {
        winE.textContent = "You Lose! $" + betAmount.value;
        historyE.innerHTML += "<p style='color: " + color +"'>" +numbers[randomNumber] + " " + color + " - Lose</p>";
    }
}


function evaluateWin(ewBettedOn, number, color){
    if(ewBettedOn == "Black" && color == "black"){
        return [true,2];
    }
    if(ewBettedOn == "Red" && color == "red"){
        return [true,2];
    }
    if(ewBettedOn == number){
        return [true, 38]
    }
    return [false,0];
}