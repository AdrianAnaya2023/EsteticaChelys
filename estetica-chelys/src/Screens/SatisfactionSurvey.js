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
        <h1>Encuesta de Satisfacción</h1>
        <p>Por favor, completa nuestra encuesta de satisfacción.</p>
        <form>
          <label htmlFor="customerService">¿Cómo calificarías nuestro servicio al cliente?</label>
          <select id="customerService" name="customerService">
            <option value="">Selecciona una opción</option>
            <option value="excellent">Excelente</option>
            <option value="good">Bueno</option>
            <option value="fair">Regular</option>
            <option value="poor">Malo</option>
          </select>

          <label htmlFor="usageFrequency">¿Con qué frecuencia usas nuestro servicio?</label>
          <select id="usageFrequency" name="usageFrequency">
            <option value="">Selecciona una opción</option>
            <option value="daily">Diariamente</option>
            <option value="weekly">Semanalmente</option>
            <option value="monthly">Mensualmente</option>
            <option value="rarely">Raramente</option>
          </select>

          <label htmlFor="easeOfUse">Califica la facilidad de uso de nuestro sitio/servicio</label>
          <select id="easeOfUse" name="easeOfUse">
            <option value="">Selecciona una opción</option>
            <option value="very_easy">Muy fácil</option>
            <option value="easy">Fácil</option>
            <option value="moderate">Moderado</option>
            <option value="difficult">Difícil</option>
          </select>

          <label htmlFor="comments">Comentarios:</label>
          <textarea id="comments" name="comments" rows="4"></textarea>
          
          <button type="submit">Enviar</button>
        </form>
      </div>
    </>
  );
};

export default SatisfactionSurvey;
