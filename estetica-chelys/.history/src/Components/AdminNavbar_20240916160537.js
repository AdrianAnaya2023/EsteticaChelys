import React, { useState } from 'react';
import './AdminNavbar.css'; // Asegúrate de que AdminNavbar esté usando los mismos estilos

const AdminNavbar = ({ 
  openModifyHomeFooter, // Cambiado para abrir el componente ModifyHomeFooter
  openManageServices, // Prop para abrir ManageServices
  openManageProducts, // Prop para abrir ManageProducts
  openManageGallery,  // Prop para abrir ManageGallery
  openManageBeautyTips, // Prop para abrir ManageBeautyTips
  openManageSurveysPreguntita, // Cambiado para abrir el componente de encuestas
  openManagePromos, // Prop para abrir ManagePromos
  logoutAdmin 
}) => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  // Links exclusivos del admin
  const adminLinks = [
    { id: 1, name: "Principal", action: openModifyHomeFooter }, // Cambiado a openModifyHomeFooter
    { id: 2, name: "Servicios", action: openManageServices }, // Acción para gestionar servicios
    { id: 3, name: "Productos", action: openManageProducts }, // Acción para gestionar productos
    { id: 4, name: "Galería", action: openManageGallery }, // Acción para gestionar la galería
    { id: 5, name: "Consejos de Belleza", action: openManageBeautyTips }, // Acción para gestionar consejos de belleza
    { id: 6, name: "Encuestas", action: openManageSurveysPreguntita }, // Acción para gestionar encuestas
    { id: 7, name: "Promociones", action: openManagePromos }, // Nueva opción para gestionar promociones
  ];

  return (
    <nav className="admin-navbar">
      <div className="admin-navbar-container">
        <button onClick={() => setNavbarOpen(!navbarOpen)} className="admin-navbar-toggle">
          ☰
        </button>
        <ul className={`admin-navbar-list ${navbarOpen ? "show" : ""}`}>
          {adminLinks.map((link) => (
            <li key={link.id} className="admin-navbar-item">
              <button onClick={link.action} className="admin-navbar-link">
                {link.name}
              </button>
            </li>
          ))}
        </ul>
        {/* Botón de salir del modo admin */}
        <button onClick={logoutAdmin} className="admin-exit-button">
          Salir
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
