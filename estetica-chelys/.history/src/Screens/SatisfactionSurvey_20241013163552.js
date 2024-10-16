import React, { useEffect, useRef, useState } from 'react';
import { fetchEncuestas, submitRespuesta } from '../Screens-Admin/encuestasAPI'; // Asegúrate de tener estas funciones en tu API
import '../Styles/SatisfactionSurvey.css'; // Asegúrate de que el path al archivo CSS sea correcto

const SatisfactionSurvey = ({ isVisible, closeSurvey }) => {
  const [questions, setQuestions] = useState([]); // Almacena las preguntas obtenidas desde el API
  const [answers, setAnswers] = useState({}); // Almacena las respuestas del usuario
  const [errorMessage, setErrorMessage] = useState(''); // Almacena el mensaje de error si no se selecciona una opción
  const [surveyCompleted, setSurveyCompleted] = useState(false); // Estado para saber si la encuesta se ha completado
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

  // Validar que se haya seleccionado una opción en todas las preguntas
  const validateAnswers = () => {
    for (const question of questions) {
      if (!answers[question.id]) {
        return false; // Si falta alguna respuesta, devuelve false
      }
    }
    return true; // Todas las preguntas tienen una respuesta
  };

  // Enviar respuestas al API
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateAnswers()) {
      setErrorMessage('Por favor, selecciona una opción en todas las preguntas.');
      return;
    }

    try {
      // Iterar sobre las respuestas seleccionadas por el usuario y enviarlas una por una
      const answerEntries = Object.entries(answers);
      for (const [questionId, respuesta] of answerEntries) {
        await submitRespuesta(questionId, respuesta); // Llamada al API para enviar cada respuesta
      }

      setSurveyCompleted(true); // Marca la encuesta como completada
      setErrorMessage(''); // Limpiar el mensaje de error
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

  if (!isVisible) return null; // Si no está visible, no mostrar nada

  return (
    <>
      {isVisible && <div className="overlay-encuesta visible-encuesta" onClick={closeSurvey}></div>}
      <div ref={surveyRef} className={`survey-container-encuesta ${isVisible ? 'visible-encuesta' : ''}`}>
        <button onClick={closeSurvey} className="cerrar-button-encuesta">X</button>

        {/* Si la encuesta se ha completado, mostrar un mensaje de agradecimiento */}
        {surveyCompleted ? (
          <div className="thank-you-message">
            <h2>¡Gracias por completar la encuesta!</h2>
            <p>Agradecemos mucho tu tiempo y tus respuestas.</p>
            <button className="close-survey-button" onClick={closeSurvey}>
              Cerrar
            </button>
          </div>
        ) : (
          <div className="form-content-encuesta">
            <h1 className="encuesta-title">Encuesta de Satisfacción</h1>
            <p className="encuesta-description">Por favor, completa nuestra encuesta de satisfacción.</p>
            <form onSubmit={handleSubmit}>
              {questions.map((question) => (
                <div key={question.id} className="question-container-encuesta">
                  <label htmlFor={`question-${question.id}`} className="encuesta-label">
                    {question.pregunta}
                  </label>
                  <select
                    id={`question-${question.id}`}
                    name={`question-${question.id}`}
                    value={answers[question.id] || ''}
                    onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                    className="encuesta-select"
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="bueno">Bueno</option>
                    <option value="regular">Regular</option>
                    <option value="malo">Malo</option>
                  </select>
                </div>
              ))}

              {/* Mostrar el mensaje de error si no se selecciona una opción en alguna pregunta */}
              {errorMessage && <p className="error-message">{errorMessage}</p>}

              <button type="submit" className="submit-button-encuesta">Enviar</button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default SatisfactionSurvey;
