//util functions just need parameters to work
function maybePlaySound(i, stage, halfwayBeepButton, soundsArr) {
    if (stage.index === 0 && i === stage.duration - 1) {
      soundsArr.stageGetReady.play();
      soundsArr.stageSwitch.play();
    }

    if (i === stage.duration) {
      soundsArr.stageSwitch.play();
      switch (stage.stage) {
        case "Exercise!":
          soundsArr.stageExercise.play();
          break;
        case "Rest!":
          soundsArr.stageRest.play();
          break;
        case "Recovery":
          soundsArr.stageRecovery.play();
          break;
      }
    }

    if (
      (i <= 3 && stage.duration > 3) ||
      (stage.duration <= 3 && i <= stage.duration - 1)
    ) {
      soundsArr.beep.play();
    }

    //halfwayBeep
    if (
      halfwayBeepButton.checked == true &&
      i == Math.floor(stage.duration / 2) &&
      stage.duration >= 8
    ) {
      soundsArr.refereeWhistle.play();
    }
  }

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

//SETTINGS PAGE - changes line by pressing enter
function keypressHandler(fn) {
    return function (e) {
      if (e.which === 13) {
        fn();
      }
    };
  }

//Program select
function generateExerciseStages(exerciseMeasures) {
  //Exercise times
  let index = 0;

  const exerciseStages = [
    {
      duration: exerciseMeasures.initialCountdown,
      stage: "Get ready!",
      color: "white",
      sets: 0,
      cycles: 0,
      index: index++,
    },
  ];

  for (m = 0; m < exerciseMeasures.numberOfCycles; m++) {
    let currentSet;
    for (n = 0; n < exerciseMeasures.numberOfSets; n++) {
      exerciseStages.push(
        {
          duration: exerciseMeasures.exerciseInterval,
          stage: "Exercise!",
          color: "#ff2f00",
          sets: n + 1,
          cycles: m + 1,
          index: index++,
        },
        {
          duration: exerciseMeasures.restInterval,
          stage: "Rest!",
          color: "#07ff07",
          sets: n + 1,
          cycles: m + 1,
          index: index++,
        }
      );
      currentSet = n + 1;
    }
    exerciseStages.push({
      duration: exerciseMeasures.recoveryInterval,
      stage: "Recovery",
      color: "#0099ff",
      sets: currentSet,
      cycles: m + 1,
      index: index++,
    });
  }

  return exerciseStages;
}