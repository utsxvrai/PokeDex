import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = ({ onSearchResults }) => {
  const [query, setQuery] = useState('');
  const [mode, setMode] = useState('keyword'); // 'keyword' or 'semantic'
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      onSearchResults(null);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/pokemon/search`, {
        params: { query, mode }
      });
      onSearchResults(response.data.data);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setQuery('');
    onSearchResults(null);
  };

  return (
    <div className="bg-[#f8f8f8] border-[4px] border-black p-4 flex flex-col gap-4 uppercase font-bold">
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          className="flex-1 border-[4px] border-black p-3 outline-none bg-white text-[12px] placeholder:text-gray-400 focus:bg-gray-50"
          placeholder={mode === 'keyword' ? "SEARCH BY NAME/TYPE..." : "ENTER MEANING..."}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="flex gap-2">
          <button 
            type="submit" 
            disabled={loading}
            className="bg-black text-white px-6 font-black text-[12px] disabled:bg-gray-500 active:translate-y-1 transition-transform h-full"
          >
            {loading ? '...' : 'RUN'}
          </button>
          <button 
            type="button"
            onClick={handleReset}
            className="bg-[#f8f8f8] border-[2px] border-black px-4 font-black text-[10px] hover:bg-gray-200 transition-colors"
          >
            RESET
          </button>
        </div>
      </form>

      <div className="flex gap-2">
        <button 
          className={`flex-1 border-[2px] border-black py-2 text-[10px] ${mode === 'keyword' ? 'bg-red-600 text-white' : 'bg-white text-black'}`}
          onClick={() => setMode('keyword')}
        >
          KEYWORD
        </button>
        <button 
          className={`flex-1 border-[2px] border-black py-2 text-[10px] ${mode === 'semantic' ? 'bg-red-600 text-white' : 'bg-white text-black'}`}
          onClick={() => setMode('semantic')}
        >
          ✨ SEMANTIC
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
