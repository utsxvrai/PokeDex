const express = require('express');
const { PokemonController }= require('../../controllers');

const router = express.Router();

router.post('/', PokemonController.createPokemon);
router.get('/', PokemonController.getAllPokemons);
router.get('/:id', PokemonController.getPokemonById);
router.get('/pokemon/:pokemonId', PokemonController.getPokemonByPokemonId);
router.get('/search', PokemonController.searchPokemon);
router.get('/type/:type', PokemonController.getPokemonByType);
router.get('/no-description', PokemonController.getPokemonsWithoutDescription);

module.exports = router;

