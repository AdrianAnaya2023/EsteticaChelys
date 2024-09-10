import React, { useEffect, useRef, useState } from 'react';
import Buttons from '../Components/Buttons';
import '../EstilosAdmin/CrudServicios.css'; // Asegúrate de que el path al archivo CSS sea correcto

const AddService = ({ isVisible, onClose, servicesList }) => {
  const serviceRef = useRef(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [isAddingDetail, setIsAddingDetail] = useState(false); // Modo para alternar entre servicio y detalle de servicio
  const [selectedService, setSelectedService] = useState(''); // Servicio seleccionado para el detalle

  // Enfocar automáticamente el primer elemento input del formulario cuando el panel sea visible
  useEffect(() => {
    if (isVisible && serviceRef.current) {
      const firstInput = serviceRef.current.querySelector('input, textarea, select');
      if (firstInput) {
        firstInput.focus();
      }
    }
  }, [isVisible]);

  const handleAddService = () => {
    console.log('Agregar servicio:', { title, description, image });
    // Limpiar campos después de agregar
    setTitle('');
    setDescription('');
    setImage('');
  };

  const handleAddServiceDetail = () => {
    console.log('Agregar detalle de servicio:', { title, description, image, service: selectedService });
    // Limpiar campos después de agregar
    setTitle('');
    setDescription('');
    setImage('');
  };

  return (
    <div ref={serviceRef} className={`add-service-container ${isVisible ? 'visible' : ''}`}>
      <button className="close-button" onClick={onClose}>X</button>
      <div className="form-container">
        <h2>{isAddingDetail ? 'Agregar Detalle de Servicio' : 'Agregar Servicio'}</h2>
        <form>
          {isAddingDetail && (
            <>
              <label htmlFor="service">Seleccionar Servicio:</label>
              <select
                id="service"
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
              >
                <option value="">Seleccione un servicio</option>
                {servicesList && servicesList.map((service, index) => (
                  <option key={index} value={service.title}>{service.title}</option>
                ))}
              </select>
            </>
          )}
          <label htmlFor="title">{isAddingDetail ? 'Título del Detalle:' : 'Título del Servicio:'}</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="description">{isAddingDetail ? 'Descripción del Detalle:' : 'Descripción del Servicio:'}</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <label htmlFor="image">Imagen URL:</label>
          <input
            type="text"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />

          {isAddingDetail ? (
            <Buttons onAdd={handleAddServiceDetail} />
          ) : (
            <Buttons onAdd={handleAddService} />
          )}

          <button type="button" onClick={() => setIsAddingDetail(!isAddingDetail)}>
            {isAddingDetail ? 'Volver a Servicios' : 'Agregar Detalle de Servicio'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddService;
