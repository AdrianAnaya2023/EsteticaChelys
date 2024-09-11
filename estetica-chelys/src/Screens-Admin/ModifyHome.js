import React, { useEffect, useRef, useState } from 'react';
import '../EstilosAdmin/ModifyHome.css'; // Asegúrate de que el path al archivo CSS sea correcto

const ModifyHome = ({ isVisible, onClose }) => {
  const formRef = useRef(null);
  const [description, setDescription] = useState('');
  const [ownerPhoto, setOwnerPhoto] = useState('');
  const [localPhotos, setLocalPhotos] = useState(['', '', '', '']); // Hasta 4 fotos

  // Enfocar automáticamente el primer elemento input del formulario cuando el panel sea visible
  useEffect(() => {
    if (isVisible && formRef.current) {
      const firstInput = formRef.current.querySelector('input, textarea');
      if (firstInput) {
        firstInput.focus();
      }
    }
  }, [isVisible]);

  const handleSave = () => {
    console.log('Modificaciones guardadas:', { description, ownerPhoto, localPhotos });
    // Limpiar campos después de guardar
    setDescription('');
    setOwnerPhoto('');
    setLocalPhotos(['', '', '', '']);
    onClose();
  };

  const handleLocalPhotoChange = (index, value) => {
    const updatedPhotos = [...localPhotos];
    updatedPhotos[index] = value;
    setLocalPhotos(updatedPhotos);
  };

  return (
    <div ref={formRef} className={`modify-home-container ${isVisible ? 'visible' : ''}`}>
      <button className="close-button" onClick={onClose}>X</button>
      <div className="form-container">
        <h2>Modificar Página de Inicio</h2>
        <form>
          <label htmlFor="description">Descripción:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <label htmlFor="ownerPhoto">Foto del Dueño (URL):</label>
          <input
            type="text"
            id="ownerPhoto"
            value={ownerPhoto}
            onChange={(e) => setOwnerPhoto(e.target.value)}
          />

          <h3>Fotos del Local (hasta 4):</h3>
          {localPhotos.map((photo, index) => (
            <div key={index}>
              <label htmlFor={`localPhoto${index}`}>Foto Local {index + 1} (URL):</label>
              <input
                type="text"
                id={`localPhoto${index}`}
                value={photo}
                onChange={(e) => handleLocalPhotoChange(index, e.target.value)}
              />
            </div>
          ))}

          <button type="button" onClick={handleSave}>Guardar Modificaciones</button>
        </form>
      </div>
    </div>
  );
};

export default ModifyHome;
