const containerElement = document.querySelector('.container1');

containerElement.classList.add('visible');

window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");
    
    loader.classList.add("active");
  
    loader.addEventListener("transitionend", () => {
      document.body.removeChild(loader);
    });
  });

  let gameData;
  const main = document.querySelector('main');
  const pokemonImage = document.querySelector('#pokemon-image');
  const textOverlay = document.querySelector('#text-overlay');
  const choices = document.querySelector('#choices');
  const playBtn = document.querySelector('#play');
  playBtn.addEventListener('click', fetchData);
  loadVoice();
  addAnswerHandler();
  
  
  async function fetchData() {
    resetImage();
    gameData = await window.getPokeData();
    showSilhouette();
    displayChoices();
  }
  
  function resetImage() {
    pokemonImage.src = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D';
    main.classList.add('fetching');
    main.classList.remove('revealed');
  }
  
  function showSilhouette() {
    main.classList.remove('fetching');
    pokemonImage.src = gameData.correct.image;
  }
  
  function displayChoices() {
    const { pokemonChoices } = gameData;
    const choicesHTML = pokemonChoices.map(({ name }) => {
      return `<button data-name="${name}">${name}</button>`;
    }).join('');
  
    choices.innerHTML = choicesHTML;
  }
  
  function addAnswerHandler() {
    choices.addEventListener('click', e => {
      const { name } = e.target.dataset;
      const resultClass = (name === gameData.correct.name) ?
        'correct' : 'incorrect';
  
      e.target.classList.add(resultClass);
      revealPokemon();
      speakAnswer();
    });
  }
  
  function revealPokemon() {
    main.classList.add('revealed');
    textOverlay.textContent = `${gameData.correct.name}!`;
  }
  
  function loadVoice() {
    window.speechSynthesis.onvoiceschanged = () => {
      window.femaleVoice = speechSynthesis.getVoices()[4];
    };
  }