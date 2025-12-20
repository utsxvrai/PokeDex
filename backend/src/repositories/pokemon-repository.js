const CrudRepository = require('./crud-repository');
const Pokemon = require('../models/pokemon');

class PokemonRepository extends CrudRepository {
  constructor() {
    super(Pokemon);
  }

  // Find Pokémon by pokemonId (from PokeAPI)
  async findByPokemonId(pokemonId) {
    return await Pokemon.findOne({ pokemonId });
  }

  // Search by name or type (basic search)
  async searchByNameOrType(query) {
    return await Pokemon.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { types: { $regex: query, $options: 'i' } }
      ]
    });
  }

  // Filter Pokémon by type
  async findByType(type) {
    return await Pokemon.find({ types: type });
  }

  // Get Pokémon without description (for offline scripts)
  async findWithoutDescription() {
    return await Pokemon.find({
      descriptionGenerated: false
    });
  }
}

module.exports = PokemonRepository;
