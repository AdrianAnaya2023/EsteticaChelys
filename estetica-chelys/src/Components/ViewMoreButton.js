// src/Components/ViewMoreButton.js
import React from 'react';
import './ViewMoreButton.css'; // Asegúrate de crear un archivo CSS para este botón

const ViewMoreButton = ({ onClick }) => (
  <button className="view-more-button" onClick={onClick}>
    Ver
  </button>
);

export default ViewMoreButton;

