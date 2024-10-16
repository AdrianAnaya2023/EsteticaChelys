import React, { useEffect, useRef, useState } from 'react';
import { fetchEncuestas, submitRespuesta } from '../Screens-Admin/encuestasAPI'; // Asegúrate de tener estas funciones en tu API
import '../Styles/SatisfactionSurvey.css'; // Asegúrate de que el path al archivo CSS sea correcto

const SatisfactionSurvey = ({ isVisible, closeSurvey }) => {
  const [questions, setQuestions] = useState([]); // Almacena las preguntas obtenidas desde el API
  const [answers, setAnswers] = useState({}); // Almacena las respuestas del usuario
  const surveyRef = useRef(null);

  useEffect(() => {
    // Obtener preguntas desde el API
    const loadQuestions = async () => {
      try {
        const encuestas = await fetchEncuestas(); // Llamada al API para obtener las encuestas
        setQuestions(encuestas); // Guardar las preguntas en el estado
      } catch (error) {
        console.error('Error al cargar las preguntas:', error);
      }
    };

    loadQuestions();
  }, []);

  // Manejar el cambio de respuesta por parte del usuario
  const handleAnswerChange = (questionId, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: value, // Actualizar la respuesta seleccionada
    }));
  };

  // Enviar respuestas al API
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Iterar sobre las respuestas seleccionadas por el usuario y enviarlas una por una
      const answerEntries = Object.entries(answers);
      for (const [questionId, respuesta] of answerEntries) {
        await submitRespuesta(questionId, respuesta); // Llamada al API para enviar cada respuesta
      }

      alert('Gracias por completar la encuesta!');
      closeSurvey(); // Cerrar la encuesta después de enviar
    } catch (error) {
      console.error('Error al enviar las respuestas:', error);
    }
  };

  // Manejo del enfoque en el primer campo de la encuesta
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
          <form onSubmit={handleSubmit}>
            {questions.map((question) => (
              <div key={question.id}>
                <label htmlFor={`question-${question.id}`}>{question.pregunta}</label>
                <select
                  id={`question-${question.id}`}
                  name={`question-${question.id}`}
                  value={answers[question.id] || ''}
                  onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                >
                  <option value="">Selecciona una opción</option>
                  <option value="bueno">Bueno</option>
                  <option value="regular">Regular</option>
                  <option value="malo">Malo</option>
                </select>
              </div>
            ))}
            <button type="submit" className="submit-button-encuesta">Enviar</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SatisfactionSurvey;
