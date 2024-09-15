import React, { useState, useRef } from 'react';
import Botoncito from '../Components/Botoncito';
import ViewMoreButton from '../Components/ViewMoreButton';
import '../Styles/ServiceCatalog.css'; 

const services = [
  {
    id: 1,
    title: 'Cortes Caballero',
    description: 'Servicios profesionales de corte de cabello para caballeros con estilo moderno.',
    imageUrl: 'https://i.pinimg.com/originals/6b/66/f2/6b66f20c3cad6ed6e9caa5a7a1cdcf62.jpg',
    subservices: [
      { id: 1, title: 'Corte Clásico', imageUrl: 'https://homme.mx/wp-content/uploads/2023/10/5-cortes-de-pelo-clasicos-que-nunca-pasaran-de-moda-peinado-de-lado-homme-luxury-barbers-01.jpg' },
      { id: 2, title: 'Corte Degradado', imageUrl: 'https://i.pinimg.com/736x/42/77/2b/42772b9a6e085c2d92a619d8dffe4823.jpg' }
    ]
  },
  {
    id: 2,
    title: 'Cortes Niño',
    description: 'Cortes divertidos y elegantes para niños, adaptados a cualquier tipo de cabello.',
    imageUrl: 'https://estaticos.qdq.com/swdata/photos/081/081119176/e4bb065e48f441239bf01551d2c28ba1.jpg',
    subservices: [
      { id: 1, title: 'Corte Infantil', imageUrl: 'https://example.com/corte_infantil.jpg' },
      { id: 2, title: 'Corte Creativo', imageUrl: 'https://example.com/corte_creativo.jpg' }
    ]
  },
  {
    id: 3,
    title: 'Tintes',
    description: 'Aplicación de tinte profesional con productos de alta calidad.',
    imageUrl: 'https://tahecosmetics.com/trends/wp-content/uploads/2021/12/tipos-tintes.jpeg',
    subservices: [
      { id: 1, title: 'Tinte Completo', imageUrl: 'https://example.com/tinte_completo.jpg' },
      { id: 2, title: 'Mechas', imageUrl: 'https://example.com/mechas.jpg' }
    ]
  },
  {
    id: 4,
    title: 'Tratamiento Reestructurante',
    description: 'Tratamiento capilar reestructurante para cabello dañado.',
    imageUrl: 'https://e00-telva.uecdn.es/assets/multimedia/imagenes/2020/02/10/15813331721631.jpg',
    subservices: [
      { id: 1, title: 'Tratamiento Completo', imageUrl: 'https://example.com/tratamiento_completo.jpg' },
      { id: 2, title: 'Reparación Rápida', imageUrl: 'https://example.com/reparacion_rapida.jpg' }
    ]
  },
  {
    id: 5,
    title: 'Maquillaje',
    description: 'Maquillaje profesional para cualquier ocasión, desde eventos formales hasta bodas.',
    imageUrl: 'https://example.com/maquillaje.jpg',
    subservices: [
      { id: 1, title: 'Maquillaje de Día', imageUrl: 'https://example.com/maquillaje_dia.jpg' },
      { id: 2, title: 'Maquillaje de Noche', imageUrl: 'https://example.com/maquillaje_noche.jpg' }
    ]
  },
  {
    id: 6,
    title: 'Faciales',
    description: 'Tratamientos faciales para mejorar la apariencia y salud de tu piel.',
    imageUrl: 'https://example.com/faciales.jpg',
    subservices: [
      { id: 1, title: 'Facial Hidratante', imageUrl: 'https://example.com/facial_hidratante.jpg' },
      { id: 2, title: 'Facial Anti-Edad', imageUrl: 'https://example.com/facial_anti_edad.jpg' }
    ]
  },
  {
    id: 7,
    title: 'Tratamiento de Cejas',
    description: 'Tratamientos para dar forma y definición a tus cejas.',
    imageUrl: 'https://example.com/tratamiento_cejas.jpg',
    subservices: [
      { id: 1, title: 'Depilación de Cejas', imageUrl: 'https://example.com/depilacion_cejas.jpg' },
      { id: 2, title: 'Laminado de Cejas', imageUrl: 'https://example.com/laminado_cejas.jpg' }
    ]
  }
];


const ServiceCatalog = ({ isAdmin, openAddService }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [currentService, setCurrentService] = useState(null);

  const serviceSectionRef = useRef(null);

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
    serviceSectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const goBack = () => {
    setCurrentService(null);
    serviceSectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleEdit = (service) => {
    console.log('Edit service:', service);
  };

  const handleDelete = (service) => {
    console.log('Delete service:', service);
  };

  const handleEditSubservice = (subservice) => {
    console.log('Edit subservice:', subservice);
  };

  const handleDeleteSubservice = (subservice) => {
    console.log('Delete subservice:', subservice);
  };

  return (
    <div ref={serviceSectionRef} className="service-catalog-container-new">
      {isAdmin && <Botoncito style={{ top: '10px', left: '10px' }} onClick={openAddService} />}
      {currentService ? (
        <div>
          <h1>{currentService.title}</h1>
          <div className="subservice-grid-catalog-new">
            {currentService.subservices.map(subservice => (
              <div key={subservice.id} className="subservice-card-catalog-new">
                <img src={subservice.imageUrl} alt={subservice.title} />
                <h3>{subservice.title}</h3>
                {isAdmin && (
                  <div className="subservice-card-buttons">
                    <button onClick={() => handleEditSubservice(subservice)} className="edit-button-sub">Modificar</button>
                    <button onClick={() => handleDeleteSubservice(subservice)} className="delete-button-sub">Eliminar</button>
                  </div>
                )}
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
                <img src={service.imageUrl} alt={service.title} className="service-image-catalog-new" />
                <h2>{service.title}</h2>
                <p>{service.description}</p>
                <ViewMoreButton onClick={() => viewServiceDetails(service)} />
                {isAdmin && (
                  <div className="service-card-buttons">
                    <button onClick={() => handleEdit(service)} className="edit-button">Modificar</button>
                    <button onClick={() => handleDelete(service)} className="delete-button">Eliminar</button>
                  </div>
                )}
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
