import React, { useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import './Navbar.css';

const Navbar = ({ openSpecialOffers }) => { // Añadimos `openSpecialOffers` como prop
  const [navbarOpen, setNavbarOpen] = useState(false);

  const links = [
    { id: 1, link: "homepage", name: "Página Principal" },
    { id: 2, link: "service-catalog-container-new", name: "Catálogo de Servicios" },
    { id: 3, link: "catalog-container", name: "Catálogo de Productos" },
    { id: 4, link: "gallery-container-gallerita", name: "Galería" },
    { id: 5, link: "beauty-tips-main-container-custom", name: "Consejos de Belleza" },
    { id: 6, link: "offers-container", name: "Promociones y Ofertas Especiales", action: openSpecialOffers } // Añadimos el `action`
  ];

  const handleLinkClick = (link) => {
    if (link.action) {
      link.action(); // Ejecuta la acción si existe (como abrir el modal de ofertas)
    }
    setNavbarOpen(false); // Cierra el menú
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <button onClick={() => setNavbarOpen(!navbarOpen)} className="navbar-toggle">
          ☰
        </button>
        <ul className={`navbar-list ${navbarOpen ? "show" : ""}`}>
          {links.map((link) => (
            <li key={link.id} className="navbar-item">
              <ScrollLink
                to={link.link}
                smooth={true}
                duration={500}
                onClick={() => handleLinkClick(link)}
                className="navbar-link"
              >
                {link.name}
              </ScrollLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
