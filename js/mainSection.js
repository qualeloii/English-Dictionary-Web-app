function getPhonetics(data) {
  const phonetics = data.phonetics;
  let selectedPhonetics = null;
  for (let i = 0; i < phonetics.length; i++) {
    const currentPhonetics = phonetics[i];
    if (currentPhonetics.audio && currentPhonetics.text) {
      selectedPhonetics = currentPhonetics;
      break;
    } else {
      selectedPhonetics = currentPhonetics;
    }
  }
  return selectedPhonetics;
}

function getDefinitions(WordObj, type) {
  const nounMeanings = WordObj.meanings.filter(meaning => meaning.partOfSpeech == type);
  const nounDefinitions = nounMeanings.flatMap(meaning => meaning.definitions.map(definition => definition.definition));
  return nounDefinitions;
}

function getExamples(WordObj) {
  const nounMeanings = WordObj.meanings.filter(meaning => meaning.partOfSpeech == 'verb');
  const definitionExampleMap = new Map();

  nounMeanings[0].definitions.forEach(definitionObj => {
    const example = definitionObj.example ? definitionObj.example : ' ';
    console.log(example);
    definitionExampleMap.set(definitionObj.definition, example);
  });
  return definitionExampleMap;
}

function getSynonyms(WordObj, partOfSpeech) {
  let synonyms = [];

  WordObj.meanings.forEach(meaning => {
    if (meaning.partOfSpeech === partOfSpeech) {
      synonyms.push(...meaning.synonyms);
    }
  });

  return synonyms;
}

function updateDictionaryHeader(wordObj) {
  const word = wordObj.word;
  const phonetics = getPhonetics(wordObj);
  const header = document.getElementById("dictionary-header");
  header.innerHTML = `
      <div class="col-10">
        <h1>${word}</h1>
        <h2>${phonetics.text}</h2>
      </div>
      <div class="col-2">
        <audio id="meu-audio" src="${phonetics.audio}"></audio>
        <button onclick="playAudio()" id="play-button" class="play-button"><i class="fa fa-play"></i></button>
      </div>
    `;
}

function updateWordDefinition(wordObj) {
  const wordDef = document.getElementById("word-definition");
  const definitions = getDefinitions(wordObj, 'noun');
  let listItems = "";

  definitions.forEach(def => {
    listItems += `<li>${def}</li>`;
  });
  wordDef.innerHTML = `
      <h3>Meaning</h3>
      <ul>${listItems}</ul>
    `;

}

function updateSynonymsNoun(wordObj) {
  const wordDef = document.getElementById("synonyms-noun");
  const synonyms = [...new Set(getSynonyms(wordObj, 'noun'))];
  if (synonyms && synonyms.length > 0) {
    wordDef.style.display = "block";
    wordDef.innerHTML = `
        <h3>Synonyms</h3> 
        <h4>${synonyms.join(" ")}</h4>
      `;
  } else {
    wordDef.style.display = "none";
    wordDef.style.setProperty('display', 'none', 'important');
  }
}

function updateSynonymsVerb(wordObj) {
  const wordDef = document.getElementById("synonyms-verb");
  const synonyms = [...new Set(getSynonyms(wordObj, 'verb'))];
  if (synonyms && synonyms.length > 0) {
    wordDef.style.display = "block";
    wordDef.innerHTML = `
        <h3>Synonyms</h3> 
        <h4>${synonyms.join(" - ")}</h4>
      `;
  } else {
    wordDef.style.display = "none";
    wordDef.style.setProperty('display', 'none', 'important');
  }
}

function updateVerbDefinition(wordObj) {
  const wordDef = document.getElementById("usage-example");

  const examples = getExamples(wordObj);
  console.log('examples');
  let listItems = "";

  examples.forEach((value, key) => {
    listItems += `<li>${key}</li>
                  <li>${value}</li>`;
  });
  wordDef.innerHTML = `
      <h3>Meaning</h3>
      <ul>${listItems}</ul>
    `;
}
