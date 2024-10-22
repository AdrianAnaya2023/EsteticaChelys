import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import Navbar from './Components/Navbar';
import AdminNavbar from './Components/AdminNavbar';
import HomePage from './Screens/HomePage';
import ServiceCatalog from './Screens/ServiceCatalog';
import ProductCatalog from './Screens/ProductCatalog';
import Gallery from './Screens/Gallery';
import BeautyTips from './Screens/BeautyTips';
import SatisfactionSurvey from './Screens/SatisfactionSurvey';
import SpecialOffers from './Screens/SpecialOffers';
import FooterPage from './Screens/FooterPage';
import Login from './Screens/Login';
import FloatingHelpIcon from './Components/FloatingHelpIcon';

// Importar los componentes de administración
import ManageServices from './Screens-Admin/ManageServices';
import ManageGallery from './Screens-Admin/ManageGallery';
import ManageBeautyTips from './Screens-Admin/ManageBeautyTips';
import ModifyHomeFooter from './Screens-Admin/ModifyHomeFooter';
import ManageSurveysPreguntita from './Screens-Admin/ManageSurveysPreguntita';
import ManageProducts from './Screens-Admin/ManageProducts';
import ManagePromosPromosAdmin from './Screens-Admin/ManagePromosPromosAdmin';
import ManageUsersAdmin from './Screens-Admin/ManageUsers'; // Componente para administrar usuarios

import './App.css';

