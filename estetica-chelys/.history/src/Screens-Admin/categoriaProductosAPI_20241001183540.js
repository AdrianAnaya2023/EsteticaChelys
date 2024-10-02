import axios from 'axios';

// Configura la URL base y el timeout para todas las peticiones al endpoint de categorías de productos
const axiosInstance = axios.create({
  baseURL: `http://localhost:3000/api/categorias-productos`,
  timeout: 4000, // Tiempo de espera máximo en milisegundos (10 segundos)
});

// Función para obtener todas las categorías de productos
export const fetchCategoriasProductos = async () => {
  try {
    const response = await axiosInstance.get('/');
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error al obtener las categorías de productos');
  }
};

// Función para obtener una categoría de productos por ID
export const fetchCategoriaProductoById = async (id) => {
  try {
    const response = await axiosInstance.get(`/${id}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error al obtener la categoría de productos');
  }
};

// Función para crear una nueva categoría de productos
export const createCategoriaProducto = async (categoriaData) => {
  try {
    const response = await axiosInstance.post('/', categoriaData);
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error al crear la categoría de productos');
  }
};

// Función para actualizar una categoría de productos existente
export const updateCategoriaProducto = async (id, categoriaData) => {
  try {
    const response = await axiosInstance.put(`/${id}`, categoriaData);
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error al actualizar la categoría de productos');
  }
};

// Función para eliminar una categoría de productos
export const deleteCategoriaProducto = async (id) => {
  try {
    await axiosInstance.delete(`/${id}`);
    return 'Categoría de productos eliminada correctamente';
  } catch (error) {
    handleAxiosError(error, 'Error al eliminar la categoría de productos');
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
