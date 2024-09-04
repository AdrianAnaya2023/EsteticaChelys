import React, { useEffect, useRef, useState } from 'react';
import Buttons from '../Components/Buttons';
import '../EstilosAdmin/CrudGallery.css'; // Asegúrate de que el path al archivo CSS sea correcto

const AddGalleryImage = ({ isVisible, onClose }) => {
  const galleryRef = useRef(null);
  const [beforeImage, setBeforeImage] = useState('');
  const [afterImage, setAfterImage] = useState('');

  // Enfocar automáticamente el primer elemento input del formulario cuando el panel sea visible
  useEffect(() => {
    if (isVisible && galleryRef.current) {
      const firstInput = galleryRef.current.querySelector('input');
      if (firstInput) {
        firstInput.focus();
      }
    }
  }, [isVisible]);

  const handleAdd = () => {
    console.log('Agregar imagen:', { beforeImage, afterImage });
  };

  const handleEdit = () => {
    console.log('Modificar imagen:', { beforeImage, afterImage });
  };

  const handleDelete = () => {
    console.log('Borrar imagen:', { beforeImage, afterImage });
  };

  return (
    <div ref={galleryRef} className={`add-gallery-container ${isVisible ? 'visible' : ''}`}>
      <button className="close-button" onClick={onClose}>X</button>
      <div className="form-container">
        <h2>Agregar Imagen a Galería</h2>
        <form>
          <label htmlFor="beforeImage">Imagen Antes:</label>
          <input
            type="text"
            id="beforeImage"
            value={beforeImage}
            onChange={(e) => setBeforeImage(e.target.value)}
          />
          <label htmlFor="afterImage">Imagen Después:</label>
          <input
            type="text"
            id="afterImage"
            value={afterImage}
            onChange={(e) => setAfterImage(e.target.value)}
          />
          <Buttons onAdd={handleAdd} onEdit={handleEdit} onDelete={handleDelete} />
        </form>
      </div>
    </div>
  );
};

export default AddGalleryImage;
