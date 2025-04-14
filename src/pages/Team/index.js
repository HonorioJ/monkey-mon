import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import { AiOutlineQuestion } from "react-icons/ai";

function Team() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const list = localStorage.getItem('@pokemon');
    setPokemons(JSON.parse(list) || []);
  }, []);

  function removePokemon (pokemonName){
    const updateList = pokemons.filter(p => p.name !== pokemonName);
    if (updateList.length !== pokemons.length) {
      setPokemons(updateList);
      localStorage.setItem("@pokemon", JSON.stringify(updateList))
    }
  }

  return (
    <div className="team-container">
      <h1 className="team-title">My Pokémon Team</h1>
      <ul className="team-list">
        {pokemons.map((item, index) => (
          <li key={index} className="team-item">
            {item.sprites?.front_default ? <img src={item.sprites?.front_default}/> : <AiOutlineQuestion className='team-unknown-icon'/>}
            <span className="team-name">{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</span>
            <Link 
              to={`/pokemon/${item.name}`} 
              className="team-link"
            >
              See Details
            </Link>
            <div className='remove-button' onClick={() => removePokemon(item.name)}>Remove</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Team;