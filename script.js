const apiKey = "60d681145667e3a76eeb44b4";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select"); 
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".exchange-rate");

for (let select of dropdowns) {
    for (currCode in countryList) {
      let newOption = document.createElement("option");
      newOption.innerText = currCode;
      newOption.value = currCode;
      if (currCode === "USD" && select.name === "from") {
        newOption.selected = "selected";
      } else if (currCode === "INR" && select.name === "to") {
        newOption.selected = "selected";
      }
      select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
};

const updateExchangeRate = async () =>{
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1"; 
    }
    const URL = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurr.value}`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data.conversion_rates[toCurr.value];

    let finalAmount = amtVal*rate;
    console.log(finalAmount);

    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`
};

const updateFlag = (element) => {
    currCode = element.value;
    countryName = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryName}/shiny/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click",(evt) =>{
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load", () => {
    updateExchangeRate();
  });
