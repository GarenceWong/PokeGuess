//------------------- Home ---------------------------------//





//--------------Game Start------------------//
let gameData;
const main = document.querySelector('main');
const pokemonImage = document.querySelector('#pokemon-image');
const textOverlay = document.querySelector('#pokename');
const choices = document.querySelector('#choices');
const playBtn = document.querySelector('#play');
const score = document.querySelector("#score");
let points = 0;
const maxPoints = 20;
let autoPlayInterval
playBtn.addEventListener('click', startPlay);

async function startPlay() {
  resetImage();
  gameData = await window.getPokeData();
  showSilhouette();
  displayChoices();
  points = 0;
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

async function addAnswerHandler() {
  choices.addEventListener('click', async (e) => {
    const { name } = e.target.dataset;
    const resultClass = (name === gameData.correct.name) ? 'correct' : 'incorrect';

    e.target.classList.add(resultClass);
    revealPokemon();

    if (name === gameData.correct.name) {
      points++;
      console.log(`Correct! Points: ${points}`);
      score.textContent = `Score: ${points}/${maxPoints}`;
    }else {
        console.log(`Incorrect! Points: ${points}`);
    }
    clearTimeout(autoPlayInterval); 


    await new Promise(resolve => setTimeout(resolve, 5000));


    if (points === maxPoints) {
      endGame();
    } else {
      autoPlayNext();
    }
  });
}




function revealPokemon() {
  main.classList.add('revealed');
  textOverlay.textContent = `${gameData.correct.name}!`;
}

async function endGame() {
  clearInterval(autoPlayInterval);


  // Display congratulatory popup
  const popupHTML = `
    <div id="popup">
      <h2>Congratulations!</h2>
      <p>Your score is ${points}.</p>
      <button onclick="goToHomepage()">Go to Homepage</button>
      <button onclick="restartGame()">Restart Game</button>
    </div>
  `;

  main.innerHTML += popupHTML;
}
addAnswerHandler();












function goToHomepage() {
  // Implement logic to navigate to the homepage
  // e.g., window.location.href = 'homepage.html';
}

function restartGame() {
  // Implement logic to restart the game
  // e.g., fetchData();
}










