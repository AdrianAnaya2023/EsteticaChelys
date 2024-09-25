import axios from 'axios';

// Configura la URL base para todas las peticiones al endpoint de promociones
const API_URL = `${process.env.REACT_APP_API_URL}/api/promos`;

// Función para obtener todas las promociones
export const fetchPromos = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener las promociones: ' + error.message);
  }
};

// Función para obtener una promoción por ID
export const fetchPromoById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener la promoción: ' + error.message);
  }
};

// Función para crear una nueva promoción
export const createPromo = async (promoData) => {
  try {
    const response = await axios.post(API_URL, promoData);
    return response.data;
  } catch (error) {
    throw new Error('Error al crear la promoción: ' + error.message);
  }
};

// Función para actualizar una promoción existente
export const updatePromo = async (id, promoData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, promoData);
    return response.data;
  } catch (error) {
    throw new Error('Error al actualizar la promoción: ' + error.message);
  }
};

// Función para eliminar una promoción
export const deletePromo = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return 'Promoción eliminada correctamente';
  } catch (error) {
    throw new Error('Error al eliminar la promoción: ' + error.message);
  }
};
