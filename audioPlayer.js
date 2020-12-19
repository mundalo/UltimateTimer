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

