import React, { useState } from 'react';
import Botoncito from '../Components/Botoncito';  // Importa el componente Botoncito
import '../Styles/BeautyTips.css';  // Asegúrate de que el path al archivo CSS sea correcto

const BeautyTips = ({ isAdmin, openAddTip }) => {
  const [currentTip, setCurrentTip] = useState(0);

  const tips = [
    { title: 'Hidratación', content: 'Mantén tu piel hidratada bebiendo suficiente agua durante el día.', imageUrl: 'https://www.clinicbarcelona.org/media/cache/960_jpeg/uploads/media/default/0010/44/34538d32bb296cc16f0c5ca01b5d7f2e16b091b5.png' },
    { title: 'Protección Solar', content: 'Usa siempre protector solar, incluso en días nublados, para proteger tu piel de los rayos UV.', imageUrl: 'https://phantom-marca.unidadeditorial.es/099faf7796be9dc84cf7f3800cc0cdd4/resize/828/f/jpg/assets/multimedia/imagenes/2023/06/06/16860332126766.jpg' },
    { title: 'Rutina Nocturna', content: 'Desarrolla una rutina de cuidado de la piel antes de dormir para mejorar la regeneración de la piel.', imageUrl: 'https://fisiogel.co/wp-content/uploads/2023/09/rutina-cuidado-del-rostro-noche.png' },
    { title: 'Alimentación Saludable', content: 'Incluye frutas y verduras en tu dieta para nutrir tu piel desde dentro.', imageUrl: 'https://drperezgalaz.com/inicio/wp-content/uploads/2021/03/CARACTERISTICAS-DE-UNA-ALIMENTACION-SALUDABLE-1200x800.jpeg' },
    { title: 'Ejercicio Regular', content: 'El ejercicio regular puede mejorar tu circulación y la apariencia de tu piel.', imageUrl: 'https://anep.org.pa/wp-content/uploads/2021/11/unnamed.jpg' }
  ];

  const nextTip = () => {
    setCurrentTip((prevTip) => (prevTip + 3) % tips.length);
  };

  const prevTip = () => {
    setCurrentTip((prevTip) => (prevTip - 3 < 0 ? tips.length - 3 : prevTip - 3));
  };

  return (
    <div className="beauty-tips-container">
      {isAdmin && <Botoncito style={{ top: '20px', left: '20px' }} onClick={openAddTip} />} {/* Posición específica para esta sección */}
      <h1>Consejos de Belleza</h1>
      <p>Descubre nuestros consejos y trucos de belleza para mantener tu piel radiante y saludable.</p>
      <div className="tips-display">
        {tips.slice(currentTip, currentTip + 3).map((tip) => (
          <div key={tip.title} className="tip-card">
            <img src={tip.imageUrl} alt={tip.title} className="tip-image"/>
            <h2>{tip.title}</h2>
            <p>{tip.content}</p>
          </div>
        ))}
      </div>
      <div className="navigation">
        <button onClick={prevTip}>&lt;</button>
        <button onClick={nextTip}>&gt;</button>
      </div>
    </div>
  );
};

export default BeautyTips;
