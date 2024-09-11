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
import ModifyHome from './Screens-Admin/ModifyHome'; // Importa la pantalla de modificar home
import ManageQuestions from './Screens-Admin/ManageQuestions'; // Importa la pantalla de administrar preguntas
import FloatingHelpIcon from './Components/FloatingHelpIcon';
import './App.css';

function App() {
  const [isSurveyVisible, setIsSurveyVisible] = useState(false);
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // Estado para verificar si es administrador
  const [isAddServiceVisible, setIsAddServiceVisible] = useState(false);
  const [isAddImageVisible, setIsAddImageVisible] = useState(false);
  const [isAddTipVisible, setIsAddTipVisible] = useState(false);
  const [isAddProductCategoryVisible, setIsAddProductCategoryVisible] = useState(false); // Estado para agregar categoría de productos
  const [isModifyHomeVisible, setIsModifyHomeVisible] = useState(false); // Estado para modificar home
  const [isManageQuestionsVisible, setIsManageQuestionsVisible] = useState(false); // Estado para administrar preguntas
  const [isSpecialOffersVisible, setIsSpecialOffersVisible] = useState(false);

  // Mostrar las ofertas especiales automáticamente cuando se carga la página
  useEffect(() => {
    setIsSpecialOffersVisible(true);
  }, []);

  // Función para alternar visibilidad de la encuesta de satisfacción
  const toggleSurvey = () => {
    setIsSurveyVisible(!isSurveyVisible);
  };

  // Funciones para abrir y cerrar la ventana de Login
  const openLogin = () => {
    setIsLoginVisible(true);
  };

  const closeLogin = () => {
    setIsLoginVisible(false);
  };

  // Función para manejar el login
  const handleLogin = (email, password) => {
    if (email === 'Admin@gmail.com' && password === 'Admin') {
      console.log('Admin login successful');
      setIsAdmin(true); // Si el login es exitoso, establecer isAdmin en true
    } else {
      console.log('Admin login failed');
      setIsAdmin(false); // Si el login falla, establecer isAdmin en false
    }
    closeLogin();
  };

  // Función para cerrar la encuesta de satisfacción
  const closeSurvey = () => {
    setIsSurveyVisible(false);
  };

  // Funciones para manejar la visibilidad de las pantallas de administración
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

  const openModifyHome = () => {
    setIsModifyHomeVisible(true);
  };

  const closeModifyHome = () => {
    setIsModifyHomeVisible(false);
  };

  const openManageQuestions = () => {
    setIsManageQuestionsVisible(true);
  };

  const closeManageQuestions = () => {
    setIsManageQuestionsVisible(false);
  };

  // Funciones para manejar ofertas especiales
  const openSpecialOffers = () => {
    setIsSpecialOffersVisible(true);
  };

  const closeSpecialOffers = () => {
    setIsSpecialOffersVisible(false);
  };

  // Función para manejar la ayuda flotante
  const handleHelpClick = () => {
    setIsSurveyVisible(true);
  };

  return (
    <div className="App">
      <Navbar toggleSurvey={toggleSurvey} openSpecialOffers={openSpecialOffers} />
      <HomePage isAdmin={isAdmin} openModifyHome={openModifyHome} />
      <ServiceCatalog isAdmin={isAdmin} openAddService={openAddService} />
      <ProductCatalog isAdmin={isAdmin} openAddProductCategory={openAddProductCategory} />
      <Gallery isAdmin={isAdmin} openAddGallery={openAddGallery} />
      <BeautyTips isAdmin={isAdmin} openAddTip={openAddTip} />
      
      {/* Pantallas sobrepuestas */}
      {isSpecialOffersVisible && <SpecialOffers isAdmin={isAdmin} onClose={closeSpecialOffers} />}
      {isSurveyVisible && <SatisfactionSurvey isVisible={isSurveyVisible} closeSurvey={closeSurvey} isAdmin={isAdmin} openManageQuestions={openManageQuestions} />}
      {isLoginVisible && <Login closeLogin={closeLogin} handleLogin={handleLogin} />}
      
      {/* Screens para admin */}
      {isAddServiceVisible && <AddService isVisible={isAddServiceVisible} onClose={closeAddService} />}
      {isAddImageVisible && <AddGalleryImage isVisible={isAddImageVisible} onClose={closeAddGallery} />}
      {isAddTipVisible && <AddBeautyTip isVisible={isAddTipVisible} onClose={closeAddTip} />}
      {isAddProductCategoryVisible && <AddProductCategory isVisible={isAddProductCategoryVisible} onClose={closeAddProductCategory} />}
      {isModifyHomeVisible && <ModifyHome isVisible={isModifyHomeVisible} onClose={closeModifyHome} />}
      {isManageQuestionsVisible && <ManageQuestions onClose={closeManageQuestions} />} {/* Nueva pantalla para administrar preguntas */}
      
      <FooterPage openLogin={openLogin} />
      <FloatingHelpIcon onClick={handleHelpClick} />
    </div>
  );
}

export default App;
