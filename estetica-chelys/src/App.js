import React, { useState, useEffect } from 'react';
import Navbar from './Components/Navbar';
import HomePage from './Screens/HomePage';
import ServiceCatalog from './Screens/ServiceCatalog';
import ProductCatalog from './Screens/ProductCatalog';
import Gallery from './Screens/Gallery';
import BeautyTips from './Screens/BeautyTips';
import SatisfactionSurvey from './Screens/SatisfactionSurvey';
import SpecialOffers from './Screens/SpecialOffers';
import FooterPage from './Screens/FooterPage';
import Login from './Screens/Login';
import AddService from './Screens-Admin/AddService';
import AddGalleryImage from './Screens-Admin/AddGalleryImage';
import AddBeautyTip from './Screens-Admin/AddBeautyTip';
import AddProductCategory from './Screens-Admin/AddProductCategory'; // Importa la pantalla de agregar categoría de productos
import FloatingHelpIcon from './Components/FloatingHelpIcon';
import './App.css';

function App() {
  const [isSurveyVisible, setIsSurveyVisible] = useState(false);
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAddServiceVisible, setIsAddServiceVisible] = useState(false);
  const [isAddImageVisible, setIsAddImageVisible] = useState(false);
  const [isAddTipVisible, setIsAddTipVisible] = useState(false);
  const [isAddProductCategoryVisible, setIsAddProductCategoryVisible] = useState(false); // Estado para agregar categoría de productos
  const [isSpecialOffersVisible, setIsSpecialOffersVisible] = useState(false);

  // Mostrar las ofertas especiales automáticamente cuando se carga la página
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
    } else {
      setIsAdmin(false);
    }
    closeLogin();
  };

  const closeSurvey = () => {
    setIsSurveyVisible(false);
  };

  const openAddService = () => {
    setIsAddServiceVisible(true);
  };

  const closeAddService = () => {
    setIsAddServiceVisible(false);
  };

  const openAddGallery = () => {
    setIsAddImageVisible(true);
  };

  const closeAddGallery = () => {
    setIsAddImageVisible(false);
  };

  const openAddTip = () => {
    setIsAddTipVisible(true);
  };

  const closeAddTip = () => {
    setIsAddTipVisible(false);
  };

  const openAddProductCategory = () => {
    setIsAddProductCategoryVisible(true);
  };

  const closeAddProductCategory = () => {
    setIsAddProductCategoryVisible(false);
  };

  const openSpecialOffers = () => {
    setIsSpecialOffersVisible(true);
  };

  const closeSpecialOffers = () => {
    setIsSpecialOffersVisible(false);
  };

  const handleHelpClick = () => {
    setIsSurveyVisible(true);
  };

  return (
    <div className="App">
      <Navbar toggleSurvey={toggleSurvey} openSpecialOffers={openSpecialOffers} />
      <HomePage isAdmin={isAdmin} />
      <ServiceCatalog isAdmin={isAdmin} openAddService={openAddService} />
      <ProductCatalog isAdmin={isAdmin} openAddProductCategory={openAddProductCategory} />
      <Gallery isAdmin={isAdmin} openAddGallery={openAddGallery} />
      <BeautyTips isAdmin={isAdmin} openAddTip={openAddTip} />
      
      {/* Pantallas sobrepuestas */}
      {isSpecialOffersVisible && <SpecialOffers isAdmin={isAdmin} onClose={closeSpecialOffers} />}
      {isSurveyVisible && <SatisfactionSurvey isVisible={isSurveyVisible} closeSurvey={closeSurvey} />}
      {isLoginVisible && <Login closeLogin={closeLogin} handleLogin={handleLogin} />}
      
      {/* Screens para admin */}
      {isAddServiceVisible && <AddService isVisible={isAddServiceVisible} onClose={closeAddService} />}
      {isAddImageVisible && <AddGalleryImage isVisible={isAddImageVisible} onClose={closeAddGallery} />}
      {isAddTipVisible && <AddBeautyTip isVisible={isAddTipVisible} onClose={closeAddTip} />}
      {isAddProductCategoryVisible && <AddProductCategory isVisible={isAddProductCategoryVisible} onClose={closeAddProductCategory} />}
      
      <FooterPage openLogin={openLogin} />
      <FloatingHelpIcon onClick={handleHelpClick} />
    </div>
  );
}

export default App;
