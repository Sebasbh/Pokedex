// Select the card container and pagination elements
const cardContainer = document.querySelector(".card-container");
const pagination = document.querySelector(".pagination");

const cardsPerPage = 57;
let currentPage = 1;
let totalPages = 0;
let pokemonList = [];

// Fetch Pokemon data
fetch("https://pokeapi.co/api/v2/pokemon?limit=1118")
  .then(response => response.json())
  .then(data => {
    pokemonList = data.results;
    totalPages = Math.ceil(pokemonList.length / cardsPerPage);
    
    // Update the card list and create pagination links
    updateCardList();
    createPaginationLinks();
  });

// Create pagination links
function createPaginationLinks() {
  pagination.innerHTML = "";

  // Loop through the total number of pages and create links
  for (let i = 1; i <= totalPages; i++) {
    const pageLink = document.createElement("a");
    pageLink.href = "#!";
    pageLink.textContent = i;
    if (i === currentPage) {
      pageLink.classList.add("active");
    }

    // Update the card list when a page link is clicked
    pageLink.addEventListener("click", () => {
      currentPage = i;
      updateCardList();
    });
    const listItem = document.createElement("li");
    listItem.appendChild(pageLink);
    pagination.appendChild(listItem);
  }
}

// Update the card list with filtered data if a search term is provided
function updateCardList(searchTerm = '') {
  if (searchTerm === '') {
    currentPokemonList = pokemonList;
  } else {
    currentPokemonList = pokemonList
      .filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }

  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;

  cardContainer.innerHTML = "";

  const filteredPokemonList = currentPokemonList.slice(startIndex, endIndex);

// Loop through the filtered Pokemon list and create cards
  filteredPokemonList.forEach(pokemon => {
    const cardCol = document.createElement("div");
    const card = document.createElement("div");
    const cardImage = document.createElement("div");
    const cardContent = document.createElement("div");
    const cardTitle = document.createElement("span");
    const cardSubtitle = document.createElement("p");
    const cardAction = document.createElement("div");
    const cardActionLink = document.createElement("a");
    const cardCatchButton = document.createElement("button");
    const cardFavoritesButton = document.createElement("button");

    cardCol.classList.add("col", "s12", "m6", "l4");
    card.classList.add("card");
    cardImage.classList.add("card-image");
    cardContent.classList.add("card-content");
    cardTitle.classList.add("card-title");
    cardSubtitle.classList.add("card-subtitle");
    cardAction.classList.add("card-action");
    cardCatchButton.classList.add("btn");
    cardFavoritesButton.classList.add("btn");

    cardTitle.textContent = pokemon.name;
    cardSubtitle.textContent = `ID: ${pokemon.url.split("/")[6]}`;
    cardActionLink.textContent = "Learn more (OFFICIAL)";
    cardActionLink.href = `https://pokemondb.net/pokedex/${pokemon.name}`;
    cardCatchButton.textContent = "➕";

    // Add event listener to the "Catch" button
    cardCatchButton.addEventListener('click', () => {
      window.localStorage.setItem('selectedPokemon', JSON.stringify(pokemon));
      window.location.href = "../Detail/index.html";
    });

    cardFavoritesButton.textContent = "❤️";

    const pokemonId = pokemon.url.split("/")[6];
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
    cardImage.innerHTML = `<img src="${imageUrl}">`;

    card.appendChild(cardImage);
    card.appendChild(cardContent);
    cardContent.appendChild(cardTitle);
    cardContent.appendChild(cardSubtitle);
    cardAction.appendChild(cardActionLink);
    cardAction.appendChild(cardCatchButton);
    cardAction.appendChild(cardFavoritesButton);
    cardContent.appendChild(cardAction);

    cardCol.appendChild(card);

    cardContainer.appendChild(cardCol);
  });

  // Update the active state of pagination links
  const pageLinks = pagination.querySelectorAll("a");
  pageLinks.forEach(link => {
    const pageNumber = parseInt(link.textContent);
    if (pageNumber === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }

    // Update the card list when a page link is clicked
    link.addEventListener("click", () => {
      currentPage = pageNumber;
      updateCardList(searchInput.value.trim());
    });
  });

  // Add search functionality
  const searchInput = document.querySelector('#search-input');
  const searchResults = document.querySelector('#search-results');

  searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.trim();
    currentPage = 1;
    updateCardList(searchTerm);

    if (searchTerm !== '') {
      const filteredPokemonList = pokemonList.filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()));
      renderResults(filteredPokemonList);
    } else {
      renderResults([]);
    }
  });

  // Add search functionality
  function renderResults(results) {
    const searchResults = document.querySelector('#search-results');
    searchResults.innerHTML = '';

    // Add search functionality
    if (results.length > 0) {
      const slicedResults = results.slice(0, 5);
      slicedResults.forEach(result => {
        const item = document.createElement('li');
        item.classList.add('collection-item');
        item.textContent = result.name;
        searchResults.appendChild(item);
      });
    } else {
      // If there are no results, display a "No results" message
      const item = document.createElement('li');
      item.classList.add('collection-item', 'grey-text');
      item.textContent = 'No results were found.';
      searchResults.appendChild(item);
    }
  }
}