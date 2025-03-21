import "./style.css";
import { IoSearch } from "react-icons/io5";
import { useState } from "react";

function SearchBar(props) {
  const [focused, setFocused] = useState(false);

  return (
    <div className={`search-bar ${focused ? "focused" : ""}`}>
      <div className="search-icon">
        <IoSearch />
      </div>
      <input
        className="text-input"
        type="text"
        value={props.value}
        onChange={props.onChange}
        placeholder="Search Pokémon"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </div>
  );
}

export default SearchBar;