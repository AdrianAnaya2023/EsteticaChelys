import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { fetchEncuestas, fetchEncuestaById, resetEncuesta } from '../Screens-Admin/encuestasAPI'; // Importamos las funciones del API
import '../EstilosAdmin/ManageSurveysPreguntita.css';

// Registramos los elementos necesarios para Chart.js
Chart.register(ArcElement, Tooltip, Legend);

const ManageSurveysPreguntita = () => {
  const [encuestas, setEncuestas] = useState([]); // Estado para almacenar las encuestas
  const [selectedQuestion, setSelectedQuestion] = useState(null); // Estado para manejar la pregunta seleccionada
  const [details, setDetails] = useState([]); // Estado para almacenar los detalles de la encuesta (inicializado como array vacío)
  const [results, setResults] = useState([]); // Estado para almacenar los resultados de la encuesta (inicializado como array vacío)
  const [loading, setLoading] = useState(true); // Estado de carga

  // Al montar el componente, obtenemos todas las encuestas
  useEffect(() => {
    const loadEncuestas = async () => {
      try {
        const encuestasData = await fetchEncuestas(); // Obtener las encuestas desde la API
        console.log('Encuestas obtenidas:', encuestasData); // Revisar si las encuestas se obtienen correctamente
        setEncuestas(encuestasData);
      } catch (error) {
        console.error('Error al cargar las encuestas:', error.message);
      } finally {
        setLoading(false);
      }
    };

    loadEncuestas();
  }, []);

  // Función para obtener los detalles y resultados de la encuesta seleccionada
  const handleSelectQuestion = async (id) => {
    try {
      const encuestaData = await fetchEncuestaById(id); // Obtener detalles de la encuesta
      console.log('Datos de la encuesta seleccionada:', encuestaData); // Verificar si los datos se obtienen correctamente
      setSelectedQuestion(encuestaData);
      setDetails(encuestaData.detalles || []); // Verificamos que 'detalles' exista o lo inicializamos como array vacío
      setResults(encuestaData.resultados || []); // Verificamos que 'resultados' exista o lo inicializamos como array vacío
    } catch (error) {
      console.error('Error al obtener la encuesta:', error.message);
    }
  };

  // Función para resetear la encuesta seleccionada
  const handleResetEncuesta = async () => {
    try {
      await resetEncuesta(selectedQuestion.id); // Resetea la encuesta seleccionada
      setDetails((prevDetails) =>
        prevDetails.map((detail) => ({
          ...detail,
          votos: 0, // Reseteamos los votos localmente a 0
        }))
      );
      alert('Encuesta reseteada correctamente');
    } catch (error) {
      console.error('Error al resetear la encuesta:', error.message);
    }
  };

  // Renderizar gráficos según la pregunta seleccionada
  const renderCharts = () => {
    if (!selectedQuestion || !details.length || !results.length) {
      return <p>No hay resultados para graficar</p>;
    }

    const votes = details.map((detail) => {
      const result = results.find((res) => res.detalle_encuesta_id === detail.id);
      return result ? result.votos : 0;
    });

    const labels = details.map((detail) => detail.respuesta);

    // Verificación para no renderizar el gráfico si todos los votos son 0
    if (votes.every(vote => vote === 0)) {
      return <p>No hay resultados para graficar</p>;
    }

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
        <button className="delete-chart-button-preguntita" onClick={handleResetEncuesta}>
          Resetear Resultados
        </button>
      </div>
    );
  };

  // Mostrar mensaje de carga mientras se obtienen los datos
  if (loading) return <div>Cargando encuestas...</div>;

  // Manejo en caso de que no haya encuestas disponibles
  if (!encuestas.length) return <div>No hay encuestas disponibles</div>;

  return (
    <div className="manage-surveys-container-preguntita">
      <h1 className="title-preguntita">Gráficas de Encuestas</h1>
      <div className="charts-section-preguntita">
        <select
          className="select-preguntita"
          onChange={(e) => handleSelectQuestion(parseInt(e.target.value))}
        >
          <option value="">Seleccionar una pregunta</option>
          {encuestas.map((encuesta) => (
            <option key={encuesta.id} value={encuesta.id}>
              {encuesta.pregunta}
            </option>
          ))}
        </select>
        {renderCharts()}
      </div>
    </div>
  );
};

export default ManageSurveysPreguntita;
