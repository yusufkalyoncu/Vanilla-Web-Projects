let seats = document.querySelectorAll(".seat");
let container = document.querySelector(".container");
let info = document.querySelector(".price");
let selectBox = document.querySelector("#movies");
let buyButton = document.querySelector(".buy");
let clearButton = document.querySelector(".clear");
let selectedSeats;
let boughtSeatsList
let selectedSeatsList
let seatsIndex;
let movieIndex;
initState();
UpdateSelectedSeats();
UpdateInfo();

function initState(){
    ClearSeats();
    selectBox.selectedIndex = localStorage.getItem('selectedMovieIndex');
    movieIndex = selectBox.selectedIndex;
    selectedSeatsList = localStorage.getItem(`selectedSeats${movieIndex}`);
    boughtSeatsList = localStorage.getItem(`boughtSeats${movieIndex}`);
    selectedSeatsList = JSON.parse(selectedSeatsList);
    boughtSeatsList = JSON.parse(boughtSeatsList);
    if(selectedSeatsList){
        selectedSeatsList.forEach(index => {
            seats[index].classList.add("selected");
        });
    }
    if(boughtSeatsList){
        boughtSeatsList.forEach(index=>{
            seats[index].classList.add("occupied");
        });
    }
    selectedSeats = document.querySelectorAll(".seat.selected");
}

container.addEventListener("click",function(e){
    if(e.target.classList.contains("seat") && !e.target.classList.contains("occupied")){
        if(!e.target.classList.contains("selected")){
            e.target.classList.add("selected");
        }
        else{
            e.target.classList.remove("selected");
        }
        UpdateSelectedSeats();
    }
});

buyButton.addEventListener("click",function(e){
    boughtSeats = JSON.parse(localStorage.getItem(`boughtSeats${movieIndex}`));
    console.log(boughtSeats);
    if(boughtSeats){
        boughtSeats = [...boughtSeats, ...seatsIndex];
    }
    else{
        boughtSeats = [...seatsIndex];
    }

    localStorage.setItem(`boughtSeats${movieIndex}`,JSON.stringify(boughtSeats));
    selectedSeats.forEach(seat => {
        seat.classList.remove("selected");
        seat.classList.add("occupied");
    });
    UpdateSelectedSeats();
});


clearButton.addEventListener("click",function(e){
    selectedSeatsList = localStorage.getItem(`selectedSeats${movieIndex}`);
    boughtSeatsList = localStorage.getItem(`boughtSeats${movieIndex}`);
    selectedSeatsList = JSON.parse(selectedSeatsList);
    boughtSeatsList = JSON.parse(boughtSeatsList);
    ClearSeats();    
    localStorage.clear();
});

selectBox.addEventListener("change", function(){
    localStorage.setItem(`selectedMovieIndex`,selectBox.selectedIndex);
    initState();
    UpdateSelectedSeats();
    UpdateInfo();
});

function UpdateSelectedSeats(){
    selectedSeats = document.querySelectorAll(".seat.selected");
    seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));// find selected seats' index
    localStorage.setItem(`selectedSeats${movieIndex}`, JSON.stringify(seatsIndex));
    UpdateInfo();
}

function UpdateInfo(){
    if(selectedSeats.length<2){
        info.innerHTML = `You have selected ${selectedSeats.length} seat price of ${selectedSeats.length*selectBox.value}$`;
    }
    else{
        info.innerHTML = `You have selected ${selectedSeats.length} seats price of ${selectedSeats.length*selectBox.value}$`;
    }
}

function ClearSeats(){
    seats.forEach(seat => {
        if(seat.classList.contains("selected")){
            seat.classList.remove("selected");
        }
        if(seat.classList.contains("occupied")){
            seat.classList.remove("occupied");
        }
    });
}

