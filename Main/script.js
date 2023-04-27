const cardContainer = document.querySelector(".card-container");
const prevButton = document.querySelector(".prev-button");
const nextButton = document.querySelector(".next-button");
let currentPage = 0;
const cardsPerPage = 21;
let totalPages;

// Make a GET request to the PokeAPI to get the total number of Pokémon
fetch("https://pokeapi.co/api/v2/pokemon?limit=1")
  .then(response => response.json())
  .then(data => {
    const totalCards = data.count;
    totalPages = Math.ceil(totalCards / cardsPerPage);

    // Update the next button and previous button visibility
    updateButtonVisibility(currentPage, totalPages);

    // Display the cards for the current page
    displayCards(currentPage, cardsPerPage);
  });

// Add event listeners to the previous and next buttons
prevButton.addEventListener("click", () => {
  if (currentPage > 0) {
    currentPage--;
    displayCards(currentPage, cardsPerPage);
    updateButtonVisibility(currentPage, totalPages);
  }
});

nextButton.addEventListener("click", () => {
  if (currentPage < totalPages - 1) {
    currentPage++;
    displayCards(currentPage, cardsPerPage);
    updateButtonVisibility(currentPage, totalPages);
  }
});

function displayCards(pageNumber, cardsPerPage) {
  // Calculate the offset based on the current page number and the number of cards per page
  const offset = pageNumber * cardsPerPage;

  // Make a GET request to the PokeAPI to get a subset of the Pokémon data
  fetch(`https://pokeapi.co/api/v2/pokemon?limit=${cardsPerPage}&offset=${offset}`)
    .then(response => response.json())
    .then(data => {
      // Array of the Pokémon for the current page
      const pokemonList = data.results;

      // Clear the current cards from the card container
      cardContainer.innerHTML = "";

      // Create a card for each Pokémon in the pokemonList array
      pokemonList.forEach(pokemon => {
        // Create HTML elements for the card
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

        // Add classes to the HTML elements
        cardCol.classList.add("col", "s12", "m6", "l4");
        card.classList.add("card");
        cardImage.classList.add("card-image");
        cardContent.classList.add("card-content");
        cardTitle.classList.add("card-title");
        cardSubtitle.classList.add("card-subtitle");
        cardAction.classList.add("card-action");
        cardCatchButton.classList.add("btn");
        cardFavoritesButton.classList.add("btn"); 

        // Set the content of the HTML elements
        cardTitle.textContent = pokemon.name;
        cardSubtitle.textContent = `ID: ${pokemon.url.split("/")[6]}`;
        cardActionLink.textContent = "Learn more (OFFICIAL)";
        cardActionLink.href = `https://pokemondb.net/pokedex/${pokemon.name}`;
        cardCatchButton.textContent = "➕";
        cardFavoritesButton.textContent = "❤️";

        // Set the URL for the card image
        const pokemonId = pokemon.url.split("/")[6];
        const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
        cardImage.innerHTML = `<img src="${imageUrl}">`;

        // Add the HTML elements to the card
        card.appendChild(cardImage);
        card.appendChild(cardContent);
        cardContent.appendChild(cardTitle);
        cardContent.appendChild(cardSubtitle);
        cardAction.appendChild(cardActionLink);
        cardAction.appendChild(cardCatchButton);
        cardAction.appendChild(cardFavoritesButton); // Agregado para el nuevo botón
        cardContent.appendChild(cardAction);


        // Add the card to the card column
        cardCol.appendChild(card);
        // Add the card column to the card container
        cardContainer.appendChild(cardCol);
      });
    });
}

// Agregar manejador de eventos para el botón "Add to favorites"
cardFavoritesButton.addEventListener("click", () => {
  // Lógica para agregar este pokemon a la lista de favoritos
});


function updateButtonVisibility(currentPage, totalPages) {
  // Hide or show the previous and next buttons based on the current page number
  if (currentPage === 0) {
    prevButton.classList.add("hide");
  } else {
    prevButton.classList.remove("hide");
  }

  if (currentPage === totalPages - 1) {
    nextButton.classList.add("hide");
  } else {
    nextButton.classList.remove("hide");
  }
}


