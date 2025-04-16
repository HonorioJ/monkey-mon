import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/Api";
import "./style.css";
import EvolutionChain from "../../components/EvolutionChain";
import { toast } from "react-toastify";
import { AiOutlineQuestion } from "react-icons/ai";

function PokemonInfo() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState({});
  const [desc, setDesc] = useState({});

  useEffect(() => {
    async function loadPokemon() {
      try {
        const response = await api.get(`/pokemon/${name}`);
        setPokemon(response.data);
      } catch (error) {
        console.log("Something went wrong...", error);
        navigate("/");
      }
    }
    loadPokemon();
  }, [navigate, name]);

  useEffect(() => {
    async function loadPokemon() {
      try {
        const response = await api.get(`/pokemon-species/${name}`);
        setDesc(response.data);
      } catch (error) {
        console.log("Description not found...");
      }
    }
    loadPokemon();
  }, [name]);

  function addPokemon() {
    const myPokemons = localStorage.getItem("@pokemon");
    let savedPokemons = JSON.parse(myPokemons) || [];

    const havePokemon = savedPokemons.some((p) => p.id === pokemon.id);

    if (havePokemon) {
      toast.error("Pokemon has already been added...",{
        className: "custom-toast",
      });
    } else {
      savedPokemons.push(pokemon);
      localStorage.setItem("@pokemon", JSON.stringify(savedPokemons));
      toast.success("Pokemon successfully added!",{
        className: "custom-toast",
      });
    }
  }

  return (
    <>
      <div className="info-container">
        <div className="info-first-container">
          <div>
            {pokemon.sprites?.other["official-artwork"].front_default ?
            <img
              src={pokemon.sprites?.other["official-artwork"].front_default}
              alt={pokemon.name}
            />
            :
            <AiOutlineQuestion className="no-image-info"/>
            }
          </div>
          <div>
            <h1 className="info-name">
              {pokemon.name?.charAt(0).toUpperCase() + pokemon.name?.slice(1)}
            </h1>
            <h2 className="info-description">
              {desc.flavor_text_entries?.[0].flavor_text
                .replace(/\n/g, " ")
                .replace(/\f/g, " ")}
            </h2>
            <div className="info-line"></div>
            <div className="info-types">
              Types:
              <div>
                {pokemon.types?.map((array) => (
                  <div key={array.type.name} className={`info-type ${array.type.name}`}>
                    {array.type.name}
                  </div>
                ))}
              </div>
            </div>
            <button onClick={addPokemon} className="info-button">
              ADD TO TEAM
            </button>
          </div>
        </div>
        <div className="info-second-container">
          <div className="height">
            <span>Height</span>
            <span>{(pokemon.height / 10).toFixed(1)} M</span>
          </div>
          <hr />
          <div className="weight">
            <span>Weight</span>
            <span>{(pokemon.weight / 10).toFixed(1)} KG</span>
          </div>
          <hr />
          <div className="abilities">
            <span>Abilities</span>
            <span>
              {pokemon.abilities?.map((array, index) => (
                <span key={array.ability.name}>
                  {array.ability.name.charAt(0).toUpperCase() +
                    array.ability.name.slice(1)}
                  {index < pokemon.abilities.length - 1 && " / "}
                </span>
              ))}
            </span>
          </div>
          <hr />
          <div className="id">
            <span>Index</span>
            <span>{pokemon.id?.toString().padStart(5, "0")}</span>
          </div>
        </div>
      </div>
      <EvolutionChain chainUrl={desc.evolution_chain?.url} />
    </>
  );
}

export default PokemonInfo;