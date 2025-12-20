import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const PokemonGrid = ({ onSelect, searchResults }) => {
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(0);
  const itemsPerPage = 20; // 4x5 grid

  useEffect(() => {
    if (searchResults) {
      setPokemons(searchResults);
      setPage(0);
    } else {
      fetchPokemons();
      setPage(0);
    }
  }, [searchResults]);

  const fetchPokemons = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/pokemon');
      setPokemons(response.data.data);
    } catch (error) {
      console.error('Failed to fetch pokemons:', error);
    }
  };

  const totalPages = Math.ceil(pokemons.length / itemsPerPage);
  const paginatedItems = pokemons.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

  return (
    <div className="flex flex-col h-full uppercase">
      {/* 4x5 Grid Viewport */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ y: 1000, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -1000, opacity: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="grid grid-cols-4 grid-rows-5 gap-3 w-full h-full"
          >
            {paginatedItems.map(p => (
              <div 
                key={p.pokemonId} 
                className="bg-[#f8f8f8] border-[4px] border-black flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 p-1"
                onClick={() => onSelect(p)}
              >
                <img src={p.image} alt={p.name} className="w-4/5 h-4/5 object-contain" />
                <span className="font-bold text-[8px] mt-1 text-center truncate w-full px-1">{p.name}</span>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Retro Pagination Button */}
      <div className="flex justify-between items-center mt-5">
        <button 
          className={`bg-[#f8f8f8] border-[4px] border-black p-4 font-bold ${page === 0 ? 'opacity-50' : 'hover:bg-gray-200'}`}
          onClick={() => setPage(prev => Math.max(0, prev - 1))}
          disabled={page === 0}
        >
          PREV PAGE
        </button>
        <span className="font-bold text-white [text-shadow:_2px_2px_#000]">PAGE {page + 1}</span>
        <button 
          className={`bg-[#f8f8f8] border-[4px] border-black p-4 font-bold ${page >= totalPages - 1 ? 'opacity-50' : 'hover:bg-gray-200'}`}
          onClick={() => setPage(prev => prev + 1)}
          disabled={page >= totalPages - 1}
        >
          NEXT PAGE
        </button>
      </div>
    </div>
  );
};

export default PokemonGrid;
