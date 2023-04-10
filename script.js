const firstWord = 'hello';
const myInput = document.getElementById("myInput");

function getDictionaryDefinition(word) {
  return fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(response => response.json())
    .catch(error => console.error(error));
}

function playAudio() {
  const audio = document.getElementById("meu-audio");
  const button = document.getElementById("play-button");

  if (audio.paused) {
    audio.play();
    button.innerHTML = "<i class='fa fa-pause'></i>";
  } else {
    audio.pause();
    button.innerHTML = "<i class='fa fa-play'></i>";
  }

  audio.addEventListener('ended', () => {
    button.innerHTML = "<i class='fa fa-play'></i>";
  });
}

function buildMain(data) {
  updateDictionaryHeader(data[0]);
  updateWordDefinition(data[0]);
  updateSynonymsNoun(data[0]);
}

function search (event) {
  const myInput = document.getElementById("myInput");
  if (event.key === "Enter") {
    getDictionaryDefinition(myInput.value)
      .then(data => {
       buildMain(data)})
     .catch(error => console.error(error));
  }
}

window.onload = function () {
  getDictionaryDefinition(firstWord)
    .then(data => {
      buildMain(data)
    })
    .catch(error => console.error(error));
}