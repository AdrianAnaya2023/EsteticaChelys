import axios from 'axios';

// Configura la URL base y el timeout para todas las peticiones al endpoint de servicios
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/servicios', // Asegúrate de que esta URL sea correcta
  timeout: 10000, // Tiempo de espera máximo en milisegundos (10 segundos)
});

// Función para obtener todos los servicios
export const fetchServicios = async () => {
  try {
    const response = await axiosInstance.get('/');
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error al obtener los servicios');
  }
};

// Función para obtener un servicio por ID
export const fetchServicioById = async (id) => {
  try {
    const response = await axiosInstance.get(`/${id}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error al obtener el servicio');
  }
};

// Función para crear un nuevo servicio
export const createServicio = async (servicioData) => {
  try {
    console.log('Datos enviados al crear servicio:', servicioData); // Verifica los datos enviados
    const response = await axiosInstance.post('/', servicioData);
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error al crear el servicio');
  }
};


// Función para actualizar un servicio existente
export const updateServicio = async (id, servicioData) => {
  try {
    const response = await axiosInstance.put(`/${id}`, servicioData);
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error al actualizar el servicio');
  }
};

// Función para eliminar un servicio
export const deleteServicio = async (id) => {
  try {
    await axiosInstance.delete(`/${id}`);
    return 'Servicio eliminado correctamente';
  } catch (error) {
    handleAxiosError(error, 'Error al eliminar el servicio');
  }
};

// Función para obtener servicios por categoría
export const fetchServiciosPorCategoria = async (categoriaId) => {
  try {
    const response = await axiosInstance.get(`/categoria/${categoriaId}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error al obtener los servicios por categoría');
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
