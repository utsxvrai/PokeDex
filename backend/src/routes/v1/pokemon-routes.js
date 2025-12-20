const express = require('express');
const { PokemonController } = require('../../controllers');

const router = express.Router();

// 1. POST and General GET
router.post('/', PokemonController.createPokemon);
router.get('/', PokemonController.getAllPokemons);

// 2. SPECIFIC STATIC ROUTES (Move these up!)
router.get('/search', PokemonController.searchPokemon);
router.get('/no-description', PokemonController.getPokemonsWithoutDescription);

// 3. DYNAMIC PARAMETER ROUTES (Move these down)
router.get('/pokemon/:pokemonId', PokemonController.getPokemonByPokemonId);
router.get('/type/:type', PokemonController.getPokemonByType);
router.get('/:id', PokemonController.getPokemonById); // This is the "catch-all" for /anything

module.exports = router;