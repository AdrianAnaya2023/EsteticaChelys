import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import Button from '../Components/Button';
import ContactFormMap from '../Screens/ContactFormMap';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../Styles/HomePage.css';
import { fetchHomepageById } from '../Screens-Admin/homepageAPI'; // Importamos la función de la API

const HomePage = () => {
  const [showMapForm, setShowMapForm] = useState(false);
  const [homeData, setHomeData] = useState({
    descripcion: '',
    fotos_local: [],
    foto_dueno: '',
  });

  useEffect(() => {
    // Llamada a la API para obtener los datos del HomePage
    const loadHomepageData = async () => {
      try {
        const data = await fetchHomepageById(1); // Suponiendo que la ID de la homepage es 1
        setHomeData(data);
      } catch (error) {
        console.error('Error al cargar los datos de la homepage:', error);
      }
    };

    loadHomepageData();
  }, []);

  const openMapForm = () => setShowMapForm(true); // Mostrar el formulario/mapa
  const closeMapForm = () => setShowMapForm(false); // Cerrar el formulario/mapa

  return (
    <div className="homepage">
      <section className="hero-section">
        <h1>Estética Chely's</h1>
        <p>Un lugar para cuidarte</p>
        <div className="buttons">
          <div className="button-wrapper">
            <Button 
              text="Pídenos CITA" 
              link="https://wa.me/523173831163?text=Hola,%20me%20gustaría%20agendar%20una%20cita%20en%20Estética%20Chely's." 
            />
          </div>
          <div className="button-wrapper">
            <Button text="Contacto y Ubicación" onClick={openMapForm} />
          </div>
        </div>
      </section>
      <section className="about-section">
        <div className="about-text">
          <h2>Araceli Almeda Reynaga</h2>
          <p>{homeData.descripcion}</p>
        </div>
        <img src={homeData.foto_dueno} alt="Araceli Almeda" />
      </section>
      <section className="facilities" style={{ background: 'url("https://cdn.pixabay.com/photo/2016/03/15/02/42/floor-1256804_1280.jpg") no-repeat center center / cover'}}>
        <h2 className="facilities-header">Ven a nuestras instalaciones</h2>
        <Carousel autoPlay infiniteLoop showThumbs={false}>
          {homeData.fotos_local.map((foto, index) => (
            <div key={index}>
              <img src={foto} alt={`Facility ${index + 1}`} />
            </div>
          ))}
        </Carousel>
        <p className="facilities-invitation">¡Te esperamos!</p>
      </section>
      
      {showMapForm && (
        <ContactFormMap onClose={closeMapForm} />
      )}
    </div>
  );
};

export default HomePage;
