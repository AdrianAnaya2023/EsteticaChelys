import React from 'react';
import './Button.css'; // Asegúrate de que el path al archivo CSS sea correcto

const Button = ({ text, onClick }) => (
  <button className="custom-button" onClick={onClick}>
    {text}
  </button>
);

export default Button;
