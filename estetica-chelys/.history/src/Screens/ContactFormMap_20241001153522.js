import React, { useEffect, useRef } from 'react';
import '../Styles/ContactFormMap.css'; // Asegúrate de tener este archivo de estilos

const ContactFormMap = ({ onClose }) => {
  const formRef = useRef(null);

  // Este efecto hará que se desplace al formulario automáticamente al abrirse
  useEffect(() => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div ref={formRef} className="contact-form-map-container">
      <div className="contact-form-map-content">
        <div className="left-side">
          <iframe
            title="Ubicación de Estetica Chely's en Google Maps"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3744.362815727476!2d-104.40703762437444!3d20.20223901565205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x842436ca3b0087d7%3A0xafb5ae9ab8ef46a3!2sGral%20Ignacio%20Zaragoza%2025%2C%20Centro%2C%2048150%20Cuautla%2C%20Jal.!5e0!3m2!1sen!2smx!4v1725230523385!5m2!1sen!2smx"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="right-side">
          <h2>Contáctanos</h2>
          <form>
            <div className="form-group">
              <label htmlFor="name">Nombre</label>
              <input type="text" id="name" name="name" />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Teléfono</label>
              <input type="text" id="phone" name="phone" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Correo Electrónico</label>
              <input type="email" id="email" name="email" />
            </div>
            <div className="form-group">
              <label htmlFor="message">Mensaje</label>
              <textarea id="message" name="message"></textarea>
            </div>
            <button type="submit">Enviar</button>
          </form>
          {/* Botón para cerrar el formulario/mapa */}
          <button className="close-button" onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  );
};

export default ContactFormMap;
