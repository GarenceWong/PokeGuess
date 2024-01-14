//------------------- Home ---------------------------------//
const containerElement = document.querySelector('.container1');

containerElement.classList.add('visible');

window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");
    
    loader.classList.add("active");
  
    loader.addEventListener("transitionend", () => {
      document.body.removeChild(loader);
    });
  });

  //--------------Game Start------------------//
  function startGame(){
    window.location.href = 'game.html';
  }

  let gameData;
  const main = document.querySelector('main');
  const pokemonImage = document.querySelector('#pokemon-image');
  const playBtn = document.querySelector('#play');
  const choices = document.querySelector('.options');
  const scoreContainer = document.querySelector(".score-container");
  const userScore = document.getElementById("user-score");
  let timer = document.getElementsByClassName("timer")[0];
  playBtn.addEventListener('DOMContentLoaded', fetchData);
  addAnswerHandler();
  let nextBtn;
  let score, currentQuestion, finalQuestions;
  let countdown,
    count = 11;

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

    //---------------------- Pokedex --------------------//

    function getPokemon() {
      const pokemonId = document.getElementById('pokemonid').value;
      const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`;
  
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => displayPokemon(data))
        .catch(error => console.error('Error fetching data:', error));
    }
  
    function displayPokemon(pokemon) {
      const pokemonInfoDiv = document.getElementById('pokemon-info');
      pokemonInfoDiv.innerHTML = '';
  
      const name = pokemon.name;
      const imageUrl = pokemon.sprites.front_default;
  
      const pokemonImage = document.createElement('img');
      pokemonImage.src = imageUrl;
      pokemonImage.alt = name;
  
      const pokemonName = document.createElement('h2');
      pokemonName.textContent = name;
  
      pokemonInfoDiv.appendChild(pokemonImage);
      pokemonInfoDiv.appendChild(pokemonName);
    }
  
  

