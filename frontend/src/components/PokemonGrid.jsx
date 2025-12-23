import React, { useState, useEffect } from 'react';
import { pokemonService } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';

const PokemonGrid = ({ onSelect, searchResults }) => {
  const [pokemons, setPokemons] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const itemsPerPage = 20; // 4x5 grid

  useEffect(() => {
    if (searchResults) {
      setPokemons(searchResults);
      setTotal(searchResults.length);
      setPage(0);
    } else {
      fetchPokemons(page);
    }
  }, [searchResults, page]);

  const fetchPokemons = async (currentPage) => {
    try {
      const response = await pokemonService.getPokemons(currentPage);
      setPokemons(response.data);
      setTotal(response.total || 0);
    } catch (error) {
      console.error('Failed to fetch pokemons:', error);
    }
  };

  const totalPages = Math.ceil(total / itemsPerPage);
  const paginatedItems = pokemons; // Server handles the slicing now

  return (
    <div className="flex flex-col h-full uppercase">
      {/* 4x5 Grid Viewport */}
      <div className="flex-1 relative overflow-y-auto pr-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-2 lg:gap-3 w-full"
          >
            {paginatedItems.map(p => (
              <div 
                key={p.pokemonId} 
                className="bg-[#f8f8f8] border-[3px] lg:border-[4px] border-black flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 p-2 aspect-square"
                onClick={() => onSelect(p)}
              >
                <img src={p.image} alt={p.name} className="w-4/5 h-4/5 object-contain" />
                <span className="font-bold text-[10px] lg:text-[12px] mt-1 text-center truncate w-full px-1">{p.name}</span>
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
