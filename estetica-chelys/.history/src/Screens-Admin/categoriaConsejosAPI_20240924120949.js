import axios from 'axios';

// Configura la URL base y el timeout para todas las peticiones al endpoint de categorías de consejos
const axiosInstance = axios.create({
  baseURL: `http://localhost:3000/api/categorias-consejos`,
  timeout: 10000, // Tiempo de espera máximo en milisegundos (10 segundos)
});

// Función para obtener todas las categorías de consejos
export const fetchCategoriasConsejos = async () => {
  try {
    const response = await axiosInstance.get('/');
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error al obtener las categorías de consejos');
  }
};

// Función para obtener una categoría de consejos por ID
export const fetchCategoriaConsejoById = async (id) => {
  try {
    const response = await axiosInstance.get(`/${id}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error al obtener la categoría de consejos');
  }
};

// Función para crear una nueva categoría de consejos
export const createCategoriaConsejo = async (categoriaData) => {
  try {
    const response = await axiosInstance.post('/', categoriaData);
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error al crear la categoría de consejos');
  }
};

// Función para actualizar una categoría de consejos existente
export const updateCategoriaConsejo = async (id, categoriaData) => {
  try {
    const response = await axiosInstance.put(`/${id}`, categoriaData);
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error al actualizar la categoría de consejos');
  }
};

// Función para eliminar una categoría de consejos
export const deleteCategoriaConsejo = async (id) => {
  try {
    await axiosInstance.delete(`/${id}`);
    return 'Categoría de consejos eliminada correctamente';
  } catch (error) {
    handleAxiosError(error, 'Error al eliminar la categoría de consejos');
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
