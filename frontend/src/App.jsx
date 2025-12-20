import React, { useState } from 'react';
import PokemonGrid from './components/PokemonGrid';
import SearchBar from './components/SearchBar';
import PokemonDetail from './components/PokemonDetail';

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [searchResults, setSearchResults] = useState(null);

  return (
    <div className="relative w-screen h-screen overflow-hidden font-retro">
      {/* Background Asset */}
      <div 
        className="fixed top-0 left-0 w-full h-full bg-cover bg-center -z-10 blur-[1.5px] brightness-[1]"
        style={{ backgroundImage: "url('./src/assets/wp.jpg')" }}
      ></div>
      
      <main className="flex w-full h-full">
        {/* Left Half (50vw) */}
        <section className="w-1/2 h-full p-5 flex flex-col">
          <PokemonGrid 
            onSelect={setSelectedPokemon} 
            searchResults={searchResults}
          />
        </section>

        {/* Right Half (50vw) */}
        <section className="w-1/2 h-full p-5 flex flex-col">
          <div className="flex flex-col gap-5 h-full">
            <SearchBar onSearchResults={setSearchResults} />
            <PokemonDetail pokemon={selectedPokemon} />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
