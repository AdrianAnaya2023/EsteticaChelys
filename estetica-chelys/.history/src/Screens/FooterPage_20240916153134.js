import React from 'react';
import '../Styles/FooterPage.css'; // Asegúrate de que el path al archivo CSS sea correcto

const FooterPage = ({ openLogin }) => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section footer-left">
          <h3 onClick={openLogin} style={{ cursor: 'pointer' }}>Araceli Almeda Reynaga</h3>
          <p>Email: info@esteticaChelys.com</p>
        </div>
        <div className="footer-logo">
        <img src="https://i.imgur.com/mlLK88x.png" alt="Logo" style={{ width: '250px', height: '250px', objectFit: 'contain' }} />

        </div>
        <div className="footer-section footer-right">
          <p>Tel: 681 003 824</p>
          <p>Dirección: Zaragoza #25 B - 48150 Cuautla, Jalisco</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterPage;



