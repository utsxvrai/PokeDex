import axios from 'axios';

// Vite uses import.meta.env instead of process.env
const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000/api/v1/pokemon';

export const pokemonService = {
    // Fetches 20 Pokemon for the grid based on current page
    getPokemons: async (page = 0) => {
        const limit = 20;
        const skip = page * limit;
        const response = await axios.get(`${BASE_URL}?limit=${limit}&skip=${skip}`);
        return response.data; // Backend returns { data: [...] }
    },

    // Calls hybrid search (Keyword or Semantic)
    searchPokemons: async (query, mode = 'keyword') => {
        const response = await axios.get(`${BASE_URL}/search`, {
            params: { query, mode }
        });
        return response.data;
    }
};