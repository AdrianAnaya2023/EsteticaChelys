import React, { useEffect, useRef, useState } from 'react';
import Buttons from '../Components/Buttons';
import '../EstilosAdmin/AddBeautyTip.css'; // Asegúrate de que el path al archivo CSS sea correcto

const AddBeautyTip = ({ isVisible, onClose, categoriesList }) => {
  const tipRef = useRef(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [isAddingSubcategory, setIsAddingSubcategory] = useState(false); // Estado para alternar entre categoría y subcategoría
  const [selectedCategory, setSelectedCategory] = useState(''); // Estado para manejar la categoría seleccionada

  // Enfocar automáticamente el primer elemento input del formulario cuando el panel sea visible
  useEffect(() => {
    if (isVisible && tipRef.current) {
      const firstInput = tipRef.current.querySelector('input, textarea, select');
      if (firstInput) {
        firstInput.focus();
      }
    }
  }, [isVisible]);

  const handleAddCategory = () => {
    console.log('Agregar categoría:', { name, description, image });
    // Limpiar campos después de agregar
    setName('');
    setDescription('');
    setImage('');
  };

  const handleAddTip = () => {
    console.log('Agregar tip:', { name, description, image, category: selectedCategory });
    // Limpiar campos después de agregar
    setName('');
    setDescription('');
    setImage('');
  };

  return (
    <div ref={tipRef} className={`add-beauty-tip-container ${isVisible ? 'visible' : ''}`}>
      <button className="close-button" onClick={onClose}>X</button>
      <div className="form-container">
        <h2>{isAddingSubcategory ? 'Tips' : 'Categoría Tips'}</h2>
        <form>
          {isAddingSubcategory && (
            <>
              <label htmlFor="category">Seleccionar Categoría:</label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Seleccione una categoría</option>
                {categoriesList && categoriesList.map((category, index) => (
                  <option key={index} value={category.name}>{category.name}</option>
                ))}
              </select>
            </>
          )}
          <label htmlFor="name">{isAddingSubcategory ? 'Nombre del Tip:' : 'Nombre de la Categoría:'}</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="description">{isAddingSubcategory ? 'Descripción del Tip:' : 'Descripción de la Categoría:'}</label>
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

          {/* Botón para alternar entre agregar categorías o tips */}
          {isAddingSubcategory ? (
            <Buttons onAdd={handleAddTip} />
          ) : (
            <Buttons onAdd={handleAddCategory} />
          )}

          <button type="button" onClick={() => setIsAddingSubcategory(!isAddingSubcategory)}>
            {isAddingSubcategory ? 'Volver a Categoría' : 'Cambiar a Tips'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBeautyTip;
