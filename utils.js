//TotalTime calculator
function calculateTotalTime(exercises, stage = 0) {
  let total = 0;
  for (let i = stage; i < exercises.length; i++) {
    total = total + exercises[i].duration;
  }
  return total;
}

//function formats time
function formatTime(time) {
  const sec = time % 60;
  const minutes = Math.floor(time / 60);
  let secStr = sec;
  let minutesStr = minutes;

  if (sec <= 9) {
    secStr = `0${sec}`;
  }

  if (minutes <= 9) {
    minutesStr = `0${minutes}`;
  }

  return `${minutesStr}:${secStr}`;
}

//function formats sets and cycles
function formatSetCycles(amount) {
  let amountNumb = amount;
  if (amount <= 9) {
    amountNumb = `0${amount}`;
  }
  return `${amountNumb}`;
}