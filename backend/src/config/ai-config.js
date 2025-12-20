const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const Pokemon = require('../models/pokemon');


async function getEmbedding(text) {
  const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
  const result = await model.embedContent(text);
  return result.embedding.values; 
}

async function populateExistingPokemon() {
  const pokemons = await Pokemon.find({ descriptionVector: { $exists: false } });
  for (const p of pokemons) {
    p.descriptionVector = await getEmbedding(p.description || p.name);
    await p.save();
  }
}

module.exports = {
  getEmbedding,
  populateExistingPokemon
};