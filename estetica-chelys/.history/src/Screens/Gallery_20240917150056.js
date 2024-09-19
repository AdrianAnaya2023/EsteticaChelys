import React, { useState, useRef } from 'react';
import ViewMoreButton from '../Components/ViewMoreButton';
import '../Styles/Gallery.css';  // Asegúrate de que el path al archivo CSS sea correcto

const Gallery = () => {
  const sampleCategories = [
    { id: 1, name: 'Antes y Después', imageUrl: 'https://via.placeholder.com/500x300.png?text=Antes+y+Después' },
    { id: 2, name: 'Eventos Especiales', imageUrl: 'https://via.placeholder.com/500x300.png?text=Eventos+Especiales' },
    { id: 3, name: 'Otros Trabajos', imageUrl: 'https://via.placeholder.com/500x300.png?text=Otros+Trabajos' }
  ];

  const sampleImages = {
    1: [
      { before: 'https://phantom-expansion.unidadeditorial.es/deba371eb3facfc692e04140372c6e0d/crop/26x0/960x1136/resize/828/f/webp/assets/multimedia/imagenes/2023/09/15/16947630246686.png', after: 'https://static.wixstatic.com/media/4304a4_01f151ec476645069164e11e169701f2~mv2.png/v1/fill/w_900,h_600,al_c,q_90,enc_auto/4304a4_01f151ec476645069164e11e169701f2~mv2.png' },
      { before: 'https://via.placeholder.com/500x300.png?text=Antes2', after: 'https://via.placeholder.com/500x300.png?text=Después2' },
      { before: 'https://via.placeholder.com/500x300.png?text=Antes3', after: 'https://via.placeholder.com/500x300.png?text=Después3' }
    ],
    2: [
      { before: 'https://via.placeholder.com/500x300.png?text=Evento1', after: 'https://via.placeholder.com/500x300.png?text=Evento+Después' },
      { before: 'https://via.placeholder.com/500x300.png?text=Evento2', after: 'https://via.placeholder.com/500x300.png?text=Evento+Después2' }
    ],
    3: [
      { before: 'https://via.placeholder.com/500x300.png?text=Trabajo1', after: 'https://via.placeholder.com/500x300.png?text=Trabajo+Después1' },
      { before: 'https://via.placeholder.com/500x300.png?text=Trabajo2', after: 'https://via.placeholder.com/500x300.png?text=Trabajo+Después2' }
    ]
  };

  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const gallerySectionRef = useRef(null);

  const viewCategoryDetails = (category) => {
    setCurrentCategory(category);
    gallerySectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const goBack = () => {
    setCurrentCategory(null);
    gallerySectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="gallery-container" ref={gallerySectionRef}>
      {currentCategory ? (
        <div>
          <h1>{currentCategory.name}</h1>
          <div className="images-container">
            {sampleImages[currentCategory.id].map((image, index) => (
              <div key={index} className="gallery-card">
                <img src={image.before} alt="Antes" className="image"/>
                <img src={image.after} alt="Después" className="image"/>
              </div>
            ))}
          </div>
          <button className="gallery-back-button" onClick={goBack}>Regresar</button>
        </div>
      ) : (
        <div>
          <h1>Categorías de Galería</h1>
          <div className="gallery-grid">
            {sampleCategories.map(category => (
              <div key={category.id} className="gallery-card">
                <img src={category.imageUrl} alt={category.name} />
                <h2>{category.name}</h2>
                <ViewMoreButton onClick={() => viewCategoryDetails(category)} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
