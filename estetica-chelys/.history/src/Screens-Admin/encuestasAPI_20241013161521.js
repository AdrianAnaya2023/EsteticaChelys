import axios from 'axios';

// Configura la URL base y el timeout para todas las peticiones al endpoint de encuestas
const axiosInstance = axios.create({
  baseURL: `http://localhost:3000/api/encuestas`, // Cambia la URL si es necesario
  timeout: 10000, // Tiempo de espera máximo en milisegundos (10 segundos)
});

// Función para obtener todas las encuestas
export const fetchEncuestas = async () => {
  try {
    const response = await axiosInstance.get('/');
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener las encuestas: ' + error.message);
  }
};

// Función para obtener una encuesta por ID
export const fetchEncuestaById = async (id) => {
  try {
    const response = await axiosInstance.get(`/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener la encuesta: ' + error.message);
  }
};

// Función para actualizar una encuesta existente (pregunta, bueno, malo, regular)
export const updateEncuesta = async (id, encuestaData) => {
  try {
    const response = await axiosInstance.put(`/${id}`, encuestaData);
    return response.data;
  } catch (error) {
    throw new Error('Error al actualizar la encuesta: ' + error.message);
  }
};


export const submitRespuesta = async (id, respuesta) => {
  try {
    const response = await axiosInstance.post(`/${id}/responder`, { respuesta });
    return response.data;
  } catch (error) {
    throw new Error('Error al enviar la respuesta: ' + error.message);
  }
};

// Función para resetear una encuesta (bueno, malo, regular a 0)
export const resetEncuesta = async (id) => {
  try {
    const response = await axiosInstance.delete(`/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error al resetear la encuesta: ' + error.message);
  }
};
