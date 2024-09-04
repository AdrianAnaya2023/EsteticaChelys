import React, { useEffect, useRef, useState } from 'react';
import Buttons from '../Components/Buttons';
import '../EstilosAdmin/CrudServicios.css'; // Asegúrate de que el path al archivo CSS sea correcto

const AddService = ({ isVisible, onClose }) => {
  const serviceRef = useRef(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  // Enfocar automáticamente el primer elemento input del formulario cuando el panel sea visible
  useEffect(() => {
    if (isVisible && serviceRef.current) {
      const firstInput = serviceRef.current.querySelector('input, textarea');
      if (firstInput) {
        firstInput.focus();
      }
    }
  }, [isVisible]);

  const handleAdd = () => {
    console.log('Agregar servicio:', { title, description, image });
  };

  const handleEdit = () => {
    console.log('Modificar servicio:', { title, description, image });
  };

  const handleDelete = () => {
    console.log('Borrar servicio:', { title, description, image });
  };

  return (
    <div ref={serviceRef} className={`add-service-container ${isVisible ? 'visible' : ''}`}>
      <button className="close-button" onClick={onClose}>X</button>
      <div className="form-container">
        <h2>Catalogo de Servicios</h2>
        <form>
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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

export default AddService;
