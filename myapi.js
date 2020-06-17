// Global Variables
const addCurrencyBtn = document.getElementById("myBtn");
const addCurrencyList = document.querySelector(".add-currency-list");
const currenciesList = document.querySelector(".currencies");
const dataURL = "https://api.exchangeratesapi.io/latest";
const initiallyDisplayedCurrencies = ["EUR", "USD"];
let baseCurrency;
let baseCurrencyAmount;

// Array of our currencies
let currencies = [
    {
        name: "US Dollar",
        abbreviation: "USD",
        symbol: "\u0024",
        flagURL: "http://www.geonames.org/flags/l/us.gif",        
    },
    {
        name: "Polish Zloty",
        abbreviation: "PLN",
        symbol: "\u007A\u0142",
        flagURL: "http://www.geonames.org/flags/l/pl.gif",        
      },
    {
        name: "Euro",
        abbreviation: "EUR",
        symbol: "\u20AC",
        flagURL: "https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg",        
      },
      {
        name: "Japanese Yen",
        abbreviation: "JPY",
        symbol: "\u00A5",
        flagURL: "http://www.geonames.org/flags/l/jp.gif",        
      },
      {
        name: "British Pound",
        abbreviation: "GBP",
        symbol: "\u00A3",
        flagURL: "http://www.geonames.org/flags/l/uk.gif",        
      },
      {
        name: "Australian Dollar",
        abbreviation: "AUD",
        symbol: "\u0024",
        flagURL: "http://www.geonames.org/flags/l/au.gif"
      },
      {
        name: "Canadian Dollar",
        abbreviation: "CAD",
        symbol: "\u0024",
        flagURL: "http://www.geonames.org/flags/l/ca.gif"
      },
      {
        name: "Swiss Franc",
        abbreviation: "CHF",
        symbol: "\u0043\u0048\u0046",
        flagURL: "http://www.geonames.org/flags/l/ch.gif"
      },
      {
        name: "Chinese Yuan Renminbi",
        abbreviation: "CNY",
        symbol: "\u00A5",
        flagURL: "http://www.geonames.org/flags/l/cn.gif"
      },
      {
        name: "New Zealand Dollar",
        abbreviation: "NZD",
        symbol: "\u0024",
        flagURL: "http://www.geonames.org/flags/l/nz.gif"
      },
      {
        name: "Russian Ruble",
        abbreviation: "RUB",
        symbol: "\u20BD",
        flagURL: "http://www.geonames.org/flags/l/ru.gif"
      },
]

//Event Listeners
addCurrencyBtn.addEventListener("click", addCurrencyBtnClick);

// opens the list
function addCurrencyBtnClick(event) {
    addCurrencyBtn.classList.toggle("open");
}

// adding the currency from the add currency list to the currency list
addCurrencyList.addEventListener("click", addCurrencyListClick);

// checking which list item was clicked
function addCurrencyListClick(event) {
   const clickedListItem = event.target.closest("li");
// adding only if the clicked item was not disabled
   if(!clickedListItem.classList.contains("disabled")) {
    // getting the corresponding currency object from the currencies array and adding to the list
    const newCurrency = currencies.find(c => c.abbreviation===clickedListItem.getAttribute("data-currency"));
       if(newCurrency) newCurrenciesListItem(newCurrency);
   } 
}

// removing from the currency list only when the close button clicked
currenciesList.addEventListener("click", currenciesListClick);

function currenciesListClick(event) {
    if(event.target.classList.contains("close")) {
        // storing list item as a variable
        const parentNode = event.target.parentNode;
        parentNode.remove();
        // removing the disabled class
        addCurrencyList.querySelector(`[data-currency=${parentNode.id}]`).classList.remove("disabled");
        // setting the new base currency, which is the first one in the list, after removing the current base currency
        if(parentNode.classList.contains("base-currency")) {
            const newBaseCurrencyLI = currenciesList.querySelector(".currency");
            // if the item exists we set it as a base currency
            if(newBaseCurrencyLI) {
                setNewBaseCurrency(newBaseCurrencyLI);
                baseCurrencyAmount = Number(newBaseCurrencyLI.querySelector(".input input").value);
            }
        }
    }
}

// setting a new base currency 
function setNewBaseCurrency(newBaseCurrencyLI) {
    // adding the class to the new currency list item
    newBaseCurrencyLI.classList.add("base-currency");
    // setting the base currency from the new currency list item
    baseCurrency = newBaseCurrencyLI.id;
    // getting the base currency rate
    const baseCurrencyRate = currencies.find(c => c.abbreviation===baseCurrency).rate;
    // rewriting the exchange rate relative to the new base currency
    currenciesList.querySelectorAll(".currency").forEach(currencyLI => {
        const currencyRate = currencies.find(currency => currency.abbreviation===currencyLI.id).rate;
        const exchangeRate = currencyLI.id===baseCurrency ? 1 : (currencyRate/baseCurrencyRate).toFixed(4);
        currencyLI.querySelector(".base-currency-rate").textContent = `1 ${baseCurrency} = ${exchangeRate} ${currencyLI.id}`;
    });
}

// input listener
currenciesList.addEventListener("input", currenciesListInputChange);

