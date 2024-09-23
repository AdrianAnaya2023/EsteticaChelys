import React, { useState } from 'react';
import '../EstilosAdmin/ManageProducts.css'; // Asegúrate de crear y usar los estilos correctos

const ManageProducts = ({ onClose }) => {
  const [categories, setCategories] = useState([
    { id: 1, nombre: 'Cuidado de la Piel', descripcion: 'Productos para mantener la piel saludable y radiante', imagen: 'https://via.placeholder.com/100' },
    { id: 2, nombre: 'Maquillaje', descripcion: 'Artículos para realzar la belleza facial', imagen: 'https://via.placeholder.com/100' },
  ]);

  const [products, setProducts] = useState([
    { id: 1, titulo: 'Crema Hidratante', imagen: 'https://via.placeholder.com/100', categoria_id: 1, descripcion: 'Crema para hidratar la piel' },
    { id: 2, titulo: 'Labial Mate', imagen: 'https://via.placeholder.com/100', categoria_id: 2, descripcion: 'Labial de larga duración con acabado mate' },
  ]);

  const [isProductsView, setIsProductsView] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [newItem, setNewItem] = useState({ titulo: '', descripcion: '', imagen: '', categoria_id: null });

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.nombre : 'Sin categoría';
  };

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

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (isEditing) {
      if (isProductsView) {
        setProducts(products.map(prod => prod.id === currentItem.id ? newItem : prod));
      } else {
        setCategories(categories.map(cat => cat.id === currentItem.id ? newItem : cat));
      }
    } else {
      if (isProductsView) {
        setProducts([...products, { ...newItem, id: products.length + 1 }]);
      } else {
        setCategories([...categories, { ...newItem, id: categories.length + 1 }]);
      }
    }
    closeModal();
  };

  const handleDelete = (id) => {
    if (isProductsView) {
      setProducts(products.filter(prod => prod.id !== id));
    } else {
      setCategories(categories.filter(cat => cat.id !== id));
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
                {products.map((product) => (
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
                ))}
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
                {categories.map((category) => (
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
                ))}
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
