import axios from 'axios';

// Configura la URL base y el timeout para todas las peticiones al endpoint de homepage
const axiosInstance = axios.create({
  baseURL: `http://localhost:3000/api/homepage`,
  timeout: 10000, // Tiempo de espera máximo en milisegundos (10 segundos)
});

// Función para obtener todos los registros de la homepage
export const fetchHomepages = async () => {
  try {
    const response = await axiosInstance.get('/');
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error al obtener los registros de homepage');
  }
};

// Función para obtener un registro de homepage por ID
export const fetchHomepageById = async (id) => {
  try {
    const response = await axiosInstance.get(`/${id}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error al obtener el registro de homepage');
  }
};

// Función para crear un nuevo registro en la homepage
export const createHomepage = async (homepageData) => {
  try {
    const response = await axiosInstance.post('/', homepageData);
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error al crear el registro de homepage');
  }
};

// Función para actualizar un registro de homepage existente
export const updateHomepage = async (id, homepageData) => {
  try {
    const response = await axiosInstance.put(`/${id}`, homepageData);
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error al actualizar el registro de homepage');
  }
};

// Función para eliminar un registro de homepage
export const deleteHomepage = async (id) => {
  try {
    await axiosInstance.delete(`/${id}`);
    return 'Registro de homepage eliminado correctamente';
  } catch (error) {
    handleAxiosError(error, 'Error al eliminar el registro de homepage');
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
