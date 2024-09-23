import React, { useEffect, useRef } from 'react';
import '../Styles/SatisfactionSurvey.css'; // Asegúrate de que el path al archivo CSS sea correcto

const SatisfactionSurvey = ({ isVisible, closeSurvey }) => {
  const surveyRef = useRef(null);

  useEffect(() => {
    if (isVisible && surveyRef.current) {
      const firstInput = surveyRef.current.querySelector('select, textarea, input');
      if (firstInput) {
        firstInput.focus();
      }
    }
  }, [isVisible]);

  return (
    <>
      {isVisible && <div className="overlay visible" onClick={closeSurvey}></div>}
      <div ref={surveyRef} className={`survey-container ${isVisible ? 'visible' : ''}`}>
        <button onClick={closeSurvey} className="cerrar-button">X</button>
        <div className="form-content">
          <h1>Encuesta de Satisfacción</h1>
          <p>Por favor, completa nuestra encuesta de satisfacción.</p>
          <form>
            <div className="question-container">
              <label htmlFor="question1">¿Cómo calificarías nuestro servicio?</label>
              <select id="question1" name="question1">
                <option value="">Selecciona una opción</option>
                <option value="bueno">Bueno</option>
                <option value="regular">Regular</option>
                <option value="malo">Malo</option>
              </select>
            </div>

            <div className="question-container">
              <label htmlFor="question2">¿Cómo calificarías la calidad de nuestros productos?</label>
              <select id="question2" name="question2">
                <option value="">Selecciona una opción</option>
                <option value="bueno">Bueno</option>
                <option value="regular">Regular</option>
                <option value="malo">Malo</option>
              </select>
            </div>

            <div className="question-container">
              <label htmlFor="question3">¿Recomendarías nuestro servicio a otros?</label>
              <select id="question3" name="question3">
                <option value="">Selecciona una opción</option>
                <option value="bueno">Bueno</option>
                <option value="regular">Regular</option>
                <option value="malo">Malo</option>
              </select>
            </div>
          </form>
        </div>
        <button type="submit" className="submit-button">Enviar</button>
      </div>
    </>
  );
};

export default SatisfactionSurvey;

