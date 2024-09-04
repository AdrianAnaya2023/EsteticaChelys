import React, { useState } from 'react';
import Botoncito from '../Components/Botoncito'; // Importa el componente Botoncito
import '../Styles/SpecialOffers.css';  // Importa el CSS específico para este componente

const SpecialOffers = ({ isAdmin }) => {
  const offers = [
    { id: 1, title: '20% Off Your First Visit!', description: 'Enjoy a 20% discount on your first visit to our facility.', imageUrl: 'https://www.versum.com/m/mx/wp-content/uploads/sites/12/2018/05/las-primeras-impresiones-cuentan-guia-de-servicio-al-cliente-1.png' },
    { id: 2, title: 'Family Package Deal', description: 'Special pricing on family packages available now.', imageUrl: 'https://www.infobae.com/new-resizer/VyuT-5LsEzRUGNFtphwAUoOPuBc=/1200x900/filters:format(webp):quality(85)/cloudfront-us-east-1.images.arcpublishing.com/infobae/ZMDZHG6QQRH2PPG4BEWKWWVES4.jpg' },
    { id: 3, title: 'Couples Retreat', description: 'Book a couples retreat and receive a complimentary wine bottle.', imageUrl: 'https://www.blogdelfotografo.com/wp-content/uploads/2014/09/Libro-Retrato.jpg' }
  ];

  return (
    <div className="offers-container">
      {isAdmin && <Botoncito style={{ top: '20px', left: '20px' }} />} {/* Posición específica para esta sección */}
      <h1>Promociones y Ofertas Especiales</h1>
      <p>Descubre nuestras promociones y ofertas especiales.</p>
      <div className="offers-grid">
        {offers.map(offer => (
          <div key={offer.id} className="offer-card">
            <img src={offer.imageUrl} alt={offer.title} />
            <div className="offer-info">
              <h3>{offer.title}</h3>
              <p>{offer.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecialOffers;
