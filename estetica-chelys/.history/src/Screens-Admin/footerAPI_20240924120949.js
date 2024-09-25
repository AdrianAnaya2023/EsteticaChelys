import axios from 'axios';

// Configura la URL base y el timeout para todas las peticiones al endpoint de footer
const axiosInstance = axios.create({
  baseURL: `http://localhost:3000/api/footer`,
  timeout: 10000, // Tiempo de espera máximo en milisegundos (10 segundos)
});

// Función para obtener todos los registros de footer
export const fetchFooters = async () => {
  try {
    const response = await axiosInstance.get('/');
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error al obtener los registros de footer');
  }
};

// Función para obtener un registro de footer por ID
export const fetchFooterById = async (id) => {
  try {
    const response = await axiosInstance.get(`/${id}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error al obtener el registro de footer');
  }
};

// Función para crear un nuevo registro de footer
export const createFooter = async (footerData) => {
  try {
    const response = await axiosInstance.post('/', footerData);
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error al crear el registro de footer');
  }
};

// Función para actualizar un registro de footer existente
export const updateFooter = async (id, footerData) => {
  try {
    const response = await axiosInstance.put(`/${id}`, footerData);
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error al actualizar el registro de footer');
  }
};

// Función para eliminar un registro de footer
export const deleteFooter = async (id) => {
  try {
    await axiosInstance.delete(`/${id}`);
    return 'Registro de footer eliminado correctamente';
  } catch (error) {
    handleAxiosError(error, 'Error al eliminar el registro de footer');
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
