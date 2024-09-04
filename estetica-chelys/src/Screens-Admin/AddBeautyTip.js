import React, { useEffect, useRef, useState } from 'react';
import Buttons from '../Components/Buttons';
import '../EstilosAdmin/AddBeautyTip.css'; // Asegúrate de que el path al archivo CSS sea correcto

const AddBeautyTip = ({ isVisible, onClose }) => {
  const tipRef = useRef(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  // Enfocar automáticamente el primer elemento input del formulario cuando el panel sea visible
  useEffect(() => {
    if (isVisible && tipRef.current) {
      const firstInput = tipRef.current.querySelector('input, textarea');
      if (firstInput) {
        firstInput.focus();
      }
    }
  }, [isVisible]);

  const handleAdd = () => {
    console.log('Agregar tip:', { name, description, image });
  };

  const handleEdit = () => {
    console.log('Modificar tip:', { name, description, image });
  };

  const handleDelete = () => {
    console.log('Borrar tip:', { name, description, image });
  };

  return (
    <div ref={tipRef} className={`add-beauty-tip-container ${isVisible ? 'visible' : ''}`}>
      <button className="close-button" onClick={onClose}>X</button>
      <div className="form-container">
        <h2>Agregar Tip de Belleza</h2>
        <form>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="description">Descripción:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <label htmlFor="image">Imagen URL:</label>
          <input
            type="text"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <Buttons onAdd={handleAdd} onEdit={handleEdit} onDelete={handleDelete} />
        </form>
      </div>
    </div>
  );
};

export default AddBeautyTip;
