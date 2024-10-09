import axios from 'axios';

// Configura la URL base y el timeout para todas las peticiones al endpoint de categorías de servicios
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/categorias-servicios', // Asegúrate de que esta URL sea correcta
  timeout: 10000, // Tiempo de espera máximo en milisegundos (10 segundos)
});

// Función para obtener todas las categorías de servicios
export const fetchCategoriasServicios = async () => {
  try {
    const response = await axiosInstance.get('/');
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error al obtener las categorías de servicios');
  }
};

// Función para obtener una categoría de servicios por ID
export const fetchCategoriaServicioById = async (id) => {
  try {
    const response = await axiosInstance.get(`/${id}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error al obtener la categoría de servicios');
  }
};

// Función para crear una nueva categoría de servicios
export const createCategoriaServicio = async (categoriaData) => {
  try {
    const response = await axiosInstance.post('/', categoriaData);
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error al crear la categoría de servicios');
  }
};

// Función para actualizar una categoría de servicios existente
export const updateCategoriaServicio = async (id, categoriaData) => {
  try {
    const response = await axiosInstance.put(`/${id}`, categoriaData);
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error al actualizar la categoría de servicios');
  }
};

// Función para eliminar una categoría de servicios
export const deleteCategoriaServicio = async (id) => {
  try {
    await axiosInstance.delete(`/${id}`);
    return 'Categoría de servicios eliminada correctamente';
  } catch (error) {
    handleAxiosError(error, 'Error al eliminar la categoría de servicios');
  }
};

// Manejo de errores comunes de Axios
const handleAxiosError = (error, defaultMessage) => {
  if (error.response) {
    console.error('Error Response:', error.response); // Para depuración
    throw new Error(`Error del servidor: ${error.response.data.message || defaultMessage}`);
  } else if (error.request) {
    console.error('Error Request:', error.request); // Para depuración
    throw new Error('No se recibió respuesta del servidor. Verifique su conexión.');
  } else {
    console.error('Error:', error.message); // Para depuración
    throw new Error(`Error en la solicitud: ${error.message}`);
  }
};
