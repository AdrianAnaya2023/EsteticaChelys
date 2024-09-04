import React from 'react';

const Buttons = ({ onAdd, onEdit, onDelete }) => (
  <div className="buttons-container">
    <button onClick={onAdd}>Agregar</button>
    <button onClick={onEdit}>Modificar</button>
    <button onClick={onDelete}>Borrar</button>
  </div>
);

export default Buttons;
