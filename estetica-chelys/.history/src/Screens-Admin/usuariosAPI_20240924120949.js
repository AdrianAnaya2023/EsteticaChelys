import axios from 'axios';

// Configura la URL base y el timeout para todas las peticiones al endpoint de usuarios
const axiosInstance = axios.create({
  baseURL: `http://localhost:3000/api/usuarios`,
  timeout: 10000, // Tiempo de espera máximo en milisegundos (10 segundos)
});

// Función para obtener todos los usuarios
export const fetchUsuarios = async () => {
  try {
    const response = await axiosInstance.get('/');
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error al obtener los usuarios');
  }
};

// Función para obtener un usuario por ID
export const fetchUsuarioById = async (id) => {
  try {
    const response = await axiosInstance.get(`/${id}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error al obtener el usuario');
  }
};

// Función para crear un nuevo usuario
export const createUsuario = async (usuarioData) => {
  try {
    const response = await axiosInstance.post('/', usuarioData);
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error al crear el usuario');
  }
};

// Función para actualizar un usuario existente
export const updateUsuario = async (id, usuarioData) => {
  try {
    const response = await axiosInstance.put(`/${id}`, usuarioData);
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error al actualizar el usuario');
  }
};

// Función para eliminar un usuario
export const deleteUsuario = async (id) => {
  try {
    await axiosInstance.delete(`/${id}`);
    return 'Usuario eliminado correctamente';
  } catch (error) {
    handleAxiosError(error, 'Error al eliminar el usuario');
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
