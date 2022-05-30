let selectBoxDom1 = document.querySelector("#money1");
let selectBoxDom2 = document.querySelector("#money2");
let inputBoxDom2 = document.querySelector("#amount2");
let inputBoxDom1 = document.querySelector("#amount1");
let swapButtonDom = document.querySelector(".swap-button");
let rateLabelDom = document.querySelector("#rate-label");
let apiURL = "https://v6.exchangerate-api.com/v6/559b67ffd041faa26aa794f9/latest/USD";
let response;
initState();

async function initState() {

     fetch(apiURL)
     .then(response=> response.json())
     .then(function(data){
        response = data;
        setSelectBoxes();
    });
}

function setSelectBoxes(){
    let currencyList = response["conversion_rates"];
    let currencyUnitList = Object.keys(currencyList);

    currencyUnitList.forEach(unit => {
        let newOption = document.createElement("option");
        let newOption2 = document.createElement("option");
        newOption.innerHTML = unit;
        newOption2.innerHTML = unit;
        newOption.value = currencyList[unit];
        newOption2.value = currencyList[unit];
        selectBoxDom1.append(newOption);
        selectBoxDom2.append(newOption2);
    });
    selectBoxDom2.selectedIndex = 139; // set TRY on second select box
    calculateRate();
}

function calculateRate(){
    let currencyUnitName1 = selectBoxDom1[selectBoxDom1.selectedIndex].innerHTML;
    let currencyUnitName2 = selectBoxDom2[selectBoxDom2.selectedIndex].innerHTML;
    let currencyUnit1 = selectBoxDom1.value;
    let currencyUnit2 = selectBoxDom2.value;
    let currencyAmount1 = inputBoxDom1.value;
    let currencyAmount2 = inputBoxDom2.value;
    let result = ((currencyAmount1*currencyUnit2)/(currencyUnit1)).toFixed(4);
    inputBoxDom2.value = result;
    rateLabelDom.innerHTML = `1 ${currencyUnitName1} = ${(currencyUnit2/currencyUnit1).toFixed(4)} ${currencyUnitName2}`;
}

selectBoxDom1.addEventListener("change",calculateRate);
selectBoxDom2.addEventListener("change",calculateRate);
inputBoxDom1.addEventListener("change",calculateRate);
inputBoxDom1.addEventListener("input",calculateRate);
swapButtonDom.addEventListener("click", function(e){
    let temp = selectBoxDom1.selectedIndex;
    selectBoxDom1.selectedIndex = selectBoxDom2.selectedIndex;
    selectBoxDom2.selectedIndex = temp;
    calculateRate();
})