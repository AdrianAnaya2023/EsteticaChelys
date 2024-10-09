import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ViewMoreButton from '../Components/ViewMoreButton';
import '../Styles/ServiceCatalog.css';

const ServiceCatalog = () => {
  const [categories, setCategories] = useState([]); // Datos de categorías reales
  const [services, setServices] = useState([]); // Datos de servicios reales
  const [currentPage, setCurrentPage] = useState(0);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentSubservicePage, setCurrentSubservicePage] = useState(0);

  const serviceSectionRef = useRef(null);

  // Fetch de categorías al montar el componente
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryResponse = await axios.get('http://localhost:3000/api/categorias-servicios');
        setCategories(categoryResponse.data);
      } catch (error) {
        console.error('Error al obtener las categorías', error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch de servicios al seleccionar una categoría
  const fetchServicesByCategory = async (categoryId) => {
    try {
      const serviceResponse = await axios.get(`http://localhost:3000/api/servicios?categoria_id=${categoryId}`);
      setServices(serviceResponse.data);
    } catch (error) {
      console.error('Error al obtener los servicios', error);
    }
  };

  // Cambiar página de categorías
  const handlePageChange = (direction) => {
    const totalPages = Math.ceil(categories.length / 3);
    const newPage = direction === 'next' ? currentPage + 1 : currentPage - 1;
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
      serviceSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Cambiar página de subservicios dentro de una categoría
  const handleSubservicePageChange = (direction) => {
    const totalSubservicePages = Math.ceil(services.length / 3);
    const newSubservicePage = direction === 'next' ? currentSubservicePage + 1 : currentSubservicePage - 1;
    if (newSubservicePage >= 0 && newSubservicePage < totalSubservicePages) {
      setCurrentSubservicePage(newSubservicePage);
    }
  };

  // Ver detalles de la categoría seleccionada
  const viewServiceDetails = async (category) => {
    setCurrentCategory(category);
    setCurrentSubservicePage(0);
    await fetchServicesByCategory(category.id);
    serviceSectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  // Regresar al listado de categorías
  const goBack = () => {
    setCurrentCategory(null);
    serviceSectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div ref={serviceSectionRef} className="service-catalog-container-new">
      {currentCategory ? (
        <div>
          <h1>{currentCategory.nombre}</h1>
          <div className="subservice-grid-catalog-new">
            {services
              .slice(currentSubservicePage * 3, currentSubservicePage * 3 + 3)
              .map(service => (
                <div key={service.id} className="subservice-card-catalog-new">
                  <img src={service.imagen} alt={service.titulo} />
                  <h3>{service.titulo}</h3>
                </div>
              ))}
          </div>
          <div className="pagination-buttons-catalog-new">
            <button onClick={() => handleSubservicePageChange('prev')} disabled={currentSubservicePage === 0}>
              Anterior
            </button>
            <button onClick={() => handleSubservicePageChange('next')} disabled={currentSubservicePage * 3 + 3 >= services.length}>
              Siguiente
            </button>
          </div>
          <button className="catalog-back-button-new" onClick={goBack}>Regresar</button>
        </div>
      ) : (
        <div>
          <h1>Catálogo de Servicios</h1>
          <div className="services-grid-catalog-new">
            {categories.slice(currentPage * 3, currentPage * 3 + 3).map(category => (
              <div key={category.id} className="service-card-catalog-new">
                <img src={category.imagen} alt={category.nombre} className="service-image-catalog-new" />
                <h2>{category.nombre}</h2>
                <p>{category.descripcion}</p>
                <ViewMoreButton onClick={() => viewServiceDetails(category)} />
              </div>
            ))}
          </div>
          <div className="pagination-buttons-catalog-new">
            <button onClick={() => handlePageChange('prev')} disabled={currentPage === 0}>
              Anterior
            </button>
            <button onClick={() => handlePageChange('next')} disabled={currentPage * 3 + 3 >= categories.length}>
              Siguiente
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceCatalog;
