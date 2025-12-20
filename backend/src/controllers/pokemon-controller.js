const { StatusCodes } = require('http-status-codes');
const { PokemonService } = require('../services');




async function createPokemon(req, res) {
  try {
    const pokemon = await PokemonService.createPokemon(req.body);
    return res.status(StatusCodes.CREATED).json({
      success: true,
      data: pokemon,
      message: 'Pokemon created successfully'
    });
  } catch (error) {
    throw error;
  }
}

async function getPokemonById(req, res) {
  try {
    const { id } = req.params;
    const pokemon = await PokemonService.getPokemonById(id);

    if (!pokemon) {
      throw new Error('Pokemon not found');
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
    const { limit, skip } = req.query;
    const pokemons = await PokemonService.getAllPokemons({}, { limit, skip });
    const total = await PokemonService.countPokemons({});

    return res.status(StatusCodes.OK).json({
      success: true,
      data: pokemons,
      total: total
    });
  } catch (error) {
    throw error;
  }
}

async function getPokemonByPokemonId(req, res) {
  try {
    const { pokemonId } = req.params;
    const pokemon = await PokemonService.getPokemonByPokemonId(Number(pokemonId));

    if (!pokemon) {
      throw new Error('Pokemon not found');
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
    const { query, mode } = req.query;

    if (!query) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'Search query is required'
      });
    }

    const pokemons = await PokemonService.searchPokemon(query, mode);

    return res.status(StatusCodes.OK).json({
      success: true,
      data: pokemons
    });
  } catch (error) {
    throw error;
  }
}


async function getPokemonByType(req, res) {
  try {
    const { type } = req.params;
    const pokemons = await PokemonService.getPokemonByType(type);

    return res.status(StatusCodes.OK).json({
      success: true,
      data: pokemons
    });
  } catch (error) {
    throw error;
  }
}


async function getPokemonsWithoutDescription(req, res) {
  try {
    const pokemons = await PokemonService.getPokemonsWithoutDescription();

    return res.status(StatusCodes.OK).json({
      success: true,
      data: pokemons
    });
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
  getPokemonsWithoutDescription
};
