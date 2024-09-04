import React, { useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import './Navbar.css';

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  const links = [
    { id: 1, link: "homepage", name: "Página Principal" },
    { id: 2, link: "service-container", name: "Catálogo de Servicios" },
    { id: 3, link: "products", name: "Catálogo de Productos" },
    { id: 4, link: "gallery-container", name: "Galería" },
    { id: 5, link: "beauty-tips-container", name: "Consejos de Belleza" },
    { id: 6, link: "offers-container", name: "Promociones y Ofertas Especiales" }
  ];

  const handleLinkClick = (link) => {
    setNavbarOpen(false);
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

