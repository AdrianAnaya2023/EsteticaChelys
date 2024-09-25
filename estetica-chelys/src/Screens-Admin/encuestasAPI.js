import axios from 'axios';

// Configura la URL base y el timeout para todas las peticiones al endpoint de encuestas
const axiosInstance = axios.create({
  baseURL: `http://localhost:3000/api/encuestas`,
  timeout: 10000, // Tiempo de espera máximo en milisegundos (10 segundos)
});

// Función para obtener todas las encuestas
export const fetchEncuestas = async () => {
  try {
    const response = await axiosInstance.get('/');
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error al obtener las encuestas');
  }
};

// Función para obtener una encuesta por ID
export const fetchEncuestaById = async (id) => {
  try {
    const response = await axiosInstance.get(`/${id}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error al obtener la encuesta');
  }
};

// Función para crear una nueva encuesta
export const createEncuesta = async (encuestaData) => {
  try {
    const response = await axiosInstance.post('/', encuestaData);
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error al crear la encuesta');
  }
};

// Función para actualizar una encuesta existente
export const updateEncuesta = async (id, encuestaData) => {
  try {
    const response = await axiosInstance.put(`/${id}`, encuestaData);
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error al actualizar la encuesta');
  }
};

// Función para eliminar una encuesta
export const deleteEncuesta = async (id) => {
  try {
    await axiosInstance.delete(`/${id}`);
    return 'Encuesta eliminada correctamente';
  } catch (error) {
    handleAxiosError(error, 'Error al eliminar la encuesta');
  }
};

// Manejo de errores comunes de Axios
const handleAxiosError = (error, defaultMessage) => {
  if (error.response) {
    throw new Error(`Error del servidor: ${error.response.data.message || defaultMessage}`);
  } else if (error.request) {
    throw new Error('No se recibió respuesta del servidor. Verifique su conexión.');
  } else {
    throw new Error(`Error en la solicitud: ${error.message}`);
  }
};
