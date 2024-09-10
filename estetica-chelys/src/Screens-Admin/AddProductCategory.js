import React, { useEffect, useRef, useState } from 'react';
import '../EstilosAdmin/AddProductCategory.css'; // Asegúrate de que el path al archivo CSS sea correcto

const AddProductCategory = ({ isVisible, onClose, categoriesList }) => {
  const formRef = useRef(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isAddingProduct, setIsAddingProduct] = useState(false); // Estado para alternar entre categoría y producto
  const [selectedCategory, setSelectedCategory] = useState(''); // Estado para manejar la categoría seleccionada

  // Enfocar automáticamente el primer elemento input del formulario cuando el panel sea visible
  useEffect(() => {
    if (isVisible && formRef.current) {
      const firstInput = formRef.current.querySelector('input, textarea, select');
      if (firstInput) {
        firstInput.focus();
      }
    }
  }, [isVisible]);

  const handleAddCategory = () => {
    console.log('Agregar categoría:', { name, description, imageUrl });
    // Limpiar campos después de agregar
    setName('');
    setDescription('');
    setImageUrl('');
  };

  const handleAddProduct = () => {
    console.log('Agregar producto:', { name, description, imageUrl, category: selectedCategory });
    // Limpiar campos después de agregar
    setName('');
    setDescription('');
    setImageUrl('');
    setSelectedCategory('');
  };

  return (
    <div ref={formRef} className={`add-product-category-container-unique ${isVisible ? 'visible' : ''}`}>
      <button className="close-button-unique" onClick={onClose}>X</button>
      <div className="form-container-unique">
        <h2>{isAddingProduct ? 'Agregar Producto' : 'Agregar Categoría de Producto'}</h2>
        <form>
          {isAddingProduct && (
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
          <label htmlFor="name">{isAddingProduct ? 'Nombre del Producto' : 'Nombre de la Categoría'}</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="description">{isAddingProduct ? 'Descripción del Producto' : 'Descripción de la Categoría'}</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <label htmlFor="imageUrl">URL de la Imagen:</label>
          <input
            type="text"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />

          <button type="button" onClick={isAddingProduct ? handleAddProduct : handleAddCategory}>
            {isAddingProduct ? 'Agregar Producto' : 'Agregar Categoría'}
          </button>

          <button className="toggle-button" type="button" onClick={() => setIsAddingProduct(!isAddingProduct)}>
            {isAddingProduct ? 'Volver a Categoría' : 'Cambiar a Productos'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductCategory;
