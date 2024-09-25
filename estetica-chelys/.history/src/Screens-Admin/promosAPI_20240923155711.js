import axios from 'axios';

// Configura la URL base de todas las peticiones
const API_URL = 'http://localhost:3000/api/promos';

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
    return `Promoción con ID ${id} eliminada correctamente.`;
  } catch (error) {
    throw new Error('Error al eliminar la promoción: ' + error.message);
  }
};
