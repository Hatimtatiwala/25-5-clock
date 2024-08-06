let breakLength = 5;
let sessionLength = 25;
let timeLeft = sessionLength * 60;
let isRunning = false;
let isSession = true;
let timerInterval;

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  document.getElementById('time-left').textContent =
  `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function startStopTimer() {
  if (isRunning) {
    clearInterval(timerInterval);
  } else {
    timerInterval = setInterval(() => {
      timeLeft--;
      updateDisplay();
      if (timeLeft < 0) {
        document.getElementById('beep').play();
        isSession = !isSession;
        timeLeft = (isSession ? sessionLength : breakLength) * 60;
        document.getElementById('timer-label').textContent = isSession ? 'Session' : 'Break';
      }
    }, 1000);
  }
  isRunning = !isRunning;
}

function resetTimer() {
  clearInterval(timerInterval);
  breakLength = 5;
  sessionLength = 25;
  timeLeft = sessionLength * 60;
  isRunning = false;
  isSession = true;
  document.getElementById('timer-label').textContent = 'Session';
  document.getElementById('break-length').textContent = breakLength;
  document.getElementById('session-length').textContent = sessionLength;
  updateDisplay();
  document.getElementById('beep').pause();
  document.getElementById('beep').currentTime = 0;
}

document.getElementById('break-decrement').addEventListener('click', () => {
  if (breakLength > 1) {
    breakLength--;
    document.getElementById('break-length').textContent = breakLength;
  }
});

document.getElementById('break-increment').addEventListener('click', () => {
  if (breakLength < 60) {
    breakLength++;
    document.getElementById('break-length').textContent = breakLength;
  }
});

document.getElementById('session-decrement').addEventListener('click', () => {
  if (sessionLength > 1) {
    sessionLength--;
    document.getElementById('session-length').textContent = sessionLength;
    if (!isRunning) {
      timeLeft = sessionLength * 60;
      updateDisplay();
    }
  }
});

document.getElementById('session-increment').addEventListener('click', () => {
  if (sessionLength < 60) {
    sessionLength++;
    document.getElementById('session-length').textContent = sessionLength;
    if (!isRunning) {
      timeLeft = sessionLength * 60;
      updateDisplay();
    }
  }
});

document.getElementById('start_stop').addEventListener('click', startStopTimer);
document.getElementById('reset').addEventListener('click', resetTimer);

updateDisplay();