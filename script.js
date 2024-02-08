
//--------------Game Start------------------//
let gameData;
const main = document.querySelector('main');
const pokemonImage = document.querySelector('#pokemon-image');
const textOverlay = document.querySelector('#pokename');
const choices = document.querySelector('#choices');
const playBtn = document.querySelector('#play');
const score = document.querySelector("#score");
const popupContainer = document.getElementById('popup-container');
let points = 0;
const maxPoints = 20;
let questionCount = 0;
let autoPlayInterval

playBtn.addEventListener('click', startPlay);

async function startPlay() {
  resetImage();
  gameData = await window.getPokeData();
  showSilhouette();
  displayChoices();
  points = 0;
  questionCount = 0;
  score.textContent = `Score: ${points}/${maxPoints}`;
}

function  autoPlayNext(){
  autoPlayInterval = setTimeout(async () => {
    await playNextPokemon();
    resetImage();
    setTimeout(() => {
    showSilhouette();
    displayChoices();
  }, 500);
  }, 1000);
}

async function playNextPokemon() {
  gameData = await window.getPokeData();
}

function resetImage() {
  pokemonImage.src = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D';
  main.classList.add('fetching');
  main.classList.remove('revealed');
  choices.innerHTML = '';
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
  addAnswerHandler();
}

let isAnswerSelected = false;

async function addAnswerHandler() {
  choices.addEventListener('click', handleAnswerClick);
}

async function handleAnswerClick(e) {
  if (isAnswerSelected) {
    return;
  }

  isAnswerSelected = true;

  const { name } = e.target.dataset;
  const resultClass = (name === gameData.correct.name) ? 'correct' : 'incorrect';

  e.target.classList.add(resultClass);
  revealPokemon();

  if (name === gameData.correct.name) {
    points++;
    console.log(`Correct! Points: ${points}`);
    score.textContent = `Score: ${points}/${maxPoints}`;
  } else {
    console.log(`Incorrect! Points: ${points}`);
  }

  clearTimeout(autoPlayInterval);

  await new Promise(resolve => setTimeout(resolve, 1000));

  questionCount++;

  if (questionCount >= 20) {
    endGame();
  } else {
    autoPlayNext();
  }


  isAnswerSelected = false;
  choices.removeEventListener('click', handleAnswerClick);
}


function revealPokemon() {
  main.classList.add('revealed');
  textOverlay.textContent = `${gameData.correct.name}!`;
}

async function endGame() {
  //debugging
    console.log('endGame called');
    clearInterval(autoPlayInterval);
    
  
    var modal = document.getElementById("gameoverPopUp");
    var span = document.getElementsByClassName("close")[0];
    var finalScore = document.getElementById("final-score");
    
    finalScore.textContent = points; // Display the final score in the modal
    modal.style.display = "block"; // Show the modal
    
    // click span, close button
    span.onclick = function() {
      modal.style.display = "none";
    }
    
    // outside popup modal
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  }

function goToHomepage() {
  window.location.href = 'index.html';
}

function restartGame() {
  window.location.href = 'game.html';
}

// Image popup //

var glowElement = document.querySelector('.glow');
document.getElementById('play').addEventListener('click', function() {
  glowElement.style.display = 'block';
});


















