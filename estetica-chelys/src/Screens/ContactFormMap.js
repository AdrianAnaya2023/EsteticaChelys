import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import '../Styles/ContactFormMap.css';

const ContactFormMap = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [isSent, setIsSent] = useState(false); // Estado para mostrar el mensaje de agradecimiento

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación del número de teléfono
    const phoneRegex = /^[0-9]{10}$/; // Acepta solo números con 10 dígitos
    if (!phoneRegex.test(formData.phone)) {
      setError('El número de teléfono debe contener exactamente 10 dígitos y solo números.');
      return;
    }

    // Validación de los otros campos
    if (!formData.name || !formData.phone || !formData.email || !formData.message) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    setError('');
    setSending(true);

    // Enviar el formulario a través de EmailJS
    emailjs
      .send('service_luzwngc', 'template_6n9q36c', formData, 'tgJ1kAVVGO3sgFHDX')
      .then(
        (response) => {
          console.log('Correo enviado:', response.status, response.text);
          setIsSent(true); // Mostrar agradecimiento
          setFormData({
            name: '',
            phone: '',
            email: '',
            message: '',
          });
          setSending(false);

          // Cerrar el formulario después de 4 segundos
          setTimeout(() => {
            onClose();
          }, 4000);
        },
        (error) => {
          console.error('Error al enviar el correo:', error);
          setError('Hubo un problema al enviar tu mensaje. Intenta nuevamente más tarde.');
          setSending(false);
        }
      );
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="map-section">
          <iframe
            title="Ubicación de Estetica Chely's en Google Maps"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3744.362815727476!2d-104.40703762437444!3d20.20223901565205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x842436ca3b0087d7%3A0xafb5ae9ab8ef46a3!2sGral%20Ignacio%20Zaragoza%2025%2C%20Centro%2C%2048150%20Cuautla%2C%20Jal.!5e0!3m2!1sen!2smx!4v1725230523385!5m2!1sen!2smx"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="form-section">
          <button className="close-button" onClick={onClose}>X</button>
          <h1 className="form-title">Contáctanos</h1>
          {error && <p className="error-message">{error}</p>}
          
          {/* Mostrar el agradecimiento bonito cuando el formulario sea enviado */}
          {isSent ? (
            <div className="thank-you-minute">
              <h2>¡Gracias por contactarnos!</h2>
              <p>Hemos recibido tu mensaje y nos pondremos en contacto contigo lo antes posible.</p>
              <p>¡Esperamos verte pronto!</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Nombre</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Teléfono</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Correo Electrónico</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Mensaje</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="submit-button" disabled={sending}>
                {sending ? 'Enviando...' : 'Enviar'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactFormMap;
