import { useState } from 'react';
import './style.css';
import { SlArrowDown } from "react-icons/sl";

function Filter(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [openAnimation, setOpenAnimation] = useState(false);
  const [selectedOption, setSelectedOption] = useState(props.options[0]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setOpenAnimation(true);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    props.onSelect(option);
  };

  return (
    <div className="filter-container">
      <div className="filter-text">Sort by:</div>
      <div>
        <div
          className={`dropdown-selected ${openAnimation ? (isOpen ? 'open' : 'close') : 'a'}`}
          onClick={toggleDropdown}
        >
          {selectedOption} <SlArrowDown className={`arrow-icon ${openAnimation ? (isOpen ? 'up' : 'down') : ''}`} />
        </div>
        <div className={`dropdown-options ${openAnimation ? (isOpen ? 'open' : 'close') : ''}`}>
          {props.options.map((option, index) => (
            <div
              key={index}
              className="dropdown-option"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Filter;
