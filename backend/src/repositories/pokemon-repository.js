const CrudRepository = require('./crud-repository');
const Pokemon = require('../models/pokemon');

class PokemonRepository extends CrudRepository {
  constructor() {
    super(Pokemon);
  }

  async findByPokemonId(pokemonId) {
    return await Pokemon.findOne({ pokemonId });
  }

  async searchByNameOrType(query) {
    // This now uses your text index across name, types, and description
    return await Pokemon.find(
      { $text: { $search: query } },
      { score: { $meta: "textScore" } } // Optional: helps sort by relevance
    ).sort({ score: { $meta: "textScore" } });
  }

  async findByType(type) {
    return await Pokemon.find({ types: type });
  }
  async findWithoutDescription() {
    return await Pokemon.find({
      descriptionGenerated: false
    });
  }
}

module.exports = PokemonRepository;
