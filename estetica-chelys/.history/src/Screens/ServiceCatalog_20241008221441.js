import React, { useState, useEffect, useRef } from 'react';
import { fetchServicios } from '../Screens-Admin/serviciosAPI';
import { fetchCategoriasServicios } from '../Screens-Admin/categoriaServiciosAPI';
import ViewMoreButton from '../Components/ViewMoreButton';
import '../Styles/ServiceCatalog.css';

const ServiceCatalog = () => {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentService, setCurrentService] = useState(null);
  const [currentSubservicePage, setCurrentSubservicePage] = useState(0);

  const serviceSectionRef = useRef(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [loadedServices, loadedCategories] = await Promise.all([
          fetchServicios(),
          fetchCategoriasServicios(),
        ]);
        setServices(loadedServices || []);
        setCategories(loadedCategories || []);
      } catch (error) {
        console.error('Error al cargar datos:', error.message);
      }
    };
    loadData();
  }, []);

  const handlePageChange = (direction) => {
    const totalPages = Math.ceil(services.length / 3);
    const newPage = direction === 'next' ? currentPage + 1 : currentPage - 1;
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
      serviceSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const viewServiceDetails = (service) => {
    setCurrentService(service);
    setCurrentSubservicePage(0);
    serviceSectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const goBack = () => {
    setCurrentService(null);
    serviceSectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div ref={serviceSectionRef} className="service-catalog-container-new">
      {currentService ? (
        <div>
          <h1>{currentService.title}</h1>
          <p>{currentService.description}</p>
          <div className="subservice-grid-catalog-new">
            {currentService.subservices.map(subservice => (
              <div key={subservice.id} className="subservice-card-catalog-new">
                <img src={subservice.imageUrl} alt={subservice.title} />
                <h3>{subservice.title}</h3>
              </div>
            ))}
          </div>
          <button className="catalog-back-button-new" onClick={goBack}>Regresar</button>
        </div>
      ) : (
        <div>
          <h1>Catálogo de Servicios</h1>
          <div className="services-grid-catalog-new">
            {services.slice(currentPage * 3, currentPage * 3 + 3).map(service => (
              <div key={service.id} className="service-card-catalog-new">
                <img src={service.imagen} alt={service.titulo} className="service-image-catalog-new" />
                <div className="service-details">
                  <h2 className="service-title">{service.titulo}</h2>
                  <p className="service-description">{service.descripcion}</p>
                  <p className="service-category">
                    Categoría: {categories.find(cat => cat.id === service.categoria_id)?.nombre || 'Sin categoría'}
                  </p>
                  <ViewMoreButton onClick={() => viewServiceDetails(service)} />
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
        </div>
      )}
    </div>
  );
};

export default ServiceCatalog;
