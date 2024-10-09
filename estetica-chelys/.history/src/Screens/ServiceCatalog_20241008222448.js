import React, { useState, useEffect, useRef } from 'react';
import { fetchServiciosPorCategoria } from '../Screens-Admin/serviciosAPI';
import { fetchCategoriasServicios } from '../Screens-Admin/categoriaServiciosAPI';
import ViewMoreButton from '../Components/ViewMoreButton';
import '../Styles/ServiceCatalog.css';

const ServiceCatalog = () => {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const serviceSectionRef = useRef(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const loadedCategories = await fetchCategoriasServicios();
        setCategories(loadedCategories || []);
      } catch (error) {
        console.error('Error al cargar categorías:', error.message);
      }
    };
    loadData();
  }, []);

  const handleCategoryClick = async (category) => {
    setSelectedCategory(category);
    setCurrentPage(0);
    serviceSectionRef.current.scrollIntoView({ behavior: 'smooth' });

    try {
      const servicesByCategory = await fetchServiciosPorCategoria(category.id);
      setServices(servicesByCategory || []);
    } catch (error) {
      console.error('Error al obtener servicios:', error.message);
    }
  };

  const handlePageChange = (direction) => {
    const totalPages = Math.ceil(services.length / 3);
    const newPage = direction === 'next' ? currentPage + 1 : currentPage - 1;
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
      serviceSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const goBack = () => {
    setSelectedCategory(null);
    setServices([]); // Limpiar servicios al volver a la vista de categorías
    serviceSectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div ref={serviceSectionRef} className="service-catalog-container-new">
      {!selectedCategory ? (
        <div>
          <h1>Categorías de Servicios</h1>
          <div className="categories-grid">
            {categories.map(category => (
              <div key={category.id} className="category-card" onClick={() => handleCategoryClick(category)}>
                <h2>{category.nombre}</h2>
                <img src={category.imagen} alt={category.nombre} />
                <p>{category.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h1>Servicios en {selectedCategory.nombre}</h1>
          <div className="services-grid-catalog-new">
            {services.slice(currentPage * 3, currentPage * 3 + 3).map(service => (
              <div key={service.id} className="service-card-catalog-new">
                <img src={service.imagen} alt={service.titulo} className="service-image-catalog-new" />
                <div className="service-details">
                  <h2 className="service-title">{service.titulo}</h2>
                  <p className="service-description">{service.descripcion}</p>
                  <ViewMoreButton onClick={() => console.log(`View more for ${service.titulo}`)} />
                </div>
              </div>
            ))}
          </div>
          <div className="pagination-buttons-catalog-new">
            <button onClick={() => handlePageChange('prev')} disabled={currentPage === 0}>
              Anterior
            </button>
            <button onClick={() => handlePageChange('next')} disabled={currentPage * 3 + 3 >= services.length}>
              Siguiente
            </button>
          </div>
          <button className="catalog-back-button-new" onClick={goBack}>Regresar</button>
        </div>
      )}
    </div>
  );
};

export default ServiceCatalog;
