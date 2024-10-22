import React, { useState, useRef, useEffect } from 'react';
import ViewMoreButton from '../Components/ViewMoreButton';
import '../Styles/Gallery.css';
import { fetchCategoriasGaleria } from '../Screens-Admin/categoriaGaleriaAPI'; // Función para obtener categorías
import { fetchGaleriasPorCategoria } from '../Screens-Admin/galeriaAPI'; // Función para obtener galerías por categoría

const Gallery = () => {
  const [categories, setCategories] = useState([]); // Para almacenar las categorías
  const [images, setImages] = useState([]); // Para almacenar las imágenes de la categoría seleccionada
  const [currentCategory, setCurrentCategory] = useState(null); // Categoría seleccionada
  const [currentCategoryPage, setCurrentCategoryPage] = useState(0); // Controlar la paginación de las categorías
  const [currentSubcategoryPage, setCurrentSubcategoryPage] = useState(0); // Controlar la paginación de las subcategorías
  const categoriesPerPage = 3; // Mostrar 3 categorías a la vez
  const subcategoriesPerPage = 3; // Mostrar 3 subcategorías a la vez
  const gallerySectionRef = useRef(null); // Para hacer scroll a la sección de la galería

  // useEffect para cargar las categorías al montar el componente
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const loadedCategories = await fetchCategoriasGaleria();
        setCategories(loadedCategories);
      } catch (error) {
        console.error('Error al cargar las categorías:', error);
      }
    };
    loadCategories();
  }, []);

  // Función para ver detalles de una categoría y cargar sus imágenes
  const viewCategoryDetails = async (category) => {
    setCurrentSubcategoryPage(0); // Reiniciar a la primera página de subcategorías
    gallerySectionRef.current.scrollIntoView({ behavior: 'smooth' });

    // Cargar imágenes de la categoría seleccionada
    try {
      const loadedImages = await fetchGaleriasPorCategoria(category.id);
      
      // Verificar si la categoría tiene imágenes asociadas
      if (!loadedImages || loadedImages.length === 0) {
        console.log('Esta categoría no tiene imágenes.');
        return;
      }

      // Si tiene imágenes, establecer la categoría y las imágenes
      setCurrentCategory(category);
      setImages(loadedImages);
    } catch (error) {
      console.error('Error al cargar las imágenes:', error);
    }
  };

  const goBack = () => {
    setCurrentCategory(null);
    setImages([]);
    gallerySectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCategoryPageChange = (direction) => {
    const totalPages = Math.ceil(categories.length / categoriesPerPage);
    const newPage = direction === 'next' ? currentCategoryPage + 1 : currentCategoryPage - 1;

    if (newPage >= 0 && newPage < totalPages) {
      setCurrentCategoryPage(newPage);
    }
  };

  const handleSubcategoryPageChange = (direction) => {
    const totalPages = Math.ceil(images.length / subcategoriesPerPage);
    const newPage = direction === 'next' ? currentSubcategoryPage + 1 : currentSubcategoryPage - 1;

    if (newPage >= 0 && newPage < totalPages) {
      setCurrentSubcategoryPage(newPage);
    }
  };

  return (
    <div className="gallery-container-gallerita" ref={gallerySectionRef}>
      {currentCategory ? (
        <div>
          <h1>{currentCategory.nombre}</h1> {/* Usamos 'nombre' de la categoría real */}
          <div className="images-container-gallerita">
            {images
              .slice(currentSubcategoryPage * subcategoriesPerPage, (currentSubcategoryPage + 1) * subcategoriesPerPage)
              .map((image, index) => (
                <div key={index} className="gallery-card-gallerita">
                  <img src={image.foto_antes} alt="Antes" className="image-gallerita" />
                  <img src={image.foto_despues} alt="Después" className="image-gallerita" />
                </div>
              ))}
          </div>
          <div className="pagination-controls-gallerita">
            <button onClick={() => handleSubcategoryPageChange('prev')} disabled={currentSubcategoryPage === 0}>
              Anterior
            </button>
            <button
              onClick={() => handleSubcategoryPageChange('next')}
              disabled={(currentSubcategoryPage + 1) * subcategoriesPerPage >= images.length}
            >
              Siguiente
            </button>
          </div>
          <button className="gallery-back-button-gallerita" onClick={goBack}>Regresar</button>
        </div>
      ) : (
        <div>
          <h1>Categorías de Galería</h1>
          <div className="gallery-grid-gallerita">
            {categories
              .slice(currentCategoryPage * categoriesPerPage, (currentCategoryPage + 1) * categoriesPerPage)
              .map((category) => (
                <div key={category.id} className="gallery-card-gallerita">
                  <img src={category.imagen} alt={category.nombre} />
                  <h2>{category.nombre}</h2>
                  <p>{category.descripcion}</p>
                  <ViewMoreButton onClick={() => viewCategoryDetails(category)} />
                </div>
              ))}
          </div>
          <div className="pagination-controls-gallerita">
            <button onClick={() => handleCategoryPageChange('prev')} disabled={currentCategoryPage === 0}>
              Anterior
            </button>
            <button
              onClick={() => handleCategoryPageChange('next')}
              disabled={(currentCategoryPage + 1) * categoriesPerPage >= categories.length}
            >
              Siguiente
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
