import { useEffect, useState } from 'react';
import api from "../../services/Api";
import './style.css';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";

function EvolutionChain({ chainUrl }) {
  const [chain, setChain] = useState(null);
  const [pokemonsInfo, setPokemonsInfo] = useState([]);

  useEffect(() => {
    async function loadChain() {
      try {
        const response = await api.get(chainUrl);
        setChain(response.data);
      } catch (error) {
        console.error('Error fetching evolution chain:', error);
      }
    }

    if (chainUrl) {
      loadChain();
    }
  }, [chainUrl]);

  useEffect(() => {
    async function loadPokemonsInfo() {
      if (!chain) return;

      const getEvolutionStages = (evolution) => {
        let stages = [];
        
        function traverse(evo, level = 0) {
          if (!stages[level]) stages[level] = [];
          stages[level].push(evo.species.name);
          evo.evolves_to.forEach(nextEvo => traverse(nextEvo, level + 1));
        }
        
        traverse(evolution);
        return stages;
      };

      const evolutionStages = getEvolutionStages(chain.chain);
      
      try {
        const responses = await Promise.all(
          evolutionStages.flat().map(name => api.get(`/pokemon/${name}`))
        );
        
        const dataMap = responses.reduce((acc, res) => {
          acc[res.data.name] = res.data;
          return acc;
        }, {});
        
        setPokemonsInfo(evolutionStages.map(stage => stage.map(name => dataMap[name])));
      } catch (error) {
        console.error('Error fetching Pokémon details:', error);
      }
    }

    loadPokemonsInfo();
  }, [chain]);

  return (
    <div className='evolution-container'>
      <h1>Evolution Chain</h1>
      <h2>CLICK TO SEE MORE DETAILS</h2>
      <div className='chain-container'>
        {pokemonsInfo.map((stage, index) => (
          <div key={index} className='evolution-stage'>
            {stage?.map(pokemon => (
              <div key={pokemon.name} className='pokemon-chain'>
                <div className='pokemon-chain-top'>
                  <Link to={`/pokemon/${pokemon.name}`} className='blue-circle'>
                    <img src={pokemon.sprites?.other['official-artwork'].front_default} alt={pokemon.name} />
                  </Link>
                  <div className='chain-name'>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</div>
                  <div className='chain-types'>
                    {pokemon.types?.map((type, idx) => (
                      <div key={idx} className={`info-type ${type?.type?.name}`}>{type?.type?.name}</div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            {index < pokemonsInfo.length - 1 && <MdOutlineKeyboardArrowRight className='arrow-right' />}
          </div>
        ))}
      </div>
    </div>
  );
}

export default EvolutionChain;