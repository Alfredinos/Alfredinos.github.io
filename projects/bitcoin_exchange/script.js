

const sleep = ms => new Promise(r => setTimeout(r, ms));

/* CREATING VARIABLES FOR ELEMENTS EXISTING IN THE HTML */

let buySellWrapperEl = document.querySelector(".buySellWrapper");
let buyButtonEl = document.querySelector(".buyButton");
let sellButtonEl = document.querySelector(".sellButton");
let selectMarketEl = document.querySelector("#selectMarket");
let currencySelectionEl = document.querySelector(".currencySelection");
let fullLimitPriceEl = document.querySelector(".limitPrice");
let limitPriceEl = document.querySelector(".limitPrice input");
let totalEl = document.querySelector(".totalAmount input");
let placeOrderEl = document.querySelector(".placeOrder");
let listEl = document.querySelector("#list");
let coinList = document.querySelector("#list2");
let avblUSDTEl = document.querySelector("#avblUSDT");
let avblBTCEl = document.querySelector("#avblBTC");

/* DECLARING LISTS */

let list = []
let flipped = [];
let coinPrice = [
    44000,
    2355,
    239,
    0.67,
]
let newCoinPrice = [];

/* CREATING BOOLEAN DEFAULTS */

let isMarketOrder = true;

let sortFlip = {
    "category": true,
    "price": true,
    "amount": true,
}
let buy = true;

/* ADDING EVENT LISTENERS TO TRIGGER FUNCTIONS */

buyButtonEl.addEventListener("click", () => {buy = true; flipBuySell();})
sellButtonEl.addEventListener("click", () => {buy = false; flipBuySell();})

placeOrderEl.addEventListener("click", createTransaction);
document.querySelector("#sortByCategory").addEventListener("click", () => showList("category", "category"));
document.querySelector("#sortByPrice").addEventListener("click", () => showList("BTCvalue", "price"));
document.querySelector("#sortByAmount").addEventListener("click", () => showList("totalValueBTC", "amount"));
selectMarketEl.addEventListener("change", flipMarket);



/* CREATING THE BACKEND OBJECTLIST FROM USER INPUT AND KNOWN VARIABLES */

function createTransaction() {
    let _BTCvalue = 0;
    if(isMarketOrder){
        _BTCvalue = newCoinPrice[0];
    } else {
        _BTCvalue = Number(limitPriceEl.value);
    }
    let _type = selectMarketEl.value;
    let _totalValueUSDT = Number(totalEl.value);
    let _totalValueBTC = (Math.round((_totalValueUSDT / _BTCvalue) * 1000000) / 1000000);
    let _title = _totalValueBTC + " BTC - " + _totalValueUSDT +  " USDT @ " + _BTCvalue + " USDT";
    let _dateNow = new Date();
    let _fulfilled = true;
    let _avblUSDT = Number(avblUSDTEl.innerText);
    let _avblBTC = Number(avblBTCEl.innerText);
    if(buy && _avblUSDT<_totalValueUSDT){
        return false;
    }
    if(!buy && _avblBTC<_totalValueBTC){
        return false;
    }
    if(buy){
        _avblUSDT -= _totalValueUSDT;
        _avblBTC += _totalValueBTC;
    } else {
        _avblUSDT += _totalValueUSDT;
        _avblBTC -= _totalValueBTC;
    }
    avblUSDTEl.innerText = _avblUSDT;
    avblBTCEl.innerText = _avblBTC;
    if(!isMarketOrder){
        _fulfilled = false;
    }
    if (_totalValueUSDT == 0) {
        return false;
    }

    let _year = _dateNow.getFullYear();
    let _month = _dateNow.getMonth() + 1;
    let _day = _dateNow.getDate();
    let _time = _dateNow.getHours();
    let _minutes = _dateNow.getMinutes();
    let _seconds = _dateNow.getSeconds();

    let _date = (_day + "." + _month + "." + _year);
    let _time1 = (_time + ':' + _minutes + ':' + _seconds);

    let _listItem = {
        "title": _title,
        "BTCvalue": _BTCvalue,
        "category": _type,
        "totalValueUSDT": _totalValueUSDT,
        "totalValueBTC": _totalValueBTC,
        "date": (_date + " " + _time1),
        "fulfilled": _fulfilled,
        "buy": buy,
    }

    list.push(_listItem)

    appendList(list.length - 1)
    updateEventListeners();
    
}

/* CREATING ELEMENTS AND APPENDING TO FRONTEND WITH THE BACKEND OBJECTLIST */

