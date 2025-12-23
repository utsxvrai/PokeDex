import React, { useState } from 'react';
import bgImage from './assets/wp.jpg';
import PokemonGrid from './components/PokemonGrid';
import SearchBar from './components/SearchBar';
import PokemonDetail from './components/PokemonDetail';

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [searchResults, setSearchResults] = useState(null);

  return (
    <div className="relative w-screen h-screen overflow-x-hidden font-retro">
      {/* Background Asset */}
      <div 
        className="fixed top-0 left-0 w-full h-full bg-cover bg-center -z-10 blur-[1.5px] brightness-[1]"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>
      
      <main className="flex flex-col lg:flex-row w-full h-full overflow-y-auto lg:overflow-hidden">
        {/* Left Half (Full width on mobile, 50vw on desktop) */}
        <section className="w-full lg:w-1/2 min-h-[60vh] lg:h-full p-3 lg:p-5 flex flex-col">
          <PokemonGrid 
            onSelect={setSelectedPokemon} 
            searchResults={searchResults}
          />
        </section>

        {/* Right Half (Full width on mobile, 50vw on desktop) */}
        <section className="w-full lg:w-1/2 min-h-screen lg:h-full p-3 lg:p-5 flex flex-col">
          <div className="flex flex-col gap-3 lg:gap-5 h-full">
            <SearchBar onSearchResults={setSearchResults} />
            <PokemonDetail pokemon={selectedPokemon} />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
