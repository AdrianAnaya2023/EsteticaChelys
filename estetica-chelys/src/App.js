import React, { useState } from 'react';
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
import FloatingHelpIcon from './Components/FloatingHelpIcon'; // Importa el componente FloatingHelpIcon
import './App.css';

function App() {
  const [isSurveyVisible, setIsSurveyVisible] = useState(false);
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAddServiceVisible, setIsAddServiceVisible] = useState(false);
  const [isAddImageVisible, setIsAddImageVisible] = useState(false);
  const [isAddTipVisible, setIsAddTipVisible] = useState(false);

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

  const handleHelpClick = () => {
    // Abre el SatisfactionSurvey cuando se hace clic en el FloatingHelpIcon
    setIsSurveyVisible(true);
  };

  return (
    <div className="App">
      <Navbar toggleSurvey={toggleSurvey} />
      <HomePage isAdmin={isAdmin} />
      <ServiceCatalog isAdmin={isAdmin} openAddService={openAddService} />
      <ProductCatalog isAdmin={isAdmin} />
      <Gallery isAdmin={isAdmin} openAddGallery={openAddGallery} />
      <BeautyTips isAdmin={isAdmin} openAddTip={openAddTip} />
      <SpecialOffers isAdmin={isAdmin} />
      {isSurveyVisible && <SatisfactionSurvey isVisible={isSurveyVisible} closeSurvey={closeSurvey} />}
      <FooterPage openLogin={openLogin} />
      {isLoginVisible && <Login closeLogin={closeLogin} handleLogin={handleLogin} />}
      {isAddServiceVisible && <AddService isVisible={isAddServiceVisible} onClose={closeAddService} />}
      {isAddImageVisible && <AddGalleryImage isVisible={isAddImageVisible} onClose={closeAddGallery} />}
      {isAddTipVisible && <AddBeautyTip isVisible={isAddTipVisible} onClose={closeAddTip} />}
      <FloatingHelpIcon onClick={handleHelpClick} />
    </div>
  );
}

export default App;
