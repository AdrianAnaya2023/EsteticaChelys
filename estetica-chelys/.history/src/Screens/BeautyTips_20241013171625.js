import React, { useState, useEffect } from 'react';
import { fetchCategoriasConsejos } from '../Screens-Admin/categoriaConsejosAPI';
import { fetchConsejosPorCategoria } from '../Screens-Admin/consejosAPI';
import ViewMoreButton from '../Components/ViewMoreButton';
import '../Styles/BeautyTips.css';

const BeautyTips = () => {
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [consejos, setConsejos] = useState([]);
  const [currentTipPage, setCurrentTipPage] = useState(0);
  const [currentSubcategoryPage, setCurrentSubcategoryPage] = useState(0);
  const itemsPerPage = 4;
  const subcategoriesPerPage = 3;

  useEffect(() => {
    // Cargar las categorías desde la API
    const loadCategories = async () => {
      try {
        const data = await fetchCategoriasConsejos();
        setCategories(data || []);
      } catch (error) {
        console.error('Error al cargar las categorías de consejos:', error.message);
      }
    };

    loadCategories();
  }, []);

  const viewCategoryDetails = async (category) => {
    setCurrentCategory(category);
    setCurrentSubcategoryPage(0);

    // Obtener los consejos de la categoría seleccionada
    try {
      const data = await fetchConsejosPorCategoria(category.id);
      setConsejos(data || []);
    } catch (error) {
      console.error('Error al cargar los consejos por categoría:', error.message);
    }
  };

  const goBack = () => {
    setCurrentCategory(null);
    setConsejos([]);
    setCurrentTipPage(0);
  };

  // Funciones de paginación
  const nextTipPage = () => setCurrentTipPage((prev) => (prev + itemsPerPage) % categories.length);
  const prevTipPage = () => setCurrentTipPage((prev) => (prev - itemsPerPage < 0 ? categories.length - itemsPerPage : prev - itemsPerPage));

  const nextSubcategoryPage = () => setCurrentSubcategoryPage((prev) => prev + subcategoriesPerPage);
  const prevSubcategoryPage = () => setCurrentSubcategoryPage((prev) => prev - subcategoriesPerPage);

  return (
    <div className="beauty-tips-main-container-custom">
      {currentCategory ? (
        <div className="beauty-tips-subcategories-container">
          <h1>{currentCategory.nombre}</h1>
          <div className="beauty-tips-grid-container-custom">
            {consejos
              .slice(currentSubcategoryPage, currentSubcategoryPage + subcategoriesPerPage) // Paginación de subcategorías
              .map((sub, index) => (
                <div key={index} className="beauty-tips-card-container-custom">
                  <img src={sub.imagen} alt={sub.titulo} className="beauty-tips-card-img" />
                  <h3>{sub.titulo}</h3>
                  <p>{sub.descripcion}</p>
                </div>
              ))}
          </div>
          <div className="pagination-controls-tips-custom">
            <button onClick={prevSubcategoryPage} disabled={currentSubcategoryPage === 0}>
              Anterior
            </button>
            <button
              onClick={nextSubcategoryPage}
              disabled={currentSubcategoryPage + subcategoriesPerPage >= consejos.length}
            >
              Siguiente
            </button>
          </div>
          <div style={{ textAlign: 'right', marginTop: '20px' }}>
            <button className="BotoncitoReturn" onClick={goBack}>
              Regresar
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h1>Categorías de Consejos de Belleza</h1>
          <div className="beauty-tips-grid-container-custom">
            {categories.slice(currentTipPage, currentTipPage + itemsPerPage).map((category, index) => (
              <div key={index} className="beauty-tips-card-container-custom">
                <img src={category.imagen} alt={category.nombre} className="beauty-tips-card-img" />
                <h3>{category.nombre}</h3>
                <p>{category.descripcion}</p>
                <ViewMoreButton onClick={() => viewCategoryDetails(category)} />
              </div>
            ))}
          </div>
          <div className="pagination-controls-tips-custom">
            <button onClick={prevTipPage} disabled={currentTipPage === 0}>
              Anterior
            </button>
            <button
              onClick={nextTipPage}
              disabled={currentTipPage + itemsPerPage >= categories.length}
            >
              Siguiente
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BeautyTips;
