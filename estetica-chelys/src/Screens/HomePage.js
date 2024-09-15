import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import Button from '../Components/Button';
import Botoncito from '../Components/Botoncito'; // Asegúrate de que el componente Botoncito esté importado correctamente
import Modal from '../Components/Modal'; // Asegúrate de tener este componente o crea uno
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../Styles/HomePage.css';

const HomePage = ({ isAdmin }) => {
  const [showMap, setShowMap] = useState(false);

  const openMap = () => setShowMap(true);
  const closeMap = () => setShowMap(false);

  return (
    <div className="homepage">
      {isAdmin && <Botoncito style={{ top: '85px', left: '10px' }} />}
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
            <Button text="Descubre donde estamos" onClick={openMap} />
          </div>
        </div>
      </section>
      <section className="about-section">
        <div className="about-text">
          <h2>Araceli Almeda Reynaga</h2>
          <p>Araceli Almeda es el alma detrás de Estética Chely's en Cuautla, Jalisco. Reconocida por su dedicación incansable, Araceli es una mujer trabajadora que día a día da su máximo esfuerzo para satisfacer y superar las expectativas de sus clientes. En su estética, cada detalle y cada servicio reflejan su compromiso por ofrecer no solo calidad, sino también una experiencia personalizada y cercana.</p>
        </div>
        <img src="https://www.clarin.com/img/2023/12/28/k8gOUmfp5_600x600__1.jpg" alt="Cristina Herráiz" />
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
      {showMap && (
        <Modal onClose={closeMap}>
          <iframe
            title="Ubicación de Estetica Chely's en Google Maps"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3744.362815727476!2d-104.40703762437444!3d20.20223901565205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x842436ca3b0087d7%3A0xafb5ae9ab8ef46a3!2sGral%20Ignacio%20Zaragoza%2025%2C%20Centro%2C%2048150%20Cuautla%2C%20Jal.!5e0!3m2!1sen!2smx!4v1725230523385!5m2!1sen!2smx"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </Modal>
      )}
    </div>
  );
};

export default HomePage;
