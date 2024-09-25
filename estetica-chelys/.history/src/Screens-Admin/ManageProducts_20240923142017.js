import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../EstilosAdmin/ManageProducts.css'; // Asegúrate de tener los estilos correctos

// Define la URL base de la API
const API_URL = 'http://localhost:3000'; // Ajusta la URL de tu API según corresponda

const ManageProducts = ({ onClose }) => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [isProductsView, setIsProductsView] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [newItem, setNewItem] = useState({ titulo: '', descripcion: '', imagen: '', categoria_id: null });

  // Obtener categorías desde el backend
  useEffect(() => {
    axios.get(`${API_URL}/categorias-productos`)
      .then(response => {
        console.log('Categorías:', response.data); // Verifica los datos recibidos
        setCategories(response.data);
      })
      .catch(error => console.error('Error al obtener las categorías:', error));
  }, []);

  // Obtener productos desde el backend
  useEffect(() => {
    axios.get(`${API_URL}/productos`)
      .then(response => {
        console.log('Productos:', response.data); // Verifica los datos recibidos
        setProducts(response.data);
      })
      .catch(error => console.error('Error al obtener los productos:', error));
  }, []);

  // Obtener el nombre de la categoría según su ID
  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.nombre : 'Sin categoría';
  };

  // Abrir el modal para agregar o editar productos/categorías
  const openModal = (item = null, isEditing = false) => {
    setIsModalOpen(true);
    setIsEditing(isEditing);
    setCurrentItem(item);
    if (item) {
      setNewItem(item);
    } else {
      setNewItem({ titulo: '', descripcion: '', imagen: '', categoria_id: null });
    }
  };

  // Cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Manejar los cambios en los inputs del formulario
  const handleChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  // Guardar los cambios (crear o editar)
  const handleSave = () => {
    if (isEditing) {
      if (isProductsView) {
        // Actualizar producto
        axios.put(`${API_URL}/productos/${currentItem.id}`, newItem)
          .then(response => {
            setProducts(products.map(prod => prod.id === currentItem.id ? response.data : prod));
            closeModal();
          })
          .catch(error => console.error('Error al actualizar el producto:', error));
      } else {
        // Actualizar categoría
        axios.put(`${API_URL}/categorias-productos/${currentItem.id}`, newItem)
          .then(response => {
            setCategories(categories.map(cat => cat.id === currentItem.id ? response.data : cat));
            closeModal();
          })
          .catch(error => console.error('Error al actualizar la categoría:', error));
      }
    } else {
      if (isProductsView) {
        // Crear nuevo producto
        axios.post(`${API_URL}/productos`, newItem)
          .then(response => {
            setProducts([...products, response.data]);
            closeModal();
          })
          .catch(error => console.error('Error al crear el producto:', error));
      } else {
        // Crear nueva categoría
        axios.post(`${API_URL}/categorias-productos`, newItem)
          .then(response => {
            setCategories([...categories, response.data]);
            closeModal();
          })
          .catch(error => console.error('Error al crear la categoría:', error));
      }
    }
  };

  // Manejar la eliminación de productos o categorías
  const handleDelete = (id) => {
    if (isProductsView) {
      // Eliminar producto
      axios.delete(`${API_URL}/productos/${id}`)
        .then(() => {
          setProducts(products.filter(prod => prod.id !== id));
        })
        .catch(error => console.error('Error al eliminar el producto:', error));
    } else {
      // Eliminar categoría
      axios.delete(`${API_URL}/categorias-productos/${id}`)
        .then(() => {
          setCategories(categories.filter(cat => cat.id !== id));
        })
        .catch(error => console.error('Error al eliminar la categoría:', error));
    }
  };

  return (
    <div className="manage-products-container-ManageProducts">
      <button onClick={onClose} className="close-button-ManageProducts">Cerrar</button>
      <h1 className="title-ManageProducts"> {isProductsView ? 'Productos' : 'Categorías de Productos'}</h1>

      <div className="products-buttons-container-ManageProducts">
        <button onClick={() => setIsProductsView(!isProductsView)} className="products-toggle-view-button-ManageProducts">
          Ver {isProductsView ? 'Categorías' : 'Productos'}
        </button>
        <button onClick={() => openModal(null, false)} className="products-add-button-ManageProducts">
          Agregar {isProductsView ? 'Producto' : 'Categoría'}
        </button>
      </div>

      {/* Tabla de categorías o productos */}
      <div className="table-container-ManageProducts">
        {isProductsView ? (
          <>
            <h2 className="subtitle-ManageProducts">Productos de Estética</h2>
            <table className="custom-table-ManageProducts">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Título</th>
                  <th>Descripción</th>
                  <th>Imagen</th>
                  <th>Categoría</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 ? (
                  products.map((product) => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>{product.titulo}</td>
                      <td>{product.descripcion}</td>
                      <td>
                        <img src={product.imagen} alt={product.titulo} className="table-image-ManageProducts" />
                      </td>
                      <td>{getCategoryName(product.categoria_id)}</td>
                      <td>
                        <button onClick={() => openModal(product, true)} className="edit-button-ManageProducts">Editar</button>
                        <button onClick={() => handleDelete(product.id)} className="delete-button-ManageProducts">Eliminar</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">No hay productos disponibles.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        ) : (
          <>
            <h2 className="subtitle-ManageProducts">Categorías de Estética</h2>
            <table className="custom-table-ManageProducts">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Imagen</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <tr key={category.id}>
                      <td>{category.id}</td>
                      <td>{category.nombre}</td>
                      <td>{category.descripcion}</td>
                      <td>
                        <img src={category.imagen} alt={category.nombre} className="table-image-ManageProducts" />
                      </td>
                      <td>
                        <button onClick={() => openModal(category, true)} className="edit-button-ManageProducts">Editar</button>
                        <button onClick={() => handleDelete(category.id)} className="delete-button-ManageProducts">Eliminar</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No hay categorías disponibles.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        )}
      </div>

      {/* Modal para agregar/editar productos/categorías */}
      {isModalOpen && (
        <div className="modal-ManageProducts">
          <div className="modal-content-ManageProducts">
            <h2>{isEditing ? 'Editar' : 'Agregar'} {isProductsView ? 'Producto de Estética' : 'Categoría de Estética'}</h2>
            
            <label className="modal-label-ManageProducts" htmlFor={isProductsView ? 'titulo' : 'nombre'}>
              {isProductsView ? 'Título del Producto' : 'Nombre de la Categoría'}
            </label>
            <input
              type="text"
              id={isProductsView ? 'titulo' : 'nombre'}
              name={isProductsView ? 'titulo' : 'nombre'}
              placeholder={isProductsView ? 'Ej: Crema Facial' : 'Ej: Maquillaje'}
              value={isProductsView ? newItem.titulo : newItem.nombre}
              onChange={handleChange}
              className="input-ManageProducts"
            />
            
            <label className="modal-label-ManageProducts" htmlFor="descripcion">Descripción</label>
            <input
              type="text"
              id="descripcion"
              name="descripcion"
              placeholder="Descripción detallada"
              value={newItem.descripcion}
              onChange={handleChange}
              className="input-ManageProducts"
            />
            
            <label className="modal-label-ManageProducts" htmlFor="imagen">Imagen (URL)</label>
            <input
              type="text"
              id="imagen"
              name="imagen"
              placeholder="URL de la Imagen"
              value={newItem.imagen}
              onChange={handleChange}
              className="input-ManageProducts"
            />

            {isProductsView && (
              <>
                <label className="modal-label-ManageProducts" htmlFor="categoria_id">Categoría</label>
                <select
                  id="categoria_id"
                  name="categoria_id"
                  value={newItem.categoria_id}
                  onChange={handleChange}
                  className="input-ManageProducts"
                >
                  <option value="">Selecciona una Categoría</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                  ))}
                </select>
              </>
            )}

            <div className="modal-buttons-ManageProducts">
              <button onClick={handleSave} className="save-button-ManageProducts">Guardar</button>
              <button onClick={closeModal} className="cancel-button-ManageProducts">Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;
