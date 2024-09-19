import React, { useState } from 'react';
import '../Styles/SpecialOffers.css'; // Asegúrate de que el path al archivo CSS sea correcto

const SpecialOffers = ({ isAdmin, onClose }) => {
  const offers = [
    { 
      id: 1, 
      title: '20% Off Your First Visit!', 
      description: 'Enjoy a 20% discount on your first visit to our facility.', 
      imageUrl: 'https://www.versum.com/m/mx/wp-content/uploads/sites/12/2018/05/las-primeras-impresiones-cuentan-guia-de-servicio-al-cliente-1.png',
      endDate: '2024-12-31'  // Fecha de finalización de la oferta
    },
    { 
      id: 2, 
      title: 'Family Package Deal', 
      description: 'Special pricing on family packages available now.', 
      imageUrl: 'https://www.infobae.com/new-resizer/VyuT-5LsEzRUGNFtphwAUoOPuBc=/1200x900/filters:format(webp):quality(85)/cloudfront-us-east-1.images.arcpublishing.com/infobae/ZMDZHG6QQRH2PPG4BEWKWWVES4.jpg',
      endDate: '2025-01-15'  // Fecha de finalización de la oferta
    },
    { 
      id: 3, 
      title: 'Couples Retreat', 
      description: 'Book a couples retreat and receive a complimentary wine bottle.', 
      imageUrl: 'https://www.blogdelfotografo.com/wp-content/uploads/2014/09/Libro-Retrato.jpg',
      endDate: '2024-11-30'  // Fecha de finalización de la oferta
    }
  ];

  const [currentOfferIndex, setCurrentOfferIndex] = useState(0); // Estado para controlar la oferta actual

  const handleNextOffer = () => {
    // Cambiar a la siguiente oferta
    setCurrentOfferIndex((prevIndex) => (prevIndex + 1) % offers.length); // Regresa al inicio si llega al final
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button> {/* Botón para cerrar el modal */}
        
        {/* Mostrar solo la oferta actual */}
        <div key={offers[currentOfferIndex].id} className="offer-card">
          <img src={offers[currentOfferIndex].imageUrl} alt={offers[currentOfferIndex].title} />
          <div className="offer-info">
            <h3>{offers[currentOfferIndex].title}</h3>
            <p>{offers[currentOfferIndex].description}</p>
            <p className="offer-end-date">Finaliza el: {offers[currentOfferIndex].endDate}</p> {/* Mostrar la fecha de finalización */}
          </div>
        </div>

        {/* Botón "Siguiente" para cambiar entre ofertas */}
        <button className="next-offer-button" onClick={handleNextOffer}>Siguiente</button>
      </div>
    </div>
  );
};

export default SpecialOffers;
