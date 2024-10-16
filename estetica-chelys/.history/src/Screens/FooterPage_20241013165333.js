import React, { useEffect, useState } from 'react';
import { fetchFooterById } from '../Screens-Admin/footerAPI'; // Asegúrate de importar correctamente la función de la API
import '../Styles/FooterPage.css'; // Asegúrate de que el path al archivo CSS sea correcto

const FooterPage = () => {
  const [footerData, setFooterData] = useState(null); // Estado para almacenar los datos del footer

  // Usamos useEffect para obtener los datos del footer al cargar el componente
  useEffect(() => {
    const loadFooter = async () => {
      try {
        const footer = await fetchFooterById(1); // Obtener el footer con ID 1
        setFooterData(footer); // Guardar los datos en el estado
      } catch (error) {
        console.error('Error al cargar el footer:', error.message);
      }
    };

    loadFooter();
  }, []);

  if (!footerData) {
    return <p>Cargando footer...</p>; // Mostrar un mensaje mientras se cargan los datos
  }

  return (
    <footer className="footer-container-pie">
      <div className="footer-content-pie">
        <div className="footer-section-pie footer-left-pie">
          <h3>{footerData.nombre_dueno}</h3>
          <p>Email: {footerData.email}</p>
        </div>
        <div className="footer-logo-pie">
          <img src={footerData.logo_img} alt="Logo" style={{ width: '250px', height: '250px', objectFit: 'contain' }} />
        </div>
        <div className="footer-section-pie footer-right-pie">
          <p>Tel: {footerData.telefono}</p>
          <p>Dirección: {footerData.direccion}</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterPage;
