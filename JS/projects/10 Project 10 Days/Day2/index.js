let timeInput = document.getElementById('timeInput');
const startButton = document.getElementById('startButton');
const countdownDisplay = document.getElementById('countdownDisplay');
const pauseButton = document.getElementById('pauseButton');
const resumeButton = document.getElementById('resumeButton');

let timer = null;
let valueInSeconds = 0;

function updateCountdownDisplay(valueInSeconds) {
    if (valueInSeconds >= 0) {
        countdownDisplay.innerText = `Remaining Time is ${valueInSeconds} seconds`;
    } else {
        countdownDisplay.innerText = "Time's Up";
    }
}

function pauseTimer() {
    if (valueInSeconds <= 0) {
        countdownDisplay.innerText = "Cannot pause";
        return;
    }
    clearInterval(timer);
    countdownDisplay.innerText = `Countdown paused at ${valueInSeconds} seconds.\nPress Resume button to continue\nRemaining Time is ${valueInSeconds} seconds`;
}

function resumeTimer() {
    if (valueInSeconds <= 0) {
        countdownDisplay.innerText = "Cannot resume";
        return;
    }
    runTimer();
}
function runTimer() {
    timer = setInterval(function () {
        updateCountdownDisplay(valueInSeconds);
        valueInSeconds--;

        if (valueInSeconds < 0) {
            clearInterval(timer);
            countdownDisplay.innerText = "Time's Up"
        }
        pauseButton.addEventListener('click', pauseTimer);
        resumeButton.addEventListener('click', resumeTimer);
        
    }, 1000);
}

function startTimer() {
    valueInSeconds = parseInt(timeInput.value);
    if (isNaN(valueInSeconds)) {
        countdownDisplay.innerText = "Please enter a valid number";
        return;
    }
    if (valueInSeconds <= 0) {
        countdownDisplay.innerText = "Please enter seconds > 0";
        return;
    }

    runTimer();
}

startButton.addEventListener('click', startTimer);
