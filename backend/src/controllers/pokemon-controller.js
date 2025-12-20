const { StatusCodes } = require('http-status-codes');
const { PokemonRepository } = require('../repositories');
const { AppError } = require('../utils/errors/app-error');

const pokemonRepository = new PokemonRepository();


async function createPokemon(req, res) {
  try {
    const pokemon = await pokemonRepository.create(req.body);
    return res.status(StatusCodes.CREATED).json({
      success: true,
      data: pokemon,
      message: 'Pokemon created successfully'
    });
  } catch (error) {
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      error.message
    );
  }
}

async function getPokemonById(req, res) {
  try {
    const { id } = req.params;
    const pokemon = await pokemonRepository.get(id);

    if (!pokemon) {
      throw new AppError(
        StatusCodes.NOT_FOUND,
        'Pokemon not found'
      );
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      data: pokemon
    });
  } catch (error) {
    throw error;
  }
}

async function getAllPokemons(req, res) {
  try {
    const pokemons = await pokemonRepository.getAll();

    return res.status(StatusCodes.OK).json({
      success: true,
      data: pokemons
    });
  } catch (error) {
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      error.message
    );
  }
}

async function getPokemonByPokemonId(req, res) {
  try {
    const { pokemonId } = req.params;
    const pokemon = await pokemonRepository.findByPokemonId(Number(pokemonId));

    if (!pokemon) {
      throw new AppError(
        StatusCodes.NOT_FOUND,
        'Pokemon not found'
      );
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      data: pokemon
    });
  } catch (error) {
    throw error;
  }
}

async function searchPokemon(req, res) {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'Search query is required'
      });
    }

    const pokemons = await pokemonRepository.searchByNameOrType(query);

    return res.status(StatusCodes.OK).json({
      success: true,
      data: pokemons
    });
  } catch (error) {
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      error.message
    );
  }
}


async function getPokemonByType(req, res) {
  try {
    const { type } = req.params;
    const pokemons = await pokemonRepository.findByType(type);

    return res.status(StatusCodes.OK).json({
      success: true,
      data: pokemons
    });
  } catch (error) {
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      error.message
    );
  }
}


async function getPokemonsWithoutDescription(req, res) {
  try {
    const pokemons = await pokemonRepository.findWithoutDescription();

    return res.status(StatusCodes.OK).json({
      success: true,
      data: pokemons
    });
  } catch (error) {
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      error.message
    );
  }
}

module.exports = {
  createPokemon,
  getPokemonById,
  getAllPokemons,
  getPokemonByPokemonId,
  searchPokemon,
  getPokemonByType,
  getPokemonsWithoutDescription
};
