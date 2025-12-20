require('dotenv').config();
const axios = require('axios');
const mongoose = require('mongoose');

const { PokemonRepository } = require('../repositories');
const connectDB = require('../config/db-config'); // adjust if path differs


const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';
const LIMIT = 50; // safe batch size

// helper: extract stats cleanly
function extractStats(statsArray) {
    const stats = {};
    for (const s of statsArray) {
        stats[s.stat.name] = s.base_stat;
    }

    return {
        hp: stats.hp,
        attack: stats.attack,
        defense: stats.defense,
        speed: stats.speed
    };
}

// helper: extract image
function extractImage(sprites) {
    return (
        sprites?.other?.['official-artwork']?.front_default ||
        sprites?.front_default ||
        ''
    );
}

async function seedPokemons() {
    try {
        console.log('🔌 Connecting to database...');
        await connectDB();

        console.log('🚀 Starting Pokémon seeding...');

        let offset = 0;
        let hasMore = true;

        const pokemonRepository = new PokemonRepository();

        while (hasMore) {
            console.log(`📦 Fetching Pokémon batch: offset=${offset}`);

            const listResponse = await axios.get(
                `${BASE_URL}?limit=${LIMIT}&offset=${offset}`
            );

            const results = listResponse.data.results;

            if (!results.length) {
                hasMore = false;
                break;
            }

            for (const item of results) {
                try {
                    const detailResponse = await axios.get(item.url);
                    const data = detailResponse.data;

                    const pokemonPayload = {
                        pokemonId: data.id,
                        name: data.name,
                        height: data.height,
                        weight: data.weight,
                        types: data.types.map(t => t.type.name),
                        stats: extractStats(data.stats),
                        image: extractImage(data.sprites)
                    };

                    // avoid duplicates
                    const existing = await pokemonRepository.findByPokemonId(data.id);
                    if (existing) {
                        console.log(`⚠️  Skipping existing Pokémon: ${data.name}`);
                        continue;
                    }

                    await pokemonRepository.create(pokemonPayload);
                    console.log(`✅ Seeded: ${data.name}`);

                    // polite delay (important)
                    await new Promise(res => setTimeout(res, 200));
                } catch (err) {
                    console.error(
                        `❌ Failed to seed Pokémon from ${item.url}:`,
                        err.message
                    );
                }
            }

            offset += LIMIT;
        }

        console.log('🎉 Pokémon seeding completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('🔥 Seeder failed:', error);
        process.exit(1);
    }
}

seedPokemons();