function App() {
  const [isSurveyVisible, setIsSurveyVisible] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [token, setToken] = useState(null);

  // Al cargar el componente, verificamos si hay un token en localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      try {
        const decodedToken = jwtDecode(storedToken);
        if (decodedToken.exp * 1000 > Date.now()) {
          setIsAdmin(true);
          setToken(storedToken);
        } else {
          localStorage.removeItem('token'); // Eliminar token si está expirado
        }
      } catch (error) {
        console.error('Token inválido:', error);
        localStorage.removeItem('token'); // Eliminar token inválido
      }
    }

    if (window.location.pathname === '/Admin') {
      setIsLoginVisible(true);
    } else {
      setIsLoginVisible(false);
    }
  }, []);

  // Función para manejar el login y guardar el token
  const handleLogin = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      if (decodedToken && decodedToken.exp * 1000 > Date.now()) {
        setIsAdmin(true);
        setToken(token);
        localStorage.setItem('token', token); // Guardar token en localStorage
        setIsLoginVisible(false); // Cerrar login si es correcto
      }
    } catch (error) {
      console.error('Error al manejar el login:', error);
    }
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    setToken(null);
    localStorage.removeItem('token'); // Eliminar token al cerrar sesión
    closeAllAdminScreens();
  };

  // Estados para cada pantalla de administración
  const [isModifyHomeFooterVisible, setIsModifyHomeFooterVisible] = useState(false);
  const [isManageServicesVisible, setIsManageServicesVisible] = useState(false);
  const [isManageProductsVisible, setIsManageProductsVisible] = useState(false);
  const [isManageGalleryVisible, setIsManageGalleryVisible] = useState(false);
  const [isManageBeautyTipsVisible, setIsManageBeautyTipsVisible] = useState(false);
  const [isManageSurveysPreguntitaVisible, setIsManageSurveysPreguntitaVisible] = useState(false);
  const [isManagePromosVisible, setIsManagePromosVisible] = useState(false);
  const [isManageUsersVisible, setIsManageUsersVisible] = useState(false);

  const [isSpecialOffersVisible, setIsSpecialOffersVisible] = useState(false);

  // Funciones para abrir y cerrar cada pantalla de administración
  const openModifyHomeFooter = () => {
    closeAllAdminScreens();
    setIsModifyHomeFooterVisible(true);
  };

  const openManageServices = () => {
    closeAllAdminScreens();
    setIsManageServicesVisible(true);
  };

  const openManageProducts = () => {
    closeAllAdminScreens();
    setIsManageProductsVisible(true);
  };

  const openManageGallery = () => {
    closeAllAdminScreens();
    setIsManageGalleryVisible(true);
  };

  const openManageBeautyTips = () => {
    closeAllAdminScreens();
    setIsManageBeautyTipsVisible(true);
  };

  const openManageSurveysPreguntita = () => {
    closeAllAdminScreens();
    setIsManageSurveysPreguntitaVisible(true);
  };

  const openManagePromos = () => {
    closeAllAdminScreens();
    setIsManagePromosVisible(true);
  };

  const openManageUsers = () => {
    closeAllAdminScreens();
    setIsManageUsersVisible(true);
  };

  // Cerrar todas las pantallas de administración
  const closeAllAdminScreens = () => {
    setIsModifyHomeFooterVisible(false);
    setIsManageServicesVisible(false);
    setIsManageProductsVisible(false);
    setIsManageGalleryVisible(false);
    setIsManageBeautyTipsVisible(false);
    setIsManageSurveysPreguntitaVisible(false);
    setIsManagePromosVisible(false);
    setIsManageUsersVisible(false);
  };

  const openSpecialOffers = () => {
    setIsSpecialOffersVisible(true);
  };

  const closeSpecialOffers = () => {
    setIsSpecialOffersVisible(false);
  };

  useEffect(() => {
    setIsSpecialOffersVisible(true);
  }, []);

  const toggleSurvey = () => {
    setIsSurveyVisible(!isSurveyVisible);
  };

  const closeSurvey = () => {
    setIsSurveyVisible(false);
  };

  const handleHelpClick = () => {
    setIsSurveyVisible(true);
  };

  return (
    <div className="App">
      {!isAdmin ? (
        <>
          <Navbar toggleSurvey={toggleSurvey} openSpecialOffers={openSpecialOffers} />
          <HomePage />
          <ServiceCatalog />
          <ProductCatalog />
          <Gallery />
          <BeautyTips />
          {isSpecialOffersVisible && <SpecialOffers onClose={closeSpecialOffers} />}
          {isSurveyVisible && <SatisfactionSurvey isVisible={isSurveyVisible} closeSurvey={closeSurvey} />}
          {isLoginVisible && <Login closeLogin={() => setIsLoginVisible(false)} handleLogin={handleLogin} />}
        </>
      ) : (
        <>
          <AdminNavbar
            openModifyHomeFooter={openModifyHomeFooter}
            openManageServices={openManageServices}
            openManageProducts={openManageProducts}
            openManageGallery={openManageGallery}
            openManageBeautyTips={openManageBeautyTips}
            openManageSurveysPreguntita={openManageSurveysPreguntita}
            openManagePromos={openManagePromos}
            openManageUsers={openManageUsers}
            logoutAdmin={logoutAdmin}
          />
          {isModifyHomeFooterVisible && <ModifyHomeFooter onClose={closeAllAdminScreens} />}
          {isManageServicesVisible && <ManageServices onClose={closeAllAdminScreens} />}
          {isManageProductsVisible && <ManageProducts onClose={closeAllAdminScreens} />}
          {isManageGalleryVisible && <ManageGallery onClose={closeAllAdminScreens} />}
          {isManageBeautyTipsVisible && <ManageBeautyTips onClose={closeAllAdminScreens} />}
          {isManageSurveysPreguntitaVisible && <ManageSurveysPreguntita onClose={closeAllAdminScreens} />}
          {isManagePromosVisible && <ManagePromosPromosAdmin onClose={closeAllAdminScreens} />}
          {isManageUsersVisible && <ManageUsersAdmin onClose={closeAllAdminScreens} />}
        </>
      )}
      {!isAdmin && <FooterPage />}
      {!isAdmin && <FloatingHelpIcon onClick={handleHelpClick} />}
    </div>
  );
}

export default App;
