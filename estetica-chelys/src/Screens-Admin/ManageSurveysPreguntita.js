import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import '../EstilosAdmin/ManageSurveysPreguntita.css';

// Registramos los elementos necesarios para Chart.js
Chart.register(ArcElement, Tooltip, Legend);

const ManageSurveysPreguntita = () => {
  // Estado para manejar la pregunta seleccionada
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  // Preguntas actualizadas según la encuesta SatisfactionSurvey
  const questions = [
    { id: 1, pregunta: '¿Cómo calificarías nuestro servicio?' },
    { id: 2, pregunta: '¿Cómo calificarías la calidad de nuestros productos?' },
    { id: 3, pregunta: '¿Recomendarías nuestro servicio a otros?' },
  ];

  const details = [
    { id: 1, encuesta_id: 1, respuesta: 'Bueno' },
    { id: 2, encuesta_id: 1, respuesta: 'Malo' },
    { id: 3, encuesta_id: 1, respuesta: 'Regular' },
    { id: 4, encuesta_id: 2, respuesta: 'Bueno' },
    { id: 5, encuesta_id: 2, respuesta: 'Malo' },
    { id: 6, encuesta_id: 2, respuesta: 'Regular' },
    { id: 7, encuesta_id: 3, respuesta: 'Bueno' },
    { id: 8, encuesta_id: 3, respuesta: 'Malo' },
    { id: 9, encuesta_id: 3, respuesta: 'Regular' },
  ];

  const results = [
    { detalle_encuesta_id: 1, votos: 15 },
    { detalle_encuesta_id: 2, votos: 10 },
    { detalle_encuesta_id: 3, votos: 5 },
    { detalle_encuesta_id: 4, votos: 20 },
    { detalle_encuesta_id: 5, votos: 7 },
    { detalle_encuesta_id: 6, votos: 8 },
    { detalle_encuesta_id: 7, votos: 18 },
    { detalle_encuesta_id: 8, votos: 6 },
    { detalle_encuesta_id: 9, votos: 12 },
  ];

  // Filtrar detalles según la pregunta seleccionada
  const getDetailsForQuestion = (questionId) => {
    return details.filter((detail) => detail.encuesta_id === questionId);
  };

  // Renderizar gráficos según la pregunta seleccionada
  const renderCharts = () => {
    if (!selectedQuestion) return null;

    const detailsForQuestion = getDetailsForQuestion(selectedQuestion.id);
    const votes = detailsForQuestion.map((detail) => {
      const result = results.find((res) => res.detalle_encuesta_id === detail.id);
      return result ? result.votos : 0;
    });
    const labels = detailsForQuestion.map((detail) => detail.respuesta);

    const data = {
      labels: labels,
      datasets: [
        {
          data: votes,
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        },
      ],
    };

    return (
      <div className="chart-container-preguntita">
        <h3>Gráfico de Respuestas para: {selectedQuestion.pregunta}</h3>
        <Pie data={data} width={750} height={750} />
        {/* Botón para borrar la gráfica, funcionalidad a implementar */}
        <button className="delete-chart-button-preguntita">Borrar Resultados</button>
      </div>
    );
  };

  return (
    <div className="manage-surveys-container-preguntita">
      <h1 className="title-preguntita">Gráficas de Encuestas</h1>
      <div className="charts-section-preguntita">
        <select
          className="select-preguntita"
          onChange={(e) => setSelectedQuestion(questions.find((q) => q.id === parseInt(e.target.value)))}
        >
          <option value="">Seleccionar una pregunta</option>
          {questions.map((question) => (
            <option key={question.id} value={question.id}>
              {question.pregunta}
            </option>
          ))}
        </select>
        {renderCharts()}
      </div>
    </div>
  );
};

export default ManageSurveysPreguntita;
