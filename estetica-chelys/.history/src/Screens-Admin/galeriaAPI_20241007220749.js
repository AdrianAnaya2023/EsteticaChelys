import axios from 'axios';

// Configura la URL base y el timeout para todas las peticiones al endpoint de galería
const axiosInstance = axios.create({
  baseURL: `http://localhost:3000/api/galeria`,
  timeout: 10000, // Tiempo de espera máximo en milisegundos (10 segundos)
});

// Función para obtener todas las entradas de galería
export const fetchGalerias = async () => {
  try {
    const response = await axiosInstance.get('/');
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error al obtener las entradas de galería');
  }
};

// Función para obtener una entrada de galería por ID
export const fetchGaleriaById = async (id) => {
  try {
    const response = await axiosInstance.get(`/${id}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error al obtener la entrada de galería');
  }
};

// Función para crear una nueva entrada de galería
export const createGaleria = async (galeriaData) => {
  try {
    const response = await axiosInstance.post('/', galeriaData);
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error al crear la entrada de galería');
  }
};

// Función para actualizar una entrada de galería existente
export const updateGaleria = async (id, galeriaData) => {
  try {
    const response = await axiosInstance.put(`/${id}`, galeriaData);
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error al actualizar la entrada de galería');
  }
};

// Función para eliminar una entrada de galería
export const deleteGaleria = async (id) => {
  try {
    await axiosInstance.delete(`/${id}`);
    return 'Entrada de galería eliminada correctamente';
  } catch (error) {
    handleAxiosError(error, 'Error al eliminar la entrada de galería');
  }
};

// Función para obtener entradas de galería por categoría
export const fetchGaleriasPorCategoria = async (categoriaId) => {
  try {
    const response = await axiosInstance.get(`/categoria/${categoriaId}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error al obtener las entradas de galería por categoría');
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
