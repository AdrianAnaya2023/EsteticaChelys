import React, { useState } from 'react';
import Botoncito from '../Components/Botoncito';
import ViewMoreButton from '../Components/ViewMoreButton';
import '../Styles/BeautyTips.css';

const BeautyTips = ({ isAdmin, openAddTip, onEditCategory, onDeleteCategory, onEditSubcategory, onDeleteSubcategory }) => {
  const [currentTip, setCurrentTip] = useState(0);
  const [currentCategory, setCurrentCategory] = useState(null);

  const categories = [
    {
      title: 'Hidratación',
      content: 'Consejos sobre hidratación para la piel.',
      imageUrl: 'https://www.clinicbarcelona.org/media/cache/960_jpeg/uploads/media/default/0010/44/34538d32bb296cc16f0c5ca01b5d7f2e16b091b5.png',
      subcategories: [
        {
          title: 'Beber Agua',
          content: 'Bebe al menos 2 litros de agua al día.',
          imageUrl: 'https://imagenes.20minutos.es/files/image_1920_1080/uploads/imagenes/2023/11/27/beber-agua-en-ayunas-es-un-estupendo-habito-saludable.jpeg',
        },
        {
          title: 'Hidratantes Faciales',
          content: 'Usa cremas hidratantes para mantener la piel suave.',
          imageUrl: 'https://theartofhealing.mx/wp-content/uploads/2021/06/DSC05920-min.jpg',
        },
        {
          title: 'Tónicos',
          content: 'Usa tónicos para equilibrar el PH de tu piel.',
          imageUrl: 'https://www.gob.mx/cms/uploads/article/main_image/67470/ph.jpg',
        },
      ],
    },
    {
      title: 'Protección Solar',
      content: 'Protege tu piel de los rayos UV.',
      imageUrl: 'https://phantom-marca.unidadeditorial.es/099faf7796be9dc84cf7f3800cc0cdd4/resize/828/f/jpg/assets/multimedia/imagenes/2023/06/06/16860332126766.jpg',
      subcategories: [
        {
          title: 'Protector Solar',
          content: 'Aplica protector solar cada 4 horas.',
          imageUrl: 'https://example.com/protector_solar.jpg',
        },
        {
          title: 'Sombreros',
          content: 'Usa sombreros para proteger tu rostro.',
          imageUrl: 'https://example.com/sombrero.jpg',
        },
        {
          title: 'Gafas de Sol',
          content: 'Utiliza gafas de sol para proteger tus ojos.',
          imageUrl: 'https://example.com/gafas_sol.jpg',
        },
      ],
    },
    // Otras categorías...
  ];

  const nextTip = () => {
    setCurrentTip((prevTip) => (prevTip + 4) % categories.length);
  };

  const prevTip = () => {
    setCurrentTip((prevTip) => (prevTip - 4 < 0 ? categories.length - 4 : prevTip - 4));
  };

  const viewCategoryDetails = (category) => {
    setCurrentCategory(category);
  };

  const goBack = () => {
    setCurrentCategory(null);
  };

  return (
    <div className="beauty-tips-main-container-custom">
      {isAdmin && <Botoncito style={{ top: '20px', left: '20px' }} onClick={openAddTip} />}
      {currentCategory ? (
        <div className="beauty-tips-subcategories-container">
          <h1>{currentCategory.title}</h1>
          <div className="beauty-tips-grid-container-custom">
            {currentCategory.subcategories.map((sub, index) => (
              <div key={index} className="beauty-tips-card-container-custom">
                <img src={sub.imageUrl} alt={sub.title} className="beauty-tips-card-img" />
                <h3>{sub.title}</h3>
                <p>{sub.content}</p>
                {isAdmin && (
                  <div className="admin-buttons-container">
                    <button onClick={() => onEditSubcategory(currentCategory, sub)}>Modificar</button>
                    <button onClick={() => onDeleteSubcategory(currentCategory, sub)}>Eliminar</button>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'right', marginTop: '20px' }}>
            <button className="BotoncitoReturn" onClick={goBack}>
              Regresar
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h1>Categorías de Consejos de Belleza</h1>
          <p>Descubre nuestros consejos y trucos de belleza para mantener tu piel radiante y saludable.</p>
          <div className="beauty-tips-grid-container-custom">
            {categories.slice(currentTip, currentTip + 4).map((tip, index) => (
              <div key={index} className="beauty-tips-card-container-custom">
                <img src={tip.imageUrl} alt={tip.title} className="beauty-tips-card-img" />
                <h3>{tip.title}</h3>
                <p>{tip.content}</p>
                <ViewMoreButton onClick={() => viewCategoryDetails(tip)} />
                {isAdmin && (
                  <div className="admin-buttons-container">
                    <button onClick={() => onEditCategory(tip)}>Modificar</button>
                    <button onClick={() => onDeleteCategory(tip)}>Eliminar</button>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="pagination-controls-tips-custom">
            <button onClick={prevTip}>Anterior</button>
            <button onClick={nextTip}>Siguiente</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BeautyTips;