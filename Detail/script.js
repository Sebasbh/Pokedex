    const selectedPokemon = JSON.parse(window.localStorage.getItem('selectedPokemon'));

    const displayTextContent = (elementId, text) => {
    const element = document.querySelector(`#${elementId}`);
    element.textContent = text;
    };

    const displayInnerHTML = (elementId, html) => {
    const element = document.querySelector(`#${elementId}`);
    element.innerHTML = html;
    };

    displayTextContent('pokemon-name', selectedPokemon.name);

    const pokemonId = selectedPokemon.url.split('/')[6];
    displayTextContent('pokemon-id', `ID: ${pokemonId}`);

    displayInnerHTML('pokemon-image', `<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png">`);

    const fetchPokemonSpecies = async (speciesUrl) => {
    const response = await fetch(speciesUrl);
    const data = await response.json();
    return data;
    };

    const fetchPokemonEvolutions = async (evolutionUrl) => {
    const response = await fetch(evolutionUrl);
    const data = await response.json();
    return data;
    };

    const displayPokemonDetails = async (data, speciesData, evolutionData) => {
    displayTextContent('pokemon-weight', `Weight: ${data.weight}`);
    displayTextContent('pokemon-height', `Height: ${data.height}`);
    displayTextContent('pokemon-description', `Description: ${speciesData.flavor_text_entries[0].flavor_text}`);
    displayTextContent('pokemon-base-experience', `Base Experience: ${data.base_experience}`);
    displayInnerHTML('pokemon-types', `Types: ${data.types.map(type => type.type.name).join(', ')}`);
    displayInnerHTML('pokemon-abilities', `Abilities: ${data.abilities.map(ability => ability.ability.name).join(', ')}`);
    displayInnerHTML('pokemon-stats', `Stats: ${data.stats.map(stat => `${stat.stat.name}: ${stat.base_stat}`).join(', ')}`);
    displayInnerHTML('pokemon-moves', `Moves: ${data.moves.map(move => move.move.name).join(', ')}`);
    displayInnerHTML('pokemon-sprites', `Sprites: <img src="${data.sprites.front_default}"> <img src="${data.sprites.back_default}">`);
    displayInnerHTML('pokemon-locations', `Locations: ${speciesData.pal_park_encounters.map(location => location.area.name).join(', ')}`);
    displayInnerHTML('pokemon-egg-groups', `Egg Groups: ${speciesData.egg_groups.map(group => group.name).join(', ')}`);
    displayInnerHTML('pokemon-forms', `Forms: ${data.forms.map(form => form.name).join(', ')}`);
    displayInnerHTML('pokemon-hidden-ability', `Hidden Ability: ${data.abilities.filter(ability => ability.is_hidden).map(ability => ability.ability.name)}`);
    displayInnerHTML('pokemon-held-items', `Held Items: ${data.held_items.map(item => item.item.name).join(', ')}`);
    displayTextContent('pokemon-gender', `Gender Ratio: ${100 - speciesData.gender_rate * 100 / 8}% ♂️ / ${speciesData.gender_rate * 100 / 8}% ♀️`);
    displayTextContent('pokemon-parent-species', `Parent Species: ${speciesData.evolves_from_species ? speciesData.evolves_from_species.name : 'N/A'}`);
    displayInnerHTML('pokemon-breeding', `Breeding: ${speciesData.habitat ? speciesData.habitat.name : 'N/A'}`);; 

    // Evolution chain
    let evoChain = [];
    let evoData = evolutionData.chain;
    do {
        evoChain.push(evoData.species.name);
        evoData = evoData.evolves_to[0];
    } while (evoData && evoData.hasOwnProperty('evolves_to'));
    displayInnerHTML('pokemon-evolutions', `Evolutions: ${evoChain.join(' → ')}`);
    };

    const fetchPokemonDetails = async () => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    const data = await response.json();
    const speciesData = await fetchPokemonSpecies(data.species.url);
    const evolutionData = await fetchPokemonEvolutions(speciesData.evolution_chain.url);
    displayPokemonDetails(data, speciesData, evolutionData);
    };

    fetchPokemonDetails();
