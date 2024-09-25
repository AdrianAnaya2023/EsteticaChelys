import axios from 'axios';

// Configura la URL base y el timeout para todas las peticiones al endpoint de promociones
const axiosInstance = axios.create({
  baseURL: `http://localhost:3000/api/promos`,
  timeout: 5000, // Tiempo de espera máximo en milisegundos (5 segundos)
});

// Función para obtener todas las promociones
export const fetchPromos = async () => {
  try {
    const response = await axiosInstance.get('/');
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener las promociones: ' + error.message);
  }
};

// Función para obtener una promoción por ID
export const fetchPromoById = async (id) => {
  try {
    const response = await axiosInstance.get(`/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener la promoción: ' + error.message);
  }
};

// Función para crear una nueva promoción
export const createPromo = async (promoData) => {
  try {
    const response = await axiosInstance.post('/', promoData);
    return response.data;
  } catch (error) {
    throw new Error('Error al crear la promoción: ' + error.message);
  }
};

// Función para actualizar una promoción existente
export const updatePromo = async (id, promoData) => {
  try {
    const response = await axiosInstance.put(`/${id}`, promoData);
    return response.data;
  } catch (error) {
    throw new Error('Error al actualizar la promoción: ' + error.message);
  }
};

// Función para eliminar una promoción
export const deletePromo = async (id) => {
  try {
    await axiosInstance.delete(`/${id}`);
    return 'Promoción eliminada correctamente';
  } catch (error) {
    throw new Error('Error al eliminar la promoción: ' + error.message);
  }
};
