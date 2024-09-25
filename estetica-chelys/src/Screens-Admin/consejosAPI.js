import axios from 'axios';

// Configura la URL base y el timeout para todas las peticiones al endpoint de consejos
const axiosInstance = axios.create({
  baseURL: `http://localhost:3000/api/consejos`,
  timeout: 10000, // Tiempo de espera máximo en milisegundos (10 segundos)
});

// Función para obtener todos los consejos
export const fetchConsejos = async () => {
  try {
    const response = await axiosInstance.get('/');
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error al obtener los consejos');
  }
};

// Función para obtener un consejo por ID
export const fetchConsejoById = async (id) => {
  try {
    const response = await axiosInstance.get(`/${id}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error al obtener el consejo');
  }
};

// Función para crear un nuevo consejo
export const createConsejo = async (consejoData) => {
  try {
    const response = await axiosInstance.post('/', consejoData);
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error al crear el consejo');
  }
};

// Función para actualizar un consejo existente
export const updateConsejo = async (id, consejoData) => {
  try {
    const response = await axiosInstance.put(`/${id}`, consejoData);
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error al actualizar el consejo');
  }
};

// Función para eliminar un consejo
export const deleteConsejo = async (id) => {
  try {
    await axiosInstance.delete(`/${id}`);
    return 'Consejo eliminado correctamente';
  } catch (error) {
    handleAxiosError(error, 'Error al eliminar el consejo');
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
