import React, { useState, useEffect, useRef } from 'react';
import { fetchCategoriasServicios } from '../Screens-Admin/categoriaServiciosAPI';
import { fetchServiciosPorCategoria } from '../Screens-Admin/serviciosAPI';
import '../Styles/ServiceCatalog.css';

const ServiceCatalog = () => {
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);
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
    serviceSectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div ref={serviceSectionRef} className="service-catalog-container-new">
      {currentCategory ? (
        <div>
          <h1>{currentCategory.nombre}</h1>
          <p>{currentCategory.descripcion}</p>
          <div className="services-grid-catalog-new">
            {services.map(service => (
              <div key={service.id} className="service-card-catalog-new">
                <img src={service.imagen} alt={service.titulo} className="service-image-catalog-new" />
                <h2 className="service-title">{service.titulo}</h2>
                <p className="service-description">{service.descripcion}</p>
              </div>
            ))}
          </div>
          <button className="catalog-back-button-new" onClick={goBack}>Regresar</button>
        </div>
      ) : (
        <div>
          <h1>Catálogo de Categorías</h1>
          <div className="services-grid-catalog-new">
            {categories.map(category => (
              <div key={category.id} className="service-card-catalog-new" onClick={() => handleCategoryClick(category)}>
                <img src={category.imagen} alt={category.nombre} className="service-image-catalog-new" />
                <h2 className="service-title">{category.nombre}</h2>
                <p className="service-description">{category.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceCatalog;

