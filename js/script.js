const Times = 'Times New Roman';
const Dancing_Script = 'Dancing Script';
const Gruppo = 'Gruppo';

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
  updateVerbDefinition(data[0]);
  updateSynonymsVerb(data[0]);
}

function search(event) {
  const myInput = document.getElementById("myInput");
  if (event.key === "Enter") {
    getDictionaryDefinition(myInput.value)
      .then(data => {
        buildMain(data)
      })
      .catch(error => console.error(error));
  }
}

function handleCheckboxClick() {
  const body = document.body;
  const root = document.documentElement;
  const checkbox = document.getElementById('flexSwitchCheckDefault');
  if (checkbox.checked) {
    console.log('Checkbox is checked');
    root.style.setProperty('--bg-color', 'black');
    root.style.setProperty('--text-color', 'white');
    body.classList.add("dark-theme");
  } else {
    root.style.setProperty('--bg-color', 'white');
    root.style.setProperty('--text-color', 'black');
    body.classList.remove("dark-theme");
  }
}

function changeFont(value) {
  const selectedFont = document.getElementById('selectedFont');
  var font = '';

  switch (value.innerHTML) {
    case 'Sans-serif':
      font = Times;
      break;
    case 'Display':
      font = Gruppo;
      break;
    case 'Handwriting':
      font = Dancing_Script;
      break;
    default:
      break;
  }
  console.log(font);
  document.body.style.fontFamily = font;
  selectedFont.innerHTML = value.innerHTML;
}