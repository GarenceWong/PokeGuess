const pokeContainer = document.getElementById('pokedex');
const url = 'https://pokeapi.co/api/v2/pokemon';
const pokemonsNumber = 151;
const search = document.getElementById('search');
const form = document.getElementById('form');

//pokedexgallery
// array to store pokemon data
let pokemons = [];

const fetchPokemons = async () => {
  for (let i = 1; i <= pokemonsNumber; i++) {
    await getPokemon(i);
  }
  // display pokemon in the cards
  pokemons.forEach((pokemon) => createPokemonCard(pokemon));
};

const removePokemon = () => {
  const pokemonEls = document.getElementsByClassName("pokemon");
  let removablePokemons = [];
  for (let i = 0; i < pokemonEls.length; i++) { 
    const pokemonEl = pokemonEls[i];
    removablePokemons.push(pokemonEl);
  }
  removablePokemons.forEach((remPoke) => remPoke.remove());
};

const getPokemon = async (id) => {
  const res = await fetch(`${url}/${id}`);
  const pokemon = await res.json();
  pokemons.push(pokemon); 
  console.log("fetched and pushed"); 
  console.log(pokemons[0]);
};

const createPokemonCard = (pokemon) => {
  console.log(pokemon);//debugging
  const template = document.getElementById('pokemon-card-template').content.cloneNode(true);
  const pokemonEl = template.querySelector('.pokemon');
  const img = pokemonEl.querySelector('img');
  const nameEl = pokemonEl.querySelector('.name');
  const typeEl = pokemonEl.querySelector('.type span');
  const numberEl = pokemonEl.querySelector('.number');
  const statsEl = pokemonEl.querySelector('.stats');

  img.src = pokemon.sprites.front_default;
  img.alt = pokemon.name;
  nameEl.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  typeEl.textContent = pokemon.types.map(el => el.type.name).join(', ');
  numberEl.textContent = `#${pokemon.id.toString().padStart(3, "0")}`;

  const stats = pokemon.stats.map(el => `${el.stat.name}: ${el.base_stat}`).slice(0, 3).join(', ');
  statsEl.insertAdjacentHTML('beforeend', `<h4>Stats: ${stats}</h4>`);

  document.getElementById('pokemon-info').appendChild(template);
};

//pokedex search
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchQuery = search.value.trim().toLowerCase();
  if (searchQuery) {
    searchPokemons(searchQuery);
  } else {
    removePokemon();
    fetchPokemons();
  }
});


const searchPokemons = (query) => {
  pokeContainer.innerHTML = '';
  const filteredPokemons = pokemons.filter((pokemon) => pokemon.name.toLowerCase().includes(query));
  if (filteredPokemons.length === 0) {
    console.log('No matches found');
  } else {
    filteredPokemons.forEach((pokemon) => createPokemonCard(pokemon));
  }
};


let allPokemonNames = [];

async function fetchAllnames() {
  const url = `https://pokeapi.co/api/v2/pokemon?limit=${pokemonsNumber}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    allPokemonNames = data.results.map(pokemon => pokemon.name);
    console.log('Fetched all Pokémon names:', allPokemonNames);
  } catch (error) {
    console.error("Error fetching Pokémon names:", error);
  }
}

// filter names based on search
function filterPokemonNames(query) {
  return allPokemonNames.filter(name =>
    name.toLowerCase().includes(query.toLowerCase())
  );
}

//display suggestions
function displaySuggestions(suggestions) {
  const suggestionsContainer = document.getElementById('suggestions');
  suggestionsContainer.innerHTML = '';
  suggestions.forEach(name => {
    const suggestionElement = document.createElement('div');
    suggestionElement.textContent = name;
    suggestionElement.classList.add('suggestion-item');
    suggestionElement.onclick = function() {
      document.getElementById('search').value = name;
      suggestionsContainer.innerHTML = ''; 
      searchPokemons(name);
    };
    suggestionsContainer.appendChild(suggestionElement);
  });
}

document.getElementById('search').addEventListener('input', function(e) {
  const query = e.target.value;
  if (query.length > 0) {
    const filteredNames = filterPokemonNames(query);
    displaySuggestions(filteredNames);
  } 
  else {
    document.getElementById('suggestions').innerHTML = '';
  }
});


fetchPokemons();
fetchAllnames();