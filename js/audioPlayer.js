const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const sources = {};

// This function is not used yet
function audioPlayer(param) {
  Object.keys(param).forEach((key) => {
    // sources[key] = audioCtx.createBufferSource();
    var request = new XMLHttpRequest();

    request.open("GET", param[key], true);

    request.responseType = "arraybuffer";

    request.onload = function () {
      var audioData = request.response;

      audioCtx.decodeAudioData(
        audioData,
        function (buffer) {
          sources[key] = buffer;
        },
        function (e) {
          console.log("Error with decoding audio data" + e.err);
        }
      );
    };

    request.send();
  });

  return function playAudio(audioName) {
    const source = audioCtx.createBufferSource();
    source.buffer = sources[audioName];

    source.connect(audioCtx.destination);
    source.loop = false;
    source.start(0);
  };
}

//audio
//audio for random audio select
/*const beepSoundFileUrls = ["beep1.mp3", "beep2.mp3"];
  const stageSwitchSounds = ["",""];
  const stageGetReadySounds = ["",""];
  const stageExerciseSounds = ["",""];
  const stageRestSounds = ["",""];
  const stageRecoverySounds = ["",""];
  const refereeWhistleSounds = ["",""];
  */

const audioFileUrls = {
  default: {
    beep:
      "https://raw.githubusercontent.com/Mundal1994/UltimateTimer/main/audioFiles/beep.mp3",
    stageSwitch:
      "https://raw.githubusercontent.com/Mundal1994/UltimateTimer/main/audioFiles/stageSwitch.mp3",
    stageGetReady:
      "https://raw.githubusercontent.com/Mundal1994/UltimateTimer/main/audioFiles/getReady.mp3",
    stageExercise:
      "https://raw.githubusercontent.com/Mundal1994/UltimateTimer/main/audioFiles/exercise.mp3",
    stageRest:
      "https://raw.githubusercontent.com/Mundal1994/UltimateTimer/main/audioFiles/rest.mp3",
    stageRecovery:
      "https://raw.githubusercontent.com/Mundal1994/UltimateTimer/main/audioFiles/recovery.mp3",
    refereeWhistle:
      "https://raw.githubusercontent.com/Mundal1994/UltimateTimer/main/audioFiles/refereeWhistle.mp3",
  },
  version1: {
    beep:
      "https://raw.githubusercontent.com/Mundal1994/UltimateTimer/main/audioFiles/stageSwitch.mp3",
    stageSwitch:
      "https://raw.githubusercontent.com/Mundal1994/UltimateTimer/main/audioFiles/beep.mp3",
    stageGetReady:
      "https://raw.githubusercontent.com/Mundal1994/UltimateTimer/main/audioFiles/getReady.mp3",
    stageExercise:
      "https://raw.githubusercontent.com/Mundal1994/UltimateTimer/main/audioFiles/exercise.mp3",
    stageRest:
      "https://raw.githubusercontent.com/Mundal1994/UltimateTimer/main/audioFiles/rest.mp3",
    stageRecovery:
      "https://raw.githubusercontent.com/Mundal1994/UltimateTimer/main/audioFiles/recovery.mp3",
    refereeWhistle:
      "https://raw.githubusercontent.com/Mundal1994/UltimateTimer/main/audioFiles/refereeWhistle.mp3",
  },
};

const beep = new Audio(audioFileUrls.default.beep);
const stageSwitch = new Audio(audioFileUrls.default.stageSwitch);
const stageGetReady = new Audio(audioFileUrls.default.stageGetReady);
const stageExercise = new Audio(audioFileUrls.default.stageExercise);
const stageRest = new Audio(audioFileUrls.default.stageRest);
const stageRecovery = new Audio(audioFileUrls.default.stageRecovery);
const refereeWhistle = new Audio(audioFileUrls.default.refereeWhistle);

const sounds = {
  beep,
  stageSwitch,
  stageGetReady,
  stageExercise,
  stageRest,
  stageRecovery,
  refereeWhistle,
};

const playAudio = audioPlayer(audioFileUrls.default);

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

// Didn't work on iOS
// Since iOS requires user interaction for playing sounds
function resetAudioURLs(audioType = "default") {
  beep.src = "";
  beep.play();
  stageSwitch.src = "";
  stageSwitch.play();
  stageGetReady.src = "";
  stageGetReady.play();
  stageExercise.src = "";
  stageExercise.play();
  stageRest.src = "";
  stageRest.play();
  stageRecovery.src = "";
  stageRecovery.play();
  refereeWhistle.src = "";
  refereeWhistle.play();

  let urls = audioFileUrls[audioType];
  if (audioType === "random") {
    urls = {
      beep: beepSounds[getRandomIntInclusive(0, beepSounds.length - 1)],
      stageSwitch:
        stageSwitchSounds[
          getRandomIntInclusive(0, stageSwitchSounds.length - 1)
        ],
      stageGetReady:
        stageGetReadySounds[
          getRandomIntInclusive(0, stageGetReadySounds.length - 1)
        ],
      stageExercise:
        stageExerciseSounds[
          getRandomIntInclusive(0, stageExerciseSounds.length - 1)
        ],
      stageRest:
        stageRestSounds[getRandomIntInclusive(0, stageRestSounds.length - 1)],
      stageRecovery:
        stageRecoverySounds[
          getRandomIntInclusive(0, stageRecoverySounds.length - 1)
        ],
      refereeWhistle:
        refereeWhistleSounds[
          getRandomIntInclusive(0, refereeWhistleSounds.length - 1)
        ],
    };
  }

  beep.src = urls.beep;
  stageSwitch.src = urls.stageSwitch;
  stageGetReady.src = urls.stageGetReady;
  stageExercise.src = urls.stageExercise;
  stageRest.src = urls.stageRest;
  stageRecovery.src = urls.stageRecovery;
  refereeWhistle.src = urls.refereeWhistle;
}
