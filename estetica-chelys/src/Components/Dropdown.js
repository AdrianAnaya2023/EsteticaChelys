import React, { useState } from 'react';
import './Dropdown.css'; // Asegúrate de que el path al archivo CSS sea correcto

const Dropdown = ({ options, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
  
    const toggleDropdown = () => setIsOpen(!isOpen);
  
    const handleOptionClick = (option) => {
      setSelectedOption(option);
      onChange(option);
      setIsOpen(false);
    };
  
    return (
      <div className="dropdown">
        <button className="dropdown-button" onClick={toggleDropdown}>
          {selectedOption || "Seleccionar una categoría"} ▼
        </button>
        {isOpen && (
          <ul className="dropdown-menu">
            {options.map(option => (
              <li key={option} onClick={() => handleOptionClick(option)} className="dropdown-item">
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };
  
  export default Dropdown;