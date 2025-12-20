import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const BASE_URL = process.env.BACKEND_URL;

export const pokemonService = {
  // Fetches 20 Pokemon for the grid based on current page
  getPokemons: async (page = 0) => {
    const limit = 20;
    const skip = page * limit;
    const response = await axios.get(`${BASE_URL}?limit=${limit}&skip=${skip}`);
    return response.data;
  },

  // Calls your Gemini-powered hybrid search
  searchPokemons: async (query) => {
    const response = await axios.get(`${BASE_URL}/search?q=${query}`);
    return response.data;
  }
};