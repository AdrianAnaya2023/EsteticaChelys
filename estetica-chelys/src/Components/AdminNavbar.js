import React from 'react';
import './AdminNavbar.css'; // Asegúrate de que AdminNavbar esté usando los mismos estilos

const AdminNavbar = ({ 
  openModifyHomeFooter, 
  openManageServices, 
  openManageProducts, 
  openManageGallery,  
  openManageBeautyTips, 
  openManageSurveysPreguntita, 
  openManagePromos, // Nueva opción para gestionar promociones
  logoutAdmin 
}) => {
  
  const adminLinks = [
    { id: 1, name: "Principal", action: openModifyHomeFooter },
    { id: 2, name: "Servicios", action: openManageServices },
    { id: 3, name: "Productos", action: openManageProducts },
    { id: 4, name: "Galería", action: openManageGallery },
    { id: 5, name: "Consejos de Belleza", action: openManageBeautyTips },
    { id: 6, name: "Encuestas", action: openManageSurveysPreguntita },
    { id: 7, name: "Promociones", action: openManagePromos }, // Nueva opción para gestionar promociones
  ];

  return (
    <nav className="admin-navbar">
      <div className="admin-navbar-container">
        <ul className="admin-navbar-list">
          {adminLinks.map((link) => (
            <li key={link.id} className="admin-navbar-item">
              <button onClick={link.action} className="admin-navbar-link">
                {link.name}
              </button>
            </li>
          ))}
        </ul>
        {/* Botón de salir con estilo de botón */}
        <button onClick={logoutAdmin} className="admin-exit-button">
          Salir
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
