import axios from 'axios';

// Configura la URL base y el timeout para todas las peticiones al endpoint de galería
const axiosInstance = axios.create({
  baseURL: `http://localhost:3000/api/galeria`,
  timeout: 10000, // Tiempo de espera máximo en milisegundos (10 segundos)
});

// Función para validar los datos de entrada de la galería
const isValidGaleriaData = (galeriaData) => {
  const { foto_antes, foto_despues, categoriaId } = galeriaData;
  return foto_antes && foto_despues && typeof categoriaId === 'number';
}

// Función para obtener todas las entradas de la galería
export const fetchGalerias = async () => {
  try {
    const response = await axiosInstance.get('/');
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error al obtener las galerías');
  }
};

// Función para obtener una entrada de la galería por ID
export const fetchGaleriaById = async (id) => {
  try {
    const response = await axiosInstance.get(`/${id}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error al obtener la galería');
  }
};

// Función para obtener las entradas de galería por categoría
export const fetchGaleriasByCategoria = async (categoriaId) => {
  try {
    const response = await axiosInstance.get(`/categoria/${categoriaId}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error al obtener las galerías por categoría');
  }
};

// Función para crear una nueva entrada de galería
export const createGaleria = async (galeriaData) => {
  if (!isValidGaleriaData(galeriaData)) {
    throw new Error('Datos de la galería inválidos');
  }
  try {
    const response = await axiosInstance.post('/', galeriaData);
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error al crear la galería');
  }
};

// Función para actualizar una entrada de galería existente
export const updateGaleria = async (id, galeriaData) => {
  if (!isValidGaleriaData(galeriaData)) {
    throw new Error('Datos de la galería inválidos para actualización');
  }
  try {
    const response = await axiosInstance.put(`/${id}`, galeriaData);
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error al actualizar la galería');
  }
};

// Función para eliminar una entrada de la galería
export const deleteGaleria = async (id) => {
  try {
    await axiosInstance.delete(`/${id}`);
    return 'Galería eliminada correctamente';
  } catch (error) {
    handleAxiosError(error, 'Error al eliminar la galería');
  }
};

// Manejo de errores comunes de Axios
const handleAxiosError = (error, defaultMessage) => {
  if (error.response) {
    console.error(`Error del servidor: ${error.response.status} - ${error.response.data.message}`);
    throw new Error(`Error del servidor: ${error.response.data.message || defaultMessage}`);
  } else if (error.request) {
    console.error('No response from server', error.request);
    throw new Error('No se recibió respuesta del servidor. Verifique su conexión.');
  } else {
    console.error('Error setting up request', error.message);
    throw new Error(`Error en la solicitud: ${error.message}`);
  }
};
