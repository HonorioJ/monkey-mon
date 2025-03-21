import { useEffect, useState } from "react";
import api from "../../services/Api";
import Card from "../../components/Card";
import { Link } from "react-router-dom";
import Banner from "../../components/Banner";
import "./style.css";
import SearchBar from "../../components/SearchBar";
import Filter from "../../components/Filter";

function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [records, setRecords] = useState([]);
  const [limit, setLimit] = useState(20);
  const [textFilter, setTextFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("Smallest to largest");

  useEffect(() => {
    async function loadPokemon() {
      try {
        const response = await api.get("/pokemon", { params: { limit: 1302 } });
        setPokemons(response.data.results);
        setRecords(response.data.results);
      } catch (error) {
        console.error("Failed to load Pokémon data:", error);
      }
    }
    loadPokemon();
  }, []);

  function showMore() {
    setLimit((prevLimit) => prevLimit + 20);
  }

  useEffect(() => {
    let filteredRecords = pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(textFilter.toLowerCase())
    );

    if (sortOrder === "Largest to smallest") {
      filteredRecords.reverse();
    } else if (sortOrder === "A-Z") {
      filteredRecords.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === "Z-A") {
      filteredRecords.sort((a, b) => b.name.localeCompare(a.name));
    }

    setRecords(filteredRecords);
  }, [textFilter, sortOrder, pokemons]);

  return (
    <div>
      <Banner />
      <div className="search-filter-container">
        <SearchBar value={textFilter} onChange={(e) => setTextFilter(e.target.value)} />
        <Filter options={["Smallest to largest", "Largest to smallest", "A-Z", "Z-A"]} onSelect={setSortOrder} />
      </div>
      <div className="list">
        <ul>
          {records.slice(0, limit).map((pokemon) => (
            <li key={pokemon.name}>
              <Link to={`pokemon/${pokemon.name}`} className="link">
                <Card name={pokemon.name} />
              </Link>
            </li>
          ))}
        </ul>
        <button onClick={showMore} className="button-load-more">
          Load more
        </button>
      </div>
    </div>
  );
}

export default Home;
