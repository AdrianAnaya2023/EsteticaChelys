import React from 'react';
import Botoncito from '../Components/Botoncito'; // Importa el componente Botoncito
import '../Styles/ServiceCatalog.css';  // Asegúrate de incluir el archivo CSS correctamente

const services = [
  {
    title: 'Families',
    description: 'We have you covered - from capturing your family vacation memories, family portraits, family reunion or documenting a full Zion adventure.',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSx8AJYYO7KerfAPJc2_mrMGYn455bl5iJMQw&s',
  },
  {
    title: 'Couples',
    description: 'Capture your love against the incredible red rock vistas of Zion. We are skilled at helping you feel relaxed, comfortable, and in the moment.',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0XtQq3tTOnfakuK304Cjc_BP66tbowbLk8Q&s',
  },
  {
    title: 'Surprise Proposals',
    description: 'Zion is the perfect backdrop to pop the big question—we\'ll help you coordinate your surprise with ease so you can enjoy the moment.',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYw_rkPK55TNpbgjhnqpXlQa0hmKi6xgsUfw&s',
  },
  {
    title: 'Adventure Elopement',
    description: 'We\'ll help you find the perfect backdrop for your vows and capture the moment forever — there\'s no place more beautiful to say “I do.”',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjWoG6PeWcNeSieuiSy9WmnDXyEg7FbRL6Bg&s',
  }
];

const ServiceCatalog = ({ isAdmin, openAddService }) => (
  <div className="service-container">
     {isAdmin && <Botoncito style={{ top: '10px', left: '10px' }} onClick={openAddService} />} {/* Muestra el Botoncito solo si es admin */}
    <h1>Catálogo de Servicios</h1>
    <div className="services-grid">
      {services.map(service => (
        <div key={service.title} className="service-card" style={{ backgroundImage: `url(${service.imageUrl})` }}>
          <h2>{service.title}</h2>
          <p>{service.description}</p>
        </div>
      ))}
    </div>
  </div>
);

export default ServiceCatalog;
