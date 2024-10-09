import axios from 'axios';

// Configura la URL base y el timeout para todas las peticiones al endpoint de productos
const axiosInstance = axios.create({
  baseURL: `http://localhost:3000/api/productos`,
  timeout: 10000, // Tiempo de espera máximo en milisegundos (10 segundos)
});

// Función para obtener todos los productos
export const fetchProductos = async () => {
  try {
    const response = await axiosInstance.get('/');
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error al obtener los productos');
  }
};

// Función para obtener un producto por ID
export const fetchProductoById = async (id) => {
  try {
    const response = await axiosInstance.get(`/${id}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error al obtener el producto');
  }
};

// Función para crear un nuevo producto
export const createProducto = async (productoData) => {
  try {
    const response = await axiosInstance.post('/', productoData);
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error al crear el producto');
  }
};

// Función para actualizar un producto existente
export const updateProducto = async (id, productoData) => {
  try {
    const response = await axiosInstance.put(`/${id}`, productoData);
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error al actualizar el producto');
  }
};

// Función para eliminar un producto
export const deleteProducto = async (id) => {
  try {
    await axiosInstance.delete(`/${id}`);
    return 'Producto eliminado correctamente';
  } catch (error) {
    handleAxiosError(error, 'Error al eliminar el producto');
  }
};

// Función para obtener productos por categoría
export const fetchProductosPorCategoria = async (categoriaId) => {
  try {
    const response = await axiosInstance.get(`/categoria/${categoriaId}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error al obtener los productos por categoría');
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
