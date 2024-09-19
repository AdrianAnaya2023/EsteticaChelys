import React, { useState, useEffect } from 'react';
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
// Importar los componentes de administración
import ManageServices from './Screens-Admin/ManageServices';
import ManageGallery from './Screens-Admin/ManageGallery';
import ManageBeautyTips from './Screens-Admin/ManageBeautyTips';
import ModifyHomeFooter from './Screens-Admin/ModifyHomeFooter';
import ManageSurveysPreguntita from './Screens-Admin/ManageSurveysPreguntita';
import ManageProducts from './Screens-Admin/ManageProducts';
import ManagePromosPromosAdmin from './Screens-Admin/ManagePromosPromosAdmin';
import ManageUsersAdmin from './Screens-Admin/ManageUsers'; // Importar el componente de usuarios
import FloatingHelpIcon from './Components/FloatingHelpIcon';
import './App.css';

function App() {
  const [isSurveyVisible, setIsSurveyVisible] = useState(false);
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Estados para cada pantalla de administración
  const [isModifyHomeFooterVisible, setIsModifyHomeFooterVisible] = useState(false);
  const [isManageServicesVisible, setIsManageServicesVisible] = useState(false);
  const [isManageProductsVisible, setIsManageProductsVisible] = useState(false);
  const [isManageGalleryVisible, setIsManageGalleryVisible] = useState(false);
  const [isManageBeautyTipsVisible, setIsManageBeautyTipsVisible] = useState(false);
  const [isManageSurveysPreguntitaVisible, setIsManageSurveysPreguntitaVisible] = useState(false);
  const [isManagePromosVisible, setIsManagePromosVisible] = useState(false);
  const [isManageUsersVisible, setIsManageUsersVisible] = useState(false); // Estado para gestionar usuarios

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
    setIsManageUsersVisible(true); // Abrir la pantalla de usuarios
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
    setIsManageUsersVisible(false); // Cerrar la pantalla de usuarios
  };

  const openSpecialOffers = () => {
    setIsSpecialOffersVisible(true);
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    closeAllAdminScreens();
  };

  useEffect(() => {
    setIsSpecialOffersVisible(true);
  }, []);

  const toggleSurvey = () => {
    setIsSurveyVisible(!isSurveyVisible);
  };

  const openLogin = () => {
    setIsLoginVisible(true);
  };

  const closeLogin = () => {
    setIsLoginVisible(false);
  };

  const handleLogin = (email, password) => {
    if (email === 'Admin@gmail.com' && password === 'Admin') {
      setIsAdmin(true);
      openModifyHomeFooter();
    } else {
      setIsAdmin(false);
    }
    closeLogin();
  };

  const closeSurvey = () => {
    setIsSurveyVisible(false);
  };

  const closeSpecialOffers = () => {
    setIsSpecialOffersVisible(false);
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
          {isLoginVisible && <Login closeLogin={closeLogin} handleLogin={handleLogin} />}
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
            openManageUsers={openManageUsers} // Añadir usuarios al AdminNavbar
            logoutAdmin={logoutAdmin}
          />
          {isModifyHomeFooterVisible && <ModifyHomeFooter onClose={closeAllAdminScreens} />}
          {isManageServicesVisible && <ManageServices onClose={closeAllAdminScreens} />}
          {isManageProductsVisible && <ManageProducts onClose={closeAllAdminScreens} />}
          {isManageGalleryVisible && <ManageGallery onClose={closeAllAdminScreens} />}
          {isManageBeautyTipsVisible && <ManageBeautyTips onClose={closeAllAdminScreens} />}
          {isManageSurveysPreguntitaVisible && <ManageSurveysPreguntita onClose={closeAllAdminScreens} />}
          {isManagePromosVisible && <ManagePromosPromosAdmin onClose={closeAllAdminScreens} />}
          {isManageUsersVisible && <ManageUsersAdmin onClose={closeAllAdminScreens} />} {/* Mostrar usuarios */}
        </>
      )}
      {!isAdmin && <FooterPage openLogin={openLogin} />}
      {!isAdmin && <FloatingHelpIcon onClick={handleHelpClick} />}
    </div>
  );
}

export default App;
