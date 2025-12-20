require('dotenv').config();
const connectDB = require('../config/db-config');

const {PokemonRepository} = require('../repositories');
const { generateDescription } = require('../utils/description-generator');

const pokemonRepository = new PokemonRepository();


async function generateBaseDescriptions() {
  try {
    console.log('🔌 Connecting to database...');
    await connectDB();

    console.log('🧠 Fetching Pokémon without descriptions...');
    const pokemons = await pokemonRepository.findWithoutDescription();

    console.log(`📦 Found ${pokemons.length} Pokémon to process`);

    for (const pokemon of pokemons) {
      try {
        const description = generateDescription(pokemon);

        await pokemonRepository.update(pokemon._id, {
          description,
          descriptionGenerated: true
        });

        console.log(`✅ Description generated for: ${pokemon.name}`);

        // small delay for safety
        await new Promise(res => setTimeout(res, 50));
      } catch (err) {
        console.error(
          `❌ Failed for ${pokemon.name}:`,
          err.message
        );
      }
    }

    console.log('🎉 Base descriptions generated successfully!');
    process.exit(0);
  } catch (error) {
    console.error('🔥 Description generation failed:', error);
    process.exit(1);
  }
}

generateBaseDescriptions();