function appendList(i) {
    let _listItemEl = document.createElement("div");
    _listItemEl.className = "listItem";
    _listItemEl.style.position = "relative";

    let _titleEl = document.createElement("p");
    let _BTCvalueEl = document.createElement("p");
    let _typeEl = document.createElement("p");
    let _totalValueUSDTEl = document.createElement("p");
    let _totalValueBTCEl = document.createElement("p");
    let _dateEl = document.createElement("p");
    let _fulfilledEl = document.createElement("p");
    let _refundEl = document.createElement("div");
    let _refundTextEl = document.createElement("p");

    _titleEl.innerText = list[i].title;
    _titleEl.className = "title " + list[i].buy;
    _BTCvalueEl.innerText = list[i].BTCvalue + " USDT";
    if (buy) {
        _typeEl.innerText = list[i].category + " Buy"
    } else {
        _typeEl.innerText = list[i].category + " Sell"
    }
    _typeEl.className = "category"
    _totalValueUSDTEl.innerText = list[i].totalValueUSDT + " USDT";
    _totalValueUSDTEl.className = "overflowList"
    _totalValueBTCEl.innerText = list[i].totalValueBTC + " BTC";
    _totalValueBTCEl.className = "overflowList";
    _dateEl.innerText = list[i].date
    _dateEl.className = "overflowList";
    if(list[i]["fulfilled"]){
        _fulfilledEl.innerText = "Status: Fulfilled";
    } else {
        _fulfilledEl.innerText = "Status: Not filled";
    }
    _fulfilledEl.className = "overflowList";

    _refundEl.className = "overflowList refund";
    _refundTextEl.innerText = "Refund";

    _refundEl.appendChild(_refundTextEl);

    _listItemEl.appendChild(_titleEl);
    _listItemEl.appendChild(_typeEl);
    _listItemEl.appendChild(_totalValueUSDTEl);
    _listItemEl.appendChild(_totalValueBTCEl);
    _listItemEl.appendChild(_dateEl);
    _listItemEl.appendChild(_fulfilledEl);
    _listItemEl.appendChild(_refundEl);
    listEl.appendChild(_listItemEl)
}

/* UPDATEING EVENT LISTENERS TO PREVENT DUPLICATE EVENT LISTENERS */

function updateEventListeners() {
    flipped = [];
    for (let i = 0; i < listEl.children.length; i++) {
        flipped[i] = false
        listEl.children[i].children[0].setAttribute("onclick",  "flipFocusListItem(" + i + ");");
        listEl.children[i].children[6].children[0].setAttribute("onclick", "refundOrder(" + i + ");");
    }
}

function refundOrder(i){
    if(list[i]["buy"]){
        avblUSDTEl.innerText = Number(avblUSDTEl.innerText) + list[i]["totalValueUSDT"];
        avblBTCEl.innerText = Number(avblBTCEl.innerText) - list[i]["totalValueBTC"]
    } else {
        avblUSDTEl.innerText = Number(avblUSDTEl.innerText) - list[i]["totalValueUSDT"];
        avblBTCEl.innerText = Number(avblBTCEl.innerText) + list[i]["totalValueBTC"]
    }
    listEl.removeChild(listEl.children[i])
    flipped.splice(i,1)
    list.splice(i,1);
    console.log(list,flipped)
}

/* FLIPPING BOOLEANS */

function flipFocusListItem(i){
    if (!flipped[i]) {
        listEl.children[i].style.height = "fit-content";
        
        listEl.children[i].style.borderTop = "1px solid #555B66"
    }
    if (flipped[i]) {
        listEl.children[i].style.height = "2.9em";
        
        listEl.children[i].style.borderTop = "none"
    }
    flipped[i] = !flipped[i];
}
function flipBuySell() {
    if (buy) {
        buyButtonEl.style.borderRadius = "20px";
        sellButtonEl.style.borderRadius = "0 20px 20px 0";
        buySellWrapperEl.style.backgroundColor = "#E35561";
        placeOrderEl.style.backgroundColor = "#5EBA89"
        placeOrderEl.children[0].innerText = "Buy BTC"
    } else {
        sellButtonEl.style.borderRadius = "20px";
        buyButtonEl.style.borderRadius = "20px 0 0 20px";
        buySellWrapperEl.style.backgroundColor = "#5EBA89";
        placeOrderEl.style.backgroundColor = "#E35561"

        placeOrderEl.children[0].innerText = "Sell BTC";
    }
}
function flipMarket(){
    isMarketOrder = !isMarketOrder;
    if(isMarketOrder){
        fullLimitPriceEl.style.display = "none";
    } else {
        fullLimitPriceEl.style.display = "flex";
    }
    console.log(isMarketOrder)
}


/* SORTING */

function showList(sortEl, sortName) {
    sortFlip[sortName] = !sortFlip[sortName];
    list.sort((a, b) => sortObject(a, b, sortFlip[sortName], sortEl));
    listEl.innerHTML="";
    for (let i = listEl.children.length; i > 0; i--) {
        listEl.removeChild(listEl.children[i - 1]);
    }
    for (let i = 0; i < list.length; i++) {
        appendList(i)
    }
    updateEventListeners();

}
function sortObject(a, b, bool, sortEl) {
    let _flip = 1
    if (bool) {
        _flip = -1;
    }
    if (a[sortEl] > b[sortEl]) {
        return 1 * _flip;
    } else if (a[sortEl] < b[sortEl]) {
        return -1 * _flip;
    } else {
        return 0;
    }
}

/* UPDATING THE PRICES IN LIST 2 */

async function updatePrice(){
    let _changeInPrice = 0;
    let _changePercent = 0;
    while (true){
        for(let i = 0; i<coinList.children.length; i++){
            _changeInPrice = Math.round((coinPrice[i]/100) * Math.random()*10000)/10000
            newCoinPrice[i] = Math.round((Number(coinPrice[i]) + Number(_changeInPrice))*100)/100
            coinList.children[i].children[1].innerText = "$ " + newCoinPrice[i];
            _changePercent = Math.round(_changeInPrice/coinPrice[i]*10000)/100;
            coinList.children[i].children[2].innerText = "+ " + _changePercent + " %"
        }
        await sleep(1500);
    }
}
updatePrice()




updateEventListeners();