// check if the input event occurs over the base currency or other
function currenciesListInputChange(event) {
    const isNewBaseCurrency = event.target.closest("li").id!==baseCurrency;
    // if true remove the base currency class from the current base currency list item
    if(isNewBaseCurrency) {
        // select the item with the id base currency and remove the class
        currenciesList.querySelector(`#${baseCurrency}`).classList.remove("base-currency");
        // setting the new base currency
        setNewBaseCurrency(event.target.closest("li"));
    }
    // check input value if it's a number, if it's not set 0
    const newBaseCurrencyAmount = isNaN(event.target.value) ? 0 : Number(event.target.value);
    // make calculations only if the base currency amount is not equal to new base currency amount
    if(baseCurrencyAmount!==newBaseCurrencyAmount || isNewBaseCurrency) {
        // setting the amount to new base currency amount
        baseCurrencyAmount = newBaseCurrencyAmount;
        // get the base currency rate
        const baseCurrencyRate = currencies.find(currency => currency.abbreviation===baseCurrency).rate;
        // loop through each currency list item and modify the input field
        currenciesList.querySelectorAll(".currency").forEach(currencyLI => {            
            // check if the currency list item id is not equal to the base currency so the value in currently active input field doesn't change every time input value changes
            if(currencyLI.id!==baseCurrency) {
                const currencyRate = currencies.find(currency => currency.abbreviation===currencyLI.id).rate;
                const exchangeRate = currencyLI.id===baseCurrency ? 1 : (currencyRate/baseCurrencyRate).toFixed(4);
                currencyLI.querySelector(".input input").value = exchangeRate*baseCurrencyAmount!==0 ? (exchangeRate*baseCurrencyAmount).toFixed(4) : "";
            }            
        });
    }
}

// if out of focus
currenciesList.addEventListener("focusout", currenciesListFocusOut);
 
function currenciesListFocusOut() {
    // store the input value as variable
    const inputValue = event.target.value;
    // if input value is not a number or is 0 set and empty string
    if(isNaN(inputValue) || Number(inputValue)===0) event.target.value = "";
    // otherwise display with 4 decimal places
    else event.target.value = Number(inputValue).toFixed(4);
}

//lose focus when enter key clicked 
currenciesList.addEventListener("keydown", currenciesListKeyDown);

function currenciesListKeyDown(event) {
    if(event.key==="Enter") event.target.blur();
}

// Helper Functions

// Populating the AddCurrencyList
function populateAddCurrencyList() {
    // add new list item to the currency list for each currency in the currencies array
    for(let i=0; i<currencies.length; i++) {
        addCurrencyList.insertAdjacentHTML("beforeend",
        `<li data-currency=${currencies[i].abbreviation}>
        <img src=${currencies[i].flagURL} class="flag"><span>${currencies[i].abbreviation} - ${currencies[i].name}</span></li>`);
    }
}

// Populating the currencies list
function populateCurrenciesList() {
    /* for each currency in the initially displayed currencies array we want to find the corresponding currency object from the currencies array and store that as a variable.
    If the object is available we want to create and add to the currencies list a new currencies list item
    */
    for(let i=0; i<initiallyDisplayedCurrencies.length; i++) {
        const currency = currencies.find(c => c.abbreviation===initiallyDisplayedCurrencies[i]);
        if(currency) newCurrenciesListItem(currency);
    }
}

// checking if the currencies list is empty, therefore new currencies list item is the first item to be inserted in the list
function newCurrenciesListItem(currency) {
    if(currenciesList.childElementCount===0) {
        baseCurrency = currency.abbreviation;
        baseCurrencyAmount = 0;
    }
    // disabling the corresponding currency item from the list
    addCurrencyList.querySelector(`[data-currency=${currency.abbreviation}]`).classList.add("disabled");
    // base currency rate
    const baseCurrencyRate = currencies.find(c => c.abbreviation===baseCurrency).rate;
    // calculating the exchange rate and checking if the current currency is the base currency
    const exchangeRate = currency.abbreviation===baseCurrency ? 1 : (currency.rate/baseCurrencyRate).toFixed(4);
    // if base currency amount is not 0 then the input value is equal to the base currency amount times exchange rate
    const inputValue = baseCurrencyAmount ? (baseCurrencyAmount*exchangeRate).toFixed(4) : "";

    // add the new item to the currencies list
    currenciesList.insertAdjacentHTML("beforeend",
    `<li class="currency ${currency.abbreviation===baseCurrency ? "base-currency" : ""}" id=${currency.abbreviation}>
        <img src=${currency.flagURL} class="flag">
        <div class="info">
            <p class="input"><span class="currency-symbol">${currency.symbol}</span><input placeholder="0.0000" value=${inputValue}></p>
            <p class="currency-name">${currency.abbreviation} - ${currency.name}</p>
            <p class="base-currency-rate">1 ${baseCurrency} = ${exchangeRate} ${currency.abbreviation}</p>
        </div>
        <span class="close">&times;</span>
    </li>`
    );
}

//Fetch data from the API
fetch(dataURL)
// parse to json
.then(res => res.json())
// data available
.then(data => {
    console.log(data);
    // set the content for date element
    document.querySelector(".date").textContent = data.date.split("-").reverse().join("-");
    // add the EUR to the data.rates object so it becomes available
    data.rates["EUR"] = 1;
    // make sure that only currencies with available exchange rates will exist in the currencies array
    currencies = currencies.filter(currency => data.rates[currency.abbreviation]);
    // loop through the currencies array and add the rate property
    currencies.forEach(currency => currency.rate = data.rates[currency.abbreviation]);
    populateAddCurrencyList();
    populateCurrenciesList();
})
.catch(err => console.log(err));

