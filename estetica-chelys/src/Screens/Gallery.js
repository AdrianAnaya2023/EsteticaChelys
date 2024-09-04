import React, { useState, useEffect } from 'react';
import Botoncito from '../Components/Botoncito'; // Importa el componente Botoncito
import '../Styles/Gallery.css';  // Asegúrate de que el path al archivo CSS sea correcto

const Gallery = ({ isAdmin, openAddGallery }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    { before: 'https://phantom-expansion.unidadeditorial.es/deba371eb3facfc692e04140372c6e0d/crop/26x0/960x1136/resize/828/f/webp/assets/multimedia/imagenes/2023/09/15/16947630246686.png', after: 'https://static.wixstatic.com/media/4304a4_01f151ec476645069164e11e169701f2~mv2.png/v1/fill/w_900,h_600,al_c,q_90,enc_auto/4304a4_01f151ec476645069164e11e169701f2~mv2.png' },
    { before: 'https://via.placeholder.com/500x300.png?text=Antes2', after: 'https://via.placeholder.com/500x300.png?text=Después2' },
    { before: 'https://via.placeholder.com/500x300.png?text=Antes3', after: 'https://via.placeholder.com/500x300.png?text=Después3' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % images.length);
    }, 3000);  // Cambia la imagen cada 3 segundos
    return () => clearInterval(timer);
  }, [currentIndex, images.length]);

  return (
    <div className="gallery-container">
      <h1>Galería</h1>
      <p>Explora nuestras imágenes y trabajos realizados.</p>
      <div className="images-container">
        <img src={images[currentIndex].before} alt="Antes" className="image"/>
        <img src={images[currentIndex].after} alt="Después" className="image"/>
      </div>
      {isAdmin && <Botoncito style={{ top: '10px', left: '10px' }} onClick={openAddGallery} />} {/* Posición específica para esta sección */}
    </div>
  );
};

export default Gallery;

