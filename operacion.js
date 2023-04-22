const pokeCard = document.querySelector("[data-poke-card]");
const pokeName = document.querySelector("[data-poke-name]");
const pokeImg = document.querySelector("[data-poke-img]");
const pokeImgContainer = document.querySelector("[data-poke-img-container]");
const pokeId = document.querySelector("[data-poke-id]");
const pokeTypes = document.querySelector("[data-poke-types]");
const pokeStats = document.querySelector("[data-poke-stats]");
const heightElement = document.querySelector("[data-poke-height]");
const weightElement = document.querySelector("[data-poke-weight]");
const weaknessesElement = document.querySelector("[data-poke-weaknesses]");
const weaknessesElementT = document.querySelector("[data-poke-weaknessesT]");
const abilitiesElement = document.querySelector("[data-poke-abilities]");

const typeColors = {
  electric: "#FFEA70",
  normal: "#B09398",
  fire: "#FF675C",
  water: "#0596C7",
  ice: "#AFEAFD",
  rock: "#999799",
  flying: "#7AE7C7",
  grass: "#4A9681",
  psychic: "#FFC6D9",
  ghost: "#561D25",
  bug: "#A2FAA3",
  poison: "#795663",
  ground: "#D2B074",
  dragon: "#DA627D",
  steel: "#1D8A99",
  fighting: "#2F2F2F",
  default: "#2A1A1F",
};

const searchPokemon = (event) => {
  event.preventDefault();
  const { value } = event.target.pokemon;
  fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
    .then((data) => data.json())
    .then((response) => renderPokemonData(response))
    .catch((err) => renderNotFound());
};

const renderPokemonData = (data) => {
  const sprite = data.sprites.front_default;
  const { stats, types } = data;

  pokeName.textContent = data.name;
  pokeImg.setAttribute("src", sprite);
  pokeId.textContent = `Nº ${data.id}`;
  setCardColor(types);
  renderPokemonTypes(types);
  renderPokemonStats(stats);
  renderPokemonHeight(data.height);
  renderPokemonWeight(data.weight);
  renderPokemonWeaknesses(types);
};



const renderPokemonHeight = (height) => {
  const heightInMeters = height / 10;
  heightElement.innerHTML = "";
  const heightWrapperElement = document.createElement("div");
  const heightNameElement = document.createElement("div");
  const heightAmountElement = document.createElement("div");
  heightNameElement.textContent = "Altura";
  heightAmountElement.textContent = `${heightInMeters} m`;
  heightWrapperElement.appendChild(heightNameElement);
  heightWrapperElement.appendChild(heightAmountElement);
  heightElement.appendChild(heightWrapperElement);
};

const renderPokemonWeight = (weight) => {
  const weightInKg = weight / 10;
  weightElement.innerHTML = "";
  const weightWrapperElement = document.createElement("div");
  const weightNameElement = document.createElement("div");
  const weightAmountElement = document.createElement("div");
  weightNameElement.textContent = "Peso";
  weightAmountElement.textContent = `${weightInKg} kg`;
  weightWrapperElement.appendChild(weightNameElement);
  weightWrapperElement.appendChild(weightAmountElement);
  weightElement.appendChild(weightWrapperElement);
};



const renderPokemonWeaknesses = async (types) => {
  const weaknesses = [];
  for (const type of types) {
    const typeData = await fetch(type.type.url).then((data) => data.json());
    const doubleDamageFrom = typeData.damage_relations.double_damage_from;
    for (const weakType of doubleDamageFrom) {
      if (!weaknesses.includes(weakType.name)) {
        weaknesses.push(weakType.name);
      }
    }
  }

  weaknessesElement.innerHTML = "";
  weaknessesElementT.innerHTML = "";
  const titleElement = document.createElement("div");
  titleElement.textContent = "Debilidades";
  weaknessesElementT.appendChild(titleElement);

  weaknesses.forEach((weakness) => {
    const weaknessBoxElement = document.createElement("div");
    weaknessBoxElement.classList.add("weakness-box");
    weaknessBoxElement.style.backgroundColor = typeColors[weakness];
    const weaknessTextElement = document.createElement("div");
    weaknessTextElement.style.color = "#fff";
    weaknessTextElement.textContent = weakness;
    weaknessBoxElement.appendChild(weaknessTextElement);
    weaknessesElement.appendChild(weaknessBoxElement);
  });
};



const setCardColor = (types) => {
  const colorOne = typeColors[types[0].type.name];
  const colorTwo = types[1]
    ? typeColors[types[1].type.name]
    : typeColors.default;
  pokeImg.style.background = `radial-gradient(${colorTwo} 33%, ${colorOne} 33%)`;
  pokeImg.style.backgroundSize = " 5px 5px";
};

const renderPokemonTypes = (types) => {
  pokeTypes.innerHTML = "";
  types.forEach((type) => {
    const typeTextElement = document.createElement("div");
    typeTextElement.style.color = typeColors[type.type.name];
    typeTextElement.textContent = type.type.name;
    pokeTypes.appendChild(typeTextElement);
  });
};

const renderPokemonStats = (stats) => {
  pokeStats.innerHTML = "";
  stats.forEach((stat) => {
    const statElement = document.createElement("div");
    const statElementName = document.createElement("div");
    const statElementAmount = document.createElement("div");
    statElementName.textContent = stat.stat.name;
    statElementAmount.textContent = stat.base_stat;
    statElement.appendChild(statElementName);
    statElement.appendChild(statElementAmount);
    pokeStats.appendChild(statElement);
  });
};

