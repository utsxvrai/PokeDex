const {PokemonRepository} = require('../repositories');
const { StatusCodes } = require('http-status-codes');
const geminiHelper = require('../config/ai-config');
const { getEmbedding } = require('../config/ai-config');



const pokemonRepository = new PokemonRepository();

  // Create Pokémon (used by seeder)
async function createPokemon(data) {
    try {
        const pokemon = await pokemonRepository.create(data);
        return pokemon;
    } catch (error) {
        throw error;
    }
}

// get pokemon by internal mongo id
async function getPokemonById(id) {
    try {
        const pokemon = await pokemonRepository.get(id);
        return pokemon;
    } catch (error) {
        throw error;
    }
}

// get all pokemon (list page)
async function getAllPokemons(filter = {}, options = {}) {
    try {
        const pokemon = await pokemonRepository.getAll(filter, options);
        return pokemon;
    } catch (error) {
        throw error;
    }
}

  // Get Pokémon by pokemonId (from PokeAPI)
async function getPokemonByPokemonId(pokemonId) {
    try {
        const pokemon = await pokemonRepository.findByPokemonId(pokemonId);
        return pokemon;
    } catch (error) {
        throw error;
    }
}

// search pokemon by name or type
// async function searchPokemon(query){
//     try {
//         const pokemon = await pokemonRepository.searchByNameOrType(query);
//         return pokemon;
//     } catch (error) {
//         throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
//     }
// }


async function searchPokemon(queryText, mode = 'keyword') {
  try {
    if (mode === 'semantic') {
      const queryVector = await geminiHelper.getEmbedding(queryText);
      return await pokemonRepository.hybridSearch(queryVector);
    } else {
      return await pokemonRepository.searchByNameOrType(queryText);
    }
  } catch (error) {
    throw error;
  }
}

// get pokemon by type
async function getPokemonByType(type) {
    try {
        const pokemon = await pokemonRepository.findByType(type);
        return pokemon;
    } catch (error) {
        throw error;
    }
}   

// Get Pokémon without description (offline scripts)
async function getPokemonsWithoutDescription() {
    try {
        const pokemon = await pokemonRepository.findWithoutDescription();
        return pokemon;
    } catch (error) {
        throw error;
    }
}

async function countPokemons(filter = {}) {
    try {
        return await pokemonRepository.count(filter);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createPokemon,
    getPokemonById,
    getAllPokemons,
    getPokemonByPokemonId,
    searchPokemon,
    getPokemonByType,
    getPokemonsWithoutDescription,
    countPokemons
}


