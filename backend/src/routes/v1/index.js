const express = require('express');
const { InfoController,  } = require('../../controllers')
const pokemonRoutes = require('./pokemon-routes');

const router = express.Router();

router.get('/info' , InfoController.info);
router.use('/pokemon', pokemonRoutes);


module.exports  = router;