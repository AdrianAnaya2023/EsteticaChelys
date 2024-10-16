import React, { useState, useEffect, useRef } from 'react';
import { fetchCategoriasServicios } from '../Screens-Admin/categoriaServiciosAPI';
import { fetchServiciosPorCategoria } from '../Screens-Admin/serviciosAPI';
import ViewMoreButton from '../Components/ViewMoreButton';
import '../Styles/ServiceCatalog.css';

const ServiceCatalog = () => {
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(3); // Definir cuántos elementos mostrar por página
  const serviceSectionRef = useRef(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const loadedCategories = await fetchCategoriasServicios();
        setCategories(loadedCategories || []);
      } catch (error) {
        console.error('Error al cargar categorías:', error.message);
      }
    };
    loadCategories();
  }, []);

  const handleCategoryClick = async (category) => {
    setCurrentCategory(category);
    setCurrentPage(0); // Reiniciar paginación al seleccionar una categoría
    try {
      const loadedServices = await fetchServiciosPorCategoria(category.id);
      setServices(loadedServices || []);
    } catch (error) {
      console.error('Error al cargar servicios:', error.message);
    }
    serviceSectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const goBack = () => {
    setCurrentCategory(null);
    setServices([]);
    setCurrentPage(0); // Reiniciar paginación al regresar
    serviceSectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePageChange = (direction, data) => {
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const newPage = direction === 'next' ? currentPage + 1 : currentPage - 1;
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
      serviceSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={serviceSectionRef} className="service-catalog-container-new">
      {currentCategory ? (
        <div>
          <h1>{currentCategory.nombre}</h1> {/* Solo muestra el nombre de la categoría */}
          <div className="services-grid-catalog-new">
            {services
              .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
              .map(service => (
                <div key={service.id} className="service-card-catalog-new">
                  <img src={service.imagen} alt={service.titulo} className="service-image-catalog-new" />
                  <h2 className="service-title">{service.titulo}</h2>
                  <p className="service-description">{service.descripcion}</p>
                </div>
              ))}
          </div>
          <div className="pagination-controls">
            <button onClick={() => handlePageChange('prev', services)} disabled={currentPage === 0}>
              Anterior
            </button>
            <button onClick={() => handlePageChange('next', services)} disabled={currentPage * itemsPerPage + itemsPerPage >= services.length}>
              Siguiente
            </button>
          </div>
          <button className="catalog-back-button-new" onClick={goBack}>Regresar</button>
        </div>
      ) : (
        <div>
          <h1>Catálogo de Servicios</h1>
          <div className="services-grid-catalog-new">
            {categories
              .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
              .map(category => (
                <div key={category.id} className="service-card-catalog-new">
                  <img src={category.imagen} alt={category.nombre} className="service-image-catalog-new" />
                  <h2 className="service-title">{category.nombre}</h2>
                  <p className="service-description">{category.descripcion}</p>
                  <ViewMoreButton onClick={() => handleCategoryClick(category)} />
                </div>
              ))}
          </div>
          <div className="pagination-controls">
            <button onClick={() => handlePageChange('prev', categories)} disabled={currentPage === 0}>
              Anterior
            </button>
            <button onClick={() => handlePageChange('next', categories)} disabled={currentPage * itemsPerPage + itemsPerPage >= categories.length}>
              Siguiente
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceCatalog;
