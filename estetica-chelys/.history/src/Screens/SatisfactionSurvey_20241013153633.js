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
      {isVisible && <div className="overlay-encuesta visible-encuesta" onClick={closeSurvey}></div>}
      <div ref={surveyRef} className={`survey-container-encuesta ${isVisible ? 'visible-encuesta' : ''}`}>
        <button onClick={closeSurvey} className="cerrar-button-encuesta">X</button>
        <div className="form-content-encuesta">
          <h1>Encuesta de Satisfacción</h1>
          <p>Por favor, completa nuestra encuesta de satisfacción.</p>
          <form>
            <label htmlFor="question1">¿Cómo calificarías nuestro servicio?</label>
            <select id="question1" name="question1">
              <option value="">Selecciona una opción</option>
              <option value="bueno">Bueno</option>
              <option value="regular">Regular</option>
              <option value="malo">Malo</option>
            </select>

            <label htmlFor="question2">¿Cómo calificarías la calidad de nuestros productos?</label>
            <select id="question2" name="question2">
              <option value="">Selecciona una opción</option>
              <option value="bueno">Bueno</option>
              <option value="regular">Regular</option>
              <option value="malo">Malo</option>
            </select>

            <label htmlFor="question3">¿Recomendarías nuestro servicio a otros?</label>
            <select id="question3" name="question3">
              <option value="">Selecciona una opción</option>
              <option value="bueno">Bueno</option>
              <option value="regular">Regular</option>
              <option value="malo">Malo</option>
            </select>
          </form>
        </div>
        <button type="submit" className="submit-button-encuesta">Enviar</button>
      </div>
    </>
  );
};

export default SatisfactionSurvey;
