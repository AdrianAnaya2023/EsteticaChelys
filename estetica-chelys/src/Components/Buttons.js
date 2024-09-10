import React from 'react';

const Buttons = ({ onAdd}) => (
  <div className="buttons-container">
    <button onClick={onAdd}>Agregar</button>
    
  </div>
);

export default Buttons;
