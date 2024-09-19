import React, { useState, useRef } from 'react';
import ViewMoreButton from '../Components/ViewMoreButton';
import '../Styles/Gallery.css';  // Asegúrate de que el path al archivo CSS sea correcto

const Gallery = () => {
  const sampleCategories = [
    { id: 1, name: 'Antes y Después', imageUrl: 'https://via.placeholder.com/500x300.png?text=Antes+y+Después', description: 'Imágenes comparativas de antes y después de nuestros trabajos.' },
    { id: 2, name: 'Eventos Especiales', imageUrl: 'https://via.placeholder.com/500x300.png?text=Eventos+Especiales', description: 'Fotos de los eventos especiales donde hemos participado.' },
    { id: 3, name: 'Otros Trabajos', imageUrl: 'https://via.placeholder.com/500x300.png?text=Otros+Trabajos', description: 'Ejemplos adicionales de nuestros trabajos en diversos campos.' },
    { id: 4, name: 'Maquillaje', imageUrl: 'https://via.placeholder.com/500x300.png?text=Maquillaje', description: 'Galería de trabajos de maquillaje.' },
    { id: 5, name: 'Cortes de Cabello', imageUrl: 'https://via.placeholder.com/500x300.png?text=Cortes+de+Cabello', description: 'Cortes de cabello realizados a nuestros clientes.' },
    { id: 6, name: 'Faciales', imageUrl: 'https://via.placeholder.com/500x300.png?text=Faciales', description: 'Tratamientos faciales aplicados.' }
  ];

  const sampleImages = {
    1: [
      { before: 'https://via.placeholder.com/500x300.png?text=Antes1', after: 'https://via.placeholder.com/500x300.png?text=Después1' },
      { before: 'https://via.placeholder.com/500x300.png?text=Antes2', after: 'https://via.placeholder.com/500x300.png?text=Después2' }
    ],
    // ...
  };

  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);  // Controlar la paginación de las categorías
  const categoriesPerPage = 3;  // Mostrar 3 categorías a la vez
  const gallerySectionRef = useRef(null);

  const viewCategoryDetails = (category) => {
    setCurrentCategory(category);
    gallerySectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const goBack = () => {
    setCurrentCategory(null);
    gallerySectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePageChange = (direction) => {
    const totalPages = Math.ceil(sampleCategories.length / categoriesPerPage);
    const newPage = direction === 'next' ? currentPage + 1 : currentPage - 1;

    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="gallery-container-gallerita" ref={gallerySectionRef}>
      {currentCategory ? (
        <div>
          <h1>{currentCategory.name}</h1>
          <div className="images-container-gallerita">
            {sampleImages[currentCategory.id]?.map((image, index) => (
              <div key={index} className="gallery-card-gallerita">
                <img src={image.before} alt="Antes" className="image-gallerita" />
                <img src={image.after} alt="Después" className="image-gallerita" />
              </div>
            ))}
          </div>
          <button className="gallery-back-button-gallerita" onClick={goBack}>Regresar</button>
        </div>
      ) : (
        <div>
          <h1>Categorías de Galería</h1>
          <div className="gallery-grid-gallerita">
            {sampleCategories.slice(currentPage * categoriesPerPage, (currentPage + 1) * categoriesPerPage).map(category => (
              <div key={category.id} className="gallery-card-gallerita">
                <img src={category.imageUrl} alt={category.name} />
                <h2>{category.name}</h2>
                <p>{category.description}</p>
                <ViewMoreButton onClick={() => viewCategoryDetails(category)} />
              </div>
            ))}
          </div>
          <div className="pagination-controls-gallerita">
            <button onClick={() => handlePageChange('prev')} disabled={currentPage === 0}>Anterior</button>
            <button onClick={() => handlePageChange('next')} disabled={(currentPage + 1) * categoriesPerPage >= sampleCategories.length}>Siguiente</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
