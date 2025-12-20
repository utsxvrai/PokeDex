const {PokemonRepository} = require('../repositories');
const {AppError} = require('../utils/errors/app-error');    
const { StatusCodes } = require('http-status-codes');


const pokemonRepository = new PokemonRepository();

  // Create Pokémon (used by seeder)
async function createPokemon(data) {
    try {
        const pokemon = await pokemonRepository.create(data);
        return pokemon;
    } catch (error) {
        throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
}

// get pokemon by internal mongo id
async function getPokemonById(id) {
    try {
        const pokemon = await pokemonRepository.get(id);
        return pokemon;
    } catch (error) {
        throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
}

// get all pokemon (list page)
async function getAllPokemons(filter = {}) {
    try {
        const pokemon = await pokemonRepository.getAll(filter);
        return pokemon;
    } catch (error) {
        throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
}

  // Get Pokémon by pokemonId (from PokeAPI)
async function getPokemonByPokemonId(pokemonId) {
    try {
        const pokemon = await pokemonRepository.findByPokemonId(pokemonId);
        return pokemon;
    } catch (error) {
        throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
}

// search pokemon by name or type
async function searchPokemon(query){
    try {
        const pokemon = await pokemonRepository.searchByNameOrType(query);
        return pokemon;
    } catch (error) {
        throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
}

// get pokemon by type
async function getPokemonByType(type) {
    try {
        const pokemon = await pokemonRepository.findByType(type);
        return pokemon;
    } catch (error) {
        throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
}   

// Get Pokémon without description (offline scripts)
async function getPokemonsWithoutDescription() {
    try {
        const pokemon = await pokemonRepository.findWithoutDescription();
        return pokemon;
    } catch (error) {
        throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
}

module.exports = {
    createPokemon,
    getPokemonById,
    getAllPokemon,
    getPokemonByPokemonId,
    searchPokemon,
    getPokemonByType,
    getPokemonsWithoutDescription
}


