import React from 'react';

const PokemonDetail = ({ pokemon }) => {
  if (!pokemon) {
    return (
      <div className="flex-1 bg-[#f8f8f8] border-[4px] border-black flex items-center justify-center font-bold text-black text-center uppercase p-10">
        SELECT A POKÉMON TO VIEW DETAILS
      </div>
    );
  }

  const statLabels = {
    hp: 'HP',
    attack: 'ATK',
    defense: 'DEF',
    speed: 'SPD'
  };

  return (
    <div className="flex-1 bg-[#f8f8f8] border-[4px] border-black flex flex-col overflow-y-auto text-black uppercase">
      {/* Detail Header */}
      <div className="p-4 border-b-[4px] border-black flex justify-between items-center bg-white">
        <h2 className="text-xl font-black">{pokemon.name}</h2>
        <span className="font-bold text-lg">#{pokemon.pokemonId}</span>
      </div>

      {/* Hero Image / The Stage */}
      <div className="bg-white border-b-[4px] border-black flex justify-center p-8">
        <img 
          src={pokemon.image} 
          alt={pokemon.name} 
          className="w-48 h-48 [image-rendering:pixelated] [filter:drop-shadow(4px_4px_0px_rgba(0,0,0,0.1))]" 
        />
      </div>

      <div className="p-6 flex flex-col gap-6">
        {/* Type Badges */}
        <div className="flex gap-3">
          {pokemon.types.map(t => (
            <span key={t} className="bg-white border-[2px] border-black px-4 py-1 font-bold text-[10px]">
              {t}
            </span>
          ))}
        </div>

        {/* Stats Section */}
        <div className="flex flex-col gap-4">
          {Object.entries(pokemon.stats).map(([key, value]) => (
            <div key={key} className="flex items-center gap-4">
              <span className="w-10 font-black text-[10px]">{statLabels[key]}</span>
              <div className="flex-1 h-4 bg-white border-[2px] border-black overflow-hidden p-[1px]">
                <div 
                  className="h-full bg-red-600" 
                  style={{ width: `${Math.min((value / 150) * 100, 100)}%` }}
                ></div>
              </div>
              <span className="w-10 font-bold text-[10px] text-right">{value}</span>
            </div>
          ))}
        </div>

        {/* Description */}
        <div className="border-[2px] border-black border-dashed p-4 bg-white font-mono text-[10px] leading-relaxed lowercase">
          <p>{pokemon.description || "NO DESCRIPTION AVAILABLE."}</p>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
