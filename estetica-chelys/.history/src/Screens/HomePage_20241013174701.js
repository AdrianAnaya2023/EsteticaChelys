import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import Button from '../Components/Button';
import ContactFormMap from '../Screens/ContactFormMap';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../Styles/HomePage.css';

const HomePage = () => {
  const [showMapForm, setShowMapForm] = useState(false);

  const openMapForm = () => setShowMapForm(true); // Mostrar el formulario/mapa
  const closeMapForm = () => setShowMapForm(false); // Cerrar el formulario/mapa

  return (
    <div className="homepage">
      <section className="hero-section">
        <h1>Estetica Chely's</h1>
        <p>Un lugar para cuidarte</p>
        <div className="buttons">
          <div className="button-wrapper">
            <Button 
              text="Pídenos CITA" 
              link="https://wa.me/523173831163?text=Hola,%20me%20gustaría%20agendar%20una%20cita%20en%20Estética%20Chely's." 
            />
          </div>
          <div className="button-wrapper">
            {/* Este botón abrirá la pantalla ContactFormMap */}
            <Button text="Contacto y Ubicacion" onClick={openMapForm} />
          </div>
        </div>
      </section>
      <section className="about-section">
        <div className="about-text">
          <h2>Araceli Almeda Reynaga</h2>
          <p>Araceli Almeda es el alma detrás de Estética Chely's en Cuautla, Jalisco. Reconocida por su dedicación incansable, Araceli es una mujer trabajadora que día a día da su máximo esfuerzo para satisfacer y superar las expectativas de sus clientes. En su estética, cada detalle y cada servicio reflejan su compromiso por ofrecer no solo calidad, sino también una experiencia personalizada y cercana.</p>
        </div>
        <img src="https://www.clarin.com/img/2023/12/28/k8gOUmfp5_600x600__1.jpg" alt="Araceli Almeda" />
      </section>
      <section className="facilities" style={{ background: 'url("https://cdn.pixabay.com/photo/2016/03/15/02/42/floor-1256804_1280.jpg") no-repeat center center / cover'}}>
        <h2 className="facilities-header">Ven a nuestras instalaciones</h2>
        <Carousel autoPlay infiniteLoop showThumbs={false}>
          <div>
            <img src="https://www.versum.com/m/es/wp-content/uploads/sites/6/2020/08/without-receptionist.jpg" alt="Facility 1" />
          </div>
          <div>
            <img src="https://assets.easybroker.com/property_images/3750037/61400551/EB-NK0037.jpeg?version=1684357866" alt="Facility 2" />
          </div>
          <div>
            <img src="https://http2.mlstatic.com/D_NQ_NP_980169-MLM51313441422_082022-O.webp" alt="Facility 3" />
          </div>
        </Carousel>
        <p className="facilities-invitation">¡Te esperamos!</p>
      </section>
      
      {/* Renderizamos ContactFormMap si se ha hecho clic en el botón */}
      {showMapForm && (
        <ContactFormMap onClose={closeMapForm} />
      )}
    </div>
  );
};

export default HomePage;
