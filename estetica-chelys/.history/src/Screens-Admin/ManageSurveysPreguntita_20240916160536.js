import React, { useState } from 'react';
import '../EstilosAdmin/ManageSurveysPreguntita.css';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

// Registramos los elementos necesarios para Chart.js
Chart.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ManageSurveysPreguntita = () => {
  // Estados para manejar las preguntas, detalles, resultados y la sección activa
  const [activeSection, setActiveSection] = useState('questions');
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const [questions, setQuestions] = useState([
    { id: 1, pregunta: '¿Cómo calificaría nuestro servicio?' },
    { id: 2, pregunta: '¿Recomendaría nuestro servicio a otros?' },
  ]);

  const [details, setDetails] = useState([
    { id: 1, encuesta_id: 1, respuesta: 'Excelente' },
    { id: 2, encuesta_id: 1, respuesta: 'Bueno' },
    { id: 3, encuesta_id: 1, respuesta: 'Regular' },
    { id: 4, encuesta_id: 2, respuesta: 'Sí' },
    { id: 5, encuesta_id: 2, respuesta: 'No' },
  ]);

  const [results, setResults] = useState([
    { detalle_encuesta_id: 1, votos: 15 },
    { detalle_encuesta_id: 2, votos: 10 },
    { detalle_encuesta_id: 3, votos: 5 },
    { detalle_encuesta_id: 4, votos: 20 },
    { detalle_encuesta_id: 5, votos: 7 },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState({ pregunta: '' });
  const [currentDetail, setCurrentDetail] = useState({ respuesta: '', encuesta_id: '' });

  // Filtrar detalles según la pregunta
  const getDetailsForQuestion = (questionId) => {
    return details.filter((detail) => detail.encuesta_id === questionId);
  };

  // CRUD para preguntas
  const handleAddQuestion = () => {
    setQuestions([...questions, { id: questions.length + 1, pregunta: currentQuestion.pregunta }]);
    setIsModalOpen(false);
  };

  const handleEditQuestion = () => {
    setQuestions(questions.map(q => q.id === currentQuestion.id ? currentQuestion : q));
    setIsModalOpen(false);
  };

  const handleDeleteQuestion = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
    setDetails(details.filter((detail) => detail.encuesta_id !== id)); // Eliminar los detalles asociados
  };

  // CRUD para detalles
  const handleAddDetail = () => {
    setDetails([...details, { id: details.length + 1, encuesta_id: currentDetail.encuesta_id, respuesta: currentDetail.respuesta }]);
    setIsModalOpen(false);
  };

  const handleEditDetail = () => {
    setDetails(details.map(d => d.id === currentDetail.id ? currentDetail : d));
    setIsModalOpen(false);
  };

  const handleDeleteDetail = (id) => {
    setDetails(details.filter((d) => d.id !== id));
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
      </div>
    );
  };

  return (
    <div className="manage-surveys-container-preguntita">
      <h1 className="title-preguntita">Administrar Encuestas</h1>

      {/* Botones para cambiar de sección */}
      <div className="section-buttons-preguntita">
        <button onClick={() => setActiveSection('questions')} className={`section-button-preguntita ${activeSection === 'questions' ? 'active' : ''}`}>
          Preguntas
        </button>
        <button onClick={() => setActiveSection('details')} className={`section-button-preguntita ${activeSection === 'details' ? 'active' : ''}`}>
          Opciones
        </button>
        <button onClick={() => setActiveSection('charts')} className={`section-button-preguntita ${activeSection === 'charts' ? 'active' : ''}`}>
          Gráficas
        </button>
      </div>

      {/* Sección de Preguntas */}
      {activeSection === 'questions' && (
        <div className="questions-section-preguntita">
          <h2>Preguntas</h2>
          <button onClick={() => { setIsModalOpen(true); setCurrentQuestion({ pregunta: '' }); }} className="add-button-preguntita">Agregar Pregunta</button>
          <table className="custom-table-preguntita">
            <thead>
              <tr>
                <th>ID</th>
                <th>Pregunta</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((question) => (
                <tr key={question.id}>
                  <td>{question.id}</td>
                  <td>{question.pregunta}</td>
                  <td>
                    <button onClick={() => { setCurrentQuestion(question); setIsEditing(true); setIsModalOpen(true); }} className="edit-button-preguntita">Modificar</button>
                    <button onClick={() => handleDeleteQuestion(question.id)} className="delete-button-preguntita">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Sección de Opciones (Detalles) */}
      {activeSection === 'details' && (
        <div className="details-section-preguntita">
          <h2>Opciones de Preguntas</h2>
          <button onClick={() => { setIsModalOpen(true); setCurrentDetail({ respuesta: '', encuesta_id: '' }); }} className="add-button-preguntita">Agregar Opción</button>
          <table className="custom-table-preguntita">
            <thead>
              <tr>
                <th>ID</th>
                <th>Pregunta</th>
                <th>Opción</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {details.map((detail) => (
                <tr key={detail.id}>
                  <td>{detail.id}</td>
                  <td>{questions.find((q) => q.id === detail.encuesta_id)?.pregunta}</td>
                  <td>{detail.respuesta}</td>
                  <td>
                    <button onClick={() => { setCurrentDetail(detail); setIsEditing(true); setIsModalOpen(true); }} className="edit-button-preguntita">Modificar</button>
                    <button onClick={() => handleDeleteDetail(detail.id)} className="delete-button-preguntita">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Sección de Gráficas */}
      {activeSection === 'charts' && (
        <div className="charts-section-preguntita">
          <h2>Selecciona una pregunta para ver su gráfica</h2>
          <select onChange={(e) => setSelectedQuestion(questions.find((q) => q.id === parseInt(e.target.value)))}>
            <option value="">Seleccionar una pregunta</option>
            {questions.map((question) => (
              <option key={question.id} value={question.id}>
                {question.pregunta}
              </option>
            ))}
          </select>
          {renderCharts()}
        </div>
      )}

      {/* Modal para agregar/editar pregunta o detalle */}
      {isModalOpen && (
        <div className="modal-preguntita">
          <div className="modal-content-preguntita">
            <h2>{isEditing ? 'Modificar' : 'Agregar'} {activeSection === 'questions' ? 'Pregunta' : 'Opción'}</h2>
            {activeSection === 'questions' ? (
              <>
                <label htmlFor="pregunta">Pregunta</label>
                <input
                  type="text"
                  id="pregunta"
                  name="pregunta"
                  value={currentQuestion.pregunta}
                  onChange={(e) => setCurrentQuestion({ ...currentQuestion, pregunta: e.target.value })}
                />
              </>
            ) : (
              <>
                <label htmlFor="respuesta">Opción</label>
                <input
                  type="text"
                  id="respuesta"
                  name="respuesta"
                  value={currentDetail.respuesta}
                  onChange={(e) => setCurrentDetail({ ...currentDetail, respuesta: e.target.value })}
                />
                <label htmlFor="pregunta">Pregunta</label>
                <select
                  id="pregunta"
                  value={currentDetail.encuesta_id}
                  onChange={(e) => setCurrentDetail({ ...currentDetail, encuesta_id: parseInt(e.target.value) })}
                >
                  {questions.map((question) => (
                    <option key={question.id} value={question.id}>
                      {question.pregunta}
                    </option>
                  ))}
                </select>
              </>
            )}

            <div className="modal-buttons-preguntita">
              <button onClick={isEditing ? (activeSection === 'questions' ? handleEditQuestion : handleEditDetail) : (activeSection === 'questions' ? handleAddQuestion : handleAddDetail)} className="save-button-preguntita">Guardar</button>
              <button onClick={() => setIsModalOpen(false)} className="cancel-button-preguntita">Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageSurveysPreguntita;
