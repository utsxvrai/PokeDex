require('dotenv').config();
const mongoose = require('mongoose');
const Pokemon = require('../models/pokemon'); // Path to your model
const geminiService = require('../config/ai-config'); // Path to your Gemini helper

async function migrate() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB for migration...");

        const pokemons = await Pokemon.find({ 
            descriptionVector: { $exists: false } 
        });

        console.log(`Found ${pokemons.length} Pokémon to process.`);

        for (let i = 0; i < pokemons.length; i++) {
            const p = pokemons[i];
            
            const textToEmbed = p.description || p.name; 

            const vector = await geminiService.getEmbedding(textToEmbed);

            await Pokemon.updateOne(
                { _id: p._id }, 
                { $set: { descriptionVector: vector } }
            );

            console.log(`[${i + 1}/${pokemons.length}] Updated: ${p.name}`);
        }

        console.log("Migration completed successfully!");
    } catch (error) {
        console.error("Migration failed:", error);
    } finally {
        mongoose.connection.close();
    }
}

migrate();