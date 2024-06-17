let timer;
let isRunning = false;
let elapsedTime = 0;
let startTime;
let lapCounter = 1;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

function updateTime() {
    elapsedTime = Date.now() - startTime;
    let totalMilliseconds = elapsedTime;
    let milliseconds = totalMilliseconds % 1000;
    totalMilliseconds = (totalMilliseconds - milliseconds) / 1000;
    let seconds = totalMilliseconds % 60;
    let minutes = (totalMilliseconds - seconds) / 60;

    display.textContent = `${pad(minutes)}:${pad(seconds)}:${pad(Math.floor(milliseconds / 10))}`;
}

function pad(number) {
    return number < 10 ? '0' + number : number;
}

startStopBtn.addEventListener('click', function() {
    if (isRunning) {
        clearInterval(timer);
        startStopBtn.textContent = 'Start';
    } else {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateTime, 10);
        startStopBtn.textContent = 'Pause';
    }
    isRunning = !isRunning;
});

resetBtn.addEventListener('click', function() {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    startStopBtn.textContent = 'Start';
    display.textContent = '00:00:00';
    laps.innerHTML = '';
    lapCounter = 1;
});

lapBtn.addEventListener('click', function() {
    if (isRunning) {
        const lapTime = display.textContent;
        const lapElement = document.createElement('div');
        lapElement.className = 'lap';
        lapElement.textContent = `Lap ${lapCounter}: ${lapTime}`;
        laps.appendChild(lapElement);
        lapCounter++;
    }
});
