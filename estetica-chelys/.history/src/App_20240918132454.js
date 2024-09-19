import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
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
import ManageUsersAdmin from './Screens-Admin/ManageUsers';
import FloatingHelpIcon from './Components/FloatingHelpIcon';
import './App.css';

function App() {
  const [isSurveyVisible, setIsSurveyVisible] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

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

  const handleLogin = (email, password) => {
    if (email === 'Admin@gmail.com' && password === 'Admin') {
      setIsAdmin(true);
      openModifyHomeFooter();
    } else {
      setIsAdmin(false);
    }
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
    <Router>
      <div className="App">
        {!isAdmin && (
          <>
            <Navbar toggleSurvey={toggleSurvey} openSpecialOffers={openSpecialOffers} />
          </>
        )}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServiceCatalog />} />
          <Route path="/products" element={<ProductCatalog />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/beauty-tips" element={<BeautyTips />} />
          <Route path="/special-offers" element={isSpecialOffersVisible && <SpecialOffers onClose={closeSpecialOffers} />} />
          <Route path="/satisfaction-survey" element={isSurveyVisible && <SatisfactionSurvey closeSurvey={closeSurvey} />} />

          {/* Ruta para abrir el login */}
          <Route path="/admin" element={<Login handleLogin={handleLogin} />} />

          {/* Rutas protegidas para administración */}
          {isAdmin && (
            <>
              <Route path="/admin/services" element={<ManageServices onClose={closeAllAdminScreens} />} />
              <Route path="/admin/products" element={<ManageProducts onClose={closeAllAdminScreens} />} />
              <Route path="/admin/gallery" element={<ManageGallery onClose={closeAllAdminScreens} />} />
              <Route path="/admin/beauty-tips" element={<ManageBeautyTips onClose={closeAllAdminScreens} />} />
              <Route path="/admin/surveys" element={<ManageSurveysPreguntita onClose={closeAllAdminScreens} />} />
              <Route path="/admin/promos" element={<ManagePromosPromosAdmin onClose={closeAllAdminScreens} />} />
              <Route path="/admin/users" element={<ManageUsersAdmin onClose={closeAllAdminScreens} />} />
              <Route path="/admin/modify-home-footer" element={<ModifyHomeFooter onClose={closeAllAdminScreens} />} />
            </>
          )}
        </Routes>

        {!isAdmin && <FooterPage />}
        {!isAdmin && <FloatingHelpIcon onClick={handleHelpClick} />}
      </div>
    </Router>
  );
}

export default App;
