import React, { useState } from 'react';
import '../EstilosAdmin/ManageGallery.css'; // Asegúrate de crear y usar los estilos correctos

const ManageGallery = ({ onClose }) => {
  // Simulación de datos de categorías de la galería y la galería
  const [categories, setCategories] = useState([
    { id: 1, nombre: 'Faciales', descripcion: 'Tratamientos faciales antes y después', imagenCategoria: 'https://via.placeholder.com/100' },
    { id: 2, nombre: 'Masajes', descripcion: 'Terapias de masajes antes y después', imagenCategoria: 'https://via.placeholder.com/100' },
  ]);

  const [gallery, setGallery] = useState([
    { id: 1, foto_antes: 'https://via.placeholder.com/100', foto_despues: 'https://via.placeholder.com/100', categoria_id: 1 },
    { id: 2, foto_antes: 'https://via.placeholder.com/100', foto_despues: 'https://via.placeholder.com/100', categoria_id: 2 },
  ]);

  const [isGalleryView, setIsGalleryView] = useState(true); // Alternar entre vista de la galería y categorías
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Para distinguir entre agregar y editar
  const [currentItem, setCurrentItem] = useState(null); // El item que estamos editando (categoría o galería)
  const [newItem, setNewItem] = useState({ foto_antes: '', foto_despues: '', imagenCategoria: '', categoria_id: null });

  // Filtrar galerías por categoría
  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.nombre : 'Sin categoría';
  };

  // Manejo de modales
  const openModal = (item = null, isEditing = false) => {
    setIsModalOpen(true);
    setIsEditing(isEditing);
    setCurrentItem(item);
    if (item) {
      setNewItem(item); // Cargar los datos actuales si se está editando
    } else {
      setNewItem({ foto_antes: '', foto_despues: '', imagenCategoria: '', categoria_id: null });
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Manejo de cambios en los inputs del modal
  const handleChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  // Agregar o modificar una categoría/galería
  const handleSave = () => {
    if (isEditing) {
      if (isGalleryView) {
        setGallery(gallery.map(item => item.id === currentItem.id ? newItem : item));
      } else {
        setCategories(categories.map(cat => cat.id === currentItem.id ? newItem : cat));
      }
    } else {
      if (isGalleryView) {
        setGallery([...gallery, { ...newItem, id: gallery.length + 1 }]);
      } else {
        setCategories([...categories, { ...newItem, id: categories.length + 1 }]);
      }
    }
    closeModal();
  };

  // Eliminar una categoría o un ítem de la galería
  const handleDelete = (id) => {
    if (isGalleryView) {
      setGallery(gallery.filter(item => item.id !== id));
    } else {
      setCategories(categories.filter(cat => cat.id !== id));
    }
  };

  return (
    <div className="manage-gallery-container-GaleriaAdmin">
      <button onClick={onClose} className="close-button-GaleriaAdmin">Cerrar</button>
      <h1 className="title-GaleriaAdmin">Administrar {isGalleryView ? 'Galería' : 'Categorías de Galería'}</h1>

      <div className="buttons-container-GaleriaAdmin">
        <button onClick={() => setIsGalleryView(!isGalleryView)} className="toggle-view-button-GaleriaAdmin">
          Ver {isGalleryView ? 'Categorías' : 'Galería'}
        </button>
        <button onClick={() => openModal(null, false)} className="add-button-GaleriaAdmin">
          Agregar {isGalleryView ? 'Imagen a Galería' : 'Categoría'}
        </button>
      </div>

      {/* Tabla de categorías o galería */}
      <div className="table-container-GaleriaAdmin">
        {isGalleryView ? (
          <>
            <h2 className="subtitle-GaleriaAdmin">Galería</h2>
            <table className="custom-table-GaleriaAdmin">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Foto Antes</th>
                  <th>Foto Después</th>
                  <th>Categoría</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {gallery.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>
                      <img src={item.foto_antes} alt="Antes" className="table-image-GaleriaAdmin" />
                    </td>
                    <td>
                      <img src={item.foto_despues} alt="Después" className="table-image-GaleriaAdmin" />
                    </td>
                    <td>{getCategoryName(item.categoria_id)}</td>
                    <td>
                      <button onClick={() => openModal(item, true)} className="edit-button-GaleriaAdmin">Editar</button>
                      <button onClick={() => handleDelete(item.id)} className="delete-button-GaleriaAdmin">Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <>
            <h2 className="subtitle-GaleriaAdmin">Categorías de Galería</h2>
            <table className="custom-table-GaleriaAdmin">
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
                      <img src={category.imagenCategoria} alt={category.nombre} className="table-image-GaleriaAdmin" />
                    </td>
                    <td>
                      <button onClick={() => openModal(category, true)} className="edit-button-GaleriaAdmin">Editar</button>
                      <button onClick={() => handleDelete(category.id)} className="delete-button-GaleriaAdmin">Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>

      {/* Modal para agregar/editar categorías o imágenes */}
      {isModalOpen && (
        <div className="modal-GaleriaAdmin">
          <div className="modal-content-GaleriaAdmin">
            <h2>{isEditing ? 'Editar' : 'Agregar'} {isGalleryView ? 'Imagen a Galería' : 'Categoría de Galería'}</h2>

            {isGalleryView ? (
              <>
                <label className="modal-label-GaleriaAdmin" htmlFor="foto_antes">Foto Antes</label>
                <input
                  type="text"
                  id="foto_antes"
                  name="foto_antes"
                  placeholder="URL de la Foto Antes"
                  value={newItem.foto_antes}
                  onChange={handleChange}
                  className="input-GaleriaAdmin"
                />

                <label className="modal-label-GaleriaAdmin" htmlFor="foto_despues">Foto Después</label>
                <input
                  type="text"
                  id="foto_despues"
                  name="foto_despues"
                  placeholder="URL de la Foto Después"
                  value={newItem.foto_despues}
                  onChange={handleChange}
                  className="input-GaleriaAdmin"
                />
              </>
            ) : (
              <>
                <label className="modal-label-GaleriaAdmin" htmlFor="nombre">Nombre de la Categoría</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  placeholder="Nombre de la Categoría"
                  value={newItem.nombre}
                  onChange={handleChange}
                  className="input-GaleriaAdmin"
                />

                <label className="modal-label-GaleriaAdmin" htmlFor="descripcion">Descripción</label>
                <input
                  type="text"
                  id="descripcion"
                  name="descripcion"
                  placeholder="Descripción"
                  value={newItem.descripcion}
                  onChange={handleChange}
                  className="input-GaleriaAdmin"
                />

                <label className="modal-label-GaleriaAdmin" htmlFor="imagenCategoria">Imagen de la Categoría</label>
                <input
                  type="text"
                  id="imagenCategoria"
                  name="imagenCategoria"
                  placeholder="URL de la Imagen"
                  value={newItem.imagenCategoria}
                  onChange={handleChange}
                  className="input-GaleriaAdmin"
                />
              </>
            )}

            {isGalleryView && (
              <label className="modal-label-GaleriaAdmin" htmlFor="categoria_id">Categoría</label>
            )}

            {isGalleryView && (
              <select
                id="categoria_id"
                name="categoria_id"
                value={newItem.categoria_id}
                onChange={handleChange}
                className="input-GaleriaAdmin"
              >
                <option value="">Selecciona una Categoría</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                ))}
              </select>
            )}

            <div className="modal-buttons-GaleriaAdmin">
              <button onClick={handleSave} className="save-button-GaleriaAdmin">Guardar</button>
              <button onClick={closeModal} className="cancel-button-GaleriaAdmin">Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageGallery;
