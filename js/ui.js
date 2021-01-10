class UI {
  constructor() {
    //Main pages
    this.mainTimer = document.getElementById("mainTimer");
    this.settingsBlock = document.getElementById("settingsBlock");

    //Buttons
    this.startButton = document.getElementById("startButton");
    this.pauseButton = document.getElementById("pauseButton");
    this.clearButton = document.getElementById("clearButton");
    this.backwardsButton = document.getElementById("backButton");
    this.forwardsButton = document.getElementById("forButton");
    this.settingsButton = document.getElementById("settingsButton");
    this.settingsBackButton = document.getElementById("settingsBackButton");
    this.settingsSubmitButton = document.getElementById("settingsSubmitButton");
    this.halfwayBeepButton = document.getElementById("halfwayBeep");

    //Labels
    this.timeLabel = document.getElementById("time");
    this.stageLabel = document.getElementById("stage");
    this.setsLabel = document.getElementById("sets");
    this.cyclesLabel = document.getElementById("cycles");
    this.totalTimeLabel = document.getElementById("totalTime");
    this.totalSetsAndCyclesLabel = document.getElementById(
      "totalSetsAndCycles"
    );
    this.titleSetCycleTotalTimeLabel = document.getElementById(
      "titleSetCycleTotalTime"
    );
    this.programsSelect = document.getElementById("programs");

    // settings inputs
    this.exerciseIntervalInput = document.getElementById(
      "exerciseIntervalInput"
    );
    this.restIntervalInput = document.getElementById("restIntervalInput");
    this.numberOfSetsInput = document.getElementById("numberOfSetsInput");
    this.recoveryIntervalInput = document.getElementById(
      "recoveryIntervalInput"
    );
    this.numberOfCyclesInput = document.getElementById("numberOfCyclesInput");

    //SETTINGS PAGE - changes line by pressing enter
    this.exerciseIntervalInput.addEventListener(
      "keypress",
      keypressHandler(() => restIntervalInput.focus())
    );

    this.restIntervalInput.addEventListener(
      "keypress",
      keypressHandler(() => numberOfSetsInput.focus())
    );

    this.numberOfSetsInput.addEventListener(
      "keypress",
      keypressHandler(() => recoveryIntervalInput.focus())
    );

    this.recoveryIntervalInput.addEventListener(
      "keypress",
      keypressHandler(() => numberOfCyclesInput.focus())
    );

    this.numberOfCyclesInput.addEventListener(
      "keypress",
      keypressHandler(() => this.settingsSubmitButton.click())
    );
  }

  displaySettings() {
    this.mainTimer.style.display = "none";
    this.settingsBlock.style.display = "block";
  }

  hideSettings() {
    this.mainTimer.style.display = "block";
    this.settingsBlock.style.display = "none";
  }

  // UI functions
  timerRunningUIState() {
    this.startButton.style.display = "none";
    this.settingsButton.style.display = "none";
    this.pauseButton.style.display = "inline-block";
    this.clearButton.style.display = "inline-block";
    this.backwardsButton.style.display = "inline-block";
    this.forwardsButton.style.display = "inline-block";
    this.pauseButton.disabled = false;
    this.clearButton.disabled = false;
    this.halfwayBeepButton.disabled = true;
  }

  timerClearedUIState() {
    this.startButton.disabled = false;
    this.halfwayBeepButton.disabled = false;

    this.startButton.style.display = "inline-block";
    this.settingsButton.style.display = "inline-block";
    this.pauseButton.style.display = "none";
    this.clearButton.style.display = "none";
    this.backwardsButton.style.display = "none";
    this.forwardsButton.style.display = "none";

    this.timeLabel.style.color = "white";
    this.stageLabel.style.color = "white";

    this.timeLabel.innerHTML = "00:00";
    this.stageLabel.innerHTML = "Select exercise";
    this.setsLabel.innerHTML = "00";
    this.cyclesLabel.innerHTML = "00";
    this.totalTimeLabel.innerHTML = "00:00";

    this.hideSettings();
  }

  timerPausedUIState() {
    this.startButton.disabled = false;
    this.halfwayBeepButton.disabled = false;
    this.startButton.style.display = "inline-block";
    this.settingsButton.style.display = "none";
    this.pauseButton.style.display = "none";
  }

  updateTimerLabels(stageMetadata, totalTime, i) {
    this.stageLabel.style.color = stageMetadata.color;
    this.timeLabel.style.color = stageMetadata.color;

    this.stageLabel.innerHTML = stageMetadata.stage;

    this.setsLabel.innerHTML = `${formatSetCycles(stageMetadata.sets)}`;
    this.cyclesLabel.innerHTML = `${formatSetCycles(stageMetadata.cycles)}`;

    this.totalTimeLabel.innerHTML = formatTime(totalTime);

    this.timeLabel.innerHTML = formatTime(i);
  }

  onStartButtonClick(clickHandler) {
    this.startButton.addEventListener("click", clickHandler);
  }

  onPauseButtonClick(clickHandler) {
    this.pauseButton.addEventListener("click", clickHandler);
  }

  onClearButtonClick(clickHandler) {
    this.clearButton.addEventListener("click", clickHandler);
  }

  onForwardsButtonClick(clickHandler) {
    this.forwardsButton.addEventListener("click", clickHandler);
  }

  onBackwardsButtonClick(clickHandler) {
    this.backwardsButton.addEventListener("click", clickHandler);
  }

  onSettingsButtonClick(clickHandler) {
    this.settingsButton.addEventListener("click", clickHandler);
  }

  onSettingsBackButtonClick(clickHandler) {
    this.settingsBackButton.addEventListener("click", clickHandler);
  }

  onSettingsSubmitButtonClick(clickHandler) {
    this.settingsSubmitButton.addEventListener("click", clickHandler);
  }

  onProgramsSelectChange(changeHandler) {
    this.programsSelect.addEventListener("change", changeHandler);
  }
}

const ui = new UI();
