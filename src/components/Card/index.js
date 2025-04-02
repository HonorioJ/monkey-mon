import { useEffect, useState } from 'react';
import api from '../../services/Api';
import './style.css';
import TypeIcon from '../TypeIcon';
import { AiOutlineLoading } from "react-icons/ai";
import { FaQuestion } from "react-icons/fa";

function Card(props) {

  const [isLoad, setIsLoad] = useState(false)
  const [imgLoad, setImgLoad] = useState(false)

  const [pokemon, setPokemon] = useState([])
  useEffect(() => {
    async function loadPokemon() {
      await api.get(`/pokemon/${props.name}`)
        .then((response) => setPokemon(response.data))
        .finally(() => setIsLoad(true));
    }
    loadPokemon()
  }, [props])

  return(
    <>
      {isLoad? (
        <div className={`card-container ${pokemon.types?.[0].type.name}`}>
          <img src={pokemon.sprites?.other['official-artwork'].front_default} className='card-img' onLoad={setImgLoad}></img>
          {imgLoad? null : <FaQuestion className='no-image-icon'/>}
          <div className='card-name'>{pokemon.name?.toString().charAt(0).toUpperCase() + pokemon.name?.toString().slice(1)}</div>
          <div className='card-id-type'>
            <div>N° {pokemon.id?.toString().padStart(5, '0')}</div>
            {pokemon.types?.map((types) => {
              return <TypeIcon type={types.type.name} className='card-icon-type'/>
            })}
          </div>
        </div>
      ) : (
        <div className='load-icon-container'>
          <AiOutlineLoading className='load-icon'/>
        </div>
      )}
    </>
  )
}

export default Card