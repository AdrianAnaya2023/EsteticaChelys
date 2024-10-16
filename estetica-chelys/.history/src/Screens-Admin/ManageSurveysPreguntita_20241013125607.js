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

  // Función para obtener los valores de bueno, malo y regular de la encuesta seleccionada
  const handleSelectQuestion = async (id) => {
    try {
      const encuestaData = await fetchEncuestaById(id); // Obtener los datos de la encuesta
      console.log('Encuesta seleccionada:', encuestaData); // Verificar los datos obtenidos
      setSelectedQuestion(encuestaData);
    } catch (error) {
      console.error('Error al obtener la encuesta:', error.message);
    }
  };

  // Función para resetear los valores de la encuesta seleccionada
  const handleResetEncuesta = async () => {
    try {
      await resetEncuesta(selectedQuestion.id); // Resetea la encuesta seleccionada
      setSelectedQuestion({
        ...selectedQuestion,
        bueno: 0,
        malo: 0,
        regular: 0
      });
      alert('Encuesta reseteada correctamente');
    } catch (error) {
      console.error('Error al resetear la encuesta:', error.message);
    }
  };

  // Renderizar el gráfico según la pregunta seleccionada
  const renderCharts = () => {
    if (!selectedQuestion) return null;

    const { bueno, malo, regular } = selectedQuestion;

    // Verificar si todos los votos son 0
    if (bueno === 0 && malo === 0 && regular === 0) {
      return <p>No hay resultados para graficar</p>;
    }

    const data = {
      labels: ['Bueno', 'Malo', 'Regular'],
      datasets: [
        {
          data: [bueno, malo, regular],
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
