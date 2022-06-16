let titleDOM = document.querySelector("#title");
let faviconDOM = document.querySelector("#favicon");
let pomodoroButtonDOM = document.querySelector(".pomodoro");
let shortBreakButtonDOM = document.querySelector(".short-break");
let longBreakButtonDOM = document.querySelector(".long-break");

let timeTextDOM = document.querySelector("#time");
let startButtonDOM = document.querySelector(".start-button");

let counterDOM = document.querySelector("#counter");
let textInfoDOM = document.querySelector(".text-info");

let state = false;
let breakCounter = 0;
let currentModIndex = 0;
let selectedTime = new Date();
let selectedModInfo = "Time to focus!";
let currentFavicon = faviconDOM.href;
selectedTime.setMinutes(25);
selectedTime.setSeconds(0);

pomodoroButtonDOM.addEventListener("click", changePomodoroModRouter);
shortBreakButtonDOM.addEventListener("click", changePomodoroModRouter);
longBreakButtonDOM.addEventListener("click", changePomodoroModRouter);
startButtonDOM.addEventListener("click", startButtonClicked);

function changePomodoroModRouter(e){
    changePomodoroMod(e.path[0]);
}
function changePomodoroMod(e) {

    if (state) {
        var answer = window.confirm("The timer is still running, are you sure you want to switch?");
        if (answer) {
            cleanClickedClasses();
            changeMod(e);
            e.classList.add("clicked");
            state = false;
            startButtonDOM.classList.remove("clicked");
            startButtonTextUpdate();
        }
    }
    else {
        cleanClickedClasses();
        changeMod(e);
        e.classList.add("clicked");
    }
}
function cleanClickedClasses() {
    pomodoroButtonDOM.classList.remove("clicked");
    shortBreakButtonDOM.classList.remove("clicked");
    longBreakButtonDOM.classList.remove("clicked");
}
function changeMod(e) {
    if (e.innerHTML === "Pomodoro") {
        currentModIndex = 0;
        setModProperties("Time to focus!", 25, 0, "rgb(217, 85, 80)", "assets/favicon-pomodoro.ico");
    }
    else if (e.innerHTML === "Short Break") {
        currentModIndex = 1;
        setModProperties("Time for a break!", 5, 0, "rgb(38, 199, 201)", "assets/favicon-short-break.ico");
    }
    else {
        currentModIndex = 2;
        setModProperties("Time for a break!", 15, 0, "rgb(117, 38, 201)", "assets/favicon-long-break.ico");
    }
    updateTexts();
}
function setModProperties(info, min, sec, bgcolor, href) {
    selectedModInfo = info;
    selectedTime.setMinutes(min);
    selectedTime.setSeconds(sec);
    faviconDOM.href = href;
    currentFavicon = href;
    document.documentElement.style.setProperty('--bgcolor', bgcolor);
}

function startButtonClicked() {
    state = !state;
    if (startButtonDOM.classList.contains("clicked")) {
        startButtonDOM.classList.remove("clicked");
        startButtonTextUpdate();
        currentFavicon = faviconDOM.href;
        faviconDOM.href = "assets/favicon-stop.ico"
    }
    else {
        startButtonDOM.classList.add("clicked");
        startButtonTextUpdate();
        faviconDOM.href = currentFavicon;
    }
}
function startButtonTextUpdate() {
    if (startButtonDOM.classList.contains("clicked")) {
        startButtonDOM.innerHTML = "STOP";
    }
    else {
        startButtonDOM.innerHTML = "START";
    }
}
function startButtonUnclick() {
    startButtonDOM.classList.remove("clicked");
    startButtonTextUpdate();
}
function updateTexts() {
    timeTextDOM.innerHTML = `${selectedTime.getMinutes() >= 10 ? selectedTime.getMinutes() : `0` + selectedTime.getMinutes()}:${selectedTime.getSeconds() >= 10 ? selectedTime.getSeconds() : `0` + selectedTime.getSeconds()}`;
    textInfoDOM.innerHTML = selectedModInfo;
    titleDOM.innerHTML = `${timeTextDOM.innerHTML} - ${selectedModInfo}`;
}
setInterval(function () {
    if (state) {
        if (selectedTime.getMinutes() == 0 && selectedTime.getSeconds() == 0) {
            state = false;
            alert(currentModIndex === 0 ? "Time to break :)" : "Time to focus!");

            if (currentModIndex === 0) {
                breakCounter += 1;
                if (breakCounter % 3 === 0) {
                    changePomodoroMod(longBreakButtonDOM);
                    startButtonUnclick();
                }
                else {
                    changePomodoroMod(shortBreakButtonDOM);
                    startButtonUnclick();
                }
            }
            else {
                changePomodoroMod(pomodoroButtonDOM);
                startButtonUnclick();
            }
        }
        else {
            selectedTime.setSeconds(selectedTime.getSeconds() - 1);
        }
        updateTexts();
    }
}, 1000);


