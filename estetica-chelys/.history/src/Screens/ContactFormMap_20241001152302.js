import React from 'react';
import '../Styles/ContactFormMap.css'; // Asegúrate de tener un archivo CSS para estilos

const ContactFormMap = () => {
  return (
    <div className="contact-container">
      {/* Mapa en el lado izquierdo */}
      <div className="map-container">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0115806025016!2d144.96305791558915!3d-37.81410797975152!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0x5045675218ce6e0!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sau!4v1636176575280!5m2!1sen!2sau"
          width="100%"
          height="100%"
          allowFullScreen=""
          loading="lazy"
          title="Google Maps Estética"
        ></iframe>
      </div>

      {/* Formulario en el lado derecho */}
      <div className="form-container">
        <h2>Contáctanos</h2>
        <form className="contact-form">
          <label htmlFor="name">Nombre:</label>
          <input type="text" id="name" name="name" required />

          <label htmlFor="phone">Teléfono:</label>
          <input type="tel" id="phone" name="phone" required />

          <label htmlFor="email">Correo Electrónico:</label>
          <input type="email" id="email" name="email" required />

          <label htmlFor="message">Mensaje:</label>
          <textarea id="message" name="message" rows="4" required></textarea>

          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default ContactFormMap;
