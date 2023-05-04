// search.test.js
const { filterPokemonList } = require('../Main/script');
;

describe('filterPokemonList', () => {
  const pokemonList = [
    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
    { name: 'squirtle', url: 'https://pokeapi.co/api/v2/pokemon/7/' },
    { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' }
  ];

  test('should return matching pokemon based on search term', () => {
    const searchTerm = 'char';
    const expectedResult = [
      { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' }
    ];

    const result = filterPokemonList(pokemonList, searchTerm);
    expect(result).toEqual(expectedResult);
  });

  test('should return an empty array if no matching pokemon are found', () => {
    const searchTerm = 'xyz';
    const expectedResult = [];

    const result = filterPokemonList(pokemonList, searchTerm);
    expect(result).toEqual(expectedResult);
  });

  test('should be case-insensitive', () => {
    const searchTerm = 'PiKaChU';
    const expectedResult = [
      { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' }
    ];

    const result = filterPokemonList(pokemonList, searchTerm);
    expect(result).toEqual(expectedResult);
  });
});
