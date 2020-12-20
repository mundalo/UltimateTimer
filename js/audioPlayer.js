const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const sources = {};

function audioPlayer(param) {

  Object.keys(param).forEach(key => {
    // sources[key] = audioCtx.createBufferSource();
    var request = new XMLHttpRequest();

    request.open('GET', param[key], true);

    request.responseType = 'arraybuffer';


    request.onload = function () {
      var audioData = request.response;

      audioCtx.decodeAudioData(audioData, function (buffer) {
        sources[key] = buffer;
      },
        function (e) {
          console.log("Error with decoding audio data" + e.err);
        });
    }

    request.send();
  });

  return function playAudio(audioName) {
    const source = audioCtx.createBufferSource();
    source.buffer = sources[audioName];

    source.connect(audioCtx.destination);
    source.loop = false;
    source.start(0)
  }
}

//audio
const audioFileUrls = {
  beep:
    "https://raw.githubusercontent.com/Mundal1994/UltimateTimer/main/audioFiles/beep.mp3",
  stageSwitch:
    "https://raw.githubusercontent.com/Mundal1994/UltimateTimer/main/audioFiles/stage-switch.mp3",
  stageGetReady:
    "https://raw.githubusercontent.com/Mundal1994/UltimateTimer/main/audioFiles/get-ready.mp3",
  stageExercise:
    "https://raw.githubusercontent.com/Mundal1994/UltimateTimer/main/audioFiles/exercise.mp3",
  stageRest:
    "https://raw.githubusercontent.com/Mundal1994/UltimateTimer/main/audioFiles/rest.mp3",
  stageRecovery:
    "https://raw.githubusercontent.com/Mundal1994/UltimateTimer/main/audioFiles/recovery.mp3",
  refereeWhistle:
    "https://raw.githubusercontent.com/Mundal1994/UltimateTimer/main/audioFiles/refereeWhistle.mp3",
};

const beep = new Audio(audioFileUrls.beep);
const stageSwitch = new Audio(audioFileUrls.stageSwitch);
const stageGetReady = new Audio(audioFileUrls.stageGetReady);
const stageExercise = new Audio(audioFileUrls.stageExercise);
const stageRest = new Audio(audioFileUrls.stageRest);
const stageRecovery = new Audio(audioFileUrls.stageRecovery);
const refereeWhistle = new Audio(audioFileUrls.refereeWhistle);

const sounds = {
  beep,
  stageSwitch,
  stageGetReady,
  stageExercise,
  stageRest,
  stageRecovery,
  refereeWhistle,
}

const playAudio = audioPlayer({
  beep: audioFileUrls.beep,
  stageSwitch: audioFileUrls.stageSwitch,
  stageGetReady: audioFileUrls.stageGetReady,
  stageExercise: audioFileUrls.stageExercise,
  stageRest: audioFileUrls.stageRest,
  stageRecovery: audioFileUrls.stageRecovery,
  refereeWhistle: audioFileUrls.refereeWhistle,
});