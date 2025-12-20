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
    return await Pokemon.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { types: { $regex: query, $options: 'i' } }
      ]
    });
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